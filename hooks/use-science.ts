"use client";

import { ScienceService } from "@/api-client/science";
import { QUERY_KEYS } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export function useResearch() {
  return useQuery({
    queryKey: [QUERY_KEYS.RESEARCH],
    queryFn: ScienceService.getResearch,
  });
}

export function useCapabilities() {
  return useQuery({
    queryKey: [QUERY_KEYS.CAPABILITIES],
    queryFn: ScienceService.getCapabilities,
  });
}

export function useStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.STATS],
    queryFn: ScienceService.getStats,
  });
}

export function useVisualization() {
  return useQuery({
    queryKey: [QUERY_KEYS.VISUALIZATION],
    queryFn: ScienceService.getVisualization,
  });
}
