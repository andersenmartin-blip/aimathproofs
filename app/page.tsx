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
};

const establishedResults: Result[] = [
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

function ResultCard({
  item,
  emerging = false,
  showCategory = false,
}: {
  item: Result;
  emerging?: boolean;
  showCategory?: boolean;
}) {
  const outcomeClass =
    item.outcome === "Mixed claims"
      ? "mixed"
      : item.outcome === "Proved" || item.outcome === "Disproved"
        ? item.outcome.toLowerCase()
        : "scientific";

  return (
    <article className={`result-card${emerging ? " emerging-card" : ""}`}>
      <div className="card-topline">
        <span className={`outcome ${outcomeClass}`}>{item.outcome}</span>
        <span>{item.field}</span>
        <time dateTime={item.isoDate}>{item.date}</time>
      </div>

      <div className="card-grid">
        <div className="card-main">
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
              <span>Last checked August 8, 2026</span>
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
              <span>Last checked August 8, 2026</span>
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
          <span>Last checked August 8, 2026</span>
        </div>
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
