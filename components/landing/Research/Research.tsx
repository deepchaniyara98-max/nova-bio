"use client";

import { Container } from "@/components/base/Container";
import { Eyebrow } from "@/components/base/Eyebrow";
import { Heading } from "@/components/base/Heading";
import { Section } from "@/components/base/Section";
import { MolecularVisualization } from "@/components/MolecularVisualization";
import { SectionReveal } from "@/components/SectionReveal";
import { Skeleton } from "@/components/ui/skeleton";
import { useResearch, useVisualization } from "@/hooks/use-science";
import { RESEARCH_AREAS, VISUALIZATION_EDGES, VISUALIZATION_NODES } from "@/lib/data/science";
import { useVisualizationStore } from "@/stores/use-visualization-store";
import { cn } from "@/lib/utils";

export function Research() {
  const { data, isLoading } = useResearch();
  const { data: viz } = useVisualization();
  const areas = data ?? RESEARCH_AREAS;
  const activeId = useVisualizationStore((s) => s.activeResearchId);
  const setActiveResearchId = useVisualizationStore((s) => s.setActiveResearchId);
  const active = areas.find((area) => area.id === activeId) ?? areas[0];

  return (
    <Section id="research">
      <Container width="wide">
        <SectionReveal>
          <Eyebrow>Research</Eyebrow>
          <Heading as="h2" size="xl" className="max-w-4xl">
            From discovery to possibility.
          </Heading>
        </SectionReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-stretch">
          <div role="list">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="mb-4 h-28" />
                ))
              : areas.map((area) => {
                  const isActive = area.id === active.id;
                  return (
                    <div key={area.id} role="listitem" className="border-t border-white/10 last:border-b">
                      <h3>
                        <button
                          type="button"
                          aria-pressed={isActive}
                          aria-expanded={isActive}
                          onClick={() => setActiveResearchId(area.id)}
                          onMouseEnter={() => setActiveResearchId(area.id)}
                          onFocus={() => setActiveResearchId(area.id)}
                          className={cn(
                            "group w-full py-6 text-left transition-colors",
                            isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <span className="flex items-baseline gap-4">
                            <span className="text-xs tracking-[0.2em] text-primary">{area.number}</span>
                            <span className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
                              {area.title}
                            </span>
                          </span>
                        </button>
                      </h3>
                      <p
                        className={cn(
                          "max-w-xl overflow-hidden pb-6 text-sm leading-relaxed text-muted-foreground transition-[max-height,opacity] duration-300",
                          isActive ? "max-h-32 opacity-100" : "mt-0 max-h-0 py-0 opacity-0",
                        )}
                      >
                        {area.description}
                      </p>
                    </div>
                  );
                })}
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.03] md:min-h-[420px]">
            <MolecularVisualization
              nodes={viz?.nodes ?? VISUALIZATION_NODES}
              edges={viz?.edges ?? VISUALIZATION_EDGES}
              palette={active?.accent ?? "cyan"}
              className="h-full min-h-[280px] md:min-h-[420px]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
              <div className="rounded-3xl border border-white/10 bg-background/80 p-5 backdrop-blur">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary">
                  {active?.title}
                </p>
                <p className="text-sm text-muted-foreground">{active?.detail}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {active?.nodes.map((node) => (
                    <span
                      key={node}
                      className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-widest text-foreground/80"
                    >
                      {node}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
