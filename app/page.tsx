"use client";

import { useMemo, useState } from "react";

type Outcome = "Proved" | "Disproved" | "Mixed claims";

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
};

const establishedResults: Result[] = [
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

function ResultCard({
  item,
  emerging = false,
}: {
  item: Result;
  emerging?: boolean;
}) {
  const outcomeClass =
    item.outcome === "Mixed claims" ? "mixed" : item.outcome.toLowerCase();

  return (
    <article className={`result-card${emerging ? " emerging-card" : ""}`}>
      <div className="card-topline">
        <span className={`outcome ${outcomeClass}`}>{item.outcome}</span>
        <span>{item.field}</span>
        <time dateTime={item.isoDate}>{item.date}</time>
      </div>

      <div className="card-grid">
        <div className="card-main">
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

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

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

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="AI & Mathematics, home">
          <span className="brand-mark">∴</span>
          <span>AI &amp; Mathematics</span>
        </a>
        <nav className="header-nav" aria-label="Page sections">
          <a href="#established">Established</a>
          <a href="#emerging">Under review</a>
          <a href="#method">Method</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow">
          <span className="live-dot" />
          Updated daily
        </div>
        <h1>When AI moves<br />the frontier of mathematics.</h1>
        <p className="hero-copy">
          A clear-eyed record of open mathematical problems resolved with
          decisive help from AI—separating established results from fast-moving
          claims still under review.
        </p>
        <div className="hero-meta">
          <span>
            <strong>{establishedResults.length}</strong> established
          </span>
          <span>
            <strong>{emergingResults.length}</strong> under review
          </span>
          <span>Last checked August 3, 2026</span>
        </div>
      </section>

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
              Results backed by formal verification, detailed human checking,
              or substantial independent expert scrutiny.
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

      <section
        className="emerging-section"
        id="emerging"
        aria-labelledby="emerging-heading"
      >
        <div className="section-head emerging-head">
          <div>
            <p className="section-kicker">New &amp; under review</p>
            <h2 id="emerging-heading">The fast-moving frontier</h2>
            <p className="section-intro">
              Recent preprints, public claims and community trackers. These may
              be correct, but have not yet cleared the bar used above.
            </p>
          </div>
          <div className="review-key">
            <span aria-hidden="true">!</span>
            Status may change
          </div>
        </div>

        <div className="verification-note">
          <strong>Why the caution?</strong>
          <p>
            A formal proof certifies a precise statement. Experts must still
            confirm that the formalised statement faithfully matches the
            original open problem and that the claimed AI contribution is new.
          </p>
        </div>

        <div className="result-list emerging-list">
          {sortedEmerging.map((item) => (
            <ResultCard emerging item={item} key={item.title} />
          ))}
        </div>
      </section>

      <section className="method" id="method">
        <div>
          <p className="section-kicker">How results are assessed</p>
          <h2>Evidence first. Excitement second.</h2>
        </div>
        <div className="method-copy">
          <p>
            Every established entry needs a public mathematical source.
            Promotion from “under review” depends on the quality of checking,
            not merely on time passed or the prominence of the announcement.
          </p>
          <div className="criteria">
            <span><b>Formal</b> A proof assistant accepts the intended statement</span>
            <span><b>Human</b> Relevant experts have checked the argument</span>
            <span><b>Independent</b> Others can reproduce or analyse the result</span>
          </div>
          <div className="legend">
            <span><b>1</b> Narrow specialist result</span>
            <span><b>3</b> Important within its field</span>
            <span><b>5</b> Historic major problem</span>
          </div>
        </div>
      </section>

      <footer>
        <p>AI &amp; Mathematics</p>
        <p>Sources, claims and verification status are reviewed continuously.</p>
      </footer>
    </main>
  );
}
