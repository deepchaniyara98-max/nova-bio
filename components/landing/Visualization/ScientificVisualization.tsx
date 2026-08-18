"use client";

import { Container } from "@/components/base/Container";
import { Eyebrow } from "@/components/base/Eyebrow";
import { Heading } from "@/components/base/Heading";
import { Section } from "@/components/base/Section";
import { Text } from "@/components/base/Text";
import { Surface } from "@/components/base/Surface";
import { MolecularVisualization } from "@/components/MolecularVisualization";
import { SectionReveal } from "@/components/SectionReveal";
import { useVisualization } from "@/hooks/use-science";
import { VISUALIZATION_EDGES, VISUALIZATION_NODES } from "@/lib/data/science";
import { useVisualizationStore } from "@/stores/use-visualization-store";

const TIMELINE = [
  { year: "2016", label: "First constraint-based cell models" },
  { year: "2019", label: "Sequence-structure joint embeddings" },
  { year: "2022", label: "Closed-loop organoid assay platform" },
  { year: "2025", label: "Unified discovery graph across programs" },
];

export function ScientificVisualization() {
  const { data } = useVisualization();
  const hoveredNodeId = useVisualizationStore((s) => s.hoveredNodeId);
  const nodes = data?.nodes ?? VISUALIZATION_NODES;
  const edges = data?.edges ?? VISUALIZATION_EDGES;
  const hovered = nodes.find((node) => node.id === hoveredNodeId);

  return (
    <Section id="technology">
      <Container width="wide">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <SectionReveal>
            <Eyebrow variant="emerald">Discovery graph</Eyebrow>
            <Heading as="h2" size="lg">
              Evidence, connected.
            </Heading>
            <Text tone="muted" className="mt-5 max-w-md">
              A living map of targets, models, and experimental nodes. Hover a marker to see why it
              sits in the graph — not decoration, a working index of research context.
            </Text>
            <div className="mt-8 space-y-4">
              {TIMELINE.map((item) => (
                <div key={item.year} className="flex gap-5 border-l border-white/10 pl-4">
                  <span className="w-12 text-sm text-primary">{item.year}</span>
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
            <Surface className="mt-8" padding="sm">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Selected node</p>
              <p className="mt-2 text-lg font-medium">{hovered?.label ?? "Explore the network"}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {hovered?.insight ?? "Move across the graph to inspect pathway context."}
              </p>
            </Surface>
          </SectionReveal>
          <div className="h-[280px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-navy sm:h-[360px] lg:h-[460px]">
            <MolecularVisualization nodes={nodes} edges={edges} palette="emerald" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
