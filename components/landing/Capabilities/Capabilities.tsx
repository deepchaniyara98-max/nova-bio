"use client";

import { Container } from "@/components/base/Container";
import { Eyebrow } from "@/components/base/Eyebrow";
import { Heading } from "@/components/base/Heading";
import { Section } from "@/components/base/Section";
import { Text } from "@/components/base/Text";
import { CapabilityIllustration } from "@/components/common/CapabilityIllustration";
import { ParticleField } from "@/components/ParticleField";
import { SectionReveal } from "@/components/SectionReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useCapabilities } from "@/hooks/use-science";
import { CAPABILITIES } from "@/lib/data/science";
import { useVisualizationStore } from "@/stores/use-visualization-store";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function Capabilities() {
  const { data, isLoading } = useCapabilities();
  const capabilities = data ?? CAPABILITIES;
  const activeId = useVisualizationStore((s) => s.activeCapabilityId);
  const setActiveCapabilityId = useVisualizationStore((s) => s.setActiveCapabilityId);
  const [openId, setOpenId] = useState(activeId);
  const active = capabilities.find((item) => item.id === activeId) ?? capabilities[0];

  return (
    <Section id="capabilities">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionReveal>
            <Eyebrow variant="violet">Capabilities</Eyebrow>
            <Heading as="h2" size="lg" className="max-w-md">
              Instruments for a living world.
            </Heading>
            <Text tone="muted" className="mt-5 max-w-md">
              A coordinated stack — models, molecules, data, and experimental platforms — built so
              discovery can compound.
            </Text>
          </SectionReveal>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 md:min-h-[280px]">
            <ParticleField density={24} color="rgba(176,132,255,0.45)" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active?.illustration}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <CapabilityIllustration
                  type={active?.illustration ?? "helix"}
                  className="relative z-10 h-[220px] text-cyan"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10">
          {isLoading ? (
            <Skeleton className="h-64" />
          ) : (
            <Accordion
              type="single"
              collapsible
              value={openId}
              onValueChange={(value) => {
                setOpenId(value);
                if (value) setActiveCapabilityId(value);
              }}
            >
              {capabilities.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger
                    onMouseEnter={() => setActiveCapabilityId(item.id)}
                    onFocus={() => setActiveCapabilityId(item.id)}
                    className="gap-4 text-base md:gap-6 md:text-lg"
                  >
                    <span className="flex min-w-0 flex-1 items-baseline gap-3 md:gap-5">
                      <span className="shrink-0 text-xs tracking-[0.22em] text-primary">
                        {item.number}
                      </span>
                      <span className="min-w-0 text-wrap text-left leading-snug">{item.title}</span>
                    </span>
                    <span
                      aria-hidden
                      className="hidden max-w-sm truncate text-right text-sm font-normal text-muted-foreground xl:inline"
                    >
                      {item.summary}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="max-w-2xl text-base leading-relaxed">{item.description}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </Container>
    </Section>
  );
}
