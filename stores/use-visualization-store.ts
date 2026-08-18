import { create } from "zustand";

export interface VisualizationStore {
  activeResearchId: string;
  activeCapabilityId: string;
  hoveredNodeId: string | null;
  setActiveResearchId: (id: string) => void;
  setActiveCapabilityId: (id: string) => void;
  setHoveredNodeId: (id: string | null) => void;
}

export const useVisualizationStore = create<VisualizationStore>((set) => ({
  activeResearchId: "computational-biology",
  activeCapabilityId: "modeling",
  hoveredNodeId: null,
  setActiveResearchId: (activeResearchId) => set({ activeResearchId }),
  setActiveCapabilityId: (activeCapabilityId) => set({ activeCapabilityId }),
  setHoveredNodeId: (hoveredNodeId) => set({ hoveredNodeId }),
}));
