"use client";

import { AnimatedText } from "@/components/AnimatedText";
import { Container } from "@/components/base/Container";
import { MagneticButton } from "@/components/base/MagneticButton";
import { Text } from "@/components/base/Text";
import { MolecularVisualization } from "@/components/MolecularVisualization";
import { ParticleField } from "@/components/ParticleField";
import { RESEARCH_AREAS, VISUALIZATION_EDGES, VISUALIZATION_NODES } from "@/lib/data/science";
import { useVisualization } from "@/hooks/use-science";
import { motion } from "framer-motion";

export function Hero() {
  const { data } = useVisualization();
  const nodes = data?.nodes ?? VISUALIZATION_NODES;
  const edges = data?.edges ?? VISUALIZATION_EDGES;

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden pt-28 md:pt-32"
    >
      <div className="absolute inset-0 surface-grid opacity-40" />
      <ParticleField density={56} />
      <div className="absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute right-0 top-40 h-[360px] w-[360px] rounded-full bg-violet/10 blur-[110px]" />

      <Container width="wide" className="relative grid items-center gap-8 pb-16 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="relative z-10 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 text-xs uppercase tracking-[0.28em] text-primary"
          >
            Programmable biology
          </motion.p>
          <AnimatedText
            as="h1"
            text="Engineering the future of life."
            className="text-[clamp(2.15rem,8.4vw,6.6rem)] font-semibold leading-[0.94] tracking-tight md:tracking-tightest"
          />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Text tone="muted" size="lead" className="mt-8 max-w-xl">
              We combine biology, computation, and advanced engineering to develop technologies that
              transform how we understand and improve life.
            </Text>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
              <MagneticButton href="#about" size="lg" className="w-full justify-center sm:w-auto">
                Explore Our Science
              </MagneticButton>
              <MagneticButton href="#research" variant="outline" size="lg" className="w-full justify-center sm:w-auto">
                Discover Our Research
              </MagneticButton>
            </div>
            <div className="mt-14 flex flex-wrap gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {RESEARCH_AREAS.slice(0, 3).map((area) => (
                <span key={area.id}>{area.title}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[560px]">
          <div className="absolute inset-6 rounded-full border border-primary/20" />
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-[12%] overflow-hidden rounded-full bg-navy/40">
            <MolecularVisualization nodes={nodes} edges={edges} />
          </div>
          <div className="pointer-events-none absolute -left-4 bottom-16 hidden rounded-full border border-white/10 bg-background/80 px-4 py-2 text-xs text-muted-foreground backdrop-blur sm:block">
            CRISPR · mTOR · iPSC
          </div>
          <div className="pointer-events-none absolute -right-2 top-16 hidden rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-xs text-primary backdrop-blur sm:block">
            Live molecular graph
          </div>
        </div>
      </Container>
    </section>
  );
}
