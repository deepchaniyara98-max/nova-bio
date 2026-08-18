import clientApi from "@/api-client/client";
import type { Capability, ResearchArea, SiteStat, VisualizationNode } from "@/types/science";
import type { VisualizationEdge } from "@/api-client/types";

export const ScienceService = {
  getResearch: () => clientApi.get("research").json<ResearchArea[]>(),
  getCapabilities: () => clientApi.get("capabilities").json<Capability[]>(),
  getStats: () => clientApi.get("stats").json<SiteStat[]>(),
  getVisualization: () =>
    clientApi.get("visualization").json<{
      nodes: VisualizationNode[];
      edges: VisualizationEdge[];
    }>(),
};
