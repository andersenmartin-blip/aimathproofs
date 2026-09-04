"use client";

import { useEffect, useMemo, useState } from "react";

type Outcome =
  | "Proved"
  | "Disproved"
  | "Mixed claims"
  | "Demonstrated"
  | "Discovered"
  | "Designed"
  | "Clinical signal"
  | "Validated";

type Result = {
  title: string;
  field: string;
  date: string;
  isoDate: string;
  outcome: Outcome;
  status: string;
  score: 1 | 2 | 3 | 4 | 5;
  ai: string;
  summary: string;
  importance: string;
  source: string;
  sourceLabel?: string;
  secondarySource?: string;
  secondarySourceLabel?: string;
  addedDate?: string;
  addedIsoDate?: string;
};

const latestReviewDate = "September 4, 2026";
const latestReviewIsoDate = "2026-09-04";

const establishedResults: Result[] = [
  {
    title: "Burris–Yeats Minimum-Countermodel Conjecture for Tarski Algebra",
    field: "Mathematical logic, finite model theory & formal verification",
    date: "August 9, 2026",
    isoDate: "2026-08-09",
    outcome: "Proved",
    status: "Accepted at LPAR 2026; Lean-checked encoding with an imported LRAT certificate",
    score: 3,
    ai: "ChatGPT 5.5 Pro through Codex for more than 10,000 lines of Lean autoformalization",
    summary:
      "The smallest finite algebra satisfying Tarski's eleven high-school identities but falsifying Wilkie's identity has exactly 12 elements, confirming the conjecture of Burris and Yeats. The authors also classify all 8,957,952 labelled countermodels of size 12.",
    importance:
      "This closes the remaining one-element gap in a long-running finite-model problem attached to Tarski's famous question. SAT established unsatisfiability at size 11, while AI-generated Lean code proves that the exact CNF encoding is equivalent to the intended algebraic statement and imports the independently checkable certificate.",
    source: "https://arxiv.org/abs/2608.08421",
    sourceLabel: "View accepted paper and formal-verification account",
    secondarySource: "https://github.com/bsubercaseaux/HighSchoolAlgebraSAT",
    secondarySourceLabel: "View Lean formalization, encodings and certificates",
    addedDate: "September 4, 2026",
    addedIsoDate: "2026-09-04",
  },
  {
    title: "Zaporozhets–Tarasov Conjecture on Mean Distances",
    field: "Convex geometry, metric geometry & probability",
    date: "August 6, 2026",
    isoDate: "2026-08-06",
    outcome: "Mixed claims",
    status: "Independently reproduced in both the planar and higher-dimensional regimes",
    score: 3,
    ai: "GPT-5.6 Sol for simplifying the planar argument and finding the explicit higher-dimensional construction from the author's idea",
    summary:
      "For a convex body, the conjecture compares the mean distance of two interior points with that of two boundary points. The paper proves the inequality in dimension two but gives a six-vertex three-dimensional counterexample and extends the failure to every dimension at least three.",
    importance:
      "The work settles the conjecture in every dimension: true in the plane and false above it. A separate paper independently proves the planar case, while another independently constructs centrally symmetric counterexamples in all higher dimensions.",
    source: "https://arxiv.org/abs/2608.06470",
    sourceLabel: "View proof, counterexamples and AI-use declaration",
    secondarySource: "https://arxiv.org/abs/2608.14833",
    secondarySourceLabel: "View independent planar proof",
    addedDate: "September 4, 2026",
    addedIsoDate: "2026-09-04",
  },
  {
    title: "Universal 4/3 Pairwise-Independent Correlation-Gap Conjecture",
    field: "Probability, operations research & submodular optimization",
    date: "June 18, 2026",
    isoDate: "2026-06-18",
    outcome: "Disproved",
    status: "Exact rational primal and dual certificates validated by both authors; later extended",
    score: 3,
    ai: "GPT-5.5 Pro for autonomous search and the decisive counterexample",
    summary:
      "GPT-5.5 Pro found a five-element monotone submodular coverage function and rational marginal probabilities for which the pairwise-independent correlation gap is 640/479, strictly greater than 4/3. The authors validated the explicit primal and dual certificates, disproving the proposed universal upper bound in every dimension n at least five.",
    importance:
      "The conjecture concerned a basic robustness limit for stochastic submodular optimization. The exact instance is directly checkable, and a September follow-up by one of the original authors reconfirms its consequence for all n at least five and resolves the remaining n=4 case.",
    source: "https://arxiv.org/abs/2606.19663",
    sourceLabel: "View original counterexample and exact certificate",
    secondarySource: "https://arxiv.org/abs/2609.02659",
    secondarySourceLabel: "View follow-up and extension",
    addedDate: "September 3, 2026",
    addedIsoDate: "2026-09-03",
  },
  {
    title: "Cubic-Root Gaussian Approximation Under Unrestricted Covariance",
    field: "High-dimensional probability, statistics & formal verification",
    date: "August 31, 2026",
    isoDate: "2026-08-31",
    outcome: "Disproved",
    status: "Complete Lean 4 formalization of the source-facing theorem released",
    score: 3,
    ai: "ChatGPT 5.6 Pro for the initial proof; authors corrected and rewrote it",
    summary:
      "The paper proves an n^(-1/3), up to logarithmic factors, Gaussian-approximation bound for high-dimensional rectangles with arbitrary, possibly singular covariance. This falsifies the conjecture that the earlier n^(-1/4) rate is near-optimal in polynomial dimension.",
    importance:
      "The result improves a central high-dimensional central-limit bound without covariance structure. The public Lean development covers the fully quantified critical-value theorem, pins its dependencies and reports no sorry, admit, project axioms or native_decide in the final declarations.",
    source: "https://arxiv.org/abs/2608.30221",
    sourceLabel: "View preprint and AI-contribution statement",
    secondarySource:
      "https://github.com/WeihanZhang2001/cubic-root-gaussian-approximation-under-unrestricted-covariance",
    secondarySourceLabel: "View complete Lean formalization and trust audit",
    addedDate: "September 1, 2026",
    addedIsoDate: "2026-09-01",
  },
  {
    title: "Beyond the Bethe Approximation of the Permanent",
    field: "Algorithms, combinatorics & formal verification",
    date: "August 28, 2026",
    isoDate: "2026-08-28",
    outcome: "Proved",
    status: "Author-verified; complete Lean 4 formalization of the main theorem released",
    score: 4,
    ai: "ChatGPT 5.6 Sol Pro for proof development; Codex for checking and manuscript assembly",
    summary:
      "For every nonnegative n-by-n matrix, the paper gives a deterministic polynomial-time approximation to the permanent within c^n for an absolute constant c smaller than √2, breaking through the sharp barrier of the canonical Bethe approximation. The author supplied the high-level plan, and the proof was developed interactively with ChatGPT 5.6 Sol Pro.",
    importance:
      "The permanent is a central #P-hard quantity, and this is the first deterministic exponential-factor improvement beyond the previously tight Bethe guarantee. The public Lean development formalizes the fixed rational algorithm, its polynomial running time and the c < √2 approximation theorem without sorry, admit or project-specific axioms.",
    source: "https://arxiv.org/abs/2608.28031",
    sourceLabel: "View preprint and AI-contribution statement",
    secondarySource: "https://github.com/nimaanari/formalization-beyond-bethe",
    secondarySourceLabel: "View complete Lean formalization",
    addedDate: "August 31, 2026",
    addedIsoDate: "2026-08-31",
  },
  {
    title: "Gaussian Completely Monotone Conjecture",
    field: "Information theory, probability & mathematical physics",
    date: "May 12, 2026",
    isoDate: "2026-05-12",
    outcome: "Disproved",
    status: "Exact Arb certificate released; independently confirmed and strengthened analytically",
    score: 4,
    ai: "GPT-5.5 Pro found the explicit counterexample",
    summary:
      "GPT-5.5 Pro found a 17-point probability measure whose fifth entropy derivative along heat flow has the forbidden sign. This disproves the Gaussian completely monotone conjecture and, by implication, the stronger McKean Gaussian-optimality and Toscani entropy-power conjectures; the same paper proves that failure also occurs for a log-concave measure.",
    importance:
      "The conjecture organized a hierarchy of higher-order entropy inequalities. Exact rational input and SageMath/Arb ball arithmetic certify the decisive sign, and a later independent paper gives an analytic family of smooth, strictly log-concave counterexamples in every dimension.",
    source: "https://arxiv.org/abs/2605.11656",
    sourceLabel: "View original counterexample and verification code",
    secondarySource: "https://arxiv.org/abs/2608.30275",
    secondarySourceLabel: "View independent analytic strengthening",
    addedDate: "September 1, 2026",
    addedIsoDate: "2026-09-01",
  },
  {
    title: "Norm-Variation for Multiple Ergodic Averages",
    field: "Ergodic theory, harmonic analysis & formal verification",
    date: "August 27, 2026",
    isoDate: "2026-08-27",
    outcome: "Proved",
    status: "Complete Lean 4 formalization released; reproducible Comparator check documented",
    score: 4,
    ai: "GPT-5.6 Sol Pro, OpenAI 5.6 Terra Ultra and Claude Opus 5 High",
    summary:
      "The authors prove quantitative variation bounds for averages generated by any number of commuting measure-preserving transformations, strengthening Tao's norm-convergence theorem and answering an open question of Avigad and Rute. AI optimized constants, filled routine arguments and generated virtually all of the Lean development from carefully hand-formalized main statements.",
    importance:
      "The theorem completes a progression previously known only for two and three transformations and gives a quantitative result in every dimension. The mathematical architecture was human-designed, but the full machine-checked proof makes the result established and demonstrates unusually large-scale LLM autoformalization in analysis.",
    source: "https://arxiv.org/abs/2608.27321",
    sourceLabel: "View blueprint and automation disclosure",
    secondarySource: "https://github.com/roos-j/lean-nct",
    secondarySourceLabel: "View Lean formalization and checking instructions",
    addedDate: "August 29, 2026",
    addedIsoDate: "2026-08-29",
  },
  {
    title: "More Than Two Thirds of Zeta Zeros Are Simple and on the Critical Line",
    field: "Analytic number theory & formal verification",
    date: "August 19, 2026",
    isoDate: "2026-08-19",
    outcome: "Proved",
    status: "Complete sorry-free Lean 4 formalization plus an independent shorter proof",
    score: 5,
    ai: "Claude (Anthropic)",
    summary:
      "Claude autonomously developed an unconditional proof that more than two thirds of the nontrivial zeros of the Riemann zeta function are simple and lie on the critical line, with stronger optimized constants and corresponding results for primitive Dirichlet L-functions.",
    importance:
      "This is a major new unconditional record for the distribution of zeta zeros. It does not prove the Riemann Hypothesis, but the theorem now has both a complete Lean development and a separate, conceptually simpler proof by Youness Lamzouri using a Hilbert-space inequality and Montgomery's pair-correlation theorem.",
    source: "https://arxiv.org/abs/2608.13637",
    sourceLabel: "View original AI-assisted proof",
    secondarySource: "https://arxiv.org/abs/2609.02882",
    secondarySourceLabel: "View independent shorter proof",
    addedDate: "August 26, 2026",
    addedIsoDate: "2026-08-26",
  },
  {
    title: "Petersen Coloring Conjecture",
    field: "Graph theory & computer-assisted proof",
    date: "August 14, 2026",
    isoDate: "2026-08-14",
    outcome: "Disproved",
    status: "Checked DRAT certificates plus an independent human-checkable proof",
    score: 5,
    ai: "OpenAI models in discovery and search; GPT-5.6 Sol in independent exposition",
    summary:
      "A 112-vertex simple connected bridgeless cubic graph has neither a Petersen coloring nor a normal 5-edge-coloring. The original computational result includes reproducible SAT encodings and checked DRAT certificates; a separate author then published a short human-checkable proof for the same graph.",
    importance:
      "The counterexample overturns a prominent graph-theory conjecture that would have implied both the Berge–Fulkerson and five-cycle-double-cover conjectures. It also yields an infinite family of counterexamples, although minimality is not claimed.",
    source: "https://arxiv.org/abs/2608.10012",
    sourceLabel: "View counterexample and certificates",
    secondarySource: "https://arxiv.org/abs/2608.10028",
    secondarySourceLabel: "View independent human-checkable proof",
    addedDate: "August 26, 2026",
    addedIsoDate: "2026-08-26",
  },
  {
    title: "Bijective Proof of the Berkovich–Uncu Partition Theorem",
    field: "Partition theory & enumerative combinatorics",
    date: "August 5, 2026",
    isoDate: "2026-08-05",
    outcome: "Proved",
    status: "Four-author proof; main theorem formalized and verified in Lean",
    score: 2,
    ai: "AxiomProver",
    summary:
      "The authors answer Berkovich and Uncu's 2016 request for a combinatorial proof with an explicit bijection assembled from three classical constructions. AxiomProver autonomously formalized and verified the main theorem in Lean.",
    importance:
      "This resolves a specialist open question in partition theory and provides a machine-checked certificate. Its importance is narrower than the field's major structural conjectures, but the autonomous formalization is unusually strong verification.",
    source: "https://arxiv.org/abs/2608.05142",
    sourceLabel: "View preprint and Lean-verification statement",
    addedDate: "August 23, 2026",
    addedIsoDate: "2026-08-23",
  },
  {
    title: "Compact Hyperbolic Coxeter 6-Polytopes With 10 Facets",
    field: "Hyperbolic geometry & combinatorics",
    date: "August 3, 2026",
    isoDate: "2026-08-03",
    outcome: "Proved",
    status: "Exact exhaustion certificates; independently checked with CoxIter",
    score: 4,
    ai: "AI coding assistant under author direction",
    summary:
      "An exhaustive classification found exactly one compact hyperbolic Coxeter 6-polytope with ten facets, completing the d+4-facet classification in every dimension. Most of the classification software was written by AI.",
    importance:
      "The result completes a finite but technically demanding classification program. Exact machine-checkable exhaustion certificates and an independent CoxIter check provide unusually strong verification.",
    source: "https://arxiv.org/abs/2608.02894",
    sourceLabel: "View preprint and certificate description",
  },
  {
    title: "Schubitopes Are Not Ehrhart Positive",
    field: "Algebraic combinatorics & discrete geometry",
    date: "August 1, 2026",
    isoDate: "2026-08-01",
    outcome: "Disproved",
    status: "Explicit counterexample; SageMath computation released and certified by hand",
    score: 2,
    ai: "GPT-5.6 Sol Pro",
    summary:
      "GPT-5.6 Sol Pro found a two-column Schubitope whose Ehrhart polynomial has a negative quadratic coefficient, disproving the 2019 Monical–Tokcan–Yong positivity conjecture.",
    importance:
      "The result settles a specialised conjecture about a notable family of generalized permutahedra. The explicit example is directly checkable, and the authors released the SageMath computation and report certifying it by hand.",
    source: "https://arxiv.org/abs/2608.00377",
    sourceLabel: "View preprint and verification code",
  },
  {
    title: "High-dimensional Sphere Packing",
    field: "Discrete geometry",
    date: "August 1, 2026",
    isoDate: "2026-08-01",
    outcome: "Proved",
    status: "Full Lean certificate released",
    score: 5,
    ai: "Astra (internal OpenAI model)",
    summary:
      "Astra determined the exact asymptotic strength of the Cohn–Elkies linear program, improving the general high-dimensional sphere-packing exponent and settling the associated Fourier sign-uncertainty problem.",
    importance:
      "This is the first improvement to the general sphere-packing exponent since 1978 and establishes the precise limit of one of the field’s central proof methods.",
    source: "https://cdn.openai.com/pdf/ten-proofs-oai.pdf",
    sourceLabel: "View manuscript collection",
    secondarySource:
      "https://github.com/openai/ten-proofs/blob/main/SpherePacking.lean",
    secondarySourceLabel: "View Lean certificate",
  },
  {
    title: "Binary and Spherical Code Bounds",
    field: "Coding theory",
    date: "August 1, 2026",
    isoDate: "2026-08-01",
    outcome: "Proved",
    status: "Full Lean certificate released",
    score: 5,
    ai: "Astra (internal OpenAI model)",
    summary:
      "Astra obtained exponential improvements to classical upper bounds for fixed-distance binary codes across all parameters, with analogous results for high-dimensional spherical codes.",
    importance:
      "These bounds sharpen fundamental limits on error-correcting codes and connect directly to the new sphere-packing exponent.",
    source: "https://cdn.openai.com/pdf/ten-proofs-oai.pdf",
    sourceLabel: "View manuscript collection",
    secondarySource:
      "https://github.com/openai/ten-proofs/blob/main/MetricCodes.lean",
    secondarySourceLabel: "View Lean certificate",
  },
  {
    title: "Non-sofic Groups Exist",
    field: "Group theory",
    date: "August 1, 2026",
    isoDate: "2026-08-01",
    outcome: "Proved",
    status: "Full Lean certificate released",
    score: 5,
    ai: "Astra (internal OpenAI model)",
    summary:
      "Astra constructed an explicit infinite, finitely presented non-sofic group using property-(T) expanders and the binary Leavitt algebra.",
    importance:
      "The result answers the central question of whether every countable group admits finite permutation approximations, open since sofic groups were introduced.",
    source: "https://cdn.openai.com/pdf/ten-proofs-oai.pdf",
    sourceLabel: "View manuscript collection",
    secondarySource:
      "https://github.com/openai/ten-proofs/blob/main/NonSoficGroup.lean",
    secondarySourceLabel: "View Lean certificate",
  },
  {
    title: "Connes’s Rigidity Conjecture",
    field: "Operator algebras & group theory",
    date: "August 1, 2026",
    isoDate: "2026-08-01",
    outcome: "Disproved",
    status: "Full Lean certificate released",
    score: 5,
    ai: "Astra (internal OpenAI model)",
    summary:
      "Astra constructed infinitely many pairwise nonisomorphic property-(T) groups sharing the same group von Neumann algebra, disproving Connes’s rigidity conjecture.",
    importance:
      "The counterexamples overturn a longstanding proposed bridge between group structure and operator algebras and also answer a related finite-to-one question.",
    source: "https://cdn.openai.com/pdf/ten-proofs-oai.pdf",
    sourceLabel: "View manuscript collection",
    secondarySource:
      "https://github.com/openai/ten-proofs/blob/main/ConnesRigidity.lean",
    secondarySourceLabel: "View Lean certificate",
  },
  {
    title: "Permanent Circuit Lower Bounds",
    field: "Arithmetic complexity",
    date: "August 1, 2026",
    isoDate: "2026-08-01",
    outcome: "Proved",
    status: "Full Lean certificate released",
    score: 4,
    ai: "Astra (internal OpenAI model)",
    summary:
      "Astra proved that division-free circuits computing the permanent require Ω(n² log log n) gates and that arithmetic formulas require Ω(n⁴/log n) leaves.",
    importance:
      "Lower bounds for the permanent are a central test of progress in algebraic complexity, where strong unconditional bounds have been exceptionally difficult.",
    source: "https://cdn.openai.com/pdf/ten-proofs-oai.pdf",
    sourceLabel: "View manuscript collection",
    secondarySource:
      "https://github.com/openai/ten-proofs/blob/main/Permanent.lean",
    secondarySourceLabel: "View Lean certificate",
  },
  {
    title: "Quantum Parallel Repetition",
    field: "Quantum complexity theory",
    date: "August 1, 2026",
    isoDate: "2026-08-01",
    outcome: "Proved",
    status: "Full Lean certificate released",
    score: 5,
    ai: "Astra (internal OpenAI model)",
    summary:
      "Astra proved exponential parallel repetition for every finite two-player entangled game, extending a foundational classical complexity principle to general quantum games.",
    importance:
      "The theorem controls how rapidly cheating probability falls under repetition and has broad consequences for quantum interactive proofs and nonlocal games.",
    source: "https://cdn.openai.com/pdf/ten-proofs-oai.pdf",
    sourceLabel: "View manuscript collection",
    secondarySource:
      "https://github.com/openai/ten-proofs/blob/main/QuantumParallelRepetition.lean",
    secondarySourceLabel: "View Lean certificate",
  },
  {
    title: "Closest Vector Problem Hardness",
    field: "Lattice complexity & cryptography",
    date: "August 1, 2026",
    isoDate: "2026-08-01",
    outcome: "Proved",
    status: "Full Lean certificate released",
    score: 5,
    ai: "Astra (internal OpenAI model)",
    summary:
      "Astra gave a direct reduction from 3SAT proving n^(1/400)-factor hardness for Euclidean CVP, with related consequences for binary decoding and other lattice norms.",
    importance:
      "CVP is foundational in computational complexity and lattice-based cryptography; a polynomial approximation-hardness factor is a major qualitative advance.",
    source: "https://cdn.openai.com/pdf/ten-proofs-oai.pdf",
    sourceLabel: "View manuscript collection",
    secondarySource:
      "https://github.com/openai/ten-proofs/blob/main/GapCVP.lean",
    secondarySourceLabel: "View Lean certificate",
  },
  {
    title: "Ehrhart’s Volume Conjecture",
    field: "Convex & discrete geometry",
    date: "August 1, 2026",
    isoDate: "2026-08-01",
    outcome: "Proved",
    status: "Full Lean certificate released",
    score: 4,
    ai: "Astra (internal OpenAI model)",
    summary:
      "Astra proved in every dimension the sharp volume bound (n+1)ⁿ/n! for a convex body whose centroid is its only interior lattice point.",
    importance:
      "The theorem resolves a long-standing lattice-geometry conjecture and determines the exact extremal volume in all dimensions.",
    source: "https://cdn.openai.com/pdf/ten-proofs-oai.pdf",
    sourceLabel: "View manuscript collection",
    secondarySource:
      "https://github.com/openai/ten-proofs/blob/main/EhrhartVolumeInequality.lean",
    secondarySourceLabel: "View Lean certificate",
  },
  {
    title: "Multicolor Triangle Ramsey Numbers",
    field: "Extremal combinatorics",
    date: "August 1, 2026",
    isoDate: "2026-08-01",
    outcome: "Proved",
    status: "Full Lean certificate released",
    score: 4,
    ai: "Astra (internal OpenAI model)",
    summary:
      "Astra established a superexponential lower bound for multicolor triangle Ramsey numbers, proving Rₖ(3) = k^Θ(k).",
    importance:
      "The result resolves Erdős problem 183 and determines the correct growth scale of a classical Ramsey-theory quantity.",
    source: "https://cdn.openai.com/pdf/ten-proofs-oai.pdf",
    sourceLabel: "View manuscript collection",
    secondarySource:
      "https://github.com/openai/ten-proofs/blob/main/MulticolorTriangleRamsey.lean",
    secondarySourceLabel: "View Lean certificate",
  },
  {
    title: "Compactness and Degeneracy Conjectures",
    field: "Extremal graph theory",
    date: "August 1, 2026",
    isoDate: "2026-08-01",
    outcome: "Disproved",
    status: "Full Lean certificate released",
    score: 4,
    ai: "Astra (internal OpenAI model)",
    summary:
      "Astra produced separate bipartite graph constructions disproving the Erdős–Simonovits compactness conjecture and an Erdős degeneracy conjecture.",
    importance:
      "The constructions settle Erdős problems 146 and 180 and revise the expected structure of extremal bipartite graphs.",
    source: "https://cdn.openai.com/pdf/ten-proofs-oai.pdf",
    sourceLabel: "View manuscript collection",
    secondarySource:
      "https://github.com/openai/ten-proofs/blob/main/CompactnessAndDegeneracy.lean",
    secondarySourceLabel: "View Lean certificate",
  },
  {
    title: "The Maxwell Conjecture",
    field: "Mathematical physics",
    date: "July 29, 2026",
    isoDate: "2026-07-29",
    outcome: "Disproved",
    status: "Three-author verified + CAS-checked",
    score: 4,
    ai: "GPT-5.6 Sol",
    summary:
      "GPT-5.6 Sol suggested a five-charge construction whose electrostatic potential has at least 24 non-degenerate critical points, exceeding Maxwell’s proposed upper bound of 16.",
    importance:
      "The counterexample overturns an influential bound rooted in Maxwell’s 1873 treatise and advances the study of equilibria in point-charge fields. The authors verified the mathematics and checked computations with Mathematica and Maple.",
    source: "https://arxiv.org/abs/2607.27197",
    sourceLabel: "View preprint",
  },
  {
    title: "The 2-adic Absolute Galois Group",
    field: "Number theory",
    date: "July 28, 2026",
    isoDate: "2026-07-28",
    outcome: "Proved",
    status: "Two Lean formalizations + expert review",
    score: 3,
    ai: "GPT-5.5 Pro · Fable 5 · Opus 4.8",
    summary:
      "GPT-5.5 Pro found an explicit presentation of the absolute Galois group of the 2-adic numbers and produced the core proof; Fable 5, Opus 4.8 and GPT agents helped formalize it.",
    importance:
      "The result closes a roughly 40-year gap left after the odd-prime cases and supports explicit counting of 2-adic field extensions. Epoch AI rates it a solid, specialty-journal result.",
    source: "https://roed314.github.io/gq2/formalizations/",
    sourceLabel: "View proof and formalizations",
  },
  {
    title: "Crouzeix’s Conjecture",
    field: "Numerical linear algebra & operator theory",
    date: "July 27, 2026",
    isoDate: "2026-07-27",
    outcome: "Proved",
    status: "Expert-checked; independent proof and public Lean formalization",
    score: 5,
    ai: "GPT-5.6 Sol in ChatGPT Work",
    summary:
      "During an approximately 16-hour autonomous run, GPT-5.6 Sol produced the decisive theorem in Shanmu Jin’s proof that every matrix numerical range is a 2-spectral set. Jin checked and developed the argument into a manuscript.",
    importance:
      "The theorem resolves a central 22-year problem about functions of nonnormal matrices. Michel Crouzeix, Alex Townsend and Anne Greenbaum checked the proof, and a different independent proof appeared eight days later.",
    source:
      "https://www.preprints.org/manuscript/202607.1919",
    sourceLabel: "View original preprint",
    secondarySource:
      "https://alextownsend.net/essays/SIAMNews_CrouzeixConjecture.pdf",
    secondarySourceLabel: "View expert account and verification",
    addedDate: "August 17, 2026",
    addedIsoDate: "2026-08-17",
  },
  {
    title: "Feige’s Conjecture",
    field: "Probability",
    date: "July 27, 2026",
    isoDate: "2026-07-27",
    outcome: "Proved",
    status: "Two independent proofs; author-checked",
    score: 4,
    ai: "GPT-5.6 Pro · GPT-5.6 Sol",
    summary:
      "Two independent teams used GPT-5.6 to find proofs that independent nonnegative mean-one random variables satisfy the sharp 1/e lower-tail bound conjectured by Feige in 2006.",
    importance:
      "The conjecture has broad links to probability, randomized algorithms and extremal combinatorics. The simultaneous, independently written proofs substantially strengthen confidence in the result.",
    source: "https://arxiv.org/abs/2607.23980",
    sourceLabel: "View first proof",
    secondarySource: "https://arxiv.org/abs/2607.24528",
    secondarySourceLabel: "View independent proof",
  },
  {
    title: "Two-copy Distillability of Werner States",
    field: "Quantum information",
    date: "July 27, 2026",
    isoDate: "2026-07-27",
    outcome: "Proved",
    status: "Three independent proofs; human-checked",
    score: 4,
    ai: "GPT-5.6 Sol · Fable 5 · Opus 4.8",
    summary:
      "AI helped derive a sharp matrix inequality proving that a Werner state is two-copy distillable exactly when it is already one-copy distillable, resolving a longstanding test case.",
    importance:
      "The result settles Problem 5 from a prominent list of five open quantum-information problems. Three groups independently reached the same threshold, although the unrestricted many-copy problem remains open.",
    source: "https://arxiv.org/abs/2607.24479",
  },
  {
    title: "The Sharp Thin-Shell Inequality",
    field: "Convex geometry & probability",
    date: "July 25, 2026",
    isoDate: "2026-07-25",
    outcome: "Proved",
    status: "Verified and revised by two expert authors",
    score: 4,
    ai: "GPT-5.6 Pro",
    summary:
      "GPT-5.6 Pro found the initial argument proving the optimal variance bound Var(|X|²) ≤ 8n for isotropic log-concave random vectors, including the equality case.",
    importance:
      "The result determines the sharp universal constant in a central high-dimensional concentration theorem and identifies the extremal distributions and convex bodies.",
    source: "https://arxiv.org/abs/2607.23307",
  },
  {
    title: "The Jacobian Conjecture",
    field: "Algebraic geometry",
    date: "July 20, 2026",
    isoDate: "2026-07-20",
    outcome: "Disproved",
    status: "Lean-verified; reviewed and merged",
    score: 5,
    ai: "Fable · Ulam AI",
    summary:
      "An explicit polynomial map in three variables has a constant, non-zero Jacobian determinant but is not invertible—exactly the counterexample the 1939 conjecture said could not exist.",
    importance:
      "One of algebraic geometry’s classic open problems. The Lean proof of the intended counterexample was reviewed, passed all repository checks and was merged into Google DeepMind’s Formal Conjectures on July 26.",
    source:
      "https://github.com/google-deepmind/formal-conjectures/pull/4474",
    sourceLabel: "View merged Lean proof",
  },
  {
    title: "Feige’s Hypergraph Moore Bound Conjecture",
    field: "Combinatorics",
    date: "July 17, 2026",
    isoDate: "2026-07-17",
    outcome: "Proved",
    status: "Five-author checked + expert feedback",
    score: 4,
    ai: "GPT-5.6 Sol · GPT-5.5 Pro · Fable 5 · Opus 4.8",
    summary:
      "GPT-5.6 Sol found the core polynomial-method idea behind a proof of Feige’s 2008 hypergraph Moore bound for every uniformity k ≥ 3, removing the remaining polylogarithmic losses.",
    importance:
      "The conjecture governs short even covers in sparse hypergraphs and has consequences across average-case complexity, coding theory and algorithms.",
    source: "https://arxiv.org/abs/2607.14068",
  },
  {
    title:
      "Oracle Complexity of Derivative-Free Convex Optimization",
    field: "Optimization & complexity",
    date: "July 14, 2026",
    isoDate: "2026-07-14",
    outcome: "Proved",
    status: "Lean-verified + human-reviewed",
    score: 4,
    ai: "GPT-5.6 Sol Pro",
    summary:
      "AI produced a near-quadratic lower bound for minimizing convex Lipschitz functions using exact function values, closing a complexity gap dating to 1996 up to logarithmic factors.",
    importance:
      "The result establishes that a classic value-only optimization method is essentially optimal. The core argument was checked in Lean and reviewed by the author.",
    source: "https://arxiv.org/abs/2607.13335",
  },
  {
    title: "The Cycle Double Cover Conjecture",
    field: "Graph theory",
    date: "July 10, 2026",
    isoDate: "2026-07-10",
    outcome: "Proved",
    status: "Independent expert exposition",
    score: 5,
    ai: "GPT-5.6 Sol Ultra · 64-agent run",
    summary:
      "AI found a short proof that every finite bridgeless undirected graph has a collection of cycles covering every edge exactly twice.",
    importance:
      "A major graph-theory conjecture open for roughly half a century. Graph theorist Sang-il Oum independently rewrote and presented the proof.",
    source: "https://arxiv.org/abs/2607.16356",
  },
  {
    title: "The da Silva Machado–Seade Conjecture",
    field: "Singularity theory",
    date: "June 29, 2026",
    isoDate: "2026-06-29",
    outcome: "Proved",
    status: "Human-verified",
    score: 3,
    ai: "Rethlas",
    summary:
      "Rethlas generated a self-contained proof characterising weighted homogeneous isolated hypersurface singularities through logarithmic vector fields.",
    importance:
      "A genuine research result in complex geometry. An existing theorem was later found to shorten a central part of the argument.",
    source: "https://arxiv.org/abs/2606.29891",
  },
  {
    title: "The Near-Quadratic Elekes–Rónyai Conjecture",
    field: "Additive combinatorics",
    date: "June 15, 2026",
    isoDate: "2026-06-15",
    outcome: "Disproved",
    status: "Human-verified",
    score: 4,
    ai: "ChatGPT 5.5 Pro + Rethlas",
    summary:
      "AI found a fixed, non-special quadratic polynomial and arbitrarily large finite sets whose image grows more slowly than conjectured.",
    importance:
      "The result changes the expected bound in an active research area, though its reach is narrower than that of the major classical conjectures.",
    source: "https://arxiv.org/abs/2606.16738",
  },
  {
    title: "9 Erdős Problems and 44 OEIS Conjectures",
    field: "Formal mathematics",
    date: "May 21, 2026",
    isoDate: "2026-05-21",
    outcome: "Proved",
    status: "Formally verified",
    score: 4,
    ai: "AI agent + Lean",
    summary:
      "An agent resolved nine open problems from the Erdős collection and 44 conjectures associated with integer sequences. The proofs were machine-checked in Lean.",
    importance:
      "Not one monumental result, but the strongest large-scale demonstration yet that AI can resolve open problems with formal guarantees.",
    source: "https://arxiv.org/abs/2605.22763",
  },
  {
    title: "Erdős’s Unit Distance Conjecture",
    field: "Discrete geometry",
    date: "May 20, 2026",
    isoDate: "2026-05-20",
    outcome: "Disproved",
    status: "Human-verified",
    score: 5,
    ai: "Internal OpenAI system",
    summary:
      "The AI system found planar point sets with more unit distances than Erdős’s proposed upper bound. The argument uses towers of number fields.",
    importance:
      "A famous problem dating to 1946 and a central question in combinatorial geometry. Nine leading mathematicians reviewed and rewrote the proof.",
    source: "https://arxiv.org/abs/2605.20695",
  },
  {
    title: "Erdős Problem on Random Subset Sums",
    field: "Additive combinatorics",
    date: "February 6, 2026",
    isoDate: "2026-02-06",
    outcome: "Disproved",
    status: "Human-verified",
    score: 3,
    ai: "ChatGPT 5.2 Pro",
    summary:
      "An initial AI construction contained a serious flaw. A separate AI session found the error and repaired the argument with a valid counterexample.",
    importance:
      "A specialised Erdős problem, but an instructive example of separate AI roles proposing, criticising and repairing a research proof.",
    source: "https://arxiv.org/abs/2602.05768",
  },
];

const emergingResults: Result[] = [
  {
    title: "Jantzen Conjecture for Graded Affine Hecke Algebras",
    field: "Representation theory, Hecke algebras & intersection cohomology",
    date: "September 3, 2026",
    isoDate: "2026-09-03",
    outcome: "Proved",
    status: "Author-checked preprint; independent specialist review pending",
    score: 4,
    ai: "ChatGPT for proof exploration, with the author checking the resulting arguments",
    summary:
      "The paper proves the Jantzen conjecture for standard modules of equal-parameter graded affine Hecke algebras with real central character in the dominant deformation direction. It shows that every Jantzen layer is semisimple and identifies its multiplicities with local intersection cohomology.",
    importance:
      "The result supplies a full geometric description of a fundamental filtration in affine-Hecke representation theory and transfers to affine Hecke algebras at real central character. The manuscript discloses AI-led proof exploration, but it is new and not yet independently checked.",
    source: "https://arxiv.org/abs/2609.03651",
    sourceLabel: "View preprint and AI-assistance disclosure",
    addedDate: "September 4, 2026",
    addedIsoDate: "2026-09-04",
  },
  {
    title: "No Ellipticity-Only Interior W¹,¹ Estimate in Dimension Three",
    field: "Elliptic partial differential equations & regularity theory",
    date: "August 13, 2026",
    isoDate: "2026-08-13",
    outcome: "Disproved",
    status: "All arguments checked and rewritten by the authors; independent review pending",
    score: 4,
    ai: "ChatGPT 5.6 Sol for the key construction strategies across a series of research chats",
    summary:
      "The authors construct smooth uniformly elliptic three-dimensional equations with uniformly bounded solutions and common boundary data whose gradient L¹ norms diverge. This rules out any interior W¹,p estimate depending only on ellipticity for every p at least one and yields a measurable-coefficient limit outside local bounded variation.",
    importance:
      "The counterexample resolves a question of Nadirashvili, Tkachev and Vlăduţ and sharply separates the three-dimensional theory from stronger two-dimensional regularity. The AI supplied the key strategy, but the natural-language proof still awaits outside scrutiny.",
    source: "https://arxiv.org/abs/2608.13380",
    sourceLabel: "View preprint and detailed AI-contribution statement",
    addedDate: "September 4, 2026",
    addedIsoDate: "2026-09-04",
  },
  {
    title: "Topological Invariance of Unibranch Motivic Superpolynomials",
    field: "Algebraic geometry, quantum algebra & knot invariants",
    date: "July 28, 2026",
    isoDate: "2026-07-28",
    outcome: "Proved",
    status: "Expanded author manuscript; independent verification pending",
    score: 3,
    ai: "ChatGPT as a stated collaborator in proving the topological-invariance result",
    summary:
      "Within a broader theory connecting motivic superpolynomials of plane-curve singularities to instanton-slice superpolynomials, the revised paper proves that the unibranch motivic superpolynomials are topological invariants. The manuscript also establishes a mixed-characteristic conjecture and new instanton-sum formulas.",
    importance:
      "Topological invariance is the foundation needed for these algebraic constructions to define genuine singularity and knot invariants. The author explicitly credits ChatGPT in the proof, but the 106-page revision contains several adjacent conjectural claims and has not yet received independent checking.",
    source: "https://arxiv.org/abs/2607.25666",
    sourceLabel: "View revised manuscript and AI-attribution",
    addedDate: "September 4, 2026",
    addedIsoDate: "2026-09-04",
  },
  {
    title: "Tight 4/3 Correlation-Gap Bound for Four Random Elements",
    field: "Probability, operations research & computer-assisted proof",
    date: "September 2, 2026",
    isoDate: "2026-09-02",
    outcome: "Proved",
    status: "Author-checked computational certificate; independent review pending",
    score: 3,
    ai: "GPT-5.6 and Fable 5 for the cone-certificate and Bernstein-representation strategy",
    summary:
      "The paper proves that 4/3 is the exact pairwise-independent correlation-gap bound for monotone submodular functions on four elements, resolving the only dimension left open after the five-element counterexample. The proof reduces 3,008 possible optimal vertices to 183 symmetry orbits and verifies 2,745 Bernstein coefficient systems.",
    importance:
      "Together with the earlier AI-found counterexample and the paper's separate asymptotic construction, this completes the dimension boundary: 4/3 is tight through n=4, fails from n=5 onward, and the worst-case gap approaches e/(e-1). The decisive n=4 strategy came from a human–AI workflow, but the new preprint still awaits outside scrutiny.",
    source: "https://arxiv.org/abs/2609.02659",
    sourceLabel: "View proof, AI-method declaration and certificate details",
    addedDate: "September 3, 2026",
    addedIsoDate: "2026-09-03",
  },
  {
    title: "Lipshitz–Sarkar Refinement Distinguishes a Knot From Its Mirror",
    field: "Geometric topology, knot theory & computer-assisted proof",
    date: "September 1, 2026",
    isoDate: "2026-09-01",
    outcome: "Demonstrated",
    status: "Exact reproduction certificate released; independent review pending",
    score: 3,
    ai: "ChatGPT 5.6 Sol Pro for construction, census search and computations",
    summary:
      "The paper answers Lipshitz and Sarkar's ICM 2018 Question 2 affirmatively. The prime knot 17nh_0009090 and its mirror have identical integral Khovanov homology in every bidegree, including torsion, yet a second Steenrod square has rank one for the knot and rank zero for its mirror, so their Khovanov stable homotopy types differ.",
    importance:
      "This gives the first claimed example showing that the homotopy-theoretic refinement detects mirror reflection when ordinary Khovanov homology cannot. The preprint records the exact census identity, assertion-enabled commands, file fingerprints and independent mirror computation, but the new result has not yet received outside specialist scrutiny.",
    source: "https://arxiv.org/abs/2609.00976",
    sourceLabel: "View preprint, proof certificate and reproduction commands",
    addedDate: "September 2, 2026",
    addedIsoDate: "2026-09-02",
  },
  {
    title: "Stable Forking Conjecture",
    field: "Model theory & mathematical logic",
    date: "August 31, 2026",
    isoDate: "2026-08-31",
    outcome: "Disproved",
    status: "Authors proved and checked the counterexample; independent review pending",
    score: 5,
    ai: "ChatGPT 5.6 Sol for the decisive counterexample construction",
    summary:
      "The paper constructs a simple theory in which forking is not witnessed by any stable formula, disproving the stable forking conjecture posed by Hart, Kim and Pillay in 1996. The counterexample is the theory of an infinite-dimensional vector space over the division ring of fractions of the quantum graph algebra of the random graph.",
    importance:
      "Stable forking was one of the most prominent open problems about the boundary between stability and simplicity in model theory. The authors say GPT-5.6 Sol generated the construction after constrained prompting; they then wrote and checked all proofs themselves, but the 21-page preprint has not yet been independently scrutinized.",
    source: "https://arxiv.org/abs/2609.00436",
    sourceLabel: "View preprint and detailed AI-contribution statement",
    addedDate: "September 2, 2026",
    addedIsoDate: "2026-09-02",
  },
  {
    title: "Conjecture 4.6 on Truncated Rings of Number-Theoretic Functions",
    field: "Commutative algebra, homological algebra & sieve theory",
    date: "August 30, 2026",
    isoDate: "2026-08-30",
    outcome: "Proved",
    status: "Author-checked preprint with independent computations; broader review pending",
    score: 2,
    ai: "Claude (Anthropic)",
    summary:
      "Claude and the author identified the minimal-generator counts C(n,v) with Legendre's sifting function. The identity proves the precise reduced Poincare-Betti-series shape conjectured in 2000, and also yields sharp asymptotics and corrections to the earlier paper.",
    importance:
      "This closes a 26-year specialist conjecture and connects a homological invariant directly to classical sieve theory. The author independently recomputed every numerical claim, but the natural-language proof has not yet received substantial external scrutiny.",
    source: "https://arxiv.org/abs/2608.29555",
    sourceLabel: "View preprint, disclosure and supporting files",
    addedDate: "September 1, 2026",
    addedIsoDate: "2026-09-01",
  },
  {
    title: "Primitive-Preserving Endomorphisms of Free Metabelian Groups",
    field: "Combinatorial group theory",
    date: "August 29, 2026",
    isoDate: "2026-08-29",
    outcome: "Proved",
    status: "Authors checked every argument; independent review pending",
    score: 2,
    ai: "Codex with ChatGPT 5.6 Sol",
    summary:
      "Kourovka Notebook Problem 14.85 asked whether an endomorphism of a finite-rank free metabelian group that preserves every primitive element must be an automorphism. The answer is yes; AI supplied the Fox-calculus and finite-field obstruction strategy.",
    importance:
      "The theorem resolves the single-element version left open after stronger variants were known. It is a specialist structural result and currently has only author verification.",
    source: "https://arxiv.org/abs/2608.29219",
    sourceLabel: "View problem statement, proof and AI workflow",
    addedDate: "September 1, 2026",
    addedIsoDate: "2026-09-01",
  },
  {
    title: "Equal Distributions in Free Metabelian Groups",
    field: "Combinatorial and profinite group theory",
    date: "August 29, 2026",
    isoDate: "2026-08-29",
    outcome: "Disproved",
    status: "Explicit author-checked counterexample; independent review pending",
    score: 2,
    ai: "Codex with ChatGPT 5.6 Sol",
    summary:
      "Kourovka Notebook Problem 19.94 asked whether two free-metabelian elements have identical value distributions on every finite metabelian group exactly when an automorphism relates them. AI selected the problem and constructed two explicit rank-two elements with the same distributions but different automorphism orbits.",
    importance:
      "The counterexample separates finite-quotient statistics from ordinary automorphism equivalence. Its formulas are explicit, but the supporting profinite argument has not yet been independently checked.",
    source: "https://arxiv.org/abs/2608.29219",
    sourceLabel: "View explicit elements and proof",
    addedDate: "September 1, 2026",
    addedIsoDate: "2026-09-01",
  },
  {
    title: "Derived Subgroups as Frattini Subgroups",
    field: "Finite p-groups & computational algebra",
    date: "August 29, 2026",
    isoDate: "2026-08-29",
    outcome: "Disproved",
    status: "Exact GAP witness checked by the authors; independent review pending",
    score: 2,
    ai: "Codex with ChatGPT 5.6 Sol",
    summary:
      "Kourovka Notebook Problem 16.11 asked whether every derived subgroup of a finite p-group can occur as the Frattini subgroup of another finite p-group. The answer is no: the derived subgroup of SmallGroup(256,511) is the known exceptional group 32/40, which cannot be any such Frattini subgroup.",
    importance:
      "The result closes a concrete realization question with a short catalogue-based obstruction. The GAP transcript is reproducible, though the literature identification and argument still await outside scrutiny.",
    source: "https://arxiv.org/abs/2608.29219",
    sourceLabel: "View witness, GAP transcript and proof",
    addedDate: "September 1, 2026",
    addedIsoDate: "2026-09-01",
  },
  {
    title: "Nilpotent Camina Groups of Unbounded Class",
    field: "Infinite group theory & Lie methods",
    date: "August 29, 2026",
    isoDate: "2026-08-29",
    outcome: "Disproved",
    status: "Authors checked the construction; independent review pending",
    score: 3,
    ai: "Codex with ChatGPT 5.6 Sol",
    summary:
      "Kourovka Notebook Problem 17.47 asked whether nilpotent Camina groups have bounded nilpotency class once finiteness is dropped. AI constructed, via differential fields and the BCH correspondence, a Camina group of every class c at least two, so no bound exists.",
    importance:
      "The construction sharply contrasts the finite theorem, where class is at most three, and settles the unrestricted question in every class. It remains a new author-checked proof.",
    source: "https://arxiv.org/abs/2608.29219",
    sourceLabel: "View construction and proof",
    addedDate: "September 1, 2026",
    addedIsoDate: "2026-09-01",
  },
  {
    title: "Minimal T-Systems for Groups With Negative Immersions",
    field: "Geometric and combinatorial group theory",
    date: "August 29, 2026",
    isoDate: "2026-08-29",
    outcome: "Disproved",
    status: "Explicit author-checked family; independent review pending",
    score: 3,
    ai: "Codex with ChatGPT 5.6 Sol",
    summary:
      "Question 2.8.14 in Louder and Wilton's problem list asked whether a one-relator complex with negative immersions has a unique minimal T-system. AI-driven searches led to three-generated, two-free one-relator groups with arbitrarily many distinct minimal generating-triple T-systems.",
    importance:
      "The family gives an arbitrarily large failure of uniqueness while retaining uniform negative immersions. The invariant and parametrized construction are explicit but not yet independently reviewed.",
    source: "https://arxiv.org/abs/2608.29219",
    sourceLabel: "View family and distinguishing invariant",
    addedDate: "September 1, 2026",
    addedIsoDate: "2026-09-01",
  },
  {
    title: "Word-Defined Group Laws on Free Nilpotent Groups",
    field: "Combinatorial group theory",
    date: "August 29, 2026",
    isoDate: "2026-08-29",
    outcome: "Proved",
    status: "Authors checked the proof; independent review pending",
    score: 2,
    ai: "Claude Opus 5",
    summary:
      "A 2015 open problem asked which reduced words define a group operation on every finitely generated free nilpotent group. Claude found a proof, later shortened using Hanna Neumann's theorem: only the ordinary and opposite products, ab and ba, work.",
    importance:
      "The result gives a complete classification for a narrowly focused universal word-law problem. The final proof is concise and classical in style, but external checking is still pending.",
    source: "https://arxiv.org/abs/2608.29219",
    sourceLabel: "View classification and proof",
    addedDate: "September 1, 2026",
    addedIsoDate: "2026-09-01",
  },
  {
    title: "Stable Representations of Torsion-Free Nilpotent Groups",
    field: "Representation theory & nilpotent groups",
    date: "August 29, 2026",
    isoDate: "2026-08-29",
    outcome: "Proved",
    status: "Authors checked the proof; independent review pending",
    score: 2,
    ai: "Codex with ChatGPT 5.6 Sol",
    summary:
      "Plotkin's 1977 Problem 4.3.5 asked whether a torsion-free nilpotent group of class n−1 has a faithful n-step-stable representation whose restriction to any abelian normal subgroup is two-step stable. AI developed an affirmative construction over the rationals using Malcev and PBW methods.",
    importance:
      "The theorem resolves a nearly 50-year-old specialist representation problem. Its age is notable, although the result currently depends on one author-checked manuscript.",
    source: "https://arxiv.org/abs/2608.29219",
    sourceLabel: "View construction and proof",
    addedDate: "September 1, 2026",
    addedIsoDate: "2026-09-01",
  },
  {
    title: "Cayley-Hamilton Analogue for Free Groups",
    field: "Combinatorial group theory",
    date: "August 29, 2026",
    isoDate: "2026-08-29",
    outcome: "Disproved",
    status: "Explicit author-checked rank-two counterexample; independent review pending",
    score: 2,
    ai: "Codex with ChatGPT 5.6 Sol",
    summary:
      "Kourovka Notebook Problem 17.32 asked whether n+1 successive automorphism iterates that generate a rank-n free group can always be shortened to the first n. ChatGPT found a rank-two counterexample: three iterates generate F2 while the first two map into a proper order-two subgroup of S3.",
    importance:
      "The small explicit witness decisively shows that the abelian Cayley-Hamilton phenomenon does not transfer to free groups. It is readily inspectable but not yet independently published or formalized.",
    source: "https://arxiv.org/abs/2608.29219",
    sourceLabel: "View explicit counterexample",
    addedDate: "September 1, 2026",
    addedIsoDate: "2026-09-01",
  },
  {
    title: "Full Group C*-Algebras Need Not Be Finite",
    field: "Operator algebras & geometric group theory",
    date: "August 28, 2026",
    isoDate: "2026-08-28",
    outcome: "Disproved",
    status: "Expert-commented author exposition; independent formal proof in progress",
    score: 3,
    ai: "ChatGPT 5.6 Sol",
    summary:
      "The open question asked whether every full group C*-algebra is finite. ChatGPT generated the key ideas showing that ascending HNN extensions of non-coHopfian property-(T) groups give counterexamples; the same framework produces explicit stably finite reduced group C*-algebras that are not MF.",
    importance:
      "This supplies concrete group-algebra counterexamples where earlier existence results were indirect. Several specialists commented on and strengthened the draft, but the announced Lean proof has not yet been released.",
    source: "https://arxiv.org/abs/2608.28772",
    sourceLabel: "View preprint, AI statement and expert acknowledgements",
    addedDate: "September 1, 2026",
    addedIsoDate: "2026-09-01",
  },
  {
    title: "Cao–Păun Rational-Quotient Numerical-Dimension Question",
    field: "Complex algebraic geometry & Kähler geometry",
    date: "August 27, 2026",
    isoDate: "2026-08-27",
    outcome: "Proved",
    status: "Single-author AI-assisted preprint; independent specialist review pending",
    score: 3,
    ai: "GPT-5.6 Plus Sol for proof exploration, consistency checks and technical development",
    summary:
      "For the rational quotient q: X ⇢ Q of a compact Kähler manifold, the paper proves that a pseudo-effective line bundle L embedded in a tensor power of the cotangent bundle satisfies ν(L, X) ≤ ν(K_Q, Q), answering Cao and Păun's Question 5.6. GPT helped develop many ideas and technical details in the key section on fibrations with rationally connected fibres.",
    importance:
      "The inequality extends a recent birational-geometric result beyond the case where the canonical bundle of X is pseudo-effective, and the accompanying descent theorem is claimed new even for projective manifolds. The AI contribution was material but author-supervised, and the new preprint has not yet received independent specialist scrutiny.",
    source: "https://arxiv.org/abs/2608.26916",
    sourceLabel: "View preprint and AI-contribution statement",
    addedDate: "August 29, 2026",
    addedIsoDate: "2026-08-29",
  },
  {
    title: "Every-Genus Hyperbolic Surfaces With Systole Constant 1",
    field: "Geometric topology & hyperbolic geometry",
    date: "August 27, 2026",
    isoDate: "2026-08-27",
    outcome: "Proved",
    status: "Author-checked single-author preprint; independent specialist review pending",
    score: 4,
    ai: "GPT-5.6 Sol under author direction",
    summary:
      "Starting from the author's constant-twist pants-decomposition approach, GPT-5.6 Sol developed the first complete proof that every sufficiently large genus g admits a closed hyperbolic surface with systole at least log g − 12 log log g.",
    importance:
      "This raises the best explicit every-genus asymptotic lower-bound constant from 2/9 to 1, matching what was previously known only along a subsequence of genera. The asymptotic maximum remains open, and the proof currently rests on one new preprint.",
    source: "https://arxiv.org/abs/2608.26660",
    sourceLabel: "View preprint and AI-use declaration",
    addedDate: "August 28, 2026",
    addedIsoDate: "2026-08-28",
  },
  {
    title: "Not Every Heyting Algebra Is a Topos Truth-Value Lattice",
    field: "Categorical logic & intuitionistic logic",
    date: "August 27, 2026",
    isoDate: "2026-08-27",
    outcome: "Disproved",
    status: "Two-author preprint; independent specialist review pending",
    score: 3,
    ai: "ChatGPT 5.6 Sol in mathematical-result development; exact contribution split not disclosed",
    summary:
      "The paper answers a long-standing categorical-logic question negatively by proving that the free Heyting algebra on two generators cannot occur as the lattice of subterminal objects of an elementary topos. The authors attribute the mathematical results, but not the writing, to work done with ChatGPT 5.6 Sol.",
    importance:
      "The result identifies concrete higher-order logical structure that is invisible at the level of an abstract Heyting algebra. Because the authors do not describe the AI-human division more precisely and no outside verification is yet available, the claim remains under review.",
    source: "https://arxiv.org/abs/2608.26874",
    sourceLabel: "View preprint and contribution statement",
    addedDate: "August 28, 2026",
    addedIsoDate: "2026-08-28",
  },
  {
    title: "Fröberg’s Conjecture for Quintics and Septics in Four Variables",
    field: "Commutative algebra & exact computation",
    date: "August 25, 2026",
    isoDate: "2026-08-25",
    outcome: "Proved",
    status: "Two-author preprint with exact verification programs and certificates; independent review pending",
    score: 3,
    ai: "GPT-5.6 Sol, Claude Fable 5 and Grok 4.6 in a generative-AI research workflow",
    summary:
      "The authors prove Fröberg's predicted Hilbert series for every number of equal-degree generators in four variables when the degree is 5 or 7. The AI workflow formulated ideas, conjectures and proof strategies, derived and checked intermediate steps, and constructed examples and exact certificates.",
    importance:
      "These are two complete new fixed-degree slices of a major open commutative-algebra conjecture, not a proof of the unrestricted conjecture. Public standard-library programs reconstruct every finite rank calculation, but the surrounding reduction still awaits independent specialist scrutiny.",
    source: "https://arxiv.org/abs/2608.24797",
    sourceLabel: "View preprint, disclosure and ancillary certificates",
    addedDate: "August 28, 2026",
    addedIsoDate: "2026-08-28",
  },
  {
    title: "Ancheta–Massey Linear Lossy-Compression Problem",
    field: "Information theory, coding theory & probability",
    date: "August 24, 2026",
    isoDate: "2026-08-24",
    outcome: "Proved",
    status: "Single-author preprint; independent specialist review pending",
    score: 3,
    ai: "GPT-5.6 Sol in an interactive, author-guided process",
    summary:
      "The new argument determines the entropy loss when a Bernoulli product measure is conditioned on an affine subspace, extending Ancheta's symmetric-source result to every bias p < 1/2 and answering a question posed by Massey in 1978.",
    importance:
      "The theorem closes a long-standing specialist question connecting source coding, entropy and finite-field geometry. The proof is public and author-checked, but currently appears only in one new preprint.",
    source: "https://arxiv.org/abs/2608.22837",
    sourceLabel: "View preprint",
    addedDate: "August 26, 2026",
    addedIsoDate: "2026-08-26",
  },
  {
    title: "cscK Yau–Tian–Donaldson Conjecture",
    field: "Algebraic & differential geometry",
    date: "August 19, 2026",
    isoDate: "2026-08-19",
    outcome: "Disproved",
    status: "79-page single-author preprint; independent specialist review pending",
    score: 5,
    ai: "GPT-5.6 Sol, Fable 5 and Danus",
    summary:
      "The manuscript constructs a smooth polarized projective fivefold that is K-polystable but admits no constant-scalar-curvature Kähler metric, providing a claimed counterexample to the broad cscK form of the Yau–Tian–Donaldson conjecture.",
    importance:
      "The conjecture is a central proposed bridge between algebraic stability and canonical metrics. The claim concerns the broad cscK formulation and does not overturn established special cases such as the Fano Kähler–Einstein theorem; its length and novelty make outside checking essential.",
    source: "https://arxiv.org/abs/2608.19301",
    sourceLabel: "View preprint and AI-usage statement",
    addedDate: "August 26, 2026",
    addedIsoDate: "2026-08-26",
  },
  {
    title: "Banach’s Isometric Conjecture — Remaining Real and Complex Cases",
    field: "Functional analysis, convex geometry & topology",
    date: "August 18, 2026",
    isoDate: "2026-08-18",
    outcome: "Proved",
    status: "Two new author-checked preprints; independent specialist review pending",
    score: 5,
    ai: "GPT-5.5 Pro, GPT-5.6 Pro and GPT-5.6 Sol under author direction",
    summary:
      "One paper proves the remaining odd-dimensional real case of Banach's 1932 isometric subspace conjecture. A second adapts its mechanism to settle the complex-field conjecture and a quaternionic counterpart, together completing the classical real and complex problem if the arguments withstand review.",
    importance:
      "This would close a 94-year-old foundational problem about when every fixed-dimensional subspace of a normed space must be Euclidean. The two papers are linked rather than independent confirmations, so the result remains under review.",
    source: "https://arxiv.org/abs/2608.13536",
    sourceLabel: "View real-case preprint",
    secondarySource: "https://arxiv.org/abs/2608.18257",
    secondarySourceLabel: "View complex and quaternionic extension",
    addedDate: "August 26, 2026",
    addedIsoDate: "2026-08-26",
  },
  {
    title: "Davies–Jenssen–Perkins–Roberts Independent-Set Conjecture",
    field: "Extremal graph theory & probabilistic combinatorics",
    date: "August 17, 2026",
    isoDate: "2026-08-17",
    outcome: "Disproved",
    status: "FAR artifact checked by the author team; independent scrutiny pending",
    score: 3,
    ai: "Find, Attempt, and Recommend (FAR) pipeline",
    summary:
      "FAR found the graph family C₅ □ K_{m,m}. Its independence-number-to-average-independent-set-size ratio tends to 24/13, below the conjectured limit 2, also refuting the related K_r-free variant.",
    importance:
      "The explicit family overturns a natural asymptotic conjecture in an active area. The construction is public and author-checked, but broader specialist review is still recent.",
    source: "https://arxiv.org/abs/2608.16977",
    sourceLabel: "View paper and reviewed counterexample",
    addedDate: "August 23, 2026",
    addedIsoDate: "2026-08-23",
  },
  {
    title: "Erdős–Straus Binomial-Divisibility Question",
    field: "Number theory & combinatorics",
    date: "August 17, 2026",
    isoDate: "2026-08-17",
    outcome: "Proved",
    status: "FAR artifact checked by the author team; independent scrutiny pending",
    score: 2,
    ai: "Find, Attempt, and Recommend (FAR) pipeline",
    summary:
      "For every fixed n ≥ 2, the FAR-generated argument proves that almost every integer m admits some 1 ≤ k ≤ m−n for which C(n+k,n) divides C(m+k,k): the set of such m has natural density 1.",
    importance:
      "This gives a complete density-one answer to a concrete Erdős–Straus question. It is a meaningful specialist result, though narrower in scope than the major conjectures tracked here.",
    source: "https://arxiv.org/abs/2608.16977",
    sourceLabel: "View paper and reviewed proof",
    addedDate: "August 23, 2026",
    addedIsoDate: "2026-08-23",
  },
  {
    title: "Binary Symmetric-Group Character Complexity",
    field: "Algebraic & computational complexity",
    date: "August 17, 2026",
    isoDate: "2026-08-17",
    outcome: "Proved",
    status: "FAR artifact checked by the author team; independent scrutiny pending",
    score: 3,
    ai: "Find, Attempt, and Recommend (FAR) pipeline",
    summary:
      "The FAR-generated proof establishes that computing binary-encoded irreducible symmetric-group character values is GapP-complete under polynomial-time many-one reductions, even when the partition has at most two parts.",
    importance:
      "The result settles a conjecture of Ikenmeyer, Pak and Panova and sharpens the complexity classification under a strong restriction. It remains a new author-reviewed preprint.",
    source: "https://arxiv.org/abs/2608.16977",
    sourceLabel: "View paper and reviewed proof",
    addedDate: "August 23, 2026",
    addedIsoDate: "2026-08-23",
  },
  {
    title: "Lund–Saraf–Wolf Finite-Field Line-Union Conjectures",
    field: "Finite geometry & incidence combinatorics",
    date: "August 17, 2026",
    isoDate: "2026-08-17",
    outcome: "Disproved",
    status: "FAR artifact checked by the author team; independent scrutiny pending",
    score: 3,
    ai: "Find, Attempt, and Recommend (FAR) pipeline",
    summary:
      "FAR constructed roughly half of the tangent lines to a paraboloid in F_q³. No plane contains too many selected lines, yet their union occupies only about half the points, refuting two proposed line-union bounds.",
    importance:
      "The construction rejects two finite-field incidence conjectures with a simple asymptotic obstruction. It does not resolve the stronger Nikodym conjecture, which remains open.",
    source: "https://arxiv.org/abs/2608.16977",
    sourceLabel: "View paper and reviewed counterexample",
    addedDate: "August 23, 2026",
    addedIsoDate: "2026-08-23",
  },
  {
    title: "Sharp Minimax Bounds for Bivariate LiNGAM",
    field: "Causal inference & statistical learning",
    date: "August 16, 2026",
    isoDate: "2026-08-16",
    outcome: "Proved",
    status: "Single-author preprint; independent review pending",
    score: 3,
    ai: "GPT-5.6 Sol (Codex Ultra)",
    summary:
      "GPT-5.6 Sol generated a sharp local minimax law for the samples needed to determine causal direction in bivariate LiNGAM, jointly quantifying weak effects, near-Gaussian noise and scale uncertainty.",
    importance:
      "The result turns qualitative identifiability into an exact sample-complexity characterization for a foundational causal model. The author checked and revised the proof, but it currently rests on one new preprint.",
    source: "https://arxiv.org/abs/2608.15840",
    sourceLabel: "View preprint",
    addedDate: "August 20, 2026",
    addedIsoDate: "2026-08-20",
  },
  {
    title: "Three-Block ADMM Convergence Counterexample",
    field: "Optimization algorithms & numerical analysis",
    date: "August 14, 2026",
    isoDate: "2026-08-14",
    outcome: "Disproved",
    status: "Exact rational certificates in a two-author preprint; independent review pending",
    score: 3,
    ai: "GPT-5.6 Sol in Codex · Kimi K3 in Kimi Code",
    summary:
      "GPT-5.6 Sol constructed a rational instance where direct three-block ADMM has a bounded nonconvergent orbit of period 66; exact checks verify the orbit. Kimi K3 independently found a different period-23 certificate.",
    importance:
      "The counterexamples close an unresolved convergence case for a landmark optimization method and provide exact, directly checkable objects. Their broader significance still awaits specialist scrutiny.",
    source: "https://arxiv.org/abs/2608.14396",
    sourceLabel: "View preprint and exact certificates",
    addedDate: "August 21, 2026",
    addedIsoDate: "2026-08-21",
  },
  {
    title: "Dense-Case Theorem for Seymour’s Second Neighborhood Conjecture",
    field: "Extremal graph theory & directed graphs",
    date: "August 12, 2026",
    isoDate: "2026-08-12",
    outcome: "Proved",
    status: "Author-verified single-author preprint; independent review pending",
    score: 3,
    ai: "OpenAI GPT-5 family · Anthropic Claude",
    summary:
      "GPT-5 models discovered a fixed-target capacity argument and its double-counting proof, establishing Seymour’s conjecture for every oriented graph with n ≤ 2δ+2. Claude models adversarially audited an intermediate draft.",
    importance:
      "This is meaningful partial progress on a prominent graph-theory conjecture and improves the known minimum possible order of a counterexample. The proof is short and author-checked, but external expert scrutiny is still pending.",
    source: "https://arxiv.org/abs/2608.11530",
    sourceLabel: "View preprint",
  },
  {
    title: "Lower Bound for Stepsize-Only Gradient Descent Acceleration",
    field: "Convex optimization & complexity",
    date: "August 11, 2026",
    isoDate: "2026-08-11",
    outcome: "Proved",
    status: "Two-author preprint; independent review pending",
    score: 3,
    ai: "GPT-5.6 Sol Pro",
    summary:
      "GPT-5.6 Sol Pro developed an Ω(T^-1.9319) last-iterate lower bound for gradient descent with predetermined nonnegative stepsizes, showing that stepsize schedules alone cannot attain the optimal O(T^-2) accelerated rate.",
    importance:
      "This sharply narrows the limits of acceleration without momentum and provides rigorous evidence against a tempting route to optimal convergence. The authors guided and checked the proof, but external review is pending.",
    source: "https://arxiv.org/abs/2608.10418",
    sourceLabel: "View preprint",
    addedDate: "August 20, 2026",
    addedIsoDate: "2026-08-20",
  },
  {
    title: "Tight Lower Bound for Stochastic Optimization With Bounded Noise",
    field: "Optimization theory & machine learning",
    date: "August 10, 2026",
    isoDate: "2026-08-10",
    outcome: "Proved",
    status: "Single-author preprint; independent review pending",
    score: 3,
    ai: "GPT-5.6 Sol (Codex Ultra)",
    summary:
      "GPT-5.6 Sol generated a sharp minimax lower bound for smooth nonconvex stochastic optimization when every gradient-oracle error is uniformly bounded, closing an open direction identified in 2023 for the one-query-per-sample model.",
    importance:
      "The theorem determines the optimal query-complexity scale under a stronger and practically relevant noise assumption. The author checked and revised the proof, but the result currently rests on one new preprint.",
    source: "https://arxiv.org/abs/2608.09004",
    sourceLabel: "View preprint",
    addedDate: "August 15, 2026",
    addedIsoDate: "2026-08-15",
  },
  {
    title: "Row Pathwidth of Complete Binary Trees",
    field: "Structural graph theory",
    date: "August 10, 2026",
    isoDate: "2026-08-10",
    outcome: "Proved",
    status: "Two-author preprint; independent review pending",
    score: 2,
    ai: "GPT-5.6 Sol Pro",
    summary:
      "The paper proves that the row pathwidth of a complete binary tree of height h is of order h, resolving a 2022 problem by improving the previous lower bound from order h/log h to the optimal order.",
    importance:
      "This closes a specialist problem in graph product-structure theory with a short AI-found proof. The authors provide a complete manuscript, but no independent check or formal certificate is yet public.",
    source: "https://arxiv.org/abs/2608.09495",
    sourceLabel: "View preprint",
    addedDate: "August 15, 2026",
    addedIsoDate: "2026-08-15",
  },
  {
    title: "Amenability Is Independent of the Base Field",
    field: "Rings, algebras & functional analysis",
    date: "August 8, 2026",
    isoDate: "2026-08-08",
    outcome: "Proved",
    status: "Single-author preprint; independent review pending",
    score: 2,
    ai: "ChatGPT 5.6 Sol",
    summary:
      "The paper proves that amenability of an associative algebra or module does not depend on its ground field, answering a question raised by Yves Cornulier. A significant part of the argument came from ChatGPT 5.6 Sol.",
    importance:
      "The result settles a precise specialist question and clarifies an invariant used in algebra and analysis. It is currently supported only by the author's new preprint.",
    source: "https://arxiv.org/abs/2608.08161",
    sourceLabel: "View preprint",
    addedDate: "August 15, 2026",
    addedIsoDate: "2026-08-15",
  },
  {
    title: "Anstee–Sali Conjecture",
    field: "Extremal set theory & forbidden configurations",
    date: "August 7, 2026",
    isoDate: "2026-08-07",
    outcome: "Disproved",
    status: "Author-verified single-author preprint; independent review pending",
    score: 4,
    ai: "GPT-5.6 Sol",
    summary:
      "GPT-5.6 Sol found a six-vertex forbidden configuration for which the conjecture predicts cubic growth, while a random-alteration construction gives growth of order at least m^(10/3), disproving the proposed universal exponent formula.",
    importance:
      "The Anstee–Sali conjecture is a central structural prediction in forbidden-configuration theory. The manuscript provides an explicit certificate and a short probabilistic argument, but currently has only the author's verification.",
    source: "https://arxiv.org/abs/2608.07646",
    sourceLabel: "View preprint",
  },
  {
    title: "Facial Distance Patterns in Planar Graphs",
    field: "Planar graph algorithms & metric compression",
    date: "August 7, 2026",
    isoDate: "2026-08-07",
    outcome: "Proved",
    status: "Three-author preprint; independent review pending",
    score: 3,
    ai: "GPT-5.6 Sol",
    summary:
      "GPT-5.6 Sol found a proof that the number of facial distance patterns in an unweighted planar graph is O(k²), matching the known lower bound and settling a 2022 conjecture. The bound also improves several planar-graph algorithms.",
    importance:
      "The sharp bound closes a concrete conjecture and yields immediate consequences for metric compression, distance oracles and diameter algorithms. The proof is public and author-checked, but broader scrutiny is pending.",
    source: "https://arxiv.org/abs/2608.07187",
    sourceLabel: "View preprint",
    addedDate: "August 15, 2026",
    addedIsoDate: "2026-08-15",
  },
  {
    title: "Pessimal Elections for Approximately Dominating Sets",
    field: "Social choice & combinatorics",
    date: "August 7, 2026",
    isoDate: "2026-08-07",
    outcome: "Proved",
    status: "Three-author preprint; independent review pending",
    score: 2,
    ai: "GPT-5.6 Sol Ultra",
    summary:
      "An AI-found construction proves that committees of order 1/ε² are sometimes necessary to prevent a losing candidate from beating every selected winner by a 1/2+ε majority, matching the known upper bound up to constants.",
    importance:
      "The construction determines the correct asymptotic size of approximately dominating committees in elections. It is a focused theoretical result whose new preprint still awaits independent review.",
    source: "https://arxiv.org/abs/2608.06872",
    sourceLabel: "View preprint",
    addedDate: "August 15, 2026",
    addedIsoDate: "2026-08-15",
  },
  {
    title: "Graphical Lie Algebra Conjecture",
    field: "Lie theory & graph methods",
    date: "August 6, 2026",
    isoDate: "2026-08-06",
    outcome: "Disproved",
    status: "Public counterexample claim; no manuscript or independent review yet",
    score: 1,
    ai: "GPT-5.6 Sol",
    summary:
      "A public report says GPT-5.6 Sol found a counterexample to a newly proposed graphical Lie algebra conjecture, roughly 36 hours after the conjecture was formulated.",
    importance:
      "The claim illustrates how quickly AI can test fresh specialist conjectures, but the conjecture is very new and neither its full statement nor the counterexample has yet been released in a citable manuscript.",
    source: "https://x.com/bryancsk/status/2085225261520306679",
    sourceLabel: "View public claim",
  },
  {
    title: "Absolutely Maximally Entangled States: Five New Parameter Cases",
    field: "Quantum information & coding theory",
    date: "August 6, 2026",
    isoDate: "2026-08-06",
    outcome: "Proved",
    status: "Exact author certification; independent review pending",
    score: 4,
    ai: "Claude Fable 5 · ChatGPT 5.6 Sol",
    summary:
      "AI-assisted searches produced explicit AME(12,5), AME(18,11), AME(18,13), AME(17,11) and AME(17,13) states through new Hermitian self-dual MDS codes. AME(12,5) was an explicitly open parameter case.",
    importance:
      "The constructions close several gaps in the AME existence table and connect directly to quantum error-correcting codes. The authors report exact finite-field and complete minor checks, but the new preprint has not yet received independent scrutiny.",
    source: "https://arxiv.org/abs/2608.05781",
    sourceLabel: "View preprint",
  },
  {
    title: "Fair and Efficient Balanced Allocations",
    field: "Algorithmic game theory & fair division",
    date: "August 6, 2026",
    isoDate: "2026-08-06",
    outcome: "Proved",
    status: "Author-verified preprint; independent review pending",
    score: 4,
    ai: "GPT-5.6 Sol · Claude Fable 5",
    summary:
      "For arbitrary additive valuations, the paper proves the existence of balanced allocations that are envy-free up to one good and fractionally Pareto optimal, removing restrictions from the previous 2026 result.",
    importance:
      "This establishes a general compatibility theorem between balance, fairness and efficiency for indivisible goods. All proofs were obtained with GPT-5.6 Sol and checked by three authors, but external review is still pending.",
    source: "https://arxiv.org/abs/2608.06325",
    sourceLabel: "View preprint",
  },
  {
    title: "Ji–Li–Wang Chip-Firing Conjecture",
    field: "Combinatorics & dynamical systems",
    date: "August 4, 2026",
    isoDate: "2026-08-04",
    outcome: "Proved",
    status: "New author preprint; independent review pending",
    score: 3,
    ai: "GPT-5.6 Sol",
    summary:
      "The paper proves that every parallel chip-firing game with 2|E|−|V|<|σ|<2|E| has period two, establishing the conjectured middle rung of the devil's staircase for all graphs.",
    importance:
      "It unifies earlier results for several major graph families, but remains a short new preprint without independent or formal verification.",
    source: "https://arxiv.org/abs/2608.04153",
    sourceLabel: "View preprint",
  },
  {
    title: "Large-Width Lattice Polytope Question",
    field: "Discrete geometry & combinatorics",
    date: "August 4, 2026",
    isoDate: "2026-08-04",
    outcome: "Proved",
    status: "Single-author preprint; independent review pending",
    score: 3,
    ai: "ChatGPT 5.6 Sol",
    summary:
      "The paper proves that, in fixed dimension, sufficiently large lattice width forces the Ehrhart h*-polynomial to be real-rooted and hence strictly log-concave and unimodal, answering a question of Averkov, Hofscheier and Nill.",
    importance:
      "This rules out arbitrarily wide counterexample families and gives a clean structural theorem, though it is currently only a five-page author preprint.",
    source: "https://arxiv.org/abs/2608.03635",
    sourceLabel: "View preprint",
  },
  {
    title: "Finite Generation for klt Generalized Pairs",
    field: "Algebraic geometry",
    date: "August 4, 2026",
    isoDate: "2026-08-04",
    outcome: "Disproved",
    status: "Human-verified AI-generated preprint; independent review pending",
    score: 4,
    ai: "GPT-5.6 Sol Ultra · Fable 5 · Danus",
    summary:
      "A projective klt generalized pair is constructed whose generalized log canonical ring is not finitely generated, giving a negative answer to the proposed finite-generation extension.",
    importance:
      "Finite generation is central to the minimal model program, and an explicit counterexample sharply marks the boundary of the theory. The authors report human verification, but external scrutiny is still limited.",
    source: "https://arxiv.org/abs/2608.03258",
    sourceLabel: "View preprint",
  },
  {
    title: "Perfectly Complete Many-Round Key Agreement in the QROM",
    field: "Quantum cryptography",
    date: "August 4, 2026",
    isoDate: "2026-08-04",
    outcome: "Disproved",
    status: "Author-verified preprint; independent review pending",
    score: 4,
    ai: "GPT-5.6 Sol Ultra",
    summary:
      "A one-shot AI proof rules out black-box perfectly complete quantum key agreement from quantum-secure one-way functions in the Boolean-output random-oracle model, with an attack bound independent of the number of rounds.",
    importance:
      "The theorem removes both a two-round restriction and reliance on an earlier unproved compatibility conjecture, but applies to perfect completeness and has not yet received independent review.",
    source: "https://arxiv.org/abs/2608.03824",
    sourceLabel: "View preprint",
  },
  {
    title: "Staton's Havel–Hakimi Residue Conjecture",
    field: "Graph theory & analytic number theory",
    date: "August 3, 2026",
    isoDate: "2026-08-03",
    outcome: "Proved",
    status: "Single-author preprint; independent review pending",
    score: 3,
    ai: "Theo-Conjecture advisor-supervised AI loop",
    summary:
      "The paper proves Staton's asymptotic formula for the Havel–Hakimi residue of common-divisor graphs and determines the next asymptotic term.",
    importance:
      "It resolves a genuine Graffiti/Erdős-era conjecture linking degree-sequence algorithms with prime-number asymptotics, but currently rests on one new preprint.",
    source: "https://arxiv.org/abs/2608.04040",
    sourceLabel: "View preprint",
  },
  {
    title: "Two Product-Structure Conjectures in Extremal Graph Theory",
    field: "Extremal graph theory",
    date: "August 3, 2026",
    isoDate: "2026-08-03",
    outcome: "Disproved",
    status: "Single-author preprint; independent review pending",
    score: 3,
    ai: "GPT-5.6 Sol",
    summary:
      "GPT-5.6 Sol found a finite forbidden family with a superlinear surplus over the Turán bound and extremal graphs without a nontrivial join decomposition, giving one counterexample to two product-structure conjectures.",
    importance:
      "The construction overturns two specialist conjectures about the structure and size of extremal graphs. The ten-page proof is public, but no independent verification or certificate has been released.",
    source: "https://arxiv.org/abs/2608.02115",
    sourceLabel: "View preprint",
  },
  {
    title: "Two-Terminal Network Reliability",
    field: "Randomized algorithms & network reliability",
    date: "August 3, 2026",
    isoDate: "2026-08-03",
    outcome: "Proved",
    status: "Three-author preprint; independent review pending",
    score: 4,
    ai: "GPT-5.6 Sol Ultra",
    summary:
      "The paper gives a fully polynomial-time randomized approximation scheme for two-terminal reliability on general directed and undirected graphs, answering a question explicitly open since at least 1994. GPT-5.6 Sol Ultra discovered the algorithm's key idea.",
    importance:
      "Two-terminal reliability is one of the foundational #P-complete network problems. A general FPRAS closes a long-standing approximation-complexity gap, but the 31-page proof has not yet received independent scrutiny.",
    source: "https://arxiv.org/abs/2608.02523",
    sourceLabel: "View preprint",
  },
  {
    title: "Equality Case of Ehrhart’s Volume Conjecture",
    field: "Convex geometry & lattice polytopes",
    date: "August 2, 2026",
    isoDate: "2026-08-02",
    outcome: "Proved",
    status: "Human-verified single-author preprint; independent review pending",
    score: 4,
    ai: "GPT-5.6 Sol · Claude Fable 5 · Danus",
    summary:
      "The paper characterizes every extremal body in the sharp Ehrhart volume bound as a unimodular image of the standard extremal simplex, resolving the equality case. Generative AI produced the main result with essential human strategic input.",
    importance:
      "The theorem completes the extremal characterization accompanying Astra's recent inequality proof. The author reports human verification and a revision without mathematical changes, but broader scrutiny is still limited.",
    source: "https://arxiv.org/abs/2608.01040",
    sourceLabel: "View revised preprint",
  },
  {
    title: "Kourovka Notebook Problem 21.142",
    field: "Finite group theory",
    date: "July 30, 2026",
    isoDate: "2026-07-30",
    outcome: "Disproved",
    status: "Internal verification only; blocking proof debts remain",
    score: 3,
    ai: "Albilich · GPT-5.6 Sol · CAS tools",
    summary:
      "Albilich produced a negative answer to whether every finite group embeds in a finite group invariably generated by elements of two fixed prime orders. Its advisor-enabled run assembled the only root-concluding proof route.",
    importance:
      "This is a notable long-horizon agent claim on a specialist open problem, but the public audit still records unresolved proof obligations and no independent or formal verification.",
    source: "https://arxiv.org/abs/2607.27705",
    sourceLabel: "View preprint",
  },
  {
    title: "Kourovka Notebook Problem 20.2",
    field: "Finite group theory",
    date: "July 30, 2026",
    isoDate: "2026-07-30",
    outcome: "Proved",
    status: "Internal proof ledger; one blocking enumeration remains",
    score: 2,
    ai: "Albilich · GPT-5.6 Sol · GAP",
    summary:
      "Albilich found the explicit witness PSL₂(7), answering whether a nonabelian simple group of Lie type can be totally 3-closed. Two separate runs reached the same witness through different proof routes.",
    importance:
      "The explicit witness is promising and was reproduced by two runs, but the public proof ledger still lists one blocking pair-coset enumeration; independent and formal verification are pending.",
    source: "https://arxiv.org/abs/2607.27705",
    sourceLabel: "View preprint",
  },
  {
    title: "The Lukic Conjecture",
    field: "Spectral theory & probability",
    date: "July 29, 2026",
    isoDate: "2026-07-29",
    outcome: "Disproved",
    status: "Single-author preprint; independent review pending",
    score: 3,
    ai: "GPT-5.6",
    summary:
      "GPT-5.6 found a two-frequency sequence that satisfies Lukic’s proposed localization conditions while its corresponding weighted entropy is minus infinity, giving a counterexample.",
    importance:
      "The result corrects a proposed characterization in the theory of orthogonal polynomials on the unit circle, but remains a new specialist preprint without independent verification.",
    source: "https://arxiv.org/abs/2607.26419",
  },
  {
    title: "Separable Jacobian Conjecture in Characteristic 2",
    field: "Algebraic geometry",
    date: "July 23, 2026",
    isoDate: "2026-07-23",
    outcome: "Disproved",
    status: "Author-verified new preprint",
    score: 3,
    ai: "ChatGPT 5.6 Sol",
    summary:
      "A new explicit polynomial endomorphism is claimed to disprove the separable formulation in characteristic 2. The named author reports checking the AI-assisted proof.",
    importance:
      "A technically meaningful extension of the rapidly developing Jacobian story, but it addresses a positive-characteristic refinement rather than the original conjecture.",
    source: "https://arxiv.org/abs/2607.20968",
  },
  {
    title: "The Dinitz–Garg–Goemans Cost Conjecture",
    field: "Combinatorial optimization",
    date: "July 22, 2026",
    isoDate: "2026-07-22",
    outcome: "Disproved",
    status: "Public counterexample; no paper yet",
    score: 3,
    ai: "GPT-5.6 Pro",
    summary:
      "GPT-5.6 Pro produced a small network in which a fractional flow costs 58 while every admissible unsplittable flow costs at least 60, contradicting the proposed cost-preserving rounding bound.",
    importance:
      "The claim targets a natural question left open after a 1999 theorem and is directly checkable. The construction and transcript are public, but a formal paper or broader expert analysis is still missing.",
    source: "https://x.com/dmitryrybin1/status/2079904005652893709",
    sourceLabel: "View claim and transcript",
  },
  {
    title: "19 Claimed Erdős Problem Resolutions",
    field: "Community research",
    date: "July 15, 2026",
    isoDate: "2026-07-15",
    outcome: "Mixed claims",
    status: "Independent verification varies",
    score: 3,
    ai: "GPT-5.2–5.6",
    summary:
      "A researcher reports 19 solution claims, including new July claims for Erdős problems #421, #793 and #415. Every claim received adversarial AI checks, but not all have been formally or independently verified.",
    importance:
      "The individual problems vary in depth. Collectively, the claims show how quickly AI-assisted mathematical exploration is expanding beyond a handful of flagship results.",
    source: "https://x.com/prz_chojecki/status/2077297392181780621",
    sourceLabel: "View claim list",
  },
  {
    title: "Online Beck–Fiala Down to Logarithmic Sparsity",
    field: "Discrepancy theory",
    date: "July 13, 2026",
    isoDate: "2026-07-13",
    outcome: "Proved",
    status: "Human-checked new preprint",
    score: 3,
    ai: "ChatGPT 5.6 Pro",
    summary:
      "A new online discrepancy bound was developed through several rounds of AI-guided proof generation, followed by manual checking and rewriting by the authors.",
    importance:
      "A substantial advance in an active theoretical computer science problem, although it does not settle the full classical Beck–Fiala conjecture.",
    source: "https://arxiv.org/abs/2607.14238",
  },
  {
    title: "Erdős–Szemerédi Sum–Product Conjecture over ℝ",
    field: "Additive combinatorics",
    date: "July 9, 2026",
    isoDate: "2026-07-09",
    outcome: "Disproved",
    status: "Reproducible new preprint",
    score: 4,
    ai: "GPT-5.5 Pro agent",
    summary:
      "A simple three-stage agent reportedly produced correct disproofs in seven of eight independent runs. Code, intermediate outputs and generated proofs were released.",
    importance:
      "A well-known conjectural extension of the sum–product phenomenon. The reproducibility is unusually strong, but wider expert review is still recent.",
    source: "https://arxiv.org/abs/2607.20525",
  },
  {
    title: "16 Recently Tracked AI Math Resolutions",
    field: "Community tracker",
    date: "July 24, 2026",
    isoDate: "2026-07-24",
    outcome: "Mixed claims",
    status: "Tracker; case-by-case review needed",
    score: 4,
    ai: "Multiple AI systems",
    summary:
      "A public tracker records 16 recent cases: nine counterexamples and seven proofs. Ten are reported to have formal proofs, but the strength and scope of verification differ between cases.",
    importance:
      "The aggregate is a strong signal of accelerating activity. It is not itself proof that all 16 original mathematical claims have been stated and verified correctly.",
    source: "https://x.com/jbrukh/status/2080457590899642505",
    sourceLabel: "View X tracker",
  },
  {
    title: "Steinerberger’s Antipodal-Pairs Conjecture",
    field: "Metric geometry & combinatorics",
    date: "April 28, 2026",
    isoDate: "2026-04-28",
    outcome: "Proved",
    status: "Two-author preprint and seminar presentation; independent review pending",
    score: 2,
    ai: "ChatGPT 5.4",
    summary:
      "In close collaboration with the authors, ChatGPT 5.4 helped complete a proof that many nearly antipodal pairs in a planar point set force the optimal-order number of nearby pairs, confirming Steinerberger’s recent conjecture.",
    importance:
      "The theorem gives a sharp answer to a recent specialist problem and a more general two-parameter result. It has been publicly presented, but no independent proof check or formal certificate is available.",
    source: "https://arxiv.org/abs/2608.02605",
    sourceLabel: "View preprint",
  },
];

const physicsEstablishedResults: Result[] = [
  {
    title: "Cross-Tokamak Forecasting of Fusion-Plasma Instability",
    field: "Plasma physics & fusion",
    date: "June 1, 2026",
    isoDate: "2026-06-01",
    outcome: "Demonstrated",
    status: "Peer-reviewed; zero-shot transfer validated across two tokamaks",
    score: 4,
    ai: "Explainable neural network trained on DIII-D turbulence data",
    summary:
      "A model trained only on megahertz turbulence measurements from DIII-D forecast Type-I edge-localized-mode onsets in the KSTAR tokamak without device-specific retraining. Its salient features tracked independently calculated instability physics.",
    importance:
      "A future fusion reactor cannot supply a large failure dataset for training. Cross-machine forecasting is therefore a meaningful step toward AI systems that can generalize to new reactors, although this study forecast instabilities rather than controlling them.",
    source: "https://www.nature.com/articles/s42005-026-02689-2",
    sourceLabel: "View Communications Physics paper",
  },
  {
    title: "AI Meta-Designs Families of Quantum Experiments",
    field: "Quantum optics & condensed-matter physics",
    date: "February 19, 2026",
    isoDate: "2026-02-19",
    outcome: "Discovered",
    status: "Peer-reviewed; generated constructions verified by simulation",
    score: 4,
    ai: "Purpose-trained transformer generating human-readable experiment code",
    summary:
      "A transformer learned to write programs that generate entire families of quantum experiments. It rediscovered four known construction rules and found two previously unknown photonic constructions for spin-1/2 and Majumdar–Ghosh states.",
    importance:
      "The system discovered interpretable general design rules rather than one optimized apparatus. The constructions are computationally verified blueprints; they have not yet been physically built in the laboratory.",
    source: "https://www.nature.com/articles/s42256-025-01153-0",
    sourceLabel: "View Nature Machine Intelligence paper",
  },
  {
    title: "AI Avoids a Fusion-Plasma Tearing Instability",
    field: "Plasma physics & fusion",
    date: "February 21, 2024",
    isoDate: "2024-02-21",
    outcome: "Demonstrated",
    status: "Peer-reviewed; demonstrated on the DIII-D tokamak",
    score: 4,
    ai: "Deep reinforcement-learning controller + learned dynamics model",
    summary:
      "An AI controller adjusted neutral-beam power and plasma shape in real time to keep high-pressure plasma below a predicted tearing-instability threshold. Tests on DIII-D sustained stable discharges in conditions relevant to ITER scenarios.",
    importance:
      "Tearing instabilities are a leading cause of tokamak disruptions. This was a real hardware demonstration, not a simulation, although the authors describe it as an early proof of concept requiring further experiments.",
    source: "https://www.nature.com/articles/s41586-024-07024-9",
    sourceLabel: "View Nature paper",
  },
  {
    title: "GNoME Expands the Map of Stable Crystal Structures",
    field: "Condensed matter & materials physics",
    date: "November 29, 2023",
    isoDate: "2023-11-29",
    outcome: "Discovered",
    status: "Peer-reviewed; DFT-checked; 736 structures independently realized",
    score: 4,
    ai: "GNoME graph neural networks + active learning",
    summary:
      "DeepMind's GNoME system searched crystal space at scale and produced 381,000 new structures on its final computational stability hull, within a larger set of 2.2 million candidates below the previous hull. Hundreds matched structures independently realized experimentally.",
    importance:
      "The work expanded the computational catalogue of stable inorganic crystals by roughly an order of magnitude. Computational stability does not mean that every candidate is synthesizable or technologically useful.",
    source: "https://www.nature.com/articles/s41586-023-06735-9",
    sourceLabel: "View Nature paper",
  },
  {
    title: "General AI Control of Tokamak Plasma Shapes",
    field: "Plasma physics & fusion",
    date: "February 16, 2022",
    isoDate: "2022-02-16",
    outcome: "Demonstrated",
    status: "Peer-reviewed; experimentally verified on the TCV tokamak",
    score: 4,
    ai: "DeepMind deep-reinforcement-learning controller",
    summary:
      "A single learned controller commanded all 19 magnetic coils of the TCV tokamak at 10 kHz. It maintained conventional and advanced plasma shapes, including negative triangularity, snowflake configurations and two simultaneous plasma droplets.",
    importance:
      "The experiment replaced many separately engineered control components with one adaptable AI policy and demonstrated successful simulation-to-hardware transfer in a demanding physical system.",
    source: "https://www.nature.com/articles/s41586-021-04301-9",
    sourceLabel: "View Nature paper",
  },
  {
    title: "Fifty Kepler Exoplanets Validated by Machine Learning",
    field: "Astrophysics & exoplanets",
    date: "August 20, 2020",
    isoDate: "2020-08-20",
    outcome: "Validated",
    status: "Peer-reviewed; stringent multi-model agreement and vespa cross-check",
    score: 3,
    ai: "Gaussian-process classifier reinforced by three ML models",
    summary:
      "A machine-learning framework separated genuine transits from astrophysical and instrumental false positives, newly validating 50 Kepler candidates as planets after all four classifiers exceeded a 99% threshold.",
    importance:
      "The result added real objects to the exoplanet census and showed that automated validation can keep pace with modern surveys. The authors still caution against relying on any single validation method.",
    source: "https://academic.oup.com/mnras/article/504/4/5327/5894933",
    sourceLabel: "View MNRAS paper",
  },
];

const physicsEmergingResults: Result[] = [
  {
    title: "No Global Supporting Functional for Some Two-Qubit Entanglement States",
    field: "Quantum information & entanglement theory",
    date: "August 27, 2026",
    isoDate: "2026-08-27",
    outcome: "Disproved",
    status: "Two-author preliminary preprint with an explicit analytic counterexample; independent review pending",
    score: 3,
    ai: "Claude Fable 5 in counterexample search",
    summary:
      "After the authors reduced the problem to failure of Lipschitz lower semicontinuity, Claude Fable 5 used Wootters' two-qubit formula to rapidly find a degenerate state where entanglement of formation has no global supporting affine functional.",
    importance:
      "The explicit example corrects an assumption used in several papers and already fails in the simplest bipartite qubit setting. The manuscript also gives existence criteria and continuity bounds, but it is a preliminary preprint without independent checking.",
    source: "https://arxiv.org/abs/2608.27363",
    sourceLabel: "View preliminary preprint and counterexample",
    addedDate: "August 28, 2026",
    addedIsoDate: "2026-08-28",
  },
  {
    title: "First Smooth Random Fast Dynamo",
    field: "Magnetohydrodynamics & analysis of PDEs",
    date: "August 20, 2026",
    isoDate: "2026-08-20",
    outcome: "Discovered",
    status: "Author-verified single-author preprint; independent review pending",
    score: 4,
    ai: "ChatGPT 5.6 Sol Ultra",
    summary:
      "The paper constructs the first smooth random velocity field on the three-torus rigorously shown to amplify a magnetic field at a resistivity-independent exponential rate. The AI generated the central proof idea autonomously; the author wrote and checked the manuscript.",
    importance:
      "Fast dynamos model how conducting flows sustain astrophysical magnetic fields, and rigorous construction is one of Arnold's problems. This resolves the smooth random example, not the broader theory of generic random flows.",
    source: "https://arxiv.org/abs/2608.20105",
    sourceLabel: "View preprint",
    addedDate: "August 23, 2026",
    addedIsoDate: "2026-08-23",
  },
  {
    title: "Unclonable Encryption From BB84 States",
    field: "Quantum information & cryptography",
    date: "August 18, 2026",
    isoDate: "2026-08-18",
    outcome: "Proved",
    status: "Three-author preprint; independent review pending",
    score: 3,
    ai: "GPT-5.6 Ultra",
    summary:
      "GPT-5.6 Ultra discovered a simultaneous Goldreich–Levin reduction for two entangled parties. It upgrades search-secure unclonable encryption to indistinguishability and proves the simplest BB84-state candidate meets that stronger standard.",
    importance:
      "The theorem supplies a missing security reduction for a foundational quantum-state construction. It is a substantial theoretical result, but currently rests on one new preprint rather than independent scrutiny or experiment.",
    source: "https://arxiv.org/abs/2608.17629",
    sourceLabel: "View preprint",
    addedDate: "August 23, 2026",
    addedIsoDate: "2026-08-23",
  },
  {
    title: "Critical Sherrington–Kirkpatrick Overlap Distribution",
    field: "Statistical physics & spin glasses",
    date: "August 9, 2026",
    isoDate: "2026-08-09",
    outcome: "Discovered",
    status: "Two-author preprint; independent review pending",
    score: 3,
    ai: "GPT-5.6 Pro",
    summary:
      "The paper derives the critical two-replica overlap distribution for both spherical and Ising Sherrington–Kirkpatrick spin-glass models, including its N^(-1/3) scale and an Airy-process limit. Most arguments were generated with GPT-5.6 Pro.",
    importance:
      "The result answers a question of Talagrand and gives a precise critical-law description for a canonical disordered-system model. It remains a new theoretical preprint without independent validation.",
    source: "https://arxiv.org/abs/2608.08752",
    sourceLabel: "View preprint",
    addedDate: "August 15, 2026",
    addedIsoDate: "2026-08-15",
  },
  {
    title: "Optical Bilinear Interaction Discovered Autonomously",
    field: "Experimental optics & photonic computing",
    date: "April 29, 2026",
    isoDate: "2026-04-29",
    outcome: "Discovered",
    status: "Experimentally demonstrated by the originating team; independent replication pending",
    score: 4,
    ai: "Qiushi Discovery Engine",
    summary:
      "An LLM-based agent autonomously proposed and experimentally validated optical bilinear interaction, a previously unreported physical mechanism structurally analogous to pairwise attention in Transformers.",
    importance:
      "This is unusually direct evidence of an AI system carrying a physical discovery from hypothesis through real experiments. The mechanism may enable fast optical pairwise computation, but the result currently rests on one team’s preprint.",
    source: "https://arxiv.org/abs/2604.27092",
    sourceLabel: "View preprint and experimental report",
    addedDate: "August 20, 2026",
    addedIsoDate: "2026-08-20",
  },
  {
    title: "Exact Cosmic-String Gravitational-Wave Spectrum",
    field: "Theoretical physics & cosmology",
    date: "March 5, 2026",
    isoDate: "2026-03-05",
    outcome: "Discovered",
    status: "Preprint; derivations and numerical checks released, independent review pending",
    score: 4,
    ai: "Gemini Deep Think + tree search + automated numerical feedback",
    summary:
      "A neuro-symbolic agent derived several analytical methods for a core integral governing gravitational radiation from cosmic-string loops, extending earlier partial asymptotic work to arbitrary loop geometries.",
    importance:
      "The authors present it as the solution of an open theoretical-physics problem and publish the discovery workflow in detail. It remains here until specialists independently scrutinize the intended scope and derivations.",
    source: "https://arxiv.org/abs/2603.04735",
    sourceLabel: "View preprint",
  },
];

const biologyEstablishedResults: Result[] = [
  {
    title: "AI-Discovered Antibiotics Against Drug-Resistant Gonorrhoea",
    field: "Infectious disease & drug discovery",
    date: "June 17, 2026",
    isoDate: "2026-06-17",
    outcome: "Discovered",
    status: "Peer-reviewed; in-vitro, mechanism, organ-chip and mouse validation",
    score: 4,
    ai: "Graph neural network screening roughly six million compounds",
    summary:
      "A deep-learning screen nominated 213 compounds for testing; 83 inhibited Neisseria gonorrhoeae. Two structurally novel leads retained activity against multidrug-resistant strains, and one revealed alanine racemase as its target.",
    importance:
      "Gonorrhoea is increasingly resistant to recommended antibiotics. The leads showed early effects in a human vagina-on-a-chip model and a mouse infection model, but they are still preclinical candidates rather than patient-ready drugs.",
    source: "https://doi.org/10.1126/scitranslmed.ads4699",
    sourceLabel: "View Science Translational Medicine paper",
    secondarySource: "https://pubmed.ncbi.nlm.nih.gov/42308330/",
    secondarySourceLabel: "View PubMed record",
  },
  {
    title: "Brain-Penetrant Autophagy Enhancers for Alzheimer’s Disease",
    field: "Neurodegeneration & drug discovery",
    date: "May 31, 2026",
    isoDate: "2026-05-31",
    outcome: "Discovered",
    status: "Peer-reviewed preclinical study; worm and mouse validation",
    score: 4,
    ai: "DeepDrugDiscovery mechanism-centred screen of more than one million molecules",
    summary:
      "AI identified ombuin and 2-hydroxycinnamic acid as brain-penetrant, mTOR-independent autophagy enhancers. Experiments found reduced tau and amyloid-β pathology and restored memory in animal models.",
    importance:
      "The work joins large-scale AI screening to biological and behavioural validation in Alzheimer’s models. Human safety, dosing and efficacy remain completely untested.",
    source: "https://pubmed.ncbi.nlm.nih.gov/42218670/",
    sourceLabel: "View peer-reviewed paper record",
  },
  {
    title: "Ombuin Identified as a Sepsis-Treatment Candidate",
    field: "Sepsis & immunology",
    date: "February 24, 2026",
    isoDate: "2026-02-24",
    outcome: "Discovered",
    status: "Peer-reviewed preclinical study; cellular and animal validation",
    score: 3,
    ai: "AI screening pipeline for macrophage-polarization inhibitors",
    summary:
      "An AI-led pipeline identified ombuin as an inhibitor of inflammatory M1 macrophage polarization. Follow-up experiments mapped its mechanism and tested therapeutic effects in preclinical sepsis models.",
    importance:
      "Sepsis remains a major cause of death and lacks targeted treatments for dysregulated inflammation. The finding is experimentally supported but far from evidence of benefit in humans.",
    source: "https://pubmed.ncbi.nlm.nih.gov/41735615/",
    sourceLabel: "View Acta Pharmacologica Sinica record",
  },
  {
    title: "OpenCRISPR-1: An AI-Designed Human Gene Editor",
    field: "Genome editing & biotechnology",
    date: "July 30, 2025",
    isoDate: "2025-07-30",
    outcome: "Designed",
    status: "Peer-reviewed; functional editing demonstrated in human cells",
    score: 4,
    ai: "Protein language model trained on more than one million CRISPR operons",
    summary:
      "Generative models produced CRISPR–Cas proteins far from known natural sequences. OpenCRISPR-1 successfully edited human DNA, showed strong activity and specificity, and was compatible with base editing.",
    importance:
      "This was the first entirely AI-designed CRISPR system shown to edit human DNA. It is a validated research tool, not yet a demonstrated therapy in patients.",
    source: "https://www.nature.com/articles/s41586-025-09298-z",
    sourceLabel: "View Nature paper",
  },
  {
    title: "Organ-Specific Aging Clocks in Human Blood",
    field: "Human aging & biomarkers",
    date: "December 6, 2023",
    isoDate: "2023-12-06",
    outcome: "Discovered",
    status: "Peer-reviewed; reproduced across five cohorts and 5,676 adults",
    score: 4,
    ai: "Machine-learning plasma-proteomic clocks",
    summary:
      "Machine-learning models estimated the biological age of 11 organs from blood proteins. Nearly 20% of participants had strongly accelerated aging in one organ, which was associated with organ-specific disease and 20–50% higher mortality risk.",
    importance:
      "The work provided a non-invasive way to separate how individual human organs age and linked those signatures to heart failure, Alzheimer's progression and mortality across multiple cohorts.",
    source: "https://www.nature.com/articles/s41586-023-06802-1",
    sourceLabel: "View Nature paper",
  },
  {
    title: "Abaucin, an AI-Discovered Antibiotic Candidate",
    field: "Infectious disease & drug discovery",
    date: "May 25, 2023",
    isoDate: "2023-05-25",
    outcome: "Discovered",
    status: "Peer-reviewed; laboratory, mechanism and mouse-model validation",
    score: 3,
    ai: "Deep neural network for molecular screening",
    summary:
      "A neural network trained on growth-inhibition experiments identified abaucin, a structurally unusual narrow-spectrum compound against multidrug-resistant Acinetobacter baumannii. Laboratory work identified its mechanism and it suppressed infection in a mouse wound model.",
    importance:
      "A. baumannii is a serious hospital pathogen with extensive drug resistance. Abaucin is a credible preclinical lead, but it has not yet been shown safe or effective in humans.",
    source: "https://www.nature.com/articles/s41589-023-01349-8",
    sourceLabel: "View Nature Chemical Biology paper",
  },
];

const biologyEmergingResults: Result[] = [
  {
    title: "AI-Designed Bacteriophage Genomes",
    field: "Antimicrobial resistance & synthetic biology",
    date: "August 6, 2026",
    isoDate: "2026-08-06",
    outcome: "Designed",
    status: "Peer-reviewed laboratory validation; no animal or human evidence",
    score: 4,
    ai: "Evo 1 and Evo 2 genome language models",
    summary:
      "The models generated complete bacteriophage genomes, 285 designs were synthesized, and 16 produced viable phages. Several outperformed the natural template, while a cocktail overcame phage resistance in three E. coli strains.",
    importance:
      "This is the first experimentally validated generative design of viable whole viral genomes and could eventually support therapies for antibiotic-resistant infections. It remains an early laboratory proof of concept and also raises substantial biosecurity questions.",
    source: "https://www.science.org/doi/10.1126/science.aec2657",
    sourceLabel: "View Science paper",
    secondarySource:
      "https://news.stanford.edu/stories/2026/08/evo-2-ai-tool-e-coli-killer-bacteriophages",
    secondarySourceLabel: "View Stanford explanation",
  },
  {
    title: "AI Prioritizes Shared Targets for Aging and 12 Age-Related Diseases",
    field: "Human aging, multi-omics & target discovery",
    date: "June 12, 2026",
    isoDate: "2026-06-12",
    outcome: "Discovered",
    status: "Peer-reviewed computational study; experimental validation still needed",
    score: 3,
    ai: "AI multi-omic target discovery + Mendelian randomization and colocalization",
    summary:
      "An AI-guided framework identified 29 high-confidence and 16 previously unrecognized targets shared across aging and neurological, inflammatory, metabolic and fibrotic diseases. Genetic analyses supported several candidates, including IL6R and NOS2.",
    importance:
      "The result connects aging biology to repurposable drug targets and adds causal-genetic checks, but it generates hypotheses rather than demonstrating that modulating the new targets improves human healthspan.",
    source: "https://pubmed.ncbi.nlm.nih.gov/42295090/",
    sourceLabel: "View Aging and Disease paper",
  },
  {
    title: "Rentosertib for Idiopathic Pulmonary Fibrosis",
    field: "Age-related lung disease & clinical trials",
    date: "June 3, 2025",
    isoDate: "2025-06-03",
    outcome: "Clinical signal",
    status: "Randomized phase 2a; 71 participants; larger trials required",
    score: 4,
    ai: "PandaOmics target discovery + Chemistry42 generative drug design",
    summary:
      "AI identified TNIK as a target and generated rentosertib. In a 12-week double-blind trial, the highest-dose group showed a mean forced-vital-capacity change of +98.4 ml versus −20.3 ml with placebo, while overall safety was broadly comparable.",
    importance:
      "It is an unusually advanced test of an AI-discovered target and AI-designed molecule in patients. The trial was small, short, geographically narrow and primarily designed to assess safety, so efficacy is not established.",
    source: "https://www.nature.com/articles/s41591-025-03743-2",
    sourceLabel: "View Nature Medicine trial",
  },
  {
    title: "Deep-Learning Discovery of New Senolytics",
    field: "Longevity & cellular senescence",
    date: "May 4, 2023",
    isoDate: "2023-05-04",
    outcome: "Discovered",
    status: "Peer-reviewed preclinical study; cells and one aged-mouse experiment",
    score: 3,
    ai: "Graph neural networks screening more than 800,000 molecules",
    summary:
      "AI screening identified three drug-like compounds that selectively killed senescent cells across multiple laboratory models. One candidate reduced senescent-cell burden and associated gene expression in the kidneys of aged mice.",
    importance:
      "Senescent cells are implicated in many diseases of aging. The experimental result is real, but translation to safe rejuvenation or longer healthy life in humans remains unproven.",
    source: "https://www.nature.com/articles/s43587-023-00415-z",
    sourceLabel: "View Nature Aging paper",
  },
];

const filters = ["All", "Proved", "Disproved"] as const;

function Score({ value }: { value: number }) {
  return (
    <div className="score" aria-label={`Importance ${value} out of 5`}>
      <span className="score-number">{value}</span>
      <span className="score-scale">/ 5</span>
      <span className="score-dots" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((dot) => (
          <i className={dot <= value ? "active" : ""} key={dot} />
        ))}
      </span>
    </div>
  );
}

function resultId(title: string) {
  return `result-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

function ResultCard({
  item,
  emerging = false,
  showCategory = false,
}: {
  item: Result;
  emerging?: boolean;
  showCategory?: boolean;
}) {
  const isNew = item.addedIsoDate === latestReviewIsoDate;
  const outcomeClass =
    item.outcome === "Mixed claims"
      ? "mixed"
      : item.outcome === "Proved" || item.outcome === "Disproved"
        ? item.outcome.toLowerCase()
        : "scientific";

  return (
    <article
      className={`result-card${emerging ? " emerging-card" : ""}${isNew ? " new-review-card" : ""}`}
      id={resultId(item.title)}
    >
      <div className="card-topline">
        <span className={`outcome ${outcomeClass}`}>{item.outcome}</span>
        <span>{item.field}</span>
        <time dateTime={item.isoDate}>{item.date}</time>
      </div>

      <div className="card-grid">
        <div className="card-main">
          {isNew && (
            <span className="new-review-badge">
              New in the {item.addedDate} review
            </span>
          )}
          {showCategory && (
            <span className={`verification-category${emerging ? " review" : ""}`}>
              {emerging ? "New & under review" : "Established result"}
            </span>
          )}
          <h3>{item.title}</h3>
          <p className="summary">{item.summary}</p>
          <dl className="facts">
            <div>
              <dt>AI system</dt>
              <dd>{item.ai}</dd>
            </div>
            <div>
              <dt>Verification</dt>
              <dd>{item.status}</dd>
            </div>
          </dl>
        </div>

        <aside className="importance">
          <p className="importance-label">Importance</p>
          <Score value={item.score} />
          <p>{item.importance}</p>
          <a href={item.source} target="_blank" rel="noreferrer">
            {item.sourceLabel ?? "View original source"}{" "}
            <span aria-hidden="true">↗</span>
          </a>
          {item.secondarySource && (
            <a href={item.secondarySource} target="_blank" rel="noreferrer">
              {item.secondarySourceLabel ?? "View additional source"}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </aside>
      </div>
    </article>
  );
}

function LatestReviewPanel({
  items,
  onSelect,
}: {
  items: Result[];
  onSelect?: (item: Result) => void;
}) {
  if (items.length === 0) return null;

  return (
    <aside className="latest-review-panel" aria-label="New results in the latest review">
      <div>
        <p className="section-kicker">New in the latest review</p>
        <h2>
          {items.length} {items.length === 1 ? "result" : "results"} added
        </h2>
        <p>
          Added on {latestReviewDate}; ordered below by their original
          publication date.
        </p>
      </div>
      <nav className="latest-review-links" aria-label="Jump to newly added results">
        {items.map((item) => (
          <a
            href={`#${resultId(item.title)}`}
            key={item.title}
            onClick={(event) => {
              event.preventDefault();
              onSelect?.(item);
              window.setTimeout(() => {
                document
                  .getElementById(resultId(item.title))
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 50);
            }}
          >
            <span>{item.title}</span>
            <time dateTime={item.isoDate}>{item.date}</time>
          </a>
        ))}
      </nav>
    </aside>
  );
}

type Area = "home" | "mathematics" | "physics" | "human-biology";

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [area, setArea] = useState<Area>("home");
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    const readHash = () => {
      const hash = window.location.hash.replace("#", "") as Area;
      setArea(
        ["mathematics", "physics", "human-biology"].includes(hash)
          ? hash
          : "home",
      );
    };

    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  const visibleEstablished = useMemo(
    () =>
      establishedResults
        .filter((item) => filter === "All" || item.outcome === filter)
        .sort((a, b) => b.isoDate.localeCompare(a.isoDate)),
    [filter],
  );

  const sortedEmerging = useMemo(
    () => [...emergingResults].sort((a, b) => b.isoDate.localeCompare(a.isoDate)),
    [],
  );

  const latestMathematics = useMemo(
    () =>
      [
        ...establishedResults.map((item) => ({ item, emerging: false })),
        ...emergingResults.map((item) => ({ item, emerging: true })),
      ]
        .sort((a, b) => b.item.isoDate.localeCompare(a.item.isoDate))
        .slice(0, 10),
    [],
  );

  const latestReviewMathematics = useMemo(
    () =>
      [...establishedResults, ...emergingResults]
        .filter((item) => item.addedIsoDate === latestReviewIsoDate)
        .sort((a, b) => b.isoDate.localeCompare(a.isoDate)),
    [],
  );

  const goToArea = (nextArea: Area) => {
    setArea(nextArea);
    setShowArchive(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <header className="site-header">
        <a
          className="brand"
          href="#home"
          aria-label="AI Research Frontiers, home"
          onClick={() => goToArea("home")}
        >
          <span className="brand-mark">∴</span>
          <span>AI Research Frontiers</span>
        </a>
        <nav className="header-nav" aria-label="Research areas">
          <a
            className={area === "mathematics" ? "active" : ""}
            href="#mathematics"
            onClick={() => goToArea("mathematics")}
          >
            Mathematics
          </a>
          <a
            className={area === "physics" ? "active" : ""}
            href="#physics"
            onClick={() => goToArea("physics")}
          >
            Physics
          </a>
          <a
            className={area === "human-biology" ? "active" : ""}
            href="#human-biology"
            onClick={() => goToArea("human-biology")}
          >
            Human biology
          </a>
        </nav>
      </header>

      {area === "home" && (
        <>
          <section className="hero" id="top">
            <div className="eyebrow">
              <span className="live-dot" />
              Updated daily
            </div>
            <h1>When AI moves<br />the frontier of science.</h1>
            <p className="hero-copy">
              A source-based record of research advances made with decisive
              help from AI—separating established results from fast-moving
              claims still under review.
            </p>
            <div className="hero-meta">
              <span><strong>3</strong> research areas</span>
              <span>Last checked {latestReviewDate}</span>
            </div>
          </section>

          <section className="area-section" aria-labelledby="areas-heading">
            <div className="section-head area-head">
              <div>
                <p className="section-kicker">Explore the evidence</p>
                <h2 id="areas-heading">Three frontiers, one standard.</h2>
                <p className="section-intro">
                  Each area records the AI system, its role, the strongest
                  available source and a clearly stated verification status.
                </p>
              </div>
            </div>
            <div className="area-grid">
              <a className="area-card mathematics-card" href="#mathematics" onClick={() => goToArea("mathematics")}>
                <span className="area-number">01</span>
                <div>
                  <h3>Mathematics</h3>
                  <p>Proofs, disproofs and exact constructions.</p>
                </div>
                <div className="area-counts">
                  <span><strong>{establishedResults.length}</strong> established</span>
                  <span><strong>{emergingResults.length}</strong> under review</span>
                </div>
                <span className="area-arrow" aria-hidden="true">↗</span>
              </a>
              <a className="area-card" href="#physics" onClick={() => goToArea("physics")}>
                <span className="area-number">02</span>
                <div>
                  <h3>Physics</h3>
                  <p>New laws, solutions and experimentally testable predictions.</p>
                </div>
                <div className="area-counts">
                  <span><strong>{physicsEstablishedResults.length}</strong> established</span>
                  <span><strong>{physicsEmergingResults.length}</strong> under review</span>
                </div>
                <span className="area-arrow" aria-hidden="true">↗</span>
              </a>
              <a className="area-card" href="#human-biology" onClick={() => goToArea("human-biology")}>
                <span className="area-number">03</span>
                <div>
                  <h3>Human Biology &amp; Longevity</h3>
                  <p>Disease, therapies, regeneration and healthy ageing.</p>
                </div>
                <div className="area-counts">
                  <span><strong>{biologyEstablishedResults.length}</strong> established</span>
                  <span><strong>{biologyEmergingResults.length}</strong> under review</span>
                </div>
                <span className="area-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </section>

          <section className="method" id="method">
            <div>
              <p className="section-kicker">How results are assessed</p>
              <h2>Evidence first. Excitement second.</h2>
            </div>
            <div className="method-copy">
              <p>
                An established entry needs a strong public source and meaningful
                verification. Promotion from “under review” depends on the
                quality of checking—not time passed or headline size.
              </p>
              <div className="criteria">
                <span><b>Direct</b> The AI contribution is material to the result</span>
                <span><b>Verified</b> Experts, experiments or formal tools support it</span>
                <span><b>Traceable</b> Readers can inspect the strongest public source</span>
              </div>
              <div className="legend">
                <span><b>1</b> Narrow specialist result</span>
                <span><b>3</b> Important within its field</span>
                <span><b>5</b> Historic major advance</span>
              </div>
            </div>
          </section>
        </>
      )}

      {area === "mathematics" && (
        <>
          <section className="subject-hero mathematics-hero">
            <div>
              <p className="section-kicker">Research area 01</p>
              <h1>Mathematics</h1>
              <p>
                Open problems resolved with decisive AI help, separated by the
                strength of verification.
              </p>
            </div>
            <div className="subject-stats">
              <span><strong>{establishedResults.length}</strong> established</span>
              <span><strong>{emergingResults.length}</strong> under review</span>
              <span>Last checked {latestReviewDate}</span>
            </div>
          </section>

          {!showArchive ? (
            <section className="results-section latest-section" aria-labelledby="latest-heading">
              <div className="section-head">
                <div>
                  <p className="section-kicker">Latest 10 results</p>
                  <h2 id="latest-heading">The newest developments</h2>
                  <p className="section-intro">
                    Established and emerging results together, ordered by date.
                  </p>
                </div>
              </div>
              <LatestReviewPanel
                items={latestReviewMathematics}
                onSelect={() => setShowArchive(true)}
              />
              <div className="result-list latest-list">
                {latestMathematics.map(({ item, emerging }) => (
                  <ResultCard
                    emerging={emerging}
                    item={item}
                    key={`${emerging ? "review" : "established"}-${item.title}`}
                    showCategory
                  />
                ))}
              </div>
              <div className="archive-action">
                <button type="button" onClick={() => setShowArchive(true)}>
                  View all {establishedResults.length + emergingResults.length} results
                  <span aria-hidden="true">↓</span>
                </button>
              </div>
            </section>
          ) : (
            <>
              <section
                className="results-section established-section"
                id="established"
                aria-labelledby="established-heading"
              >
                <div className="section-head">
                  <div>
                    <p className="section-kicker">Established results</p>
                    <h2 id="established-heading">Verified breakthroughs</h2>
                    <p className="section-intro">
                      Results backed by formal verification, detailed human
                      checking, or substantial independent expert scrutiny.
                    </p>
                  </div>
                  <div className="filters" aria-label="Filter established results">
                    {filters.map((item) => (
                      <button
                        className={filter === item ? "active" : ""}
                        key={item}
                        onClick={() => setFilter(item)}
                        type="button"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="result-list">
                  {visibleEstablished.map((item) => (
                    <ResultCard item={item} key={item.title} />
                  ))}
                </div>
              </section>

              <section className="emerging-section" id="emerging" aria-labelledby="emerging-heading">
                <div className="section-head emerging-head">
                  <div>
                    <p className="section-kicker">New &amp; under review</p>
                    <h2 id="emerging-heading">The fast-moving frontier</h2>
                    <p className="section-intro">
                      Recent preprints, public claims and community trackers that
                      have not yet cleared the established bar.
                    </p>
                  </div>
                  <div className="review-key"><span aria-hidden="true">!</span>Status may change</div>
                </div>
                <div className="verification-note">
                  <strong>Why the caution?</strong>
                  <p>
                    A formal proof certifies a precise statement. Experts must
                    still confirm that it matches the intended problem and that
                    the reported AI contribution is genuinely new.
                  </p>
                </div>
                <div className="result-list emerging-list">
                  {sortedEmerging.map((item) => (
                    <ResultCard emerging item={item} key={item.title} />
                  ))}
                </div>
                <div className="archive-action archive-action-review">
                  <button type="button" onClick={() => { setShowArchive(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                    Back to latest 10 <span aria-hidden="true">↑</span>
                  </button>
                </div>
              </section>
            </>
          )}
        </>
      )}

      {area === "physics" && (
        <SubjectResults
          area="Research area 02"
          title="Physics"
          intro="AI-assisted advances in theoretical, computational and experimental physics—only when AI is decisive to the result."
          established={physicsEstablishedResults}
          emerging={physicsEmergingResults}
        />
      )}

      {area === "human-biology" && (
        <SubjectResults
          area="Research area 03"
          title="Human Biology & Longevity"
          intro="Disease mechanisms, therapies, regeneration and healthy ageing—tracked with a deliberately high evidence bar."
          established={biologyEstablishedResults}
          emerging={biologyEmergingResults}
          caution="Biomedical claims remain under review until the relevant experimental or clinical evidence exists. AI predictions alone are not treated as established results."
        />
      )}

      <footer>
        <p>AI Research Frontiers</p>
        <p>Sources, claims and verification status are reviewed continuously.</p>
      </footer>
    </main>
  );
}

function SubjectResults({
  area,
  title,
  intro,
  established,
  emerging,
  caution,
}: {
  area: string;
  title: string;
  intro: string;
  established: Result[];
  emerging: Result[];
  caution?: string;
}) {
  const sortedEstablished = [...established].sort((a, b) =>
    b.isoDate.localeCompare(a.isoDate),
  );
  const sortedEmerging = [...emerging].sort((a, b) =>
    b.isoDate.localeCompare(a.isoDate),
  );
  const latestReviewItems = [...established, ...emerging]
    .filter((item) => item.addedIsoDate === latestReviewIsoDate)
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate));

  return (
    <>
      <section className="subject-hero">
        <div>
          <p className="section-kicker">{area}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <div className="subject-stats">
          <span><strong>{established.length}</strong> established</span>
          <span><strong>{emerging.length}</strong> under review</span>
          <span>Last checked {latestReviewDate}</span>
        </div>
      </section>

      <section className="subject-latest-review">
        <LatestReviewPanel items={latestReviewItems} />
      </section>

      <section className="results-section" aria-labelledby={`${area}-established-heading`}>
        <div className="section-head">
          <div>
            <p className="section-kicker">Established results</p>
            <h2 id={`${area}-established-heading`}>Verified advances</h2>
            <p className="section-intro">
              Results backed by peer review and direct experimental,
              observational or computational verification of the stated claim.
            </p>
          </div>
        </div>
        <div className="result-list">
          {sortedEstablished.map((item) => (
            <ResultCard item={item} key={item.title} />
          ))}
        </div>
      </section>

      {sortedEmerging.length > 0 && (
        <section className="emerging-section" aria-labelledby={`${area}-emerging-heading`}>
          <div className="section-head emerging-head">
            <div>
              <p className="section-kicker">New &amp; under review</p>
              <h2 id={`${area}-emerging-heading`}>Promising, not yet settled</h2>
              <p className="section-intro">
                New claims and early results whose scope, verification or wider
                significance still requires independent confirmation.
              </p>
            </div>
            <div className="review-key"><span aria-hidden="true">!</span>Status may change</div>
          </div>
          {caution && (
            <div className="verification-note">
              <strong>Why the caution?</strong>
              <p>{caution}</p>
            </div>
          )}
          <div className="result-list emerging-list">
            {sortedEmerging.map((item) => (
              <ResultCard emerging item={item} key={item.title} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
