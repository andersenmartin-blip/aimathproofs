import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const TYPES = { Pawn: 'p', Rook: 'r', Knight: 'n', Bishop: 'b', Queen: 'q', King: 'k' };
const position = square => new THREE.Vector3((square.charCodeAt(0) - 97 - 3.5) * 1.1, .42, -(Number(square[1]) - 1 - 3.5) * 1.1);

export class ChessBoard {
  constructor(container) {
    this.container = container; this.instances = new Map(); this.templates = new Map(); this.dirty = true;
    this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    this.renderer.setClearColor(0x171c1d);
    this.renderer.shadowMap.enabled = true; this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping; this.renderer.toneMappingExposure = 1.25;
    this.renderer.domElement.setAttribute('aria-label', 'Chess game in 3D');
    this.renderer.domElement.setAttribute('role', 'img');
    container.prepend(this.renderer.domElement);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, .3, 0); this.controls.enableDamping = true;
    this.controls.enablePan = false; this.controls.minDistance = 10; this.controls.maxDistance = 32;
    this.controls.minPolarAngle = .02; this.controls.maxPolarAngle = Math.PI / 2.15;
    this.controls.addEventListener('change', () => { this.dirty = true; });
    this.controls.addEventListener('start', () => { this.cameraTween = null; });
    this.flipped = false; this.top = false;
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const room = new RoomEnvironment(); this.environment = pmrem.fromScene(room, .05);
    this.scene.environment = this.environment.texture; this.scene.environmentIntensity = .75;
    room.dispose(); pmrem.dispose();
    this.scene.add(new THREE.HemisphereLight(0xe3efff, 0x51412a, 2.1));
    const key = new THREE.DirectionalLight(0xffe4bb, 3.8); key.position.set(-4, 10, 5);
    key.castShadow = true; key.shadow.mapSize.set(2048, 2048);
    Object.assign(key.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: .5, far: 30 });
    key.shadow.normalBias = .025; key.shadow.bias = -.0001; this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xb3d3ff, 1.5); fill.position.set(7, 7, -5); this.scene.add(fill);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.ShadowMaterial({ opacity: .25 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -.07; floor.receiveShadow = true; this.scene.add(floor);
    this.highlights = ['from', 'to'].map((_, i) => {
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.08, 1.08), new THREE.MeshBasicMaterial({ color: 0xe1b95e, transparent: true, opacity: i ? .32 : .17, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 }));
      mesh.rotation.x = -Math.PI / 2; mesh.visible = false; this.scene.add(mesh); return mesh;
    });
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(container);
    this.resize(); this.camera.position.copy(this.homePosition()); this.controls.update();
    const loop = time => {
      this.raf = requestAnimationFrame(loop);
      if (document.hidden || this.enabled === false) return;
      if (this.animation) {
        const t = Math.min(1, (time - this.animation.start) / this.animation.duration);
        const ease = t * t * (3 - 2 * t);
        for (const item of this.animation.items) {
          item.object.position.lerpVectors(item.from, item.to, ease);
          item.object.position.y += Math.sin(Math.PI * t) * item.lift;
        }
        this.dirty = true;
        if (t === 1) this.animation = null;
      }
      if (this.cameraTween) {
        const t = Math.min(1, (time - this.cameraTween.start) / 600);
        const ease = t * t * (3 - 2 * t);
        this.camera.position.lerpVectors(this.cameraTween.from, this.cameraTween.to, ease);
        this.dirty = true; if (t === 1) this.cameraTween = null;
      }
      this.controls.update();
      if (this.dirty) { this.renderer.render(this.scene, this.camera); this.dirty = false; }
    };
    this.raf = requestAnimationFrame(loop);
  }

  homePosition() {
    const aspect = this.container.clientWidth / Math.max(1, this.container.clientHeight);
    const scale = Math.max(1, 1.10 / aspect);
    const side = this.flipped ? -1 : 1;
    return this.top ? new THREE.Vector3(0, 22.7 * scale, .03 * side) : new THREE.Vector3(9 * side, 14.8, 15.8 * side).multiplyScalar(scale);
  }

  setEnabled(enabled) {
    this.enabled = enabled; this.renderer.domElement.hidden = !enabled;
    this.controls.enabled = enabled;
    if (enabled) { this.cameraTween = null; this.resize(); this.dirty = true; }
  }

  resize() {
    const w = this.container.clientWidth; const h = this.container.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false); this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    if (this.loaded) this.camera.position.copy(this.homePosition());
    this.dirty = true;
  }

  setView({ flip = false, toggleTop = false } = {}) {
    if (flip) this.flipped = !this.flipped;
    if (toggleTop) this.top = !this.top;
    if (this.reducedMotion) this.camera.position.copy(this.homePosition());
    else this.cameraTween = { from: this.camera.position.clone(), to: this.homePosition(), start: performance.now() };
    this.dirty = true;
  }

  async load() {
    const manager = new THREE.LoadingManager();
    const loader = new GLTFLoader(manager);
    const model = await loader.loadAsync('./assets/chess-set.glb');
    const textureLoader = new THREE.TextureLoader();
    const [walnut, maple] = await Promise.all(['walnut', 'maple'].map(name => textureLoader.loadAsync(`./assets/${name}.png`)));
    for (const texture of [walnut, maple]) { texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy()); }
    const roots = [];
    model.scene.traverse(object => {
      if (object.userData.piece) roots.push(object);
      if (!object.isMesh) return;
      object.castShadow = true; object.receiveShadow = true;
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
        if (material.name.startsWith('Walnut')) { material.map = walnut; material.color.set(0xffffff); material.roughness = .42; }
        if (material.name.startsWith('Maple')) { material.map = maple; material.color.set(0xffffff); material.roughness = .42; }
        material.needsUpdate = true;
      }
    });
    for (const object of roots) {
      const color = object.userData.side === 'White' ? 'w' : 'b';
      object.removeFromParent(); object.position.set(0, 0, 0);
      this.templates.set(color + TYPES[object.userData.piece], object);
    }
    if (this.templates.size !== 12) throw new Error('The pieces could not be loaded.');
    this.scene.add(model.scene); this.loaded = true; this.dirty = true;
  }

  finishAnimation() {
    if (this.animation) for (const item of this.animation.items) item.object.position.copy(item.to);
    this.animation = null; this.dirty = true;
  }

  showFrame(frame, animate = false, duration = 420) {
    this.finishAnimation();
    const visible = new Set(frame.pieces.map(p => p.id));
    for (const [id, instance] of this.instances) if (!visible.has(id)) instance.object.visible = false;
    const moving = [];
    for (const piece of frame.pieces) {
      const key = piece.color + piece.type;
      let instance = this.instances.get(piece.id);
      if (instance && instance.key !== key) { this.scene.remove(instance.object); this.instances.delete(piece.id); instance = null; }
      if (!instance) {
        const object = this.templates.get(key).clone(true); this.scene.add(object);
        instance = { object, key }; this.instances.set(piece.id, instance);
        object.position.copy(position(piece.square));
      }
      const object = instance.object; const target = position(piece.square);
      if (animate && object.visible && !this.reducedMotion && object.position.distanceTo(target) > .02) {
        moving.push({ object, from: object.position.clone(), to: target, lift: piece.type === 'n' ? .7 : .20 });
      } else object.position.copy(target);
      object.visible = true;
    }
    if (moving.length) this.animation = { start: performance.now(), duration, items: moving };
    this.highlights.forEach((mesh, i) => {
      mesh.visible = Boolean(frame.move);
      if (frame.move) { mesh.position.copy(position(i ? frame.move.to : frame.move.from)); mesh.position.y = .426; }
    });
    this.dirty = true;
  }

  reset() {
    this.animation = null;
    for (const item of this.instances.values()) this.scene.remove(item.object);
    this.instances.clear();
  }
}
