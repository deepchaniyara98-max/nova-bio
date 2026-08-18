import type { Capability, ResearchArea, SiteStat, VisualizationNode } from "@/types/science";

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: "computational-biology",
    number: "01",
    title: "Computational Biology",
    description:
      "We build models that reconstruct how living systems behave under change — from protein folding pathways to tissue-level signaling.",
    detail:
      "High-resolution simulations, multi-omics integration, and constraint-based models help our scientists ask better questions before a single experiment begins.",
    accent: "cyan",
    nodes: ["mTOR", "MAPK", "p53", "NF-κB"],
  },
  {
    id: "genetic-engineering",
    number: "02",
    title: "Genetic Engineering",
    description:
      "Precision edits at the molecular level, designed with sequence context, off-target risk, and cellular fate in mind.",
    detail:
      "CRISPR-based toolchains, base editors, and delivery systems are evaluated as a single system — not isolated parts.",
    accent: "emerald",
    nodes: ["Cas9", "ABE8e", "AAV9", "gRNA"],
  },
  {
    id: "ai-discovery",
    number: "03",
    title: "AI-Driven Discovery",
    description:
      "Machine learning that reads biological structure, not just labels — accelerating hypothesis generation without replacing scientific judgment.",
    detail:
      "Foundation models trained on sequences, structures, and assay readouts surface candidates that researchers can actually test.",
    accent: "violet",
    nodes: ["ESM-2", "AlphaFold", "Latent", "Atlas"],
  },
  {
    id: "cellular-engineering",
    number: "04",
    title: "Cellular Engineering",
    description:
      "Technologies that interact with living systems: programmable cells, organoid platforms, and closed-loop experimental design.",
    detail:
      "We treat the cell as an instrument — measurable, tunable, and designed for reproducible outcomes at scale.",
    accent: "cyan",
    nodes: ["iPSC", "CAR", "Organoid", "Circuit"],
  },
];

export const CAPABILITIES: Capability[] = [
  {
    id: "modeling",
    number: "01",
    title: "Biological Modeling",
    summary: "Mechanistic and statistical models of complex living systems.",
    description:
      "From kinetic networks to spatial tissue models, we translate biological complexity into structures that can be simulated, compared, and improved.",
    illustration: "helix",
  },
  {
    id: "ai-ml",
    number: "02",
    title: "AI & Machine Learning",
    summary: "Models that learn from sequence, structure, and experiment.",
    description:
      "We pair representation learning with experimental feedback so predictions stay grounded in wet-lab reality.",
    illustration: "network",
  },
  {
    id: "molecular",
    number: "03",
    title: "Molecular Engineering",
    summary: "Designing molecules with intent, not trial volume.",
    description:
      "Sequence design, protein optimization, and delivery chemistry are treated as a coordinated engineering problem.",
    illustration: "molecule",
  },
  {
    id: "analytics",
    number: "04",
    title: "Data & Analytics",
    summary: "Infrastructure for high-dimensional biological evidence.",
    description:
      "Assay pipelines, provenance, and statistical rigor so every claim can be traced back to a measurement.",
    illustration: "chart",
  },
  {
    id: "platforms",
    number: "05",
    title: "Experimental Platforms",
    summary: "Closed-loop labs that learn from every run.",
    description:
      "Automated screening, organoid assays, and instrument telemetry feed models that plan the next experiment.",
    illustration: "cell",
  },
];

export const SITE_STATS: SiteStat[] = [
  {
    id: "years",
    value: 10,
    suffix: "+",
    label: "Years of scientific innovation",
    detail: "Independent research, partner programs, and published methods.",
  },
  {
    id: "programs",
    value: 42,
    suffix: "",
    label: "Research programs",
    detail: "Active computational, molecular, and cellular workstreams.",
  },
  {
    id: "datapoints",
    value: 18,
    suffix: "M+",
    label: "Data points analyzed",
    detail: "Sequence, structure, imaging, and assay measurements.",
  },
  {
    id: "accuracy",
    value: 96,
    suffix: "%",
    label: "Model prediction accuracy",
    detail: "Held-out assay concordance across core discovery models.",
  },
];

export const VISUALIZATION_NODES: VisualizationNode[] = [
  { id: "brca1", label: "BRCA1", group: "genome", x: 0.22, y: 0.38, insight: "DNA repair pathway marker used in model calibration." },
  { id: "mtor", label: "mTOR", group: "signaling", x: 0.48, y: 0.28, insight: "Central growth-control node in metabolic simulations." },
  { id: "cas9", label: "Cas9", group: "edit", x: 0.72, y: 0.34, insight: "Nuclease geometry informs off-target risk scoring." },
  { id: "p53", label: "TP53", group: "genome", x: 0.34, y: 0.62, insight: "Stress-response transcription factor in cellular fate maps." },
  { id: "egfr", label: "EGFR", group: "signaling", x: 0.58, y: 0.58, insight: "Receptor tyrosine kinase used in perturbation studies." },
  { id: "ipsc", label: "iPSC", group: "cell", x: 0.78, y: 0.66, insight: "Reprogrammed cell lines for organoid assay platforms." },
  { id: "aav", label: "AAV", group: "delivery", x: 0.18, y: 0.72, insight: "Viral vector serotypes ranked by tissue tropism." },
  { id: "esm", label: "ESM", group: "model", x: 0.42, y: 0.82, insight: "Sequence embeddings that seed candidate generation." },
];

export const VISUALIZATION_EDGES: Array<[string, string]> = [
  ["brca1", "p53"],
  ["brca1", "cas9"],
  ["mtor", "egfr"],
  ["mtor", "p53"],
  ["cas9", "aav"],
  ["egfr", "ipsc"],
  ["p53", "esm"],
  ["aav", "esm"],
  ["ipsc", "esm"],
  ["egfr", "cas9"],
];
