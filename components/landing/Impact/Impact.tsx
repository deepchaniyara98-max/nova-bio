"use client";

import { Container } from "@/components/base/Container";
import { Section } from "@/components/base/Section";
import { ParticleField } from "@/components/ParticleField";
import { SectionReveal } from "@/components/SectionReveal";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountUp } from "@/hooks/use-count-up";
import { useStats } from "@/hooks/use-science";
import { SITE_STATS } from "@/lib/data/science";
import type { SiteStat } from "@/types/science";

function StatItem({ stat }: { stat: SiteStat }) {
  const { ref, value } = useCountUp(stat.value);
  return (
    <div className="border-t border-white/10 py-8 md:border-t-0 md:px-6 md:even:border-l md:even:border-white/10 md:[&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-white/10 xl:border-l xl:border-t-0 xl:border-white/10 xl:px-8 xl:first:border-l-0">
      <p className="text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-none tracking-tightest text-primary">
        <span ref={ref}>{value}</span>
        {stat.suffix}
      </p>
      <p className="mt-4 text-lg text-foreground">{stat.label}</p>
      <p className="mt-2 text-sm text-muted-foreground">{stat.detail}</p>
    </div>
  );
}

export function Impact() {
  const { data, isLoading } = useStats();
  const stats = data ?? SITE_STATS;

  return (
    <Section id="impact">
      <div className="absolute inset-0 opacity-70">
        <ParticleField density={36} />
      </div>
      <Container width="wide" className="relative">
        <SectionReveal>
          <p className="mb-10 text-xs uppercase tracking-[0.24em] text-muted-foreground">Impact</p>
        </SectionReveal>
        <div className="grid gap-0 md:grid-cols-2 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-40" />)
            : stats.map((stat) => <StatItem key={stat.id} stat={stat} />)}
        </div>
      </Container>
    </Section>
  );
}
