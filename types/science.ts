export type AccentTone = "cyan" | "violet" | "emerald";

export interface ResearchArea {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
  accent: AccentTone;
  nodes: string[];
}

export interface Capability {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  illustration: "helix" | "network" | "molecule" | "chart" | "cell";
}

export interface SiteStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  detail: string;
}

export interface VisualizationNode {
  id: string;
  label: string;
  group: string;
  x: number;
  y: number;
  insight: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  organization?: string;
  message: string;
}

export interface ContactResponse {
  ok: boolean;
  id: string;
}
