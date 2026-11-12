Warning: truncated output (original token count: 133023)
Total output lines: 8213

"use client";

import { useEffect, useMemo, useState } from "react";

type Outcome =
  | "Proved"
  | "Disproved"
  | "Mixed claims"
  | "Demonstrated"
  | "Discovered"
  | "Designed"
  | "Improved"
  | "Classified"
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
  tertiarySource?: string;
  tertiarySourceLabel?: string;
  addedDate?: string;
  addedIsoDate?: string;
};

const latestReviewDate = "November 12, 2026";
const latestReviewIsoDate = "2026-11-12";

const establishedResults: Result[] = [
  {
    title: "Cranston–Li–Su–Wang–Xu Flow-Reconfiguration Conjecture",
    field: "Graph theory, nowhere-zero flows & formal verification",
    date: "November 12, 2026",
    isoDate: "2026-11-12",
    outcome: "Proved",
    status: "All theorems proved in Lean 4 from the standard axioms and checked with Lean Comparator; public source accompanies the paper",
    score: 3,
    ai: "Claude and ChatGPT systems produced most of the proof and formalization under Dave Goel's continuous supervision and critical redirection; Goel checked the work, edited the paper and accepts responsibility for it.",
    summary:
      "Proves that, on every even-degree graph, all nowhere-zero flows over a finite abelian group of order at least four are connected by nowhere-zero cycle changes. The analogous reconfiguration statement also holds for integer k-flows for every k at least four.",
    importance:
      "3/5: settles a recent full reconfiguration conjecture for two broad classes of graph flows. Established status rests on a public kernel-checked formalization of the paper's theorems, not on independent specialist review.",
    source: "https://hexagonmath.org/2611.00365v1",
    secondarySource:
      "https://github.com/david44hello/papers_supporting_materials/tree/main/cranston-li-su-wang-xu-2026-conjecture-v2.00/cranston-li-su-wang-xu-2026-conjecture",
    sourceLabel: "View the proof and AI provenance",
    secondarySourceLabel: "Inspect the Lean development",
    addedDate: "November 12, 2026",
    addedIsoDate: "2026-11-12",
  },
  {
    title: "Optimal Packing of Eleven Unit Squares",
    field: "Discrete geometry, packing & formal verification",
    date: "November 12, 2026",
    isoDate: "2026-11-12",
    outcome: "Solved",
    status: "Exact optimum and continuous soundness argument formalized in Lean 4 with pinned certificates and source snapshots",
    score: 3,
    ai: "OpenAI Astra generated the initial proof while building on an earlier incremental computer search; the contributor checked the basic mathematical route, and the final exhaustive certificate argument was formalized in Lean.",
    summary:
      "Determines the exact smallest square that can contain eleven freely oriented unit squares: T = 3.877083590022814… . The proof combines an explicit algebraic packing with an exhaustive Voronoi-cell lower-bound argument over 2,184 combinatorial patterns.",
    importance:
      "3/5: closes a concrete long-standing packing problem whose difficulty is proving global optimality over all positions and orientations. Kernel checking and pinned computational certificates support Established status.",
    source: "https://hexagonmath.org/2611.00359v1",
    secondarySource:
      "https://github.com/Queuingtheorydotcom/11SquaresFormalized/tree/cdc746ed907d258057c283aeb6d077cb2c27e349",
    tertiarySource:
      "https://github.com/Queuingtheorydotcom/11SquaresOptimal/tree/4262f07c7723428c1725bb757ed06d0c4d28be1a",
    sourceLabel: "View the formalized proof and provenance",
    secondarySourceLabel: "Inspect the pinned Lean formalization",
    tertiarySourceLabel: "Inspect the pinned certificate sources",
    addedDate: "November 12, 2026",
    addedIsoDate: "2026-11-12",
  },
  {
    title: "Countable Hyperspaces of Regular Subcontinua",
    field: "General topology, continuum theory & formal verification",
    date: "November 12, 2026",
    isoDate: "2026-11-12",
    outcome: "Classified",
    status: "All numbered results needed for the classification formalized in Lean 4 and reported as passing Lean Comparator; examples and remarks are outside scope",
    score: 2,
    ai: "Claude Fable 5.2 carried out the main research and wrote the Lean code; ChatGPT Astra independently re-derived and literature-checked the results. Lucas Almeida chose and redirected the questions, edited the text and checked the mathematics.",
    summary:
      "Shows that every countable hyperspace of regular subcontinua is completely metrizable and scattered, so it can never be homeomorphic to the rational numbers. The paper also proves structural density and reconstruction results, answering questions of Ramírez Angarita and of Camargo, Ordoñez and Ramírez.",
    importance:
      "2/5: answers a specialized pair of questions in continuum theory and supplies a structural classification. Established status is limited to the numbered results covered by the released Lean development.",
    source: "https://hexagonmath.org/2611.00342v1",
    sourceLabel: "View the proof, verification scope and AI provenance",
    addedDate: "November 12, 2026",
    addedIsoDate: "2026-11-12",
  },
  {
    title: "Meyer’s Dimension Question for Crystalline Measures",
    field: "Functional analysis, Fourier quasicrystals & formal verification",
    date: "November 11, 2026",
    isoDate: "2026-11-11",
    outcome: "Solved",
    status: "Core existence theorem formally checked in Lean 4 and registered in Palomar; stronger symmetry and layer-growth refinements remain outside the formalized scope",
    score: 3,
    ai: "OpenAI Codex Sol 5.6 and Astra 6, Claude models and verification tooling produced and cross-checked the construction with little human understanding; Jamie Martin contributed the manuscript and registered formal developments.",
    summary:
      "Constructs a locally finite set on the real line whose space of crystalline measures has countably infinite Hamel dimension, answering Meyer’s question about possible dimensions. The paper further gives symmetric examples and prescribed growth of finite-order layers.",
    importance:
      "3/5: realizes the previously missing countably infinite case in the dimension trichotomy for crystalline-measure spaces. Established status applies to the machine-checked core existence statement, not every stronger refinement in the paper.",
    source: "https://hexagonmath.org/2611.00280v1",
    secondarySource:
      "https://palomar-registry.org/entry?id=PALOMAR-2026-10-08-000002&version=1",
    sourceLabel: "View the paper, provenance and formalization scope",
    secondarySourceLabel: "Inspect the registered Lean development",
    addedDate: "November 11, 2026",
    addedIsoDate: "2026-11-11",
  },
  {
    title: "Gasull’s Global-Periodicity Classification",
    field: "Dynamical systems, rational recurrences & formal verification",
    date: "November 7, 2026",
    isoDate: "2026-11-07",
    outcome: "Classified",
    status: "Exact two-way classification formalized in Lean and independently replayed through Palomar with Comparator, nanoda and con-ron",
    score: 3,
    ai: "Claude Opus 5.5 and Claude Fable 5.1 found the proof and wrote the Lean development after John F. Rudge supplied the problem and relevant papers and steered experiments from individual orders to the general case.",
    summary:
      "Classifies globally periodic affine-ratio recurrences of every positive order: all arise from five known families by positive rescaling and unfolding. This settles Problem 11 in Armengol Gasull’s survey, previously known only in selected orders.",
    importance:
      "3/5: closes a general classification problem in nonlinear recurrence dynamics. The pinned statement covers both directions, and independent multi-kernel replay supports Established status even though the contributor reports limited understanding of the proof details.",
    source: "https://hexagonmath.org/2611.00183v1",
    secondarySource: "https://aiproofwatch.com/updates/globally-periodic-rational-difference-equations-of-arbitrary-order-2c87f005",
    sourceLabel: "View the proof, Lean source and AI disclosure",
    secondarySourceLabel: "Review statement alignment and formal checks",
    addedDate: "November 9, 2026",
    addedIsoDate: "2026-11-09",
  },
  {
    title: "Pach–Shahrokhi–Szegedy Quasiplanar Graph Conjecture",
    field: "Topological graph theory & extremal combinatorics",
    date: "November 5, 2026",
    isoDate: "2026-11-05",
    outcome: "Proved",
    status: "ChatGPT-6 proof reconstructed as a simplified, self-contained proof by three graph theorists, including original co-conjecturer János Pach",
    score: 4,
    ai: "ChatGPT-6 produced the core proof after being directed to a theorem of Beeker and Lazarovich. János Pach, Gábor Tardos and Ji Zeng interpreted the generated argument, simplified it and replaced its topological machinery with a self-contained combinatorial exposition.",
    summary:
      "Proves that every k-quasiplanar topological graph on n vertices has O_k(n) edges. This removes the remaining polylogarithmic factor for every k at least 5 and completes the conjecture previously known only for k at most 4.",
    importance:
      "4/5: resolves a three-decade-old extremal graph-theory conjecture in full generality. Reconstruction by three specialists, including an author of the original conjecture, supports Established status, although no formal proof or separate independent audit has been located.",
    source: "https://arxiv.org/abs/2611.07314",
    sourceLabel: "View the self-contained proof and AI-use account",
    addedDate: "November 6, 2026",
    addedIsoDate: "2026-11-06",
  },
  {
    title: "2s SSP Conjecture for Implicit Runge–Kutta Methods",
    field: "Numerical analysis, time integration & stability theory",
    date: "November 5, 2026",
    isoDate: "2026-11-05",
    outcome: "Proved",
    status: "Six-author specialist reconstruction; elementary components of every proof machine-verified in Lean 4",
    score: 3,
    ai: "ChatGPT, Claude and Gemini exposed a dictionary between strong-stability-preserving Runge–Kutta methods and absorbing Markov chains, suggested phase-type distribution tools and assisted the algebra. The authors checked, corrected and rewrote every argument; elementary components of all proofs were then verified in Lean 4.",
    summary:
      "Proves the sharp upper bound C(A,b) ≤ 2s for every s-stage implicit Runge–Kutta method of order at least two, settling the Ketcheson–Macdonald–Gottlieb conjecture. The same framework gives a third-order bound and an algebraic-stability order barrier.",
    importance:
      "3/5: settles a fundamental optimality question for stability-preserving time integrators and adds two related structural bounds. Multi-author specialist checking and released Lean verification of the elementary proof components support Established status.",
    source: "https://arxiv.org/abs/2611.07981",
    sourceLabel: "View the proof, verification scope and AI methodology",
    addedDate: "November 6, 2026",
    addedIsoDate: "2026-11-06",
  },
  {
    title: "Kinetic Kato Square Root Problem",
    field: "Analysis of PDEs, hypoelliptic operators & functional calculus",
    date: "November 2, 2026",
    isoDate: "2026-11-02",
    outcome: "Proved",
    status: "Complete specialist-authored proof; the author reports verifying every argument, but no independent audit or formalization has been located",
    score: 4,
    ai: "GPT-6 Astra identified positive Rockland operators as the missing route to an intrinsic smoothing theory. Kaj Nyström used that lead to develop the Littlewood–Paley machinery, with the model also helping to develop, check and rewrite arguments; Nyström states that he verified all mathematics and references.",
    summary:
      "Identifies the square-root domain of a rough complex measurable Kolmogorov operator with its intrinsic Sobolev energy space, with comparable norms and no symmetry, continuity or smallness assumptions on the coefficients.",
    importance:
      "4/5: solves the kinetic analogue of the Kato square root problem for the natural rough-coefficient class and supplies a new intrinsic smoothing framework. Detailed checking by the expert author supports Established status, while independent scrutiny is still pending.",
    source: "https://arxiv.org/abs/2611.03104",
    sourceLabel: "View the proof and detailed AI declaration",
    addedDate: "November 6, 2026",
    addedIsoDate: "2026-11-06",
  },
  {
    title: "Quadratic-Size Universal Random Permutations",
    field: "Probabilistic combinatorics & permutation patterns",
    date: "October 9, 2026",
    isoDate: "2026-10-09",
    outcome: "Proved",
    status: "GPT-6 Pro proof verified and digested by the two authors; no independent audit or formalization has been located",
    score: 3,
    ai: "GPT-6 Pro found the proof strategy that removes the iterated-logarithm overhead in the best previous bound. Yu Chen and Yiting Wang verified the argument, digested it into a human proof and strengthened the revised quantitative estimate.",
    summary:
      "Proves that a uniformly random permutation of length 32n² contains every permutation of length n with probability at least 1 − exp(−n/25). This gives the optimal quadratic order and resolves an open problem of Noga Alon.",
    importance:
      "3/5: closes the asymptotic gap for random universal permutations and answers a named combinatorics problem with an explicit high-probability bound. Author verification supports Established status, though broader independent scrutiny has not yet appeared.",
    source: "https://arxiv.org/abs/2610.13530",
    sourceLabel: "View the proof and revised quantitative bound",
    addedDate: "November 6, 2026",
    addedIsoDate: "2026-11-06",
  },
  {
    title: "Hinrichs–Vybíral Conjecture",
    field: "Functional analysis, positive-definite functions & matrix inequalities",
    date: "September 18, 2026",
    isoDate: "2026-09-18",
    outcome: "Disproved",
    status: "Explicit finite counterexample directly verified by original co-conjecturer Jan Vybíral; no further independent audit located",
    score: 3,
    ai: "ChatGPT 6 found the counterexample in a single prompt. Jan Vybíral, a co-author of the original conjecture, analysed it and published the explicit construction with direct checks of every hypothesis and the exact inequality gap.",
    summary:
      "Gives a nonnegative positive-definite trigonometric polynomial on R^7 and eight points that violate the proposed matrix lower bound. Nonnegative Fourier coefficients certify positive definiteness, cube interpolation proves pointwise nonnegativity, and the quadratic-form gap is exactly −1/10.",
    importance:
      "3/5: settles a concrete functional-analysis conjecture with a small, fully explicit counterexample. Detailed checking and publication by an original co-conjecturer support Established status, although broader independent scrutiny has not yet appeared.",
    source: "https://arxiv.org/abs/2609.21733",
    sourceLabel: "View the explicit counterexample and verification",
    addedDate: "November 5, 2026",
    addedIsoDate: "2026-11-05",
  },
  {
    title: "Just Finite Presentation Conjecture (Kourovka Problem 21.10)",
    field: "Group theory, finite presentations & geometric group theory",
    date: "May 11, 2026",
    isoDate: "2026-05-11",
    outcome: "Proved",
    status: "Accepted by the Journal of Group Theory after referee review; revised proof incorporates referee extensions",
    score: 3,
    ai: "Google DeepMind's Gemini 3.1 Pro-based AI co-mathematician proposed the core construction and proof, detected a flaw in its first argument, confirmed Marc Lackenby's human fix, wrote up the repair and later checked and corrected the manuscript. Lackenby added the just-(FA) and just-(T) extensions; the referee supplied further extensions.",
    summary:
      "Proves that every finite group has a finite presentation in which deleting any relation makes the presented group infinite, resolving Kourovka Notebook Problem 21.10. The construction in fact gives stronger just-(FA) and just-small presentations for broad classes of finitely presented groups.",
    importance:
      "3/5: resolves a named open problem in group theory and produces a stronger general construction. Acceptance after specialist referee review, including substantive referee extensions, supports Established status.",
    source: "https://arxiv.org/abs/2605.10402",
    sourceLabel: "View the accepted proof and detailed AI methodology",
    addedDate: "November 5, 2026",
    addedIsoDate: "2026-11-05",
  },
  {
    title: "Kaplansky Conjectures for Torsion-Free Hyperbolic Groups in Positive Characteristic",
    field: "Group theory, group rings & formal verification",
    date: "November 3, 2026",
    isoDate: "2026-11-03",
    outcome: "Disproved",
    status: "Main theorem for every prime formalized in Lean 4; intended-statement interpretation remains the principal trust boundary",
    score: 5,
    ai: "The construction and proof build decisively on OpenAI's AI-generated characteristic-two counterexample and exclusion machinery. The authors and S. V. Ivanov developed the odd-characteristic signed cancellation; Nidhal Mghirbi formalized the full result for every prime in Lean 4.",
    summary:
      "For every prime p, constructs a finitely presented torsion-free word-hyperbolic group whose group algebra over characteristic p is not directly finite and therefore violates all four Kaplansky conjectures. The odd-characteristic groups are new, and the characteristic-two case gains hyperbolicity.",
    importance:
      "5/5: settles the positive-characteristic version for a central class of groups and supplies the first torsion-free hyperbolic counterexamples. The main existence theorem and its algebraic consequences are kernel-checked in Lean, supporting Established status.",
    source: "https://arxiv.org/abs/2611.04599",
    secondarySource: "https://github.com/Apsiape/kaplansky-conjectures-hyperbolic-groups/tree/v1.0.3/lean/KaplanskyLean",
    sourceLabel: "View the paper and verification scope",
    secondarySourceLabel: "Inspect the Lean 4 formalization",
    addedDate: "November 4, 2026",
    addedIsoDate: "2026-11-04",
  },
  {
    title: "Kung–Traub Conjecture",
    field: "Numerical analysis, root-finding complexity & formal verification",
    date: "September 20, 2026",
    isoDate: "2026-09-20",
    outcome: "Proved",
    status: "Full paper theorems formally verified in Lean 4 and checked against the manuscript",
    score: 4,
    ai: "ChatGPT 6 assisted the complete Lean formalization, while ChatGPT 5.6 and 6 also helped discuss and check parts of the mathematical argument. Matthew J. Colbrook reviewed every argument and used Lean 4 Comparator to confirm that the formal statements match the paper, with no unproved axioms added.",
    summary:
      "Proves the 1974 Kung–Traub conjecture: a deterministic stationary root-finding method without memory that uses at most n real scalar function or derivative evaluations per iteration cannot have universal local order above 2^(n−1). The proof allows adaptive evaluation points and derivative orders and includes sharper grouped and complex-valued variants.",
    importance:
      "4/5: settles a fifty-year-old optimal-complexity conjecture for iterative root finding under very general evaluation rules. The released kernel-checked formalization supports Established status.",
    source: "https://arxiv.org/abs/2610.40660",
    secondarySource: "https://github.com/MColbrook/Kung-Traub_conjecture",
    sourceLabel: "View the proof and formal-verification account",
    secondarySourceLabel: "Inspect the Lean 4 development",
    addedDate: "November 3, 2026",
    addedIsoDate: "2026-11-03",
  },
  {
    title: "Kervaire and Kervaire–Laudenbach Conjectures",
    field: "Group theory, equations over groups & formal verification",
    date: "October 30, 2026",
    isoDate: "2026-10-30",
    outcome: "Proved",
    status: "Independently confirmed by a named group theorist and recorded as solved in the official Kourovka Notebook update",
    score: 4,
    ai: "An internal OpenAI mathematics model produced the proof. The single-relator case was formalized in Lean, and group theorist N. V. Bogachev independently confirmed the general argument before the Kourovka Notebook editors marked Problems 17.94 and 18.87(a) solved.",
    summary:
      "Proves the Kervaire conjecture that every nonsingular equation over a nontrivial group has a solution over that group, together with the Kervaire–Laudenbach strengthening for systems of equations under the corresponding rank condition.",
    importance:
      "4/5: resolves two long-standing problems about equations over groups. Named specialist confirmation and the official problem-list update provide substantial external scrutiny, while only the single-relator part currently has a public machine-checked proof.",
    source:
      "https://kourovkanotebookorg.wordpress.com/wp-content/uploads/2026/10/21upd-3.pdf",
    secondarySource:
      "https://github.com/openai/math/blob/main/preprints/The-Kervaire-Theorem-for-Groups-September-24-2026/The-Kervaire-Theorem-for-Groups-September-24-2026.pdf",
    sourceLabel: "View the official Kourovka Notebook confirmation",
    secondarySourceLabel: "View OpenAI's proof and Lean-verification account",
    addedDate: "October 31, 2026",
    addedIsoDate: "2026-10-31",
  },
  {
    title: "Pure Semisimplicity Conjecture",
    field: "Representation theory, module theory & formal verification",
    date: "October 29, 2026",
    isoDate: "2026-10-29",
    outcome: "Disproved",
    status: "Main counterexample theorem fully formalized in Lean 4 and independently checked by the author",
    score: 4,
    ai: "GPT-6 Astra developed the criterion, construction and main proof. Junpeng Ren independently verified the arguments, while GPT-6.1 Sol and Claude Opus 5.5 assisted a Lean 4 formalization that replays from imported declarations using only standard axioms.",
    summary:
      "Constructs a left pure-semisimple ring that is not of finite representation type, disproving the pure semisimplicity conjecture. The construction converts an infinite locally finite quiver with controlled path relations into the required module-theoretic counterexample.",
    importance:
      "4/5: settles a major representation-theoretic conjecture that had remained open for decades. A complete machine-checked main theorem and released source code support Established status, though broader specialist commentary is still limited.",
    source: "https://arxiv.org/abs/2610.39883",
    secondarySource: "https://github.com/oasisss6666/pure-semisimplicity-lean",
    sourceLabel: "View the paper and formal-verification statement",
    secondarySourceLabel: "View the Lean 4 development",
    addedDate: "October 31, 2026",
    addedIsoDate: "2026-10-31",
  },
  {
    title: "Spectral Isometry Conjecture for Unital C*-Algebras",
    field: "Operator algebras, spectral geometry & Jordan structure",
    date: "October 29, 2026",
    isoDate: "2026-10-29",
    outcome: "Proved",
    status: "AI proof independently digested into a concise human proof by two operator-algebra specialists",
    score: 4,
    ai: "GPT-6 Astra found the proof. Matthew J. Colbrook and George Stepaniants independently extracted the argument, verified its steps and rewrote it as a self-contained nine-page human proof.",
    summary:
      "Proves that every unital surjective complex-linear spectral isometry between unital C*-algebras is a Jordan isomorphism. In the non-unital case it is a central-unitary multiple of one, settling the long-standing spectral isometry conjecture.",
    importance:
      "4/5: gives a broad structural classification for spectrum-preserving maps on C*-algebras. The two-author specialist reconstruction provides substantial human checking, though no formalization or further independent audit is yet available.",
    source: "https://arxiv.org/abs/2610.40470",
    sourceLabel: "View the specialist proof and AI-use statement",
    addedDate: "October 30, 2026",
    addedIsoDate: "2026-10-30",
  },
  {
    title: "Serre's Conjecture on the Artin Character",
    field: "Algebraic geometry, commutative algebra & Artin characters",
    date: "October 28, 2026",
    isoDate: "2026-10-28",
    outcome: "Proved",
    status: "Senior specialist developed, checked and refined the AI-assisted proof into a complete manuscript",
    score: 4,
    ai: "Mark Kisin used GPT-6 Astra extensively to find the proof and prepare a first draft, then invested substantial specialist effort in understanding, checking and refining every part of the final argument.",
    summary:
      "Proves the mixed-characteristic case of Serre's conjecture on the Artin character, completing the remaining case of the 1960 conjecture by establishing the required effectivity for local intersection multiplicities.",
    importance:
      "4/5: closes a long-standing conjecture at the intersection of arithmetic geometry and commutative algebra. The final paper reflects detailed checking by a leading specialist, though no independent formalization or second proof has yet appeared.",
    source: "https://hexagonmath.org/2610.00597v1",
    sourceLabel: "View the proof and detailed human-checking account",
    addedDate: "October 31, 2026",
    addedIsoDate: "2026-10-31",
  },
  {
    title: "Structure of Khovanov Local Equivalence Groups",
    field: "Knot theory, Khovanov homology & smooth concordance",
    date: "October 27, 2026",
    isoDate: "2026-10-27",
    outcome: "Classified",
    status: "Specialist author checked the AI-developed results; no independent audit or formalization located",
    score: 4,
    ai: "Anthropic Claude models carried out most of the research with modest prompting from Robert Lipshitz. Lipshitz checked the results, supplied corrections where noted and wrote the final paper.",
    summary:
      "Determines substantial new structure in Khovanov local-equivalence groups, including independent infinite 2-torsion subgroups, infinite-rank free direct summands and at least six new integer-valued smooth-concordance homomorphisms.",
    importance:
      "4/5: answers explicit structural questions from earlier work and adds several new concordance invariants. A leading specialist performed detailed checking, but independent scrutiny and machine verification are still absent.",
    source: "https://arxiv.org/abs/2610.37595",
    sourceLabel: "View the paper and detailed AI-use statement",
    addedDate: "October 29, 2026",
    addedIsoDate: "2026-10-29",
  },
  {
    title: "Smale's Mean Value Problem",
    field: "Complex analysis, polynomial critical points & interval arithmetic",
    date: "October 26, 2026",
    isoDate: "2026-10-26",
    outcome: "Disproved",
    status: "AI counterexample independently digested by two specialists, with an explicit example verified by interval arithmetic",
    score: 5,
    ai: "GPT-6 Astra found the original counterexample. Tom Adamczewski and Matthew J. Colbrook independently extracted the geometric mechanism, developed a human proof and certified an explicit degree-29,984 example by interval arithmetic.",
    summary:
      "Disproves Smale's mean value conjecture by turning a boundary-geometric re-entry mechanism into polynomial counterexamples in every sufficiently large degree, while also describing the critical points and their limiting distribution.",
    importance:
      "5/5: resolves a prominent long-standing problem in complex analysis with both a conceptual human explanation and a rigorous explicit certificate. The independent reconstruction goes well beyond merely restating the AI output.",
    source: "https://arxiv.org/abs/2610.36158",
    sourceLabel: "View the independent specialist analysis",
    addedDate: "October 28, 2026",
    addedIsoDate: "2026-10-28",
  },
  {
    title: "Harary–Hill Conjecture",
    field: "Topological graph theory & crossing numbers",
    date: "October 25, 2026",
    isoDate: "2026-10-25",
    outcome: "Proved",
    status: "OpenAI proof independently reconstructed, simplified and extended in a complete specialist exposition",
    score: 5,
    ai: "OpenAI's mathematics system produced the original proof. Combinatorics specialist Martin Balko independently worked through it, streamlined several difficult steps and combined it with known reductions for further graph families.",
    summary:
      "Proves the Harary–Hill formula for the crossing number of every complete graph K_n, settling the long-standing conjecture that the standard construction has the minimum possible number of crossings.",
    importance:
      "5/5: resolves a central problem in topological graph theory open since the 1960s. The independent 16-page specialist reconstruction supplies substantial human scrutiny and also determines crossing numbers for several related graph families.",
    source: "https://arxiv.org/abs/2610.34444",
    sourceLabel: "View the independent specialist exposition",
    addedDate: "October 27, 2026",
    addedIsoDate: "2026-10-27",
  },
  {
    title: "Propeller Conjecture",
    field: "Gaussian geometry, probability & approximation algorithms",
    date: "October 23, 2026",
    isoDate: "2026-10-23",
    outcome: "Proved",
    status: "OpenAI's proof independently simplified and strengthened in a complete specialist manuscript",
    score: 4,
    ai: "OpenAI's mathematics system produced the original proof. Steven Heilman independently reworked it into a shorter human proof, removed the epsilon-net computer search from the three-dimensional case and established the equality classification.",
    summary:
      "Proves the Khot–Naor propeller conjecture: for every measurable partition of Euclidean space, the sum of the squared Gaussian centroid lengths is at most 9/(8π), with equality only for three 120-degree planar sectors, up to the natural symmetries and products.",
    importance:
      "4/5: settles a 2008 Gaussian-partition conjecture with consequences for approximation algorithms and Grothendieck-type inequalities. The independent specialist proof supplies substantial human scrutiny and strengthens the original AI result.",
    source: "https://arxiv.org/abs/2610.32158",
    sourceLabel: "View the independent specialist proof",
    addedDate: "October 26, 2026",
    addedIsoDate: "2026-10-26",
  },
  {
    title: "Frame-Indifferent Rank-One Convexity Does Not Imply Quasiconvexity in Three Dimensions",
    field: "Calculus of variations, nonlinear elasticity & formal verification",
    date: "October 22, 2026",
    isoDate: "2026-10-22",
    outcome: "Disproved",
    status: "Main theorems formally verified in Lean 4; authors checked the mathematical proof and its formal statements",
    score: 4,
    ai: "Claude Opus 5.5 assisted the construction, proofs, symbolic and numerical calculations, then wrote the entire Lean 4 formalization under the authors' guidance. The authors checked every paper argument and the formal theorem statements.",
    summary:
      "Constructs a smooth frame-indifferent energy density on 3×3 matrices that is rank-one convex but not quasiconvex, giving the first known counterexample compatible with the left-rotation invariance required in nonlinear elasticity.",
    importance:
      "4/5: resolves a structural open question at the interface of the calculus of variations and elasticity. The explicit construction and released kernel-checked formalization make the result unusually reproducible; the stronger isotropic case remains open.",
    source: "https://arxiv.org/abs/2610.31886",
    secondarySource: "https://github.com/sergioconti/so3-r1c-and-not-qc",
    sourceLabel: "View paper and verification statement",
    secondarySourceLabel: "View the Lean 4 formalization",
    addedDate: "October 26, 2026",
    addedIsoDate: "2026-10-26",
  },
  {
    title: "Barnette's Conjecture",
    field: "Graph theory, planar graphs & Hamiltonian cycles",
    date: "October 21, 2026",
    isoDate: "2026-10-21",
    outcome: "Proved",
    status: "AI proof independently rebuilt and statement-checked, with a complete specialist exposition",
    score: 5,
    ai: "OpenAI generated the proof. Graph theorist Zhentao Li wrote a self-contained 14-page human exposition, while Cameron Nottingham independently rebuilt the Lean development, checked it against the intended statement and successfully compiled all 8,955 jobs using only standard axioms.",
    summary:
      "Proves that every 3-connected cubic bipartite planar graph has a Hamiltonian cycle, settling Barnette's long-standing conjecture.",
    importance:
      "5/5: resolves a prominent conjecture about Hamiltonicity in planar graphs. The independent executable reconstruction and full specialist exposition provide unusually strong verification for an AI-originated result.",
    source: "https://arxiv.org/abs/2610.30490",
    secondarySource: "https://github.com/cjnott1999/barnette-conjecture",
    sourceLabel: "View the specialist exposition",
    secondarySourceLabel: "View the independent Lean reconstruction",
    addedDate: "October 23, 2026",
    addedIsoDate: "2026-10-23",
  },
  {
    title: "Imaginary Quadratic Fields of Class Number at Most 2000",
    field: "Number theory, class groups & formal verification",
    date: "October 15, 2026",
    isoDate: "2026-10-15",
    outcome: "Classified",
    status: "Exact unconditional classification; decisive zero-free input formalized in Lean and checked by two kernels",
    score: 4,
    ai: "An OpenAI-derived zero-free argument supplied the decisive new analytic input. Iwao Kimura made the estimates explicit and formalized the discriminant bound in Lean; the authors report checks by two independent kernels and disclose additional AI assistance throughout the project.",
    summary:
      "Determines all 16,453,493 imaginary quadratic fields with class number at most 2000, with largest absolute discriminant 1,062,350,083. The result makes unconditional lists and counts that had previously depended on the generalized Riemann hypothesis.",
    importance:
      "4/5: extends an exact unconditional classification from class number 100 to 2000 and releases reproducible code and data. The machine-checked analytic bound supports Established status.",
    source: "https://arxiv.org/abs/2610.21511",
    sourceLabel: "View paper, verification and data links",
    addedDate: "October 23, 2026",
    addedIsoDate: "2026-10-23",
  },
  {
    title: "Nagata Conjecture",
    field: "Algebraic geometry, plane curves & interpolation",
    date: "October 21, 2026",
    isoDate: "2026-10-21",
    outcome: "Proved",
    status: "AI-originated proof reorganized, simplified and checked in a complete specialist exposition",
    score: 5,
    ai: "OpenAI's mathematics system generated the original proof. Algebraic geometer Jenia Tevelev then reconstructed the argument, simplified its architecture and wrote a self-contained human proof of the intended conjecture.",
    summary:
      "Proves Nagata's conjecture for at least ten very general points in the projective plane: every plane curve through the points with equal multiplicity has degree at least the square root of the number of points times that multiplicity.",
    importance:
      "5/5: resolves a central 1959 problem connecting linear systems, interpolation and birational geometry. The detailed specialist reconstruction supplies substantial human scrutiny beyond the original AI manuscript.",
    source: "https://arxiv.org/abs/2610.30050",
    sourceLabel: "View Tevelev's checked and simplified proof",
    addedDate: "October 22, 2026",
    addedIsoDate: "2026-10-22",
  },
  {
    title: "Kozma–Nitzan Conjecture on Critical Percolation",
    field: "Probability, percolation theory & harmonic analysis",
    date: "October 21, 2026",
    isoDate: "2026-10-21",
    outcome: "Proved",
    status: "AI-originated proof independently reconstructed in a complete specialist exposition",
    score: 5,
    ai: "OpenAI supplied the proof. Probability theorist Jean-Baptiste Gouéré independently worked through the argument and wrote a complete human exposition with the theorem, lemmas and estimates made explicit.",
    summary:
      "Proves the Kozma–Nitzan decay conjecture for the critical two-point function. As a consequence, critical Bernoulli bond percolation on the integer lattice has no infinite cluster in every dimension at least two, closing the dimensions left between the classical planar and high-dimensional results.",
    importance:
      "5/5: settles a major all-dimensional critical-percolation question. A full specialist reconstruction provides the detailed human checking required for Established status.",
    source: "https://arxiv.org/abs/2610.30063",
    sourceLabel: "View Gouéré's specialist exposition",
    addedDate: "October 22, 2026",
    addedIsoDate: "2026-10-22",
  },
  {
    title: "Matrix-Multiplication Exponent at Most 9/4 over Every Field",
    field: "Algebraic complexity, matrix multiplication & formal verification",
    date: "October 21, 2026",
    isoDate: "2026-10-21",
    outcome: "Improved",
    status: "Human specialist proof plus multiple independent Lean formalizations of the core bound",
    score: 5,
    ai: "OpenAI discovered the original complex-field argument. Three complexity researchers reconstructed and generalized it to every field and rectangular exponents; independent teams produced several Lean proofs of the central inequality.",
    summary:
      "Proves that the matrix-multiplication exponent is at most 9/4 over every field, extends the construction to rectangular matrix multiplication and identifies a sharp operational barrier for this method.",
    importance:
      "5/5: gives a field-uniform improvement to one of theoretical computer science's most important quantitative frontiers. The result has an unusually strong verification chain: a detailed human generalization and multiple independent machine-checked proofs.",
    source: "https://arxiv.org/abs/2610.30054",
    sourceLabel: "View specialist proof, generalization and verification history",
    addedDate: "October 22, 2026",
    addedIsoDate: "2026-10-22",
  },
  {
    title: "Small Cohen–Macaulay Counterexamples in Every Dimension at Least Three",
    field: "Commutative algebra, singularities & algebraic geometry",
    date: "October 21, 2026",
    isoDate: "2026-10-21",
    outcome: "Disproved",
    status: "AI-originated mechanism checked and generalized with complete specialist proofs",
    score: 5,
    ai: "An OpenAI manuscript supplied the core variance identity and the initial counterexample mechanism. Cristian Anghel checked the construction and developed complete human proofs extending it to all dimensions at least three.",
    summary:
      "Constructs complete local domains with isolated singularities and no small Cohen–Macaulay modules in every dimension at least three, disproving the expected existence statement throughout that range.",
    importance:
      "5/5: resolves a foundational existence problem in commutative algebra far beyond one isolated example. The new specialist manuscript gives complete proofs of both the base mechanism and its all-dimensional extension.",
    source: "https://arxiv.org/abs/2610.30027",
    sourceLabel: "View checked proof and all-dimensional generalization",
    addedDate: "October 22, 2026",
    addedIsoDate: "2026-10-22",
  },
  {
    title: "Separation of Microstates and Non-Microstates Free Entropy",
    field: "Operator algebras, free probability & information geometry",
    date: "October 19, 2026",
    isoDate: "2026-10-19",
    outcome: "Disproved",
    status: "AI-originated counterexample independently reconstructed and extended in a detailed specialist manuscript",
    score: 5,
    ai: "OpenAI's October mathematics release produced the first example with finite microstates free entropy χ strictly below non-microstates free entropy χ*. David Jekel then built and checked a closely related example and exposed the Fisher-information mechanism.",
    summary:
      "A long-standing expectation that the two principal versions of Voiculescu's free entropy might agree is false even for Connes-embeddable variables with finite χ. The specialist follow-up also proves an explicit separation between free Fisher information and the large-matrix limit of classical Fisher information.",
    importance:
      "5/5: resolves a foundational open problem in free probability and changes the expected large-deviation picture for random matrices. The independent 32-page expert treatment supplies substantial human scrutiny and a variant proof rather than merely restating the AI manuscript.",
    source: "https://arxiv.org/abs/2610.27243",
    sourceLabel: "View independent specialist reconstruction and extension",
    addedDate: "October 21, 2026",
    addedIsoDate: "2026-10-21",
  },
  {
    title: "Macroscopic Geroch and Hyperbolic Conjectures in Dimension Two",
    field: "Differential geometry, scalar curvature & systolic geometry",
    date: "August 31, 2026",
    isoDate: "2026-08-31",
    outcome: "Proved",
    status: "AI-generated proof checked and reworked by two differential-geometry specialists",
    score: 4,
    ai: "ChatGPT-5.6 Pro produced the results and fundamental proof strategy without significant author assistance. Otis Chodosh and Noa Vikman checked and reworked the proof and wrote the human exposition.",
    summary:
      "Proves the generalized Geroch conjecture and the corresponding hyperbolic volume conjecture in dimension two, giving sharp macroscopic scalar-curvature and volume-growth obstructions for tori and closed hyperbolic surfaces.",
    importance:
      "4/5: settles two geometric conjectures in the full two-dimensional case. The October revision makes the unusually strong provenance explicit and provides detailed checking by two relevant human experts, satisfying the archive's Established threshold.",
    source: "https://arxiv.org/abs/2609.00186",
    sourceLabel: "View checked human presentation of the AI proof",
    addedDate: "October 21, 2026",
    addedIsoDate: "2026-10-21",
  },
  {
    title: "Two Torus-Polynomial Open Problems",
    field: "Circuit complexity, Boolean functions & formal verification",
    date: "October 13, 2026",
    isoDate: "2026-10-13",
    outcome: "Proved",
    status: "Both main results released as Lean 4 proofs in the public circuit-complexity library, including the required explicit approximate-degree bound",
    score: 3,
    ai: "GPT-6 Astra discovered the arguments and formalized them in Lean using Saint Wesonga's circuit-complexity framework; the author selected the questions, checked the proof development and wrote the exposition.",
    summary: "Answers two open problems of Krishan and Vishwanathan: bounded three-valued lifts cannot give low-degree torus approximations to Majority, and every Boolean function has an explicit degree-at-most n−1 torus approximation with the optimal parity-dependent error.",
    importance: "3/5: closes two precise questions in an approach to the major ACC⁰-versus-Majority problem and supplies reproducible kernel-checked proofs. It does not itself separate Majority from ACC⁰.",
    source: "https://arxiv.org/abs/2610.19174",
    secondarySource: "https://github.com/formalcs/circuit-complexity/releases/tag/release%2F0.2.0",
    sourceLabel: "View theorem and formalization scope",
    secondarySourceLabel: "View released Lean proofs",
    addedDate: "October 16, 2026",
    addedIsoDate: "2026-10-16",
  },
  {
    title: "Rational Exponents Conjecture",
    field: "Extremal graph theory",
    date: "October 13, 2026",
    isoDate: "2026-10-13",
    outcome: "Proved",
    status: "Full proof reconstructed, explained and checked in a specialist manuscript by eight extremal-combinatorics researchers; no formal proof",
    score: 5,
    ai: "GPT-6 Astra found the proof during an Epoch AI research benchmark. David Conlon, Oliver Janzer, Tao Jiang, Jaehoon Kim, Joonkyung Lee, Hong Liu, Sean Longbrake and Liana Yepremyan then produced the mathematical exposition and situated every ingredient.",
    summary: "For every rational r between 1 and 2, there is a graph H whose extremal number grows as Theta(n^r). This proves the Erdős–Simonovits rational exponents conjecture for single forbidden graphs, removing the degeneracy obstacle left by the earlier finite-family result.",
    importance: "5/5: closes a central program in extremal graph theory. The unusually broad specialist author team provides substantial human scrutiny of the AI-originated proof, although the result remains a new preprint rather than a machine-checked development.",
    source: "https://arxiv.org/abs/2610.18713",
    sourceLabel: "View the eight-author proof",
    addedDate: "October 15, 2026",
    addedIsoDate: "2026-10-15",
  },
  {
    title: "GPT-6 Astra's 1.844 LMP Approximation and 1.8 Barrier",
    field: "Approximation algorithms, facility location & k-median",
    date: "October 13, 2026",
    isoDate: "2026-10-13",
    outcome: "Improved",
    status: "The two AI-originated claims in Remark 1.5 have public Lean proofs; this entry does not attribute the paper's separate human-only 1.9499 analysis to AI",
    score: 4,
    ai: "GPT-6 Astra found a 13-term bidding function with LMP ratio 1.844, proved that every admissible bidding function in this framework has factor-revealing value at least 1.8, and generated Lean certificates for both claims.",
    summary: "Improves the factor revealed by the paper's generalized-bidding framework from 1.9499 to 1.844 and proves that the same framework cannot go below 1.8 without a new idea. These are facility-location LMP guarantees used inside the broader better-than-2 k-median program, not by themselves a 1.844 approximation for exact k-median.",
    importance: "4/5: provides both a stronger certified bound and a certified limitation on a promising approximation framework. The scope is deliberately narrow: the surrounding k-median theorems were developed by the human authors without AI.",
    source: "https://arxiv.org/abs/2610.18144",
    secondarySource: "https://github.com/epfl-thl2/project-k-median",
    sourceLabel: "View manuscript and exact scope",
    secondarySourceLabel: "View Lean certificates",
    addedDate: "October 15, 2026",
    addedIsoDate: "2026-10-15",
  },
  {
    title: "Exact Selection Complexity: V₇(16) = 28",
    field: "Selection algorithms, decision trees & formal verification",
    date: "October 13, 2026",
    isoDate: "2026-10-13",
    outcome: "Demonstrated",
    status: "Exact decision-graph certificates checked by an independent verifier; all new bounds also formalized in Lean and archived with code",
    score: 3,
    ai: "AI coding assistants implemented the exhaustive search software and produced first proof drafts under the author's direction; the resulting certificates and formal proofs make the mathematical claims independently checkable.",
    summary: "Determines that selecting the seventh-smallest of 16 elements needs exactly 28 comparisons and that selecting the fifth-smallest of 17 needs exactly 27, together with several new upper bounds. The upper bounds are explicit decision graphs rather than heuristic search outputs.",
    importance: "3/5: settles concrete long-open exact comparison counts and supplies unusually strong reproducibility through certificates, a static checker and Lean. The result is precise but narrower than the major structural conjectures in the archive.",
    source: "https://arxiv.org/abs/2610.18740",
    secondarySource: "https://github.com/JCremerr/selection-7-of-16",
    sourceLabel: "View proof and AI disclosure",
    secondarySourceLabel: "View code, certificates and Lean",
    addedDate: "October 15, 2026",
    addedIsoDate: "2026-10-15",
  },
  {
    "title": "Truly Subquadratic 3SUM and Truly Subcubic APSP",
    "field": "Fine-grained complexity & graph algorithms",
    "date": "October 5, 2026",
    "isoDate": "2026-10-05",
    "addedDate": "October 9, 2026",
    "addedIsoDate": "2026-10-09",
    "outcome": "Disproved",
    "score": 5,
    "status": "Central deterministic theorems and all relied-on lemmas machine-checked in public Lean 4/Mathlib; the specialist authors reconstructed, simplified and extended the AI-discovered algorithm",
    "ai": "An internal Anthropic research model autonomously discovered the core thin-matrix-product algorithm during a 16-million-output-token session with no human input. A separate Anthropic model later formalized the main results in Lean.",
    "summary": "Gives deterministic O(n^1.9992) time for integer 3SUM and O(n^2.9995) time for directed integer-weight all-pairs shortest paths, the first polynomial improvements over their textbook bounds. This refutes the standard 3SUM and APSP hypotheses and, through reductions, several related fine-grained-complexity hypotheses.",
    "importance": "5/5: breaks two foundational fine-grained-complexity barriers underlying many conditional lower bounds. The paper carefully separates the AI-shared core algorithm from the authors' new data-structure extension and reductions; the formalization covers the stated 3SUM, Exact Triangle, APSP and zero-weight clique bounds.",
    "source": "https://arxiv.org/abs/2610.06783",
    "secondarySource": "https://github.com/anthropics/formal-math/tree/main/3sum-apsp",
    "sourceLabel": "View specialist manuscript",
    "secondarySourceLabel": "View Lean certification"
  },
  {
    "title": "Linear Hadwiger Conjecture",
    "field": "Graph coloring & graph minors",
    "date": "October 4, 2026",
    "isoDate": "2026-10-04",
    "addedDate": "October 7, 2026",
    "addedIsoDate": "2026-10-07",
    "outcome": "Proved",
    "score": 4,
    "status": "Full unconditional Lean formalization with documented successful clean CI build and dependency audit; not rebuilt in this review",
    "ai": "GPT-6 Astra found the central proof and bootstrap under Sergey Norin and Raphael Steiner's research directions; the authors wrote the exposition. Codex 6 Sol and Astra formalized the proof and its graph-theoretic inputs.",
    "summary": "Proves that an absolute constant C exists such that every finite Kₜ-minor-free graph is Ct-colorable. The arXiv manuscript was submitted October 4. The public Lean theorem uses Mathlib graph and coloring definitions and explicitly defined clique-minor branch sets.",
    "importance": "4/5: completes the long-running search for an asymptotically linear coloring bound. The repository documents a fresh September 25 build and audits with only standard Lean axioms, including proofs of the required inputs. This is the linear version, not the full Hadwiger conjecture; neither an optimized constant nor an executable coloring algorithm is supplied.",
    "source": "https://arxiv.org/abs/2610.05291",
    "secondarySource": "https://github.com/snorin239/LinearHadwiger",
    "tertiarySource": "https://github.com/snorin239/LinearHadwiger/actions/runs/36144270677",
    "sourceLabel": "View manuscript",
    "secondarySourceLabel": "View complete Lean formalization",
    "tertiarySourceLabel": "View recorded clean build"
  },
  {
    "title": "Strict Gaussian Ellipsoid-Fitting Threshold",
    "field": "Probability & random convex geometry",
    "outcome": "Proved",
    "score": 4,
    "status": "Proof checked and refined by four named mathematicians; independent concurrent papers establish the same strict threshold",
    "ai": "Muse Spark 1.1/1.2 Thinking Mode developed proof strategies and candidate arguments with Aykut Arslan; human reviewers corrected and refined the proof",
    "summary": "For n independent Gaussian points in dimension d, an exact positive-definite ellipsoid fit exists with high probability strictly below n/d² = 1/4; above that threshold even positive-semidefinite fitting fails. The critical window remains unresolved.",
    "importance": "Resolves the strict-threshold form of the Saunderson–Parrilo–Willsky conjecture. Independent August 2026 proofs corroborate the result; this is an independently developed AI-assisted proof, not a claim of publication priority.",
    "source": "https://ai.meta.com/research/publications/the-strict-threshold-for-gaussian-ellipsoid-fitting/",
    "secondarySource": "https://arxiv.org/abs/2608.10184",
    "secondarySourceLabel": "Read an independent threshold proof",
    "date": "October 2, 2026",
    "isoDate": "2026-10-02",
    "addedDate": "October 5, 2026",
    "addedIsoDate": "2026-10-05",
    "sourceLabel": "Read the manuscript and AI contribution statement"
  },
  {
    "title": "Finite-Time Blow-Up for Radial Mass-Critical Biharmonic NLS",
    "field": "Partial differential equations & nonlinear dispersive analysis",
    "outcome": "Proved",
    "score": 4,
    "status": "Detailed specialist review by Fazel Hadadifard and Salem Selim; human-refined proof, without claimed machine formalization",
    "ai": "Muse Spark 1.1/1.2 Thinking Mode helped Leonard Dinh develop calculations, candidate arguments and proof revisions; Dinh supplied the problem and key ideas",
    "summary": "In dimensions N ≥ 2, every radial H² solution of the focusing mass-critical biharmonic nonlinear Schrödinger equation with negative energy blows up in finite time in both time directions, ruling out infinite-time-only growth.",
    "importance": "Settles the radial negative-energy question left open by Boulenger and Lenzmann in 2015, using localized virial estimates and a Riccati argument. The theorem concerns this precise equation and hypothesis set, not arbitrary wave collapse.",
    "source": "https://ai.meta.com/research/publications/finite-time-blow-up-of-radial-negative-energy-solutions-for-the-mass-critical-biharmonic-nonlinear-schrodinger-equation/",
    "date": "October 2, 2026",
    "isoDate": "2026-10-02",
    "addedDate": "October 5, 2026",
    "addedIsoDate": "2026-10-05",
    "sourceLabel": "Read the manuscript and AI contribution statement"
  },
  {
    "title": "Kida's Semiabelian–Monomial Conjecture",
    "field": "Finite groups & computational algebra",
    "outcome": "Disproved",
    "score": 3,
    "status": "Explicit order-384 counterexample checked by the authors and two additional mathematicians; GAP search and outputs supplied",
    "ai": "Muse Spark generated the GAP search program that found SmallGroup(384,20127); Joseph Phillip Brennan and Milana Golich verified its properties and completed the argument",
    "summary": "A group with 384 elements is semiabelian but not monomial, refuting Kida's conjecture. The paper supplies an explicit recursive abelian-factor decomposition establishing the required semiabelian property.",
    "importance": "Separates two proposed classes of finite groups through a concrete, reproducible obstruction. Andres Barei and John Portin reviewed the work; a different independent Nilradical counterexample is acknowledged.",
    "source": "https://ai.meta.com/research/publications/semiabelian-groups-need-not-be-monomial/",
    "date": "October 2, 2026",
    "isoDate": "2026-10-02",
    "addedDate": "October 5, 2026",
    "addedIsoDate": "2026-10-05",
    "sourceLabel": "Read the manuscript and AI contribution statement"
  },
  {
    "title": "Exact Cycle Relaxations for Completed Length-Three Alpha-Cycles",
    "field": "Discrete optimization & multilinear polytopes",
    "outcome": "Proved",
    "score": 3,
    "status": "Proof checked, corrected and refined by Aykut Arslan and specialist reviewer Kien Trung Le",
    "ai": "Muse Spark helped reformulate the problem probabilistically, find a parity obstruction and develop the proof strategy; the mathematicians repaired gaps",
    "summary": "For completed supports of length-three alpha-cycles, the cycle-based relaxation with switched generalized triangle inequalities equals the multilinear polytope exactly when each pair-only intersection contains one vertex. Common and private blocks may have arbitrary sizes.",
    "importance": "Answers the Del Pia–Khajavirad characterization question for this structured family, identifying precisely when the relaxation loses information and when extra inequalities are necessary.",
    "source": "https://ai.meta.com/research/publications/tightness-of-the-cycle-based-relaxation-for-completed-length-three-alpha-cycles/",
    "date": "October 2, 2026",
    "isoDate": "2026-10-02",
    "addedDate": "October 5, 2026",
    "addedIsoDate": "2026-10-05",
    "sourceLabel": "Read the manuscript and AI contribution statement"
  },
  {
    "title": "Idempotent-Free Evolution Algebras Need Not Be Solvable",
    "field": "Non-associative algebra",
    "outcome": "Disproved",
    "score": 3,
    "status": "Explicit three-dimensional counterexample and replacement criterion checked by the author and Nicolás Jaramillo Torres; independent counterexamples also published",
    "ai": "Muse Spark generated the counterexample and proposed alternative characterizations and proofs; Andres Barei checked, revised and rewrote the mathematics",
    "summary": "A complex evolution algebra of dimension three has no nonzero idempotent but is not solvable, disproving the García-Martínez–Pérez-Rodríguez conjecture. A replacement solvability criterion uses idempotent subspaces instead of individual elements.",
    "importance": "Corrects a proposed structural characterization at the smallest possible counterexample dimension. Independent work by Hu and Wen corroborates the failure of the conjecture; this is an algebra result, not a biological finding.",
    "source": "https://ai.meta.com/research/publications/on-solvable-evolution-algebras-and-a-conjecture-by-garcia-martinez-and-perez-rodriguez/",
    "secondarySource": "https://arxiv.org/abs/2609.25023",
    "secondarySourceLabel": "Read independent counterexamples",
    "date": "October 2, 2026",
    "isoDate": "2026-10-02",
    "addedDate": "October 5, 2026",
    "addedIsoDate": "2026-10-05",
    "sourceLabel": "Read the manuscript and AI contribution statement"
  },
  {
    "title": "Non-Convergence in Heterogeneous Hegselmann–Krause Models",
    "field": "Dynamical systems & mathematical opinion models",
    "outcome": "Disproved",
    "score": 3,
    "status": "Explicit AI-found trajectories and counterexamples verified by the three specialist authors across two manuscripts; no machine formalization claimed",
    "ai": "Claude Opus 5.5 found the earlier auxiliary counterexamples; an AI system also helped locate the final bounded-influence non-convergent trajectory. Peter Hegarty, Damiano Ognissanti and Edvin Wedin verified the constructions and wrote the papers.",
    "summary": "An explicit synchronized bounded-influence trajectory does not converge, resolving the principal 2012 conjecture negatively. Together with the bounded-confidence counterexample and the earlier failures of freezing and pseudostability, both standard heterogeneous models can fail to converge.",
    "importance": "3/5: completes a correction of the 2012 heterogeneous opinion-dynamics framework and shows that heterogeneity can prevent convergence in both principal models. The evidence is explicit and author-checked, but not independently formalized.",
    "source": "https://arxiv.org/abs/2610.37246",
    "secondarySource": "https://arxiv.org/abs/2610.03229",
    "secondarySourceLabel": "View the earlier auxiliary counterexamples",
    "date": "October 27, 2026",
    "isoDate": "2026-10-27",
    "addedDate": "October 5, 2026",
    "addedIsoDate": "2026-10-05",
    "sourceLabel": "Read the final non-convergence manuscript"
  },
  {
    title: "Borowiecki–Broere Generalized Total Colouring Conjecture for Planar Graphs",
    field: "Graph theory, planar colouring & formal verification",
    date: "September 7, 2026",
    isoDate: "2026-09-07",
    outcome: "Proved",
    status: "All novel arguments kernel-checked in Lean 4 without sorry, admit or native_decide, relative to six explicit standard background theorems",
    score: 3,
    ai: "ChatGPT 6 Astra generated the mathematical proof; ChatGPT 5.6 Sol helped translate it into Lean 4, and the author independently checked the result",
    summary:
      "Every finite simple planar graph has a generalized total colouring with four colours. More strongly, every proper four-colouring of the vertices extends to such a colouring.",
    importance:
      "The result settles the planar case of a 1995 generalized total-colouring conjecture and sharpens it with an extension theorem. The public formalization checks the new proof while stating its six classical graph-theoretic and topological dependencies explicitly.",
    source: "https://arxiv.org/abs/2610.00091",
    sourceLabel: "View proof, formalization scope and AI disclosure",
    secondarySource: "https://github.com/jamesschreib/borowiecki-broere-conjecture",
    secondarySourceLabel: "Inspect the Lean 4 formalization",
    addedDate: "October 2, 2026",
    addedIsoDate: "2026-10-02",
  },
  {
    title: "Wormald's Conjecture on Common Transversals in Cubic Graphs",
    field: "Graph theory, perfect matchings & formal verification",
    date: "September 7, 2026",
    isoDate: "2026-09-07",
    outcome: "Disproved",
    status: "Explicit 16-vertex counterexample and infinite family kernel-checked in Lean 4 without custom axioms; the connected case remains open",
    score: 3,
    ai: "ChatGPT 6 Astra found the disconnected counterexample family and proof; ChatGPT 5.6 Sol assisted the Lean 4 formalization, which the author independently checked",
    summary:
      "A 16-vertex cubic graph has two perfect matchings with no common transversal, and the construction extends to every order 16 + 4t. This disproves Wormald's 1987 conjecture as originally stated.",
    importance:
      "The result closes the unrestricted formulation through a small, formally verified obstruction. Because the construction exploits disconnected graphs, the structurally stronger connected version is still unresolved.",
    source: "https://arxiv.org/abs/2610.00086",
    sourceLabel: "View counterexample, Lean scope and AI disclosure",
    secondarySource: "https://github.com/jamesschreib/wormald-conjecture",
    secondarySourceLabel: "Inspect the Lean 4 proof",
    addedDate: "October 2, 2026",
    addedIsoDate: "2026-10-02",
  },
  {
    title: "Tracelike Vectors for Modular Orbits in Bergman Space",
    field: "Operator algebras, automorphic forms & independent replication",
    date: "September 30, 2026",
    isoDate: "2026-09-30",
    outcome: "Proved",
    status: "Core critical-parameter construction independently obtained in a simultaneous specialist paper; the broader parameter range has one author-reviewed proof",
    score: 3,
    ai: "ChatGPT helped turn a long-stalled near-solution into the decisive infinite semidefinite system and polar-decomposition correspondence",
    summary:
      "An explicit tracelike vector is constructed at Vaughan Jones's critical parameter, and the method extends across the full admissible range 1 < s ≤ s₀. At the endpoint its group orbit is an orthonormal basis of the weighted Bergman space.",
    importance:
      "The result answers a concrete question left by Jones and identifies the implementing vector for the associated von Neumann-algebra correspondence. Abreu's independent paper confirms the endpoint theorem by a related orthonormalization method; the full-range extension remains unique to the AI-assisted paper.",
    source: "https://arxiv.org/abs/2609.39904",
    sourceLabel: "View the AI-assisted proof and disclosure",
    secondarySource: "https://arxiv.org/abs/2609.30014",
    secondarySourceLabel: "View the independent endpoint construction",
    addedDate: "October 1, 2026",
    addedIsoDate: "2026-10-01",
  },
  {
    title: "Complex Structures on the Six-Sphere",
    field: "Complex geometry, topology & independent specialist verification",
    date: "September 29, 2026",
    isoDate: "2026-09-29",
    outcome: "Proved",
    status: "Self-contained specialist proof independently verifies and substantially recasts the Claude-produced construction",
    score: 5,
    ai: "Claude produced the original 108-page construction under Levent Alpöge's direction; Philip Engel used ChatGPT while exploring it and drafting a new proof, then independently verified the mathematics",
    summary:
      "A one-parameter family of compact complex threefolds is constructed and shown to be diffeomorphic to S⁶. The proof builds a torus fibration, performs logarithmic transforms, and establishes simple connectivity and integral-homology-sphere topology.",
    importance:
      "Whether S⁶ admits a complex structure is the classical Hopf problem, open since the 1950s and marked by earlier flawed claims. Engel's independent, self-contained specialist treatment provides the strong human verification needed to treat this AI-originated construction as established.",
    source: "https://arxiv.org/abs/2609.38442",
    sourceLabel: "View the independent proof and AI disclosure",
    secondarySource: "https://alpo.ge/s6.pdf",
    secondarySourceLabel: "View the original Claude-produced manuscript",
    addedDate: "October 1, 2026",
    addedIsoDate: "2026-10-01",
  },
  {
    title: "Negative Answer to Erdős Problem #786",
    field: "Number theory, extremal multiplicative combinatorics & formal verification",
    date: "September 28, 2026",
    isoDate: "2026-09-28",
    outcome: "Disproved",
    status: "Both negative answers kernel-checked in Lean 4 against the Formal Conjectures statements; the separate harmonic-sum theorem is not formalized",
    score: 4,
    ai: "OpenAI GPT models and Anthropic Claude substantially assisted development of the proofs and the Lean formalization",
    summary:
      "Admissible subsets of {1,…,N} cannot have density tending to one: an absolute positive fraction must be omitted for all sufficiently large N. This answers the remaining distinct-products part of Erdős Problem #786 negatively.",
    importance:
      "The result closes a problem posed in 1965 about multiplicative relations among distinct integers. The exact headline claims are publicly formalized and checked by Lean's kernel, while the paper's stronger harmonic-sum estimate remains outside that certificate.",
    source: "https://arxiv.org/abs/2609.37471",
    sourceLabel: "View proof, scope and AI disclosure",
    secondarySource: "https://github.com/daizisheng/erdos-786",
    secondarySourceLabel: "Inspect the Lean formalization",
    addedDate: "September 30, 2026",
    addedIsoDate: "2026-09-30",
  },
  {
    title: "Three Open Questions on Gödel's Ontological-Argument Formalization",
    field: "Modal logic, automated reasoning & dual formal verification",
    date: "September 28, 2026",
    isoDate: "2026-09-28",
    outcome: "Proved",
    status: "Every positive result independently kernel-checked in Isabelle/HOL and Lean 4; negative results have reproducible Nitpick or explicit-model certificates",
    score: 3,
    ai: "Anthropic Claude interactively helped develop the formal proofs, hybrid-witness detector and parts of both formalizations over a large, sustained research session",
    summary:
      "Three questions left open by the 2025 Monatshefte notes on Gödel's and Scott's ontological arguments are settled after correcting a degenerate conjunction axiom. The work also proves that all 294 earlier results have object-language proofs without nominals.",
    importance:
      "The contribution resolves a cluster of specialist questions while auditing an entire formal corpus across two proof assistants. Its philosophical scope is narrow, but the unusually redundant, rebuildable verification is strong.",
    source: "https://arxiv.org/abs/2609.36279",
    sourceLabel: "View results, certificates and AI disclosure",
    addedDate: "September 30, 2026",
    addedIsoDate: "2026-09-30",
  },
  {
    title: "Crown Graphs Maximise Bipartite Representation Number",
    field: "Graph theory, word-representable graphs & formal verification",
    date: "September 24, 2026",
    isoDate: "2026-09-24",
    outcome: "Proved",
    status: "Main theorem, exact crown values and finite obstruction certificates checked in Lean 4; independent certificate verifiers and complete data released",
    score: 4,
    ai: "ChatGPT 5.5, 5.6 and 6 supplied the key obstruction classification and distinguished-coordinate argument; Codex assisted certificate generation and Lean formalization",
    summary:
      "Every bipartite graph on N ≥ 9 vertices has representation number at most ⌈N/4⌉, and balanced crown graphs attain the bound. This settles the conjecture that crown graphs maximize representation number among bipartite graphs.",
    importance:
      "The theorem gives the sharp extremal value for an established graph parameter. The complete Lean proof and separately reproducible finite certificates strongly support both the infinite reduction and exceptional cases.",
    source: "https://arxiv.org/abs/2609.35842",
    sourceLabel: "View proof and detailed AI contribution statement",
    secondarySource: "https://github.com/miinadietrich/crown_graphs_maximise",
    secondarySourceLabel: "Inspect formal proofs and certificates",
    addedDate: "September 30, 2026",
    addedIsoDate: "2026-09-30",
  },
  {
    title: "Inhomogeneous Duffin–Schaeffer Conjecture for Rational Shifts",
    field: "Diophantine approximation, metric number theory & independent replication",
    date: "September 25, 2026",
    isoDate: "2026-09-25",
    outcome: "Disproved",
    status: "AI-discovered counterexamples independently confirmed by a simultaneous specialist paper; broader residual-set claim has only the first proof",
    score: 4,
    ai: "GPT-5.6 Sol discovered the counterexample construction for the He–Liao paper; the authors checked and completed the proof",
    summary:
      "For every nonzero rational shift, there is a divergent approximating function whose inhomogeneous Duffin–Schaeffer limsup set nevertheless has measure zero. He and Liao further show that failure occurs for a residual set of shifts.",
    importance:
      "The rational-shift result disproves a natural inhomogeneous analogue of the Duffin–Schaeffer conjecture and was obtained independently at the same time by Hauke-Treuer, Maynard and Pollington. That independent agreement establishes the core counterexample; the stronger residual-set extension still rests on the AI-assisted paper.",
    source: "https://arxiv.org/abs/2609.30870",
    sourceLabel: "View the AI-assisted proof and attribution",
    secondarySource: "https://arxiv.org/abs/2609.30921",
    secondarySourceLabel: "View the independent simultaneous proof",
    addedDate: "September 29, 2026",
    addedIsoDate: "2026-09-29",
  },
  {
    title: "Irrationality of at Least One of ζ₂(7) and ζ₂(9)",
    field: "p-adic number theory, irrationality & formal verification",
    date: "September 25, 2026",
    isoDate: "2026-09-25",
    outcome: "Proved",
    status: "Headline theorem kernel-checked in Lean 4 with Mathlib; the identification with Kubota–Leopoldt values uses one cited literature lemma outside the formalization",
    score: 4,
    ai: "AI agents produced the mathematical argument and Lean development under human direction; the public registry does not enumerate the individual models",
    summary:
      "At least one of the two 2-adic zeta values ζ₂(7) and ζ₂(9) is irrational. The formal development proves the result for the corresponding Volkenborn-integral values and audits the final theorem without extra hypotheses.",
    importance:
      "Irrationality of individual p-adic zeta values remains extremely difficult. Reducing the alternative from three candidate values to two is concrete progress, and the released kernel-checked proof supports the exact stated disjunction.",
    source: "https://palomar-registry.org/entry.html?id=PALOMAR-2026-09-25-000026&version=1",
    sourceLabel: "View registry record and verification report",
    secondarySource: "https://github.com/gmDevi/zeta2-7-9-lean",
    secondarySourceLabel: "Inspect the Lean proof",
    addedDate: "September 28, 2026",
    addedIsoDate: "2026-09-28",
  },
  {
    title: "A Left PCI Left V-Domain Without the Right-Hand Properties",
    field: "Ring theory, module theory & formal verification",
    date: "September 25, 2026",
    isoDate: "2026-09-25",
    outcome: "Disproved",
    status: "Explicit construction and asymmetry theorems kernel-checked in Lean; Palomar integrity and axiom checks passed",
    score: 4,
    ai: "Anthropic Claude produced the mathematics, paper and Lean code under human direction",
    summary:
      "A countable domain is constructed that is simultaneously left PCI and a left V-domain but is not right Ore, right PCI or a right V-domain. This gives one object answering three long-standing left–right symmetry questions negatively.",
    importance:
      "The construction settles questions dating to the 1970s about whether these homological and module-theoretic properties are left–right symmetric. The complete public Lean certificate supports the exact counterexample claims.",
    source: "https://palomar-registry.org/entry.html?id=PALOMAR-2026-09-25-000005&version=1",
    sourceLabel: "View registry record and verification report",
    secondarySource: "https://github.com/vlad902/left-pci-v-domain-not-right-pci-v-domain",
    secondarySourceLabel: "Inspect the Lean development",
    addedDate: "September 28, 2026",
    addedIsoDate: "2026-09-28",
  },
  {
    title: "Khachiyan’s Ellipsoid Conjecture",
    field: "Convex geometry, optimization & formal verification",
    date: "September 23, 2026",
    isoDate: "2026-09-23",
    outcome: "Proved",
    status: "Main theorem, optimality and supporting results fully kernel-checked in Lean 4 with Mathlib",
    score: 4,
    ai: "An unnamed AI language model discovered the spectral proof in a human-directed research process and also assisted the Lean 4 formalization",
    summary:
      "Every halfspace through the center of a convex body’s maximum-volume inscribed ellipsoid reduces the maximal ellipsoid volume to at most √e/2 of the original, and circular cones show that this dimension-free constant is sharp.",
    importance:
      "The result settles Khachiyan’s conjecture with the exact optimal constant, strengthening the geometric foundation of central-cut ellipsoid methods. The released Lean development verifies the headline theorem and its sharpness.",
    source: "https://arxiv.org/abs/2609.28447",
    sourceLabel: "View proof and AI disclosure",
    secondarySource: "https://github.com/DrZhouKarl/KhachiyanEllipsoidConjecture",
    secondarySourceLabel: "Inspect the Lean verification",
    addedDate: "September 27, 2026",
    addedIsoDate: "2026-09-27",
  },
  {
    title: "Phase Retrieval from a Uniformly Discrete Point Set",
    field: "Harmonic analysis, sampling theory & formal verification",
    date: "September 23, 2026",
    isoDate: "2026-09-23",
    outcome: "Proved",
    status: "Headline existence theorem formally verified in Lean 4; public proof and code released",
    score: 4,
    ai: "GPT-5.5 supplied the decisive VC-dimension bound and enabled the first one-dimensional proof; GPT-5.4 and GPT-5.5 assisted the broader development, which the authors extended and formalized",
    summary:
      "For every Gaussian-times-polynomial window, there is a uniformly discrete set of phase-space samples whose short-time Fourier-transform magnitudes determine every L² function up to a global phase, with separation independent of the polynomial degree.",
    importance:
      "The theorem overcomes the known impossibility of lattice-based sampled phase retrieval and supplies an existence result in every dimension. The paper’s main result has a public Lean certificate.",
    source: "https://arxiv.org/abs/2609.28341",
    sourceLabel: "View paper and detailed AI attribution",
    secondarySource: "https://github.com/josefgreilhuber/DiscretePhaseRetrieval",
    secondarySourceLabel: "Inspect the Lean formalization",
    addedDate: "September 27, 2026",
    addedIsoDate: "2026-09-27",
  },
  {
    title: "Komlós Conjecture and the Beck–Fiala Square-Root Bound",
    field: "Discrepancy theory, combinatorics & probability",
    date: "September 10, 2026",
    isoDate: "2026-09-10",
    outcome: "Proved",
    status: "Original proof independently reconstructed by multiple specialist teams, including a separate elementary proof",
    score: 5,
    ai: "The Odin Automatic AI Research Agent discovered the original directional-total-variation proof; GPT-6 later helped an independent team develop and check a distinct quadratic-energy exposition",
    summary:
      "Any finite collection of Euclidean unit vectors admits signs whose signed sum has dimension-free bounded infinity norm. The original proof obtains 3√(2π), settling Komlós and yielding the conjectured O(√t) Beck–Fiala discrepancy bound.",
    importance:
      "Komlós was one of discrepancy theory’s central long-standing conjectures, and its consequence gives the correct square-root order for Beck–Fiala. Independent specialist proofs now provide substantial confirmation beyond the AI-discovered manuscript.",
    source: "https://arxiv.org/abs/2609.11189",
    sourceLabel: "View the original AI-discovered proof",
    secondarySource: "https://arxiv.org/abs/2609.20979",
    secondarySourceLabel: "View the independent elementary proof",
    tertiarySource: "https://arxiv.org/abs/2609.27172",
    tertiarySourceLabel: "View a second independent exposition",
    addedDate: "September 27, 2026",
    addedIsoDate: "2026-09-27",
  },
  {
    title: "Stochastic Domination of Gaussian Maxima by the Regular Simplex",
    field: "Probability, information theory & formal verification",
    date: "September 23, 2026",
    isoDate: "2026-09-23",
    outcome: "Proved",
    status: "Main theorem and equality characterization fully kernel-checked in Lean; complete public verification report",
    score: 4,
    ai: "GPT-5.6 Pro proved dimensions three and four; GPT-6 Pro introduced the decisive second-variation matrix; the author completed the general proof and formalized Theorem 1.1 in Lean",
    summary:
      "Among centered Gaussian vectors with unit coordinate variances, the regular-simplex correlation matrix stochastically minimizes the maximum. Equality at any positive threshold uniquely characterizes the simplex configuration, proving the full Balitskiy–Karasev–Tsigler simplex conjecture.",
    importance:
      "The theorem resolves the full simplex conjecture and now has a public end-to-end Lean certificate for the headline result, including the equality case. That combination of a new AI-assisted proof and kernel-level verification meets the established threshold.",
    source: "https://arxiv.org/abs/2609.28452",
    sourceLabel: "View paper and detailed AI attribution",
    secondarySource: "https://github.com/abhmul/full-simplex-conjecture-lean",
    secondarySourceLabel: "Inspect the complete Lean verification",
    addedDate: "September 26, 2026",
    addedIsoDate: "2026-09-26",
  },
  {
    title: "Conway’s Refinement Conjecture for Omnific Integers",
    field: "Surreal numbers, algebra & formal verification",
    date: "September 18, 2026",
    isoDate: "2026-09-18",
    outcome: "Proved",
    status: "Headline statement kernel-checked in Lean; Palomar checks passed; independent mathematical review still limited",
    score: 4,
    ai: "A month-long multi-agent ChatGPT and Claude workflow selected the problem, developed and adversarially audited the mathematics, and produced the Lean proof",
    summary:
      "Whenever ab = cd for omnific integers, there are omnific integers e, f, g and h with a = ef, b = gh, c = eg and d = fh. The released development proves both a CombinatorialGames formulation and a largely self-contained Mathlib-only formulation.",
    importance:
      "The result addresses a 50-year-old Conway conjecture about the integer part of the surreal numbers. The author explicitly invites specialist scrutiny, but the intended headline statement has a public kernel-checked certificate with constrained imports and an axiom audit.",
    source: "https://overreacted.io/how-i-vibed-a-proof-of-conways-conjecture/",
    sourceLabel: "Read the proof announcement and verification account",
    secondarySource: "https://github.com/gaearon/conway-refinement",
    secondarySourceLabel: "Inspect the Lean proof",
    tertiarySource: "https://palomar-registry.org/entry?id=PALOMAR-2026-09-03-000002&version=1",
    tertiarySourceLabel: "View Palomar registry checks",
    addedDate: "September 20, 2026",
    addedIsoDate: "2026-09-20",
  },
  {
    title: "Universal Completeness of Exponential Systems",
    field: "Harmonic analysis, Fourier uniqueness & formal verification",
    date: "September 17, 2026",
    isoDate: "2026-09-17",
    outcome: "Proved",
    status: "Main theorems and higher-dimensional versions formally verified in Lean",
    score: 4,
    ai: "GPT-5.4, GPT-5.5 and GPT-5.6 developed the constructions and extensions; Claude Fable models helped refine the arguments; Codex produced the Lean formalization",
    summary:
      "The authors construct density-one frequency sets that are complete on every measurable set of measure below one, prove that asymptotically integer perturbations cannot be universal, settle the integer-frequency problem for every density v, and identify the sharp Sobolev threshold for periodic weak gaps.",
    importance:
      "The work resolves several linked Fourier-analysis questions, including cases previously conjectured impossible below density one half. The public Lean package checks the stated results directly, including their higher-dimensional forms.",
    source: "https://arxiv.org/abs/2609.20805",
    sourceLabel: "View paper and detailed AI attribution",
    secondarySource: "https://github.com/EnricFloritMath/UniversalCompleteness",
    secondarySourceLabel: "View Lean verification",
    addedDate: "September 20, 2026",
    addedIsoDate: "2026-09-20",
  },
  {
    title: "Strong Secretary Conjecture for Linear Matroids",
    field: "Online algorithms, matroid theory & optimal stopping",
    date: "September 17, 2026",
    isoDate: "2026-09-17",
    outcome: "Proved",
    status: "Independently obtained by a separate specialist team using an essentially identical approach; both preprints public",
    score: 4,
    ai: "ChatGPT-6 Astra produced the main proof in a recorded conversation on September 15; five specialists prepared, checked and wrote the manuscript",
    summary:
      "Linear matroids admit the optimal 1/e-probability-competitive secretary guarantee, both when the matroid is known in advance and when a finite-field representation arrives online. Every element of a fixed optimal basis is selected with probability at least 1/e.",
    importance:
      "This proves the strong secretary conjecture for the broad class of linear matroids, though the conjecture for arbitrary matroids remains open. A separate team posted the same result first after developing it independently, providing unusually strong immediate confirmation.",
    source: "https://arxiv.org/abs/2609.20797",
    sourceLabel: "View the AI-assisted proof and disclosure",
    secondarySource: "https://arxiv.org/abs/2609.19118",
    secondarySourceLabel: "View the independently developed proof",
    addedDate: "September 21, 2026",
    addedIsoDate: "2026-09-21",
  },
  {
    title: "Quantum Hedetniemi Conjecture",
    field: "Quantum graph theory, operator algebras & formal verification",
    date: "September 17, 2026",
    isoDate: "2026-09-17",
    outcome: "Disproved",
    status: "All paper theorems, lemmas and propositions checked in Lean in the projective formulation; exact integer certificates released",
    score: 4,
    ai: "A generative AI system proposed the core construction and proof idea; the author verified, simplified and organized the argument",
    summary:
      "Explicit finite graphs G and H satisfy χ(G×H) ≤ 1538 < 1539 = min{χq(G), χq(H)}, disproving the claim that the quantum chromatic number of a categorical product always equals the smaller factor value. The failure extends to spatial, approximate, commuting-operator and C*-algebraic variants.",
    importance:
      "This closes the quantum version of a classical graph-product conjecture with explicit counterexamples. The released Lean development checks the graph constructions, exact certificates and the projective-formulation counterexample statements.",
    source: "https://arxiv.org/abs/2609.20690",
    sourceLabel: "View counterexample and verification scope",
    secondarySource: "https://github.com/JuliusAZeiss/Lean-Verification-and-More-Quantum-Hedetniemi-conjecture",
    secondarySourceLabel: "View Lean verification and certificates",
    addedDate: "September 20, 2026",
    addedIsoDate: "2026-09-20",
  },
  {
    title: "Uniform Turán Density of the Tetrahedron",
    field: "Extremal combinatorics, hypergraphs & exact certificates",
    date: "September 10, 2026",
    isoDate: "2026-09-10",
    outcome: "Proved",
    status: "Exact independently auditable certificate plus a separate, independently developed non-AI-assisted proof",
    score: 5,
    ai: "ChatGPT 6 Pro found the decisive tensor inequality and generated programs for its sum-of-squares expansion; Aristotle separately audited the verifier",
    summary:
      "The uniform Turán density of the complete three-uniform hypergraph on four vertices is exactly 1/2, resolving the tetrahedron problem posed by Erdős and Sós in 1982.",
    importance:
      "This was the central open case in uniform Turán theory. The AI-assisted proof has an exact integer verifier, and an independent specialist team obtained the same result by a different computer-assisted route.",
    source: "https://arxiv.org/abs/2609.11802",
    sourceLabel: "View AI-assisted proof and exact certificate",
    secondarySource: "https://arxiv.org/abs/2609.08336",
    secondarySourceLabel: "View independent proof",
    addedDate: "September 20, 2026",
    addedIsoDate: "2026-09-20",
  },
  {
    title: "Köthe’s Conjecture and Rowen’s Question",
    field: "Ring theory, nil ideals & formal verification",
    date: "September 7, 2026",
    isoDate: "2026-09-07",
    outcome: "Disproved",
    status: "Original counterexample formally verified in Lean; general countable-field construction and Rowen application checked by specialist authors",
    score: 5,
    ai: "GPT-6 Astra found the initial counterexample from a Lean statement; ChatGPT assisted the authors with the generalization and technical development",
    summary:
      "The authors construct a ring in which the sum of two nil left ideals is not nil, disproving Köthe’s conjecture and its equivalent matrix and polynomial-ring formulations. The construction also answers a question of Rowen.",
    importance:
      "Köthe’s conjecture had remained open since 1930 and is one of ring theory’s best-known nil-ideal problems. The original AI-found construction has a public Lean proof, while the paper develops it over arbitrary countable fields.",
    source: "https://arxiv.org/abs/2609.07996",
    sourceLabel: "View proof and contribution statement",
    secondarySource: "https://github.com/tadamcz/koethe",
    secondarySourceLabel: "View original construction and Lean proof",
    addedDate: "September 20, 2026",
    addedIsoDate: "2026-09-20",
  },
  {
    title: "Benjamini–Häggström–Mossel and Loebl–Nešetřil–Reed Expectation Conjectures",
    field: "Probabilistic combinatorics, graph homomorphisms & formal verification",
    date: "September 17, 2026",
    isoDate: "2026-09-17",
    outcome: "Proved",
    status: "Main results fully checked in Lean 4; author-verified natural-language proof",
    score: 4,
    ai: "GPT-6 Astra developed the proof through interaction with the author; the resulting theorems were then formalized in Lean 4",
    summary:
      "Among connected bipartite graphs of a fixed order, a path maximizes the expected range of an integer-valued graph homomorphism pinned at zero. This proves the expectation form of the Benjamini–Häggström–Mossel conjecture and implies the Loebl–Nešetřil–Reed expectation conjecture for integer 1-Lipschitz functions.",
    importance:
      "The theorem resolves two linked conjectures with one structural induction argument. The public Lean development checks the intended main statements without placeholders or problem-specific axioms, meeting the established threshold.",
    source: "https://arxiv.org/abs/2609.19728",
    sourceLabel: "View proof and AI attribution",
    secondarySource: "https://github.com/yinfengzhu7-oss/graph-indexed-random-walk-lean",
    secondarySourceLabel: "View Lean verification",
    addedDate: "September 18, 2026",
    addedIsoDate: "2026-09-18",
  },
  {
    title: "Huang–Jiang–Oblomkov Torus-Knot Identity Conjecture",
    field: "Partition theory, algebraic geometry & formal verification",
    date: "September 17, 2026",
    isoDate: "2026-09-17",
    outcome: "Proved",
    status: "Main finite identity and conjecture Lean-checked conditional on two explicit published inputs",
    score: 5,
    ai: "AxiomProver formalized the paper's main finite identity and the resulting conjecture in Lean",
    summary:
      "For every coprime pair 1 < a < b, the normalized count attached to the torus-knot singularity Xᵃ = Yᵇ equals both the Huang–Jiang–Oblomkov q-series and an explicit infinite product. A stronger finite identity links the same series to bounded cylindric partitions.",
    importance:
      "The result extends the Rogers–Ramanujan and Andrews–Gordon identities to every torus-knot singularity, including all previously unknown cases with a > 3. The certificate is strong but explicitly depends on two named theorems from the literature rather than re-formalizing them.",
    source: "https://arxiv.org/abs/2609.20567",
    sourceLabel: "View proof and certificate scope",
    secondarySource: "https://github.com/AxiomMath/HJO",
    secondarySourceLabel: "View AxiomProver Lean certificate",
    addedDate: "September 18, 2026",
    addedIsoDate: "2026-09-18",
  },
  {
    title: "Sharper Trickle-Down Spectral-Gap Theorem",
    field: "Probability, high-dimensional expanders & Markov-chain mixing",
    date: "September 17, 2026",
    isoDate: "2026-09-17",
    outcome: "Proved",
    status: "Independently obtained in a separate paper with an extremely similar argument",
    score: 3,
    ai: "GPT-5.6 Sol Ultra developed the proofs in two separate author groups",
    summary:
      "A streamlined Bochner argument strengthens the quantitative dependence of the global down-up-walk spectral gap on dimension and spectral influence, resolving an open question of Leake and Oveis Gharan.",
    importance:
      "The bound improves a widely used local-to-global mixing theorem. A separate team independently reached the same strengthening, with the same model finding a closely related argument, providing strong cross-checking despite both discoveries being AI-assisted.",
    source: "https://arxiv.org/abs/2609.19514",
    sourceLabel: "View theorem and independent-confirmation note",
    secondarySource: "https://arxiv.org/abs/2608.06172",
    secondarySourceLabel: "View the independently obtained strengthening",
    addedDate: "September 18, 2026",
    addedIsoDate: "2026-09-18",
  },
  {
    title: "Browning–Sawin Conjecture on Random Sign Hypersurfaces",
    field: "Arithmetic geometry, random polynomials & formal verification",
    date: "September 16, 2026",
    isoDate: "2026-09-16",
    outcome: "Proved",
    status: "Main results formalized in Lean; five standard results from the literature remain explicit hypotheses",
    score: 4,
    ai: "AxiomProver helped search the literature, run experiments, reject failed strategies, develop the proof and formalize its main theorems",
    summary:
      "A random degree-d hypersurface whose coefficients are independent signs is smooth with probability tending to one as d grows. The paper proves the sharper singularity bound O_n(d^{-1/2}), exponential rarity of positive-dimensional singular loci, and—when n is at least three—an exponential bound for failure of absolute irreducibility.",
    importance:
      "This resolves Browning and Sawin's conjecture and strengthens it quantitatively. The public Lean development checks the paper's principal claims while clearly exposing the five imported algebraic-geometric facts on which it relies.",
    source: "https://arxiv.org/abs/2609.18879",
    sourceLabel: "View proof and verification scope",
    secondarySource: "https://github.com/AxiomMath/BrowningSawin",
    secondarySourceLabel: "View AxiomProver Lean certificate",
    addedDate: "September 17, 2026",
    addedIsoDate: "2026-09-17",
  },
  {
    title: "Global Spectral Gap for Uniformly Randomized-Step MALA",
    field: "Probability, Markov-chain Monte Carlo & formal verification",
    date: "September 5, 2026",
    isoDate: "2026-09-05",
    outcome: "Proved",
    status: "Principal theorem-level conclusions kernel-checked in Lean without placeholders or problem-specific axioms",
    score: 4,
    ai: "ChatGPT 5.6 Sol proposed the randomized-step approach, developed the principal proof strategy and generated the simulation and Lean 4 code",
    summary:
      "For strongly log-concave targets, uniformly randomizing the MALA step size restores a near-optimal global spectral-gap lower bound of order 1/(κ√d), up to logarithmic factors, even though no single fixed step works uniformly over the same target class.",
    importance:
      "The result supplies a rigorous global convergence guarantee for a fundamental sampling algorithm and separates randomized from fixed step sizes. The September 16 revision added a complete public Lean audit of the principal statements.",
    source: "https://arxiv.org/abs/2609.05847",
    sourceLabel: "View revised paper and verification account",
    secondarySource: "https://github.com/qianqin11/spectral-gap-randomized-step-MALA",
    secondarySourceLabel: "View Lean and simulation package",
    addedDate: "September 17, 2026",
    addedIsoDate: "2026-09-17",
  },
  {
    title: "Cassels–Swinnerton-Dyer Conjecture for Cubic Surfaces",
    field: "Arithmetic geometry, cubic surfaces & zero-cycles",
    date: "September 14, 2026",
    isoDate: "2026-09-14",
    outcome: "Proved",
    status: "Two independently developed proofs, checked and combined by specialist authors",
    score: 5,
    ai: "GPT-6 Astra supplied the rational-section idea for one proof; separate GPT conversations identified the tangent-direction jump behind the second",
    summary:
      "A cubic surface over any field has a rational point exactly when it has a point of degree coprime to three, equivalently a zero-cycle of degree one. Two independent arguments settle the missing smooth characteristic-zero degree-four case, followed by extensions to arbitrary fields and singular surfaces.",
    importance:
      "This closes the cubic-surface case of a major arithmetic-geometric conjecture. The two separately originated proof routes and detailed checking by two expert authors provide substantial human scrutiny.",
    source: "https://arxiv.org/abs/2609.15930",
    sourceLabel: "View both proofs and the detailed AI disclosure",
    addedDate: "September 16, 2026",
    addedIsoDate: "2026-09-16",
  },
  {
    title: "Dimension-Free Discrete Euclidean Ball Maximal Estimates",
    field: "Harmonic analysis, discrete maximal operators & asymptotic expansions",
    date: "September 9, 2026",
    isoDate: "2026-09-09",
    outcome: "Proved",
    status: "Confirmed by two concurrent independent papers; the AI-assisted author makes no priority claim",
    score: 4,
    ai: "ChatGPT and Codex developed the decisive small-radius expansion and the complete p ≥ 2 argument; the author checked it and extended the method to 1 < p < 2",
    summary:
      "The full discrete Euclidean-ball maximal operator on integer lattices is bounded on every ℓᵖ space with 1 < p ≤ ∞ by a constant independent of dimension. This resolves a question posed by Elias Stein in the mid-1990s.",
    importance:
      "The result settles a long-standing dimension-free harmonic-analysis problem. Two independently developed concurrent papers establish the same theorem, supplying strong external confirmation while clarifying that this manuscript does not claim priority.",
    source: "https://arxiv.org/abs/2609.10083",
    sourceLabel: "View revised AI-assisted proof and priority note",
    secondarySource: "https://arxiv.org/abs/2609.08433",
    secondarySourceLabel: "View one concurrent independent proof",
    tertiarySource: "https://arxiv.org/abs/2609.10763",
    tertiarySourceLabel: "View the other concurrent proof",
    addedDate: "September 16, 2026",
    addedIsoDate: "2026-09-16",
  },
  {
    title: "Erdős–Sós Conjecture",
    field: "Extremal graph theory, tree embeddings & formal verification",
    date: "September 14, 2026",
    isoDate: "2026-09-14",
    outcome: "Proved",
    status: "Complete Lean 4 verification plus a separate simplified proof by two specialist mathematicians",
    score: 5,
    ai: "GPT-6 Astra discovered the short counting argument; human authors subsequently simplified and extended it",
    summary:
      "Every graph with average degree greater than k−2 contains every k-vertex tree. GPT-6 Astra found the decisive counting proof, closing the classical 1960s conjecture; Oliver Riordan and Alex Scott then published a shorter, independently written presentation of the argument.",
    importance:
      "This settles a central extremal-graph conjecture that resisted a complete exact proof for roughly six decades. The intended theorem has both a public Lean certificate and detailed human specialist scrutiny, so it meets the established threshold.",
    source: "https://arxiv.org/abs/2609.15893",
    sourceLabel: "View independent simplified proof",
    secondarySource: "https://www.erdosproblems.com/static/548copy.pdf",
    secondarySourceLabel: "View GPT-6 Astra's original proof",
    tertiarySource: "https://github.com/tadamcz/erdos548",
    tertiarySourceLabel: "View complete Lean verification",
    addedDate: "September 15, 2026",
    addedIsoDate: "2026-09-15",
  },
  {
    title: "Addario-Berry–Havet–Linhares Sales–Reed–Thomassé Conjecture",
    field: "Directed graph theory & oriented tree embeddings",
    date: "September 14, 2026",
    isoDate: "2026-09-14",
    outcome: "Proved",
    status: "Two independently written proofs from specialist teams, both adapting the AI-originated Erdős–Sós argument",
    score: 3,
    ai: "GPT-6 Astra supplied the core counting method; the two author groups independently adapted it to antidirected trees",
    summary:
      "Every digraph with average outdegree greater than k−2 contains every antidirected tree with k vertices. Riordan and Scott derive the theorem with minor changes to the Astra argument, while Santos, Stein and Williams independently obtained the same result a few days earlier.",
    importance:
      "The theorem resolves a 2013 conjecture and gives the sharp directed extension naturally implied by the new Erdős–Sós method. Independent agreement between two specialist groups supplies substantial external scrutiny.",
    source: "https://arxiv.org/abs/2609.15893",
    sourceLabel: "View one proof and its relation to the AI argument",
    secondarySource: "https://arxiv.org/abs/2609.09142",
    secondarySourceLabel: "View the independent proof",
    addedDate: "September 15, 2026",
    addedIsoDate: "2026-09-15",
  },
  {
    title: "Tuza's Ryser-Conjecture Claim for (r, ν) = (4, 2)",
    field: "Extremal combinatorics, hypergraphs & exact computation",
    date: "September 13, 2026",
    isoDate: "2026-09-13",
    outcome: "Proved",
    status: "Short human-readable proof; every AI-supplied structural claim independently checked by exact MILP and brute force",
    score: 3,
    ai: "GPT-5.6 Sol Pro found the projection lemma and five-sentence core proof through four verified reasoning rounds; Claude built the independent checking workflow",
    summary:
      "Every four-partite, four-uniform hypergraph with matching number two has a vertex cover of size at most six. This confirms Tuza's unpublished 1979 claim and closes the (4,2) case of Ryser's conjecture, improving the previous bound of seven.",
    importance:
      "The result closes a concrete Ryser case that was still recorded as open in 2021. The proof is only five pages, and the author reports exhaustive exact checks of every structural claim, including corrections to two intermediate model claims.",
    source: "https://arxiv.org/abs/2609.14281",
    sourceLabel: "View proof, exact-checking record and AI methodology",
    addedDate: "September 15, 2026",
    addedIsoDate: "2026-09-15",
  },
  {
    title: "Caragiu–Vicol–Zaki Golden-Ratio Conjecture",
    field: "Number theory, additive closure & formal verification",
    date: "September 12, 2026",
    isoDate: "2026-09-12",
    outcome: "Proved",
    status: "Full mathematical proof formally verified in Lean 4 with public source code",
    score: 2,
    ai: "GPT-6 Astra provided algorithmic assistance in constructing the underlying proof",
    summary:
      "For Conway's subprime closure generated from one, the ratio of the sizes of two consecutive stages converges to the golden ratio. The theorem proves the conjecture of Caragiu, Vicol and Zaki.",
    importance:
      "This resolves a focused conjecture about a recursively generated number-theoretic set. Its reach is specialized, but the complete proof is independently checkable through the released Lean development.",
    source: "https://arxiv.org/abs/2609.14188",
    sourceLabel: "View paper and AI statement",
    secondarySource: "https://github.com/Renriviera/conway-subprime-golden",
    secondarySourceLabel: "View Lean formalization",
    addedDate: "September 15, 2026",
    addedIsoDate: "2026-09-15",
  },
  {
    title: "Undecidability of Medvedev Logic",
    field: "Mathematical logic, computability & formal verification",
    date: "September 11, 2026",
    isoDate: "2026-09-11",
    outcome: "Proved",
    status: "Authors report formal Lean verification of the main undecidability proof; full natural-language methodology released",
    score: 5,
    ai: "ChatGPT Sol 5.6 obtained the core reduction and technical proof; Claude Opus 5 translated and checked it in Lean",
    summary:
      "Medvedev's logic of finite problems is undecidable, settling a long-standing question by reducing periodic tiling to non-theoremhood.",
    importance:
      "Medvedev logic connects computability, superintuitionistic logic, dependence logic and topos theory, so undecidability changes the foundation of several related classification questions. The main claim was produced by an LLM and then machine-checked.",
    source: "https://arxiv.org/abs/2609.13359",
    sourceLabel: "View proof, formal-verification statement and methodology",
    addedDate: "September 15, 2026",
    addedIsoDate: "2026-09-15",
  },
  {
    title: "Complete Classification of Four-Arm Polyomino Tilings",
    field: "Combinatorics, tilings & formal verification",
    date: "September 11, 2026",
    isoDate: "2026-09-11",
    outcome: "Proved",
    status: "Complete all-parameter classification formally verified in Lean 4; finite certificates linked to arbitrary infinite tilings",
    score: 3,
    ai: "GPT-6 Astra explored cases, reconstructed and developed proofs, found constructions and counterexamples, generated certificates and produced the Lean formalization",
    summary:
      "The work completely classifies every square-grid tile formed from a central square and four straight arms by its ability to tile rectangles, strips, quadrants, half-planes, the plane and integer enlargements. Exactly five capability profiles occur.",
    importance:
      "The result closes an infinite family of tiling-classification questions and connects finite symbolic obstructions rigorously to infinite regions. The public Lean proof checks every natural arm-length tuple without trusted solver answers.",
    source: "https://arxiv.org/abs/2609.13641",
    sourceLabel: "View classification and AI provenance",
    secondarySource: "https://angelraychev.com/four-arm-polyominoes/",
    secondarySourceLabel: "View formal artifact and interactive companion",
    addedDate: "September 15, 2026",
    addedIsoDate: "2026-09-15",
  },
  {
    title: "Pierce–Birkhoff Conjecture",
    field: "Real algebraic geometry, lattice-ordered rings & formal verification",
    date: "September 9, 2026",
    isoDate: "2026-09-09",
    outcome: "Disproved",
    status: "Explicit hand-checkable counterexample; five examples formally verified in Lean 4",
    score: 5,
    ai: "Multi-agent Danus workflow chaining GPT-5.6, GPT-6, Claude Opus 5 and Claude Fable 5.1",
    summary:
      "The authors construct a continuous piecewise-quadratic function on a finite semialgebraic partition of R^30 that cannot be written as any finite lattice combination of polynomials, disproving the Pierce–Birkhoff conjecture. AI investigations produced the matrix-pair construction and the argument excluding representations of arbitrary degree.",
    importance:
      "The conjecture dates to the 1950s and was previously known only in dimensions at most two and for restricted partition classes. The published example is designed for direct human checking, while counterexamples in dimensions 5, 6, 7, 30 and 72 have independent Lean certificates.",
    source: "https://arxiv.org/abs/2609.10420",
    sourceLabel: "View paper and AI-discovery account",
    secondarySource: "https://github.com/7pocheR/Pierce-Birkhoff",
    secondarySourceLabel: "View Lean-verified counterexamples",
    addedDate: "September 10, 2026",
    addedIsoDate: "2026-09-10",
  },
  {
    title: "Small Undecidable Groups and Unrecognizable 4-Manifolds",
    field: "Group theory, geometric topology & formal verification",
    date: "September 9, 2026",
    isoDate: "2026-09-09",
    outcome: "Proved",
    status: "Three main algebraic theorems fully Lean-verified; author and specialist checks documented",
    score: 4,
    ai: "GPT-5.6 Sol Pro for the main construction and presentation reductions; Codex for the 28,000-line Lean formalization",
    summary:
      "The work constructs a 3-generator, 9-relator group with unsolvable word problem and smaller fixed-size Adian–Rabin families. These imply improved bounds: the seven-fold connected sum of S²×S² is topologically unrecognizable and the nine-fold sum is smoothly unrecognizable.",
    importance:
      "The construction improves records dating back to Borisov and sharpens quantitative undecidability bounds in four-manifold topology. Lean checks the three source theorems and all dependencies without project axioms or admitted steps; the topological corollaries use established external results.",
    source: "https://arxiv.org/abs/2609.10461",
    sourceLabel: "View paper, proof provenance and formalization audit",
    addedDate: "September 10, 2026",
    addedIsoDate: "2026-09-10",
  },
  {
    title: "Navier–Stokes Millennium Problem — Forced Finite-Time Blowup",
    field: "Partial differential equations, fluid dynamics & formal verification",
    date: "September 8, 2026",
    isoDate: "2026-09-08",
    outcome: "Disproved",
    status: "Zero-sorry Lean 4 proof released; independent specialists have reproduced the profile-construction stage and downstream work uses the result, but the full cancellation stage and Clay review remain incomplete",
    score: 5,
    ai: "An internal post-Astra OpenAI model across roughly 10,000 coordinated agents for discovery and proof; GPT-6 Astra for the complete Lean formalization",
    summary:
      "For every positive viscosity, the construction starts the three-dimensional incompressible Navier–Stokes flow from rest under a smooth compactly supported force and produces unbounded velocity in finite time while kinetic energy stays bounded. The whole-space and periodic versions establish alternatives C and D in Clay's official formulation.",
    importance:
      "This is a claimed resolution of one of the seven Millennium Prize Problems and a historic counterexample to global smoothness with allowed forcing. The target statements are machine-checked, and independent PDE work now supports and uses substantial parts of the construction, but no complete outside audit or Clay recognition exists.",
    source: "https://cdn.openai.com/pdf/32d9f210-8b73-45e0-91bc-82a30aef8a9a/navier-stokes.pdf",
    sourceLabel: "Read the 166-page proof",
    secondarySource: "https://github.com/openai/NavierStokesAndEuler",
    secondarySourceLabel: "View Lean proofs and independent-checking instructions",
    tertiarySource: "https://arxiv.org/abs/2609.35406",
    tertiarySourceLabel: "Read the independent profile-construction exposition",
    addedDate: "September 9, 2026",
    addedIsoDate: "2026-09-09",
  },
  {
    title: "Three-Dimensional Unforced Euler Equation — Smooth Finite-Time Blowup",
    field: "Partial differential equations, ideal-fluid dynamics & formal verification",
    date: "September 8, 2026",
    isoDate: "2026-09-08",
    outcome: "Disproved",
    status: "Complete zero-sorry Lean 4 formalization released; external specialist review has only begun",
    score: 5,
    ai: "OpenAI's coordinated internal research-agent system for the construction; GPT-6 Astra for Lean formalization and verification",
    summary:
      "The paper constructs smooth, compactly supported, divergence-free initial data on three-dimensional Euclidean space whose unforced incompressible Euler solution develops a finite-time singularity. Its velocity C¹ norm becomes unbounded and the time integral of the vorticity L∞ norm diverges.",
    importance:
      "Smooth finite-time blowup for the unforced three-dimensional Euler equation was a central open regularity problem in mathematical fluid mechanics. The source-facing theorem has a complete Lean certificate with independent comparator instructions, although broad human scrutiny is still at the starting line.",
    source: "https://cdn.openai.com/pdf/315b36cd-ec98-4023-8342-93345194ece1/euler.pdf",
    sourceLabel: "Read the 57-page proof",
    secondarySource: "https://github.com/openai/NavierStokesAndEuler",
    secondarySourceLabel: "View Lean proofs and independent-checking instructions",
    tertiarySource: "https://openai.com/index/navier-stokes-solution/",
    tertiarySourceLabel: "Read the research announcement and AI workflow",
    addedDate: "September 9, 2026",
    addedIsoDate: "2026-09-09",
  },
  {
    title: "Carlet's Cyclic-Additive Conjecture for Kasami APN Functions — Four Congruence Classes",
    field: "Finite fields, combinatorics, cryptography & formal verification",
    date: "August 19, 2026",
    isoDate: "2026-08-19",
    outcome: "Proved",
    status: "All new results and proofs formally verified in Lean 4; general conjecture remains open",
    score: 3,
    ai: "Claude Fable 5 for every new derivation, reduction and proof; Aristotle (Harmonic) for the subsequent Lean formalization",
    summary:
      "The authors prove Carlet's exact triple-count conjecture for Kasami almost-perfect-nonlinear functions whenever k modulo n is 1, 2, n−2 or n−1, including the first genuinely open case k=2. They also verify every admissible parameter pair through n=13, while leaving the remaining congruence classes open.",
    importance:
      "The theorem resolves four infinite parameter families in a cryptographic finite-field problem posed openly since 2018–2019. Its importance is substantial within the specialty, and the public Lean development independently checks the complete AI-originated proof record rather than only numerical examples.",
    source: "https://arxiv.org/abs/2608.18584",
    sourceLabel: "View revised paper and proof provenance",
    secondarySource: "https://github.com/nagygp/conjecture-on-kasami",
    secondarySourceLabel: "View complete Lean formalization",
    addedDate: "September 8, 2026",
    addedIsoDate: "2026-09-08",
  },
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
      "The permanent is a central #P-hard quantity, and this is the first deterministic exponential-fa…73023 tokens truncated… construction proves that committees of order 1/ε² are sometimes necessary to prevent a losing candidate from beating every selected winner by a 1/2+ε majority, matching the known upper bound up to constants.",
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
    title: "Faster-than-Power-Law Correlation Decay in the 2D RP² and RP³ Models",
    field: "Statistical mechanics, lattice spin models & formal verification",
    date: "October 30, 2026",
    isoDate: "2026-10-30",
    outcome: "Demonstrated",
    status: "Rigorous correlation theorem fully formalized and verified in Lean; physical phase-diagram inference remains heuristic",
    score: 4,
    ai: "ChatGPT 6 Astra generated the rigorous proof, which Masaki Oshikawa developed into a specialist paper and formalized in Lean. The public formalization kernel-checks the correlation bound; the separate claim that vortices are always unbound is explicitly presented only as a heuristic.",
    summary:
      "Proves that two-point order-parameter correlations in the two-dimensional RP² and RP³ square-lattice models decay faster than every power at any finite temperature, ruling out a power-law-correlated phase for these observables. It does not by itself prove the full phase diagram or exponential decay.",
    importance:
      "4/5: gives a rigorous constraint on a long-debated statistical-mechanics phase scenario and is backed by a public machine-checked proof. The result is a theorem about idealized lattice models, not an experimental discovery.",
    source: "https://arxiv.org/abs/2610.41256",
    secondarySource: "https://doi.org/10.5281/zenodo.23548847",
    sourceLabel: "View the specialist paper and scope statement",
    secondarySourceLabel: "Inspect the Lean verification archive",
    addedDate: "November 3, 2026",
    addedIsoDate: "2026-11-03",
  },
  {
    title: "Exact Non-Axisymmetric 3D MHD Equilibria without Stellarator Symmetry",
    field: "Plasma physics, ideal magnetohydrodynamics & fusion",
    date: "October 5, 2026",
    isoDate: "2026-10-05",
    outcome: "Demonstrated",
    status: "Exact analytic solutions independently re-derived and symbolically checked by plasma specialists",
    score: 5,
    ai: "Gemini 4 Argon research agents proposed generalized equilibrium families that break stellarator symmetry. The human authors adversarially reviewed, independently re-derived and symbolically checked every derivation before rewriting the manuscript.",
    summary:
      "Constructs explicit three-dimensional ideal-MHD equilibria that are neither axisymmetric nor stellarator-symmetric, extending the AI-assisted counterexamples to Grad's conjecture and providing exact benchmarks for three-dimensional equilibrium solvers.",
    importance:
      "5/5: exact asymmetric equilibria address a long-standing structural question in plasma theory and are directly relevant to validating stellarator and fusion-plasma calculations. They are mathematical equilibrium solutions, not a new reactor experiment.",
    source: "https://arxiv.org/abs/2610.07304",
    sourceLabel: "View exact solutions and verification statement",
    addedDate: "October 22, 2026",
    addedIsoDate: "2026-10-22",
  },
  {
    title: "Nine-Loop Six-Particle Amplitude in Planar N=4 Super-Yang–Mills Theory",
    field: "Quantum field theory, scattering amplitudes & symbolic computation",
    date: "September 25, 2026",
    isoDate: "2026-09-25",
    outcome: "Demonstrated",
    status: "Exact result and data released; independently validated by Stanford/SLAC amplitude specialist Lance Dixon against the known form-factor route",
    score: 4,
    ai: "Claude Fable 5.1 in Anthropic's Claude Science harness developed the computation and code from scratch with minimal human intervention",
    summary:
      "Claude computed the nine-loop maximally helicity-violating six-particle amplitude in planar N=4 super-Yang–Mills theory, extending the previous frontier by one loop. It bootstrapped the corresponding form factor, mapped it through antipodal duality and imposed the remaining amplitude constraints.",
    importance:
      "Nine loops is a new exact perturbative record for this benchmark quantum field theory and required a large, intricate symbolic calculation. It is a theoretical result in a highly symmetric model rather than a prediction for a real-world experiment.",
    source: "https://www.anthropic.com/research/yes-claude-can-do-nine-loops",
    sourceLabel: "Read announcement and Dixon's validation note",
    secondarySource: "https://smsharma.io/cosmic-nine-loops/",
    secondarySourceLabel: "Inspect the released result and data",
    addedDate: "September 28, 2026",
    addedIsoDate: "2026-09-28",
  },
  {
    title: "Private Communication from Two Zero-Private-Capacity Quantum Channels",
    field: "Quantum information theory, channel capacity & formal verification",
    date: "September 9, 2026",
    isoDate: "2026-09-09",
    outcome: "Demonstrated",
    status: "Lean-verified regularized private-information bounds; operational coding equivalence remains outside Lean",
    score: 4,
    ai: "QudeLeap AI Quantum Scientist and large language models for the initial activating example and proof strategies",
    summary:
      "A four-level quantum channel and a half-erasure qubit channel each have zero private capacity, yet their joint use achieves more than 0.0001903 private bits per product use. A fixed joint measurement creates the information advantage needed for secure communication.",
    importance:
      "This resolves a long-standing superactivation question at the level of the regularized private-information formula. Scope clarified September 11: Lean covers the channels, complements, encoding, measurement and information bounds; operational coding, its equivalence to the formula and the PPT-decoder converse are outside the certificate. This is a theoretical result, not an experiment.",
    source: "https://arxiv.org/abs/2609.10520",
    sourceLabel: "View paper and formal-proof correspondence",
    secondarySource: "https://github.com/QudeLeap/lean-private-capacity",
    secondarySourceLabel: "View Lean formalization and precise coverage",
    addedDate: "September 10, 2026",
    addedIsoDate: "2026-09-10",
  },
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
    title: "Sharp Ionization Bounds for Helium and Lithium",
    field: "Mathematical physics, spectral theory & atomic structure",
    date: "November 12, 2026",
    isoDate: "2026-11-12",
    outcome: "Demonstrated",
    status: "Computer-assisted 88-page preprint with primarily AI-generated proofs and partial human understanding; no independent reproduction located",
    score: 4,
    ai: "Alec Shelley, Charles Yang and Daniel Tartakovsky developed the main ideas, while Claude Fable, OpenAI Astra and the Pharos harness generated most of the proofs and finite inequality checks.",
    summary:
      "Proves, in the nonrelativistic Coulomb model, that helium can bind at most two electrons and lithium at most four, with both bounds sharp. A quadratic-weight adaptation of Lieb's argument reduces the question to finitely many computer-verified inequalities.",
    importance:
      "4/5: gives the first sharp maximum-ionization bounds beyond hydrogen for two physical nuclei. It is a rigorous theoretical claim rather than a new experimental measurement and still needs independent specialist checking of the computer-assisted proof.",
    source: "https://hexagonmath.org/2611.00325v1",
    sourceLabel: "View the proof, finite-check method and provenance",
    addedDate: "November 12, 2026",
    addedIsoDate: "2026-11-12",
  },
  {
    title: "Exact Projector-Rank Thresholds for State-Independent Contextuality",
    field: "Quantum foundations, contextuality & combinatorics",
    date: "November 12, 2026",
    isoDate: "2026-11-12",
    outcome: "Designed",
    status: "Primarily AI-written six-page preprint checked by its contributor and a second model; no independent specialist review or formal verification located",
    score: 3,
    ai: "Claude Fable 5.2 wrote the proof; Sunay Venkat checked its foundations, and GPT-6 Astra verified the additional argument built from Westberg's construction.",
    summary:
      "Constructs, for every projector rank r, a finite exclusivity graph that exhibits state-independent quantum contextuality at rank r but cannot do so at any lower common rank, extending earlier numerical evidence only for ranks two and three.",
    importance:
      "3/5: provides the full infinite family of rank-efficient contextuality scenarios sought in prior work. The result is theoretical and has not yet been independently checked or experimentally realized.",
    source: "https://hexagonmath.org/2611.00344v1",
    sourceLabel: "View the construction and provenance statement",
    addedDate: "November 12, 2026",
    addedIsoDate: "2026-11-12",
  },
  {
    title: "Vanishing Spectral Gap of Integral Torus Partition Functions Near c = 1",
    field: "Conformal field theory, modular invariance & mathematical physics",
    date: "November 11, 2026",
    isoDate: "2026-11-11",
    outcome: "Demonstrated",
    status: "Primarily AI-generated 109-page preprint with partial human understanding and multiple AI referee passes; no independent human review located",
    score: 3,
    ai: "GPT-6 Astra developed the proof under Tzu Chen Huang's direction. Claude Fable 5.2 then performed five line-by-line referee passes, one for each proof part, plus a separate adjudication pass.",
    summary:
      "Shows that a broad integral, parity-symmetric class of modular-invariant two-dimensional CFT partition functions cannot retain any fixed nonzero primary spectral gap as the central charge approaches one from above, confirming a numerical-bootstrap indication.",
    importance:
      "3/5: converts a numerical indication into a structural no-gap theorem for a sharply defined CFT class. The threshold is non-effective and the long argument remains unrefereed by human specialists.",
    source: "https://hexagonmath.org/2611.00300v1",
    sourceLabel: "View the proof and multi-pass AI review disclosure",
    addedDate: "November 12, 2026",
    addedIsoDate: "2026-11-12",
  },
  {
    title: "Hawking–Page Transition at Weak Coupling",
    field: "Theoretical physics, gauge/gravity duality & finite-temperature field theory",
    date: "November 7, 2026",
    isoDate: "2026-11-07",
    outcome: "Demonstrated",
    status: "Primarily AI-generated Hexagon preprint checked against known special cases by one physicist; unrefereed and not independently reproduced by humans",
    score: 4,
    ai: "An internal Claude research model, prompted by a physicist, performed the three-loop calculation. The physicist checked known limits, while a separate Claude calculation using a different method reportedly obtained the same result.",
    summary:
      "Computes the previously unknown three-loop quartic coefficient b = −1.48×10^−3 λ² in weakly coupled N=4 super-Yang–Mills theory. Its negative sign implies that the Hawking–Page deconfinement transition remains first order and occurs slightly below the Hagedorn temperature.",
    importance:
      "4/5: resolves a two-decade-old perturbative calculation bearing directly on the weak-coupling phase structure of a canonical gauge/gravity system. It is a theoretical result in a highly symmetric model and still needs independent specialist reproduction.",
    source: "https://hexagonmath.org/2611.00175v1",
    secondarySource: "https://postcutoff.com/e/2026-11-07-anthropic-claude-hawking-page-modular-bootstrap-hexagon/",
    sourceLabel: "View the primary calculation and provenance",
    secondarySourceLabel: "Review the evidence and verification scope",
    addedDate: "November 9, 2026",
    addedIsoDate: "2026-11-09",
  },
  {
    title: "Exact Large-c Slope of the Spinless Modular Bootstrap",
    field: "Conformal field theory, modular bootstrap & mathematical physics",
    date: "November 7, 2026",
    isoDate: "2026-11-07",
    outcome: "Demonstrated",
    status: "Primarily AI-generated 131-page preprint; main results checked by one physicist and independently reproduced by public Claude Opus 5.5, but no external specialist review located",
    score: 4,
    ai: "An internal Claude research model autonomously found the main result. Public Claude Opus 5.5 later reproduced it independently, then Claude wrote the paper with brief physicist guidance; the physicist reports checking every main result.",
    summary:
      "Determines the optimal large-central-charge slope of the spinless modular-bootstrap gap bound for compact unitary two-dimensional conformal field theories with only Virasoro currents: Λ_V ≈ 9.1266, narrowing the previous interval 8.503–12.",
    importance:
      "4/5: replaces a broad numerical interval by an exact optimization result and supplies an explicit functional yielding Δ₁ < c/Λ_V + 0.483 c^(1/3) + O(1). The calculation remains an unrefereed theoretical claim.",
    source: "https://hexagonmath.org/2611.00174v1",
    secondarySource: "https://postcutoff.com/e/2026-11-07-anthropic-claude-hawking-page-modular-bootstrap-hexagon/",
    sourceLabel: "View the primary paper and AI disclosure",
    secondarySourceLabel: "Review the evidence and verification scope",
    addedDate: "November 9, 2026",
    addedIsoDate: "2026-11-09",
  },
  {
    title: "Potts Lattice-Gauge Correlation-Length Duality",
    field: "Mathematical physics, lattice gauge theory & probability",
    date: "July 2, 2026",
    isoDate: "2026-07-02",
    outcome: "Demonstrated",
    status: "Corrected two-author v2 preprint with referee feedback; the restored prime-q proof remains without independent verification",
    score: 3,
    ai: "Claude Opus 5.5 was used to check the manuscript for mathematical errors and suggested the appendix proof that restores Theorem 9 for every prime q. Paul Duncan and Benjamin Schweinhart retained a human-written main text and incorporated the AI-suggested reflection-positivity argument after correcting errors in the original proofs.",
    summary:
      "The revised paper proves that, for prime q, the correlation length of Potts lattice gauge theory on four-dimensional integer lattices with free boundary conditions equals that of the dual model with constant boundary conditions. It also gives a topological formula for Wilson-loop correlations and rigorous decay results away from criticality.",
    importance:
      "3/5: repairs and restores an exact duality theorem for a nontrivial family of lattice gauge models. The correction is transparent and mathematically substantive, but it is still a revised preprint rather than an independently reproduced physics result.",
    source: "https://arxiv.org/abs/2607.02434",
    sourceLabel: "View the corrected v2 paper and AI-assisted appendix",
    addedDate: "November 7, 2026",
    addedIsoDate: "2026-11-07",
  },
  {
    title: "Thermodynamic Limit for the Extensively Loaded Hopfield Model",
    field: "Spin glasses, neural-network statistical mechanics & probability",
    date: "October 30, 2026",
    isoDate: "2026-10-30",
    outcome: "Demonstrated",
    status: "Two-author analytical preprint; no independent audit or machine verification located",
    score: 4,
    ai: "Claude Opus 5.5 and ChatGPT Sol 6.1 generated the proofs through extensive interaction, using the authors' problem formulation and mathematical guidance. Adriano Barra and Fabrizio Durante take responsibility for the manuscript.",
    summary:
      "Proves existence of the thermodynamic limit of the quenched pressure for the extensively loaded Hopfield model with binary or Gaussian patterns at every load, finite inverse temperature and uniform field, without replica-symmetry or non-condensation assumptions. It also derives concentration, almost-sure convergence and ground-state consequences.",
    importance:
      "4/5: removes a long-standing foundational gap in the rigorous statistical mechanics of associative neural networks. It establishes existence rather than an explicit formula, and the new proof still awaits independent scrutiny.",
    source: "https://arxiv.org/abs/2610.41938",
    sourceLabel: "View the proof and AI-use statement",
    addedDate: "November 3, 2026",
    addedIsoDate: "2026-11-03",
  },
  {
    title: "Minimal Calibration Law for Solid-State Quantum-Spin Ensembles",
    field: "Quantum control, solid-state spin physics & autonomous experimentation",
    date: "October 29, 2026",
    isoDate: "2026-10-29",
    outcome: "Demonstrated",
    status: "Preprint with computational certificates and a precommitted laboratory test; independent replication pending",
    score: 4,
    ai: "GPT-6 Pro derived the exact law and enforced the study's acceptance criteria; GPT-6 Astra independently checked the response-space calculation on a supercomputer; Claude Fable 5 controlled the NV-diamond experiment, and Claude Opus 5 coordinated the agent laboratory.",
    summary:
      "Derives that exactly L²+1 calibration settings are necessary and sufficient to predict every phase-controlled sequence of at most L microwave pulses for an inhomogeneous quantum-spin ensemble. A six-hour NV-diamond experiment with 21,600 valid records supported the locked predictions and rejected simpler interpolation rules.",
    importance:
      "4/5: combines a new exact information law with a real experiment designed and revised by collaborating AI agents. The controlled single-laboratory demonstration is strong initial evidence, but the result remains a new preprint without independent replication.",
    source: "https://arxiv.org/abs/2610.40589",
    secondarySource: "https://github.com/E-zClap/auctopus",
    sourceLabel: "View the theoretical and experimental report",
    secondarySourceLabel: "Inspect the released agent-lab code",
    addedDate: "October 30, 2026",
    addedIsoDate: "2026-10-30",
  },
  {
    title: "Uniqueness of Translation-Invariant S=1 Heisenberg and J–D Ground States",
    field: "Quantum statistical mechanics, spin chains & mathematical physics",
    date: "October 25, 2026",
    isoDate: "2026-10-25",
    outcome: "Demonstrated",
    status: "Substantially strengthened 46-page v2 analytical preprint using OpenAI numerical inputs; independent validation pending",
    score: 4,
    ai: "Hal Tasaki formulated the problems and core strategies. ChatGPT Astra made substantial contributions to developing the proofs and preparing the manuscript, extending analytic machinery and numerical inputs from OpenAI's Haldane-gap work.",
    summary:
      "Proves uniqueness among all translation-invariant operator-algebraic ground states of the infinite S=1 Heisenberg chain and of the J–D model for sufficiently small anisotropy, without assuming a gap or spin symmetry for a competitor. It also proves full-sequence convergence for periodic and open finite chains.",
    importance:
      "4/5: the strengthened theorem gives a rigorous uniqueness result for the Haldane phase, not merely boundary-condition independence. It still does not establish uniqueness among arbitrary nontranslation-invariant infinite-chain ground states.",
    source: "https://arxiv.org/abs/2610.34330",
    sourceLabel: "View theorem, scope and AI contribution",
    addedDate: "October 27, 2026",
    addedIsoDate: "2026-10-27",
  },
  {
    title: "Critical Two-Dimensional KPZ Process",
    field: "Stochastic PDEs, statistical physics & random growth",
    date: "October 22, 2026",
    isoDate: "2026-10-22",
    outcome: "Demonstrated",
    status: "New 84-page, 11-author specialist preprint; independent validation remains pending",
    score: 5,
    ai: "ChatGPT 5.5, 5.6 and 6 contributed substantially to the proof by combining earlier advances in novel ways during an extended community project. The specialist authors state that they checked and developed the resulting argument.",
    summary:
      "Constructs a nontrivial distribution-valued solution to the critical two-dimensional Kardar-Parisi-Zhang equation as a limit of directed-polymer log partition functions. The process is non-Gaussian, has logarithmic-logarithmic covariance divergence and exhibits Gaussian fluctuations under spatial averaging.",
    importance:
      "5/5: gives a mathematical construction at the critical point of a central universal model of random interface growth, after roughly a decade of precursor work. It remains under review because the long new argument has not yet received independent confirmation.",
    source: "https://arxiv.org/abs/2610.31614",
    sourceLabel: "View construction and contribution statement",
    addedDate: "October 23, 2026",
    addedIsoDate: "2026-10-23",
  },
  {
    title: "High-Temperature Central Limit Theorem for the SYK Model",
    field: "Quantum statistical mechanics, disordered systems & probability",
    date: "October 13, 2026",
    isoDate: "2026-10-13",
    outcome: "Demonstrated",
    status: "Author-reviewed analytical preprint with public Lean code; formalization is conditional on an explicitly stated Proposition 4.2 that is not formalized",
    score: 4,
    ai: "After the authors redirected the problem to the partition function, ChatGPT 5.5 Pro developed proof arguments, ChatGPT 5.6 Pro found a simpler key combinatorial estimate, and AI generated the Lean formalization reviewed by the authors.",
    summary: "Proves Gaussian fluctuations of the log partition function for the q-body Gaussian Sachdev–Ye–Kitaev model at sufficiently high temperature, with the stated N^(q/2−1) normalization and explicit variance.",
    importance: "4/5: gives a new rigorous fluctuation law for a central quantum-chaos model. The public formalization is useful evidence but does not close the full verification chain because its main asymptotic input remains an assumption.",
    source: "https://arxiv.org/abs/2610.18440",
    secondarySource: "https://github.com/TokyoProbabilityGroup/SYK_CLT",
    sourceLabel: "View theorem and AI contribution",
    secondarySourceLabel: "View conditional Lean formalization",
    addedDate: "October 15, 2026",
    addedIsoDate: "2026-10-15",
  },
  {
    "date": "October 6, 2026",
    "isoDate": "2026-10-06",
    "addedDate": "October 7, 2026",
    "addedIsoDate": "2026-10-07",
    "outcome": "Demonstrated",
    "score": 5,
    "ai": "OpenAI's unreleased internal frontier model developed the proposed mathematical proof; manuscript and supporting proof artifacts released on October 6, 2026.",
    "status": "New theoretical claim; released Lean proof artifacts have unchecked catalogue review status; independent verification not established",
    "title": "Mézard–Parisi Formula for Diluted Spin Glasses",
    "field": "Statistical physics & disordered systems",
    "summary": "Claims that the limiting pressure equals the infimum of finite-depth hierarchical cavity trial functionals for Poisson diluted even-arity Ising models under specified factorization, independence and positivity assumptions. This includes Viana–Bray and symmetric diluted even-spin models. Manuscript dated September 23; public release October 6.",
    "importance": "5/5: an exact thermodynamic variational formula would resolve a fundamental problem for a major class of disordered systems. The released Lean target addresses this stated class, not arbitrary spin glasses; the full dependency chain has not been independently checked in this review.",
    "source": "https://github.com/openai/math/blob/main/preprints/The-Mezard-Parisi-formula-for-diluted-spin-glasses-September-23-2026/paper.pdf",
    "secondarySource": "https://github.com/openai/math/blob/main/lean/docs/221.md",
    "sourceLabel": "View research manuscript",
    "secondarySourceLabel": "View formalization scope"
  },
  {
    "date": "October 6, 2026",
    "isoDate": "2026-10-06",
    "addedDate": "October 7, 2026",
    "addedIsoDate": "2026-10-07",
    "outcome": "Demonstrated",
    "score": 5,
    "ai": "OpenAI's unreleased internal frontier model developed the proposed mathematical proof; manuscript and supporting proof artifacts released on October 6, 2026.",
    "status": "New theoretical claim; released Lean proof artifacts have unchecked catalogue review status; independent verification not established",
    "title": "Spontaneous Magnetization in the Quantum Heisenberg Ferromagnet",
    "field": "Quantum statistical mechanics & magnetism",
    "summary": "Claims low-temperature spontaneous magnetization for the nearest-neighbor isotropic model in every dimension d ≥ 3 and every positive half-integer spin S, with a zero-field equilibrium state of magnetization at least S/4. The core September 24 manuscript and October 5 Bloch-law companions were released October 6.",
    "importance": "5/5: would establish longstanding low-temperature quantum magnetic ordering and rigorous magnetization asymptotics. The Lean scope covers spontaneous magnetization and dynamics convergence only; the claimed exact Bloch T³ᐟ² coefficient, lattice correction and spherical law are not covered by that formalization.",
    "source": "https://github.com/openai/math/blob/main/preprints/Spontaneous-magnetization-in-the-quantum-Heisenberg-ferromagnet-September-24-2026/paper.pdf",
    "secondarySource": "https://github.com/openai/math/blob/main/lean/docs/271.md",
    "sourceLabel": "View research manuscript",
    "secondarySourceLabel": "View formalization scope"
  },
  {
    "date": "October 6, 2026",
    "isoDate": "2026-10-06",
    "addedDate": "October 7, 2026",
    "addedIsoDate": "2026-10-07",
    "outcome": "Demonstrated",
    "score": 5,
    "ai": "OpenAI's unreleased internal frontier model developed the proposed mathematical proof; manuscript and supporting proof artifacts released on October 6, 2026.",
    "status": "New theoretical claim; released Lean proof artifacts have unchecked catalogue review status; independent verification not established",
    "title": "Large-Data Global Smoothness for Relativistic Vlasov–Maxwell",
    "field": "Mathematical plasma physics & kinetic theory",
    "summary": "Claims unique global smooth solutions of the three-dimensional one-species relativistic Vlasov–Maxwell system for arbitrary nonnegative smooth compactly supported particle density and compatible smooth finite-energy fields with bounded derivatives. No smallness or symmetry assumption is imposed. Manuscript dated September 23; public release October 6.",
    "importance": "5/5: would resolve a major large-data regularity problem for a fundamental collisionless plasma model. The precise data conditions and one-species scope matter; the claim does not establish every variant of Vlasov–Maxwell. Lean source is released, but independent compilation and statement verification remain outstanding here.",
    "source": "https://github.com/openai/math/blob/main/preprints/Global-classical-solutions-of-the-three-dimensional-relativistic-Vlasov-Maxwell-system-September-23-2026/paper.pdf",
    "secondarySource": "https://github.com/openai/math/blob/main/lean/docs/362.md",
    "sourceLabel": "View research manuscript",
    "secondarySourceLabel": "View formalization scope"
  },
  {
    "title": "p-Adic String Two-Point Functions and Néron Local Heights",
    "field": "Mathematical physics & p-adic string theory",
    "outcome": "Demonstrated",
    "score": 3,
    "status": "New theoretical identity in a public manuscript; author-checked arguments, with no independent replication or experimental validation located",
    "ai": "Muse Spark helped extend the Tate-curve connection to general semistable curves, generated candidate proofs and drafted three technical sections that the five authors corrected",
    "summary": "The boundary two-point function of a suitable p-adic string theory is identified, with the paper's sign and normalization conventions, with the Néron local height pairing on disjoint degree-zero divisors of curves with semistable reduction.",
    "importance": "Extends a previously known special case into an exact correspondence between arithmetic geometry and a string-theory calculation. Its significance is theoretical; it is not evidence that p-adic strings describe observed physics.",
    "source": "https://ai.meta.com/research/publications/string-two-point-function-height-function-on-a-curve/",
    "date": "October 2, 2026",
    "isoDate": "2026-10-02",
    "addedDate": "October 5, 2026",
    "addedIsoDate": "2026-10-05",
    "sourceLabel": "Read the manuscript and AI contribution statement"
  },
  {
    title: "TRACE Testable Interpretation of Progressive Megathrust Destabilization",
    field: "Seismology, earthquake sequences & autonomous physical reasoning",
    date: "March 22, 2026",
    isoDate: "2026-03-22",
    outcome: "Discovered",
    status: "Retrospective multi-sequence analysis in a substantially revised preprint; testable physical interpretation without prospective or independent validation",
    score: 4,
    ai: "TRACE, a seismology-guided multi-agent system, autonomously planned and executed analysis workflows and assembled auditable evidence chains from observations to physical interpretation",
    summary:
      "TRACE linked coupled seismic and aseismic activation in the 2025–2026 Sanriku sequence to progressive destabilization of a segmented megathrust patch that later hosted an MJ 7.7 rupture. On the 2019 Ridgecrest sequence it independently recovered delayed cascading activation as a retrospective control.",
    importance:
      "The result goes beyond routine event detection by proposing a concrete physical mechanism from raw seismic observations. It is potentially important for understanding earthquake preparation, but remains retrospective and has not yet been independently confirmed or prospectively tested.",
    source: "https://arxiv.org/abs/2603.21152",
    sourceLabel: "View revised manuscript and evidence chain",
    addedDate: "October 2, 2026",
    addedIsoDate: "2026-10-02",
  },
  {
    title: "Restored Current Conservation in the CWWH Anyon-Superconductivity Calculation",
    field: "Condensed-matter theory, anyon superconductivity & response functions",
    date: "September 24, 2026",
    isoDate: "2026-09-24",
    outcome: "Demonstrated",
    status: "Public analytical correction with exact sum-rule derivation; no independent specialist validation located",
    score: 3,
    ai: "Anthropic Claude derived the correction and authored the technical note, with the public copy hosted by theoretical physicist Dam Thanh Son",
    summary:
      "The third spectral moment in the 1989 Chen–Wilczek–Witten–Halperin anyon-superconductivity calculation is exactly the particle density by the f-sum rule. Restoring a dropped factor of 1/2! removes the reported q⁴ term and makes the random-phase approximation exactly current-conserving.",
    importance:
      "The note resolves a specific 37-year-old internal inconsistency in a foundational theoretical calculation. It is an exact correction rather than a new experimental discovery, and independent expert checking is still needed.",
    source: "https://home.uchicago.edu/dtson/papers/cwwh_note.pdf",
    sourceLabel: "Read the analytical correction",
    addedDate: "September 29, 2026",
    addedIsoDate: "2026-09-29",
  },
  {
    title: "DQC1-Complete Trace Estimation for Lipschitz Functions of Log-Local Hamiltonians",
    field: "Quantum complexity, Hamiltonians & approximation theory",
    date: "September 23, 2026",
    isoDate: "2026-09-23",
    outcome: "Strengthened",
    status: "FOCS 2026-accepted manuscript, revised by the authors; no public formal certificate or independent check of the Lipschitz generalization",
    score: 4,
    ai: "GPT-5.6 Sol removed the paper's remaining technical approximation condition by reducing it to the assumption that the function is Lipschitz continuous",
    summary:
      "The revised theorem classifies normalized trace estimation for functions of log-local quantum Hamiltonians as DQC1-complete under the natural Lipschitz assumption. For sparse Hamiltonians, it also proves classical query complexity exponential in the function's approximate degree, yielding a quantum-classical separation.",
    importance:
      "The revision turns a conditional complexity classification into a substantially broader statement for a natural function class and identifies approximate degree as the governing parameter. The paper is accepted at FOCS 2026, but the AI-assisted strengthening was added in the latest arXiv version and has no separate public verification artifact.",
    source: "https://arxiv.org/abs/2604.01519",
    sourceLabel: "View revised manuscript and AI disclosure",
    addedDate: "September 24, 2026",
    addedIsoDate: "2026-09-24",
  },
  {
    title: "Onsager-Threshold Flexibility for Ideal Magnetohydrodynamics",
    field: "Magnetohydrodynamics, turbulence & convex integration",
    date: "September 16, 2026",
    isoDate: "2026-09-16",
    outcome: "Demonstrated",
    status: "Author-verified 135-page analytical preprint; no formal or independent verification yet",
    score: 5,
    ai: "Claude Fable 5.1 and ChatGPT Astra implemented higher-order transport estimates, rigorous proof components and major bookkeeping simplifications from targeted author prompts",
    summary:
      "For every Hölder exponent below 1/3, the authors construct weak solutions of the ideal MHD equations that conserve neither total energy nor cross-helicity while retaining nontrivial magnetic helicity. The construction reaches the sharp Onsager threshold and also gives anisotropic regularity along magnetic field lines.",
    importance:
      "Reaching the 1/3 threshold is a major advance in the mathematical physics of turbulent ideal MHD. The authors explicitly call it a technical extension of their earlier 1/5 result rather than a new conceptual mechanism, and independent checking of the long proof is still needed.",
    source: "https://arxiv.org/abs/2609.19506",
    sourceLabel: "View analytical proof and detailed AI declaration",
    addedDate: "September 18, 2026",
    addedIsoDate: "2026-09-18",
  },
  {
    title: "PINN-Discovered Candidate for a Stable Euler Singularity on R³",
    field: "Fluid dynamics, singularity formation & computer-assisted analysis",
    date: "September 9, 2026",
    isoDate: "2026-09-09",
    outcome: "Discovered",
    status: "Certified approximate profile and central linear-damping mechanism; full nonlinear stability and blowup proof not closed",
    score: 4,
    ai: "Physics-informed neural network with a self-similar travelling-wave ansatz, adaptive sampling, boosting and curvature-aware optimization",
    summary:
      "A PINN found a high-precision axisymmetric self-similar profile at the critical blowup rate 0.5 for the three-dimensional Euler equations on unbounded space. The profile was converted to splines, and interval methods certify its small residual and the key low- and high-order linear damping structure.",
    importance:
      "This is a distinct computationally discovered candidate for a stable finite-time singularity on R³ and a concrete route toward a computer-assisted proof. It is evidence rather than a proof: the authors still need to certify a large finite collection of remaining linear, elliptic, interpolation and nonlinear constants with a positive closing margin.",
    source: "https://arxiv.org/abs/2609.10867",
    sourceLabel: "View profile, certificates and remaining proof obligations",
    addedDate: "September 13, 2026",
    addedIsoDate: "2026-09-13",
  },
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
    title: "REC-4881 Phase 2 Signal in Familial Adenomatous Polyposis",
    field: "Inherited cancer prevention, clinical development & phenotypic AI discovery",
    date: "November 2, 2026",
    isoDate: "2026-11-02",
    outcome: "Clinical signal",
    status: "Preliminary open-label Phase 1b/2 company-reported data; 15 efficacy-evaluable adults, no randomized control or peer-reviewed report",
    score: 4,
    ai: "Recursion's AI foundation models analyzed unbiased phenotypic screens and identified MEK1/2 inhibition as a way to reverse cellular effects of APC loss, motivating development of REC-4881 for FAP.",
    summary:
      "After 12 weeks of REC-4881, 13 of 15 adults had lower total gastrointestinal polyp burden, with a 47% median reduction; 11 of 13 evaluable participants remained below baseline after 12 weeks off treatment. Reductions were reported in both upper and lower GI disease and in larger polyps.",
    importance:
      "4/5: moves an AI-enabled disease-mechanism hypothesis into encouraging patient evidence for a hereditary cancer syndrome with no approved drug therapy. The small single-arm interim dataset cannot establish efficacy, durability or a favorable risk-benefit profile.",
    source: "https://recursion.gcs-web.com/news-releases/news-release-details/new-phase-2-rec-4881-data-presented-cga-igc-show-deep-durable",
    secondarySource: "https://clinicaltrials.gov/study/NCT05552755",
    sourceLabel: "View the presented Phase 2 data and limitations",
    secondarySourceLabel: "View the registered TUPELO trial",
    addedDate: "November 4, 2026",
    addedIsoDate: "2026-11-04",
  },
  {
    title: "First Human Antitumour Responses for AI-Designed ISM6331",
    field: "Mesothelioma, oncology & generative drug design",
    date: "October 25, 2026",
    isoDate: "2026-10-25",
    outcome: "Clinical signal",
    status: "Preliminary ongoing Phase 1 company-reported data presented at ESMO; small non-randomized dose cohorts, no peer-reviewed full report",
    score: 4,
    ai: "Insilico's Chemistry42 generative platform performed multiparameter molecular optimization of the oral pan-TEAD1–4 inhibitor that became ISM6331.",
    summary:
      "In heavily pretreated mesothelioma, four of 22 response-evaluable participants across 30–130 mg had partial responses, including two of five at 130 mg; three responses were ongoing at the August cutoff. No dose-limiting toxicities were reported among 36 enrolled participants through 130 mg.",
    importance:
      "4/5: provides the first reported human antitumour signal for a generatively designed TEAD inhibitor against a difficult target. The tiny dose cohorts and uncontrolled Phase 1 design make the response estimate highly uncertain and do not establish clinical benefit.",
    source: "https://insilico.com/news/pr8951ba20602e4375b723-insilico-medicine-reports-40-orr-at-130-mg-for-pan-tead-inhibitor-ism6331-designed-using-generative",
    secondarySource: "https://www.cancer.gov/research/participate/clinical-trials-search/v?id=NCI-2024-07922",
    sourceLabel: "View the ESMO results and cohort details",
    secondarySourceLabel: "View the active Phase 1/2 trial record",
    addedDate: "November 4, 2026",
    addedIsoDate: "2026-11-04",
  },
  {
    title: "Compact AI-Designed Signaling Domains Improve CAR T-Cell Function",
    field: "Cancer immunotherapy, synthetic biology & CAR-T engineering",
    date: "October 27, 2026",
    isoDate: "2026-10-27",
    outcome: "Improved",
    status: "Preclinical laboratory study in primary human T cells and cell models; no animal, independent or clinical validation",
    score: 4,
    ai: "Tool-using AI agents searched the literature and proposed intracellular-domain sequences over three experimental rounds. Generate Biomedicines scientists reviewed the designs and fed laboratory measurements back into later rounds.",
    summary:
      "Agent-guided design produced a 45-amino-acid CAR intracellular domain, under one third the length of a clinical reference, with higher surface expression, stronger antigen-driven signaling and more durable target-cell killing in laboratory assays.",
    importance:
      "4/5: the work uses a genuine design–build–test loop to discover a compact signaling architecture rather than merely predicting an endpoint. It is an early engineering result, not evidence that the construct is safe or effective in patients.",
    source: "https://generatebiomedicines.com/publications/refactored-intracellular-domains-enhance-car-expression-and-function/",
    secondarySource: "https://www.anthropic.com/research/early-progress-drug-development",
    sourceLabel: "View the experimental preprint",
    secondarySourceLabel: "View the collaboration overview",
    addedDate: "October 29, 2026",
    addedIsoDate: "2026-10-29",
  },
  {
    title: "Claude-Designed IgE Antibody Arms for Food-Allergy Drug Discovery",
    field: "Food allergy, therapeutic antibodies & protein design",
    date: "October 27, 2026",
    isoDate: "2026-10-27",
    outcome: "Designed",
    status: "Early preclinical in-vitro hits reported by the collaborating developer; complete two-arm antibody, cell safety, animal and clinical tests remain undone",
    score: 3,
    ai: "Claude turned the therapeutic goal into a staged design plan and generated roughly 35,000 sequences over 22 largely autonomous runs, using structure models and Divergence Labs tools to nominate candidates for wet-lab testing.",
    summary:
      "Laboratory screening found 20 disruptor-arm designs that measurably displaced receptor-bound IgE and three anchor arms that bound IgE. Three disruptor hits appeared to outperform omalizumab in the reported biophysical assay, but the two functions have not yet been combined in one molecule.",
    importance:
      "3/5: AI materially accelerated the search for components of a more complex food-allergy antibody mechanism and produced experimentally active hits. These are subcomponents, not a drug, and all evidence comes from the partner collaboration without independent replication.",
    source: "https://divergencelabs.com/publications/ige-preprint.pdf",
    secondarySource: "https://www.anthropic.com/research/early-progress-drug-development",
    sourceLabel: "View the technical report",
    secondarySourceLabel: "View the experimental summary and limitations",
    addedDate: "October 29, 2026",
    addedIsoDate: "2026-10-29",
  },
  {
    title: "Single-Cell Digital Twins Nominate Aspirin plus Lansoprazole for Preterm-Birth Prevention",
    field: "Maternal health, immunology & AI-guided drug repurposing",
    date: "October 21, 2026",
    isoDate: "2026-10-21",
    outcome: "Discovered",
    status: "Peer-reviewed preclinical evidence: retrospective human-data validation and an animal model; human efficacy trial has no results yet",
    score: 4,
    ai: "The SIMCO digital-twin system learned drug responses from roughly 250 million single immune cells and longitudinal data from 63 pregnancies, then simulated individualized effects of nine candidate regimens.",
    summary:
      "The model identified aspirin plus lansoprazole as a synergistic candidate predicted to delay the immune clock of labor far more than aspirin alone. The combination also delayed labor in an inflammatory pregnancy animal model, motivating a registered human trial.",
    importance:
      "4/5: AI connected single-cell immune mechanisms to a concrete repurposed-drug combination for a major cause of childhood mortality. This is not an established treatment: clinical safety and efficacy for preventing preterm birth remain unproven.",
    source: "https://www.science.org/doi/10.1126/sciadv.aed2741",
    secondarySource: "https://clinicaltrials.gov/study/NCT07337655",
    sourceLabel: "View peer-reviewed Science Advances study",
    secondarySourceLabel: "View registered human trial",
    addedDate: "October 22, 2026",
    addedIsoDate: "2026-10-22",
  },
  {
    title: "Closed-Loop AI Discovery of Human-Protein Aptamer Binders",
    field: "Human molecular diagnostics, aptamer discovery & coagulation biology",
    date: "October 17, 2026",
    isoDate: "2026-10-17",
    outcome: "Validated in vitro",
    status: "Preclinical laboratory validation in bead-binding assays; new preprint, no clinical testing or matched non-agent control",
    score: 3,
    ai: "Google AI Co-Scientist generated the first candidate library; Gemini Pro and Flash agents independently analyzed sequencing data, diagnosed assay failures and designed later rounds with computational tools",
    summary:
      "Across three design-test-improve cycles and about 4,400 constructs, the agent pipeline raised new-candidate hit rates to 42.1% for human α-thrombin and 33.5% for human myoglobin. Eight thrombin candidates were confirmed by single-clone titration; engineered literature-motif descendants reached apparent affinities of 24.6–133 nM, while strictly de novo scaffolds bound in the low-micromolar range.",
    importance:
      "This is a concrete closed-loop demonstration in which AI agents used fresh wet-lab data to discover binders, detect cross-reactivity and restore specificity. The targets are human proteins relevant to coagulation and biomarker work, but the evidence is in vitro and does not show diagnostic or therapeutic benefit in people.",
    source: "https://arxiv.org/abs/2610.24806",
    sourceLabel: "View preprint, assays and AI-system disclosure",
    addedDate: "October 20, 2026",
    addedIsoDate: "2026-10-20",
  },
  {
    "title": "X-Design Vega: Functional Antibodies for XA-1 and XA-4",
    "field": "Human drug discovery & therapeutic antibody design",
    "outcome": "Designed",
    "score": 3,
    "status": "Preclinical company experimental report: binding and functional cell assays; undisclosed program targets, no independent or clinical validation",
    "ai": "Xaira's X-Design Vega generated new VHH sequences, including a 60,000-design library spanning candidate epitopes and conformations for the difficult XA-4 GPCR",
    "summary": "Xaira reports an oncology-program XA-1 lead and functional XA-4 antagonists after conventional screening and immunization failed for XA-4. Its best XA-4 candidate exceeded 96% inhibition in a β-arrestin assay at an IC50 of 183 nM and bound human target-expressing cells.",
    "importance": "AI designed experimentally active molecules for a challenging human therapeutic target, beyond predicting binding alone. Evidence is limited to developer-reported laboratory assays with partly undisclosed targets; therapeutic safety and efficacy remain unproven.",
    "source": "https://www.xaira.com/news/de-novo-design-of-progressable-antibodies-to-therapeutic-targets",
    "sourceLabel": "Read the experimental report and assay figures",
    "date": "October 2, 2026",
    "isoDate": "2026-10-02",
    "addedDate": "October 5, 2026",
    "addedIsoDate": "2026-10-05"
  },
  {
    title: "Virtual Biotech Drug-Target Signal and B7-H3 Lung-Cancer Strategy",
    field: "Human drug discovery, oncology & clinical translation",
    date: "September 17, 2026",
    isoDate: "2026-09-17",
    outcome: "Discovered",
    status: "Peer-reviewed retrospective evidence and hypothesis generation; direct prospective or experimental validation of the AI workflow remains pending",
    score: 4,
    ai: "A human-guided organization of more than 37,000 specialized AI agents annotated 55,984 clinical trials, integrated single-cell and clinical evidence, and proposed therapeutic strategies",
    summary:
      "The agents found that drugs aimed at cell-type-specific genes were 48% more likely to reach market and had 32% fewer adverse events, then integrated genetic, single-cell, spatial and clinicogenomic evidence to propose a B7-H3 antibody–drug conjugate strategy for lung cancer.",
    importance:
      "The result shows agentic AI producing a new, testable target-selection signal across human trials and a concrete oncology strategy. A pharmaceutical company later converged independently on the same B7-H3 modality, but the paper itself is retrospective and does not establish that the AI-designed strategy treats patients.",
    source: "https://www.science.org/doi/10.1126/science.aeg6779",
    sourceLabel: "View peer-reviewed Science paper",
    secondarySource: "https://pubmed.ncbi.nlm.nih.gov/42752167/",
    secondarySourceLabel: "View PubMed abstract and evidence scope",
    tertiarySource: "https://virtualbiotech.ai/",
    tertiarySourceLabel: "View framework, analyses and open-source project",
    addedDate: "September 20, 2026",
    addedIsoDate: "2026-09-20",
  },
  {
    title: "Brain-Penetrant LILRB4 Inhibitor for Alzheimer’s Models",
    field: "Alzheimer’s disease & AI-guided drug discovery",
    date: "September 10, 2026",
    isoDate: "2026-09-10",
    outcome: "Preclinical candidate",
    status: "Peer-reviewed preclinical study; human microglia and mouse-model validation; no human trial",
    score: 4,
    ai: "Retrieval-based AI screening of approximately 500 million compounds for inhibitors of the LILRB4–ApoE interaction",
    summary:
      "AI-guided screening identified chemically distinct nanomolar LILRB4 binders. Compound 4 restored amyloid-β uptake and reduced inflammatory signalling in human iPSC-derived microglia, then showed oral brain penetration, lower amyloid and inflammation, and improved Y-maze performance in 5xFAD mice.",
    importance:
      "The study links ultra-large AI screening to orthogonal binding assays, a defined receptor pocket, human-cell experiments and in-vivo validation. It remains an early preclinical candidate: safety, dosing and efficacy in people are unknown, so it is not an Alzheimer’s treatment.",
    source: "https://doi.org/10.1016/j.bioorg.2026.110508",
    sourceLabel: "View peer-reviewed Bioorganic Chemistry paper",
    secondarySource: "https://pubmed.ncbi.nlm.nih.gov/42731186/",
    secondarySourceLabel: "View PubMed record and evidence scope",
    addedDate: "October 14, 2026",
    addedIsoDate: "2026-10-14",
  },
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
    status: "Randomized phase 2a; exploratory proteomic follow-up; efficacy and geroprotection not established",
    score: 4,
    ai: "PandaOmics target discovery + Chemistry42 generative drug design",
    summary:
      "AI identified TNIK as a target and generated rentosertib. In a 12-week double-blind trial, the highest-dose group showed a mean forced-vital-capacity change of +98.4 ml versus −20.3 ml with placebo, while overall safety was broadly comparable.",
    importance:
      "A substantial clinical test of AI-led drug discovery, but the 71-person safety-focused trial cannot establish efficacy. A September 7, 2026 follow-up reports lower predicted age across six proteomic clocks. The clocks cannot separate disease improvement from aging effects: this is not evidence of rejuvenation or longer life and does not warrant a separate established longevity result.",
    source: "https://www.nature.com/articles/s41591-025-03743-2",
    sourceLabel: "View Nature Medicine trial",
    secondarySource: "https://www.nature.com/articles/s41587-026-03286-y",
    secondarySourceLabel: "View exploratory proteomic-clock follow-up",
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

const researchAreas = [
  {
    key: "mathematics",
    label: "Mathematics",
    shortLabel: "Math",
    established: establishedResults,
    emerging: emergingResults,
  },
  {
    key: "physics",
    label: "Physics",
    shortLabel: "Physics",
    established: physicsEstablishedResults,
    emerging: physicsEmergingResults,
  },
  {
    key: "biology",
    label: "Human biology",
    shortLabel: "Biology",
    established: biologyEstablishedResults,
    emerging: biologyEmergingResults,
  },
] as const;

function monthRange(start: string, end: string) {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end.split("-").map(Number);
  const periods: { key: string; label: string }[] = [];

  for (
    let cursor = new Date(Date.UTC(startYear, startMonth - 1, 1));
    cursor <= new Date(Date.UTC(endYear, endMonth - 1, 1));
    cursor = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1))
  ) {
    const year = cursor.getUTCFullYear();
    const month = String(cursor.getUTCMonth() + 1).padStart(2, "0");
    const monthLabel = cursor.toLocaleString("en", { month: "short", timeZone: "UTC" });
    periods.push({
      key: `${year}-${month}`,
      label: cursor.getUTCMonth() === 0 ? `${monthLabel} ’${String(year).slice(-2)}` : monthLabel,
    });
  }

  return periods;
}

const trendPeriods = [
  { key: "before-2026", label: "Before ’26" },
  ...monthRange("2026-01", latestReviewIsoDate.slice(0, 7)),
];

function isPublishedBy(isoDate: string, period: string) {
  if (period === "before-2026") return isoDate < "2026-01-01";
  return isoDate.slice(0, 7) <= period;
}

const cumulativeTrend = trendPeriods.map((period) => ({
  ...period,
  values: researchAreas.map((area) => ({
    key: area.key,
    label: area.label,
    value: [...area.established, ...area.emerging].filter((item) =>
      isPublishedBy(item.isoDate, period.key),
    ).length,
  })),
}));

const totalResults = researchAreas.reduce(
  (sum, area) => sum + area.established.length + area.emerging.length,
  0,
);
const totalEstablished = researchAreas.reduce(
  (sum, area) => sum + area.established.length,
  0,
);
const totalUnderReview = totalResults - totalEstablished;

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
          {item.tertiarySource && (
            <a href={item.tertiarySource} target="_blank" rel="noreferrer">
              {item.tertiarySourceLabel ?? "View further source"}{" "}
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

function MomentumChart() {
  const width = 820;
  const height = 330;
  const margin = { top: 24, right: 24, bottom: 54, left: 56 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const maxValue = Math.max(
    ...cumulativeTrend.flatMap((period) =>
      period.values.map((series) => series.value),
    ),
  );
  const yMax = Math.ceil(maxValue / 20) * 20;
  const ticks = Array.from({ length: yMax / 20 + 1 }, (_, index) => index * 20);
  const x = (index: number) =>
    margin.left + (index / (cumulativeTrend.length - 1)) * plotWidth;
  const y = (value: number) =>
    margin.top + plotHeight - (value / yMax) * plotHeight;
  const labelStep = trendPeriods.length > 16 ? 3 : trendPeriods.length > 11 ? 2 : 1;
  const latestValues = cumulativeTrend.at(-1)?.values ?? [];

  return (
    <figure className="trend-card trend-card-primary" aria-labelledby="momentum-title">
      <div className="trend-card-head">
        <div>
          <p className="chart-label">Cumulative record</p>
          <h3 id="momentum-title">Published results over time</h3>
        </div>
        <div className="chart-legend" aria-label="Chart legend">
          {researchAreas.map((area) => (
            <span className={`legend-${area.key}`} key={area.key}>
              <i aria-hidden="true" />
              {area.shortLabel}
            </span>
          ))}
        </div>
      </div>

      <div className="chart-wrap">
        <svg
          className="momentum-chart"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby="momentum-svg-title momentum-svg-desc"
        >
          <title id="momentum-svg-title">Cumulative published results by research area</title>
          <desc id="momentum-svg-desc">
            The chart counts tracked results by their original publication date.
            At the latest review, {latestValues.map((item) => `${item.label} has ${item.value}`).join(", ")} tracked results.
          </desc>

          {ticks.map((tick) => (
            <g key={tick}>
              <line
                className="chart-gridline"
                x1={margin.left}
                x2={width - margin.right}
                y1={y(tick)}
                y2={y(tick)}
              />
              <text className="chart-axis-label" x={margin.left - 15} y={y(tick) + 4} textAnchor="end">
                {tick}
              </text>
            </g>
          ))}

          {trendPeriods.map((period, index) =>
            index === 0 ||
            index === trendPeriods.length - 1 ||
            index % labelStep === 0 ? (
              <text
                className="chart-axis-label chart-x-label"
                key={period.key}
                x={x(index)}
                y={height - 18}
                textAnchor={index === 0 ? "start" : index === trendPeriods.length - 1 ? "end" : "middle"}
              >
                {period.label}
              </text>
            ) : null,
          )}

          {researchAreas.map((area) => {
            const points = cumulativeTrend.map((period, index) => ({
              x: x(index),
              y: y(period.values.find((value) => value.key === area.key)?.value ?? 0),
              period,
            }));

            return (
              <g className={`series-${area.key}`} key={area.key}>
                <polyline
                  className="chart-line"
                  points={points.map((point) => `${point.x},${point.y}`).join(" ")}
                />
                {points.map((point) => {
                  const value = point.period.values.find((entry) => entry.key === area.key)?.value ?? 0;
                  return (
                    <circle className="chart-point" cx={point.x} cy={point.y} key={point.period.key} r="4">
                      <title>{`${area.label}: ${value} results by ${point.period.label}`}</title>
                    </circle>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption>
        Based on each entry&apos;s original publication date—not the date it was added to this tracker.
      </figcaption>
    </figure>
  );
}

function EvidenceChart() {
  return (
    <figure className="trend-card evidence-card" aria-labelledby="evidence-title">
      <div className="trend-card-head">
        <div>
          <p className="chart-label">Current evidence</p>
          <h3 id="evidence-title">Established vs under review</h3>
        </div>
      </div>

      <div className="evidence-bars">
        {researchAreas.map((area) => {
          const total = area.established.length + area.emerging.length;
          const establishedShare = (area.established.length / total) * 100;
          const emergingShare = 100 - establishedShare;

          return (
            <div className="evidence-row" key={area.key}>
              <div className="evidence-row-head">
                <strong>{area.label}</strong>
                <span>{total} results</span>
              </div>
              <div
                className="evidence-bar"
                role="img"
                aria-label={`${area.label}: ${area.established.length} established and ${area.emerging.length} under review`}
              >
                <span
                  className="evidence-established"
                  style={{ width: `${establishedShare}%` }}
                />
                <span
                  className="evidence-review"
                  style={{ width: `${emergingShare}%` }}
                />
              </div>
              <div className="evidence-values">
                <span><i className="established-swatch" />{area.established.length} established</span>
                <span><i className="review-swatch" />{area.emerging.length} under review</span>
              </div>
            </div>
          );
        })}
      </div>
      <figcaption>
        Status reflects the strongest verification evidence available at the latest review.
      </figcaption>
    </figure>
  );
}

function ResearchTrends() {
  return (
    <section className="trends-section" aria-labelledby="trends-heading">
      <div className="trends-heading">
        <div>
          <p className="section-kicker">Research momentum</p>
          <h2 id="trends-heading">The frontier, in motion.</h2>
          <p>
            A publication-date view of how the record is growing, paired with
            the current strength of evidence behind each research area.
          </p>
        </div>
        <div className="trend-totals" aria-label="Tracker totals">
          <div><strong>{totalResults}</strong><span>results tracked</span></div>
          <div><strong>{totalEstablished}</strong><span>established</span></div>
          <div><strong>{totalUnderReview}</strong><span>under review</span></div>
        </div>
      </div>
      <div className="trend-grid">
        <MomentumChart />
        <EvidenceChart />
      </div>
    </section>
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
          href="/"
          aria-label="AI Research Frontiers, home"
        >
          <span className="brand-mark">∴</span>
          <span>AI Research Frontiers</span>
        </a>
        <nav className="header-nav" aria-label="Site navigation">
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
          <a href="/simplechess">SimpleChess</a>
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

          <ResearchTrends />

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
