"use client";

import { Container } from "@/components/base/Container";
import { Eyebrow } from "@/components/base/Eyebrow";
import { Heading } from "@/components/base/Heading";
import { Section } from "@/components/base/Section";
import { Text } from "@/components/base/Text";
import { DnaHelix } from "@/components/common/DnaHelix";
import { SectionReveal } from "@/components/SectionReveal";

const PRINCIPLES = [
  {
    title: "See the system",
    copy: "Life is not a list of parts. We map the hidden interactions that decide whether a molecule, a cell, or a therapy will hold.",
  },
  {
    title: "Make it precise",
    copy: "Every model, edit, and assay is designed to be measurable. Ambiguity is treated as a design constraint, not a given.",
  },
  {
    title: "Keep it human",
    copy: "The work is technical. The purpose is not. We build tools that help researchers ask better questions about living systems.",
  },
];

export function About() {
  return (
    <Section id="about" tone="cream">
      <Container width="wide">
        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionReveal>
            <Eyebrow variant="cream">Philosophy</Eyebrow>
            <Heading as="h2" size="xl">
              Biology is programmable.
            </Heading>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <Text tone="cream" size="lead">
              We explore the hidden systems that govern life and translate biological complexity
              into precise, scalable technology.
            </Text>
          </SectionReveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionReveal>
            <div className="relative mx-auto h-[280px] w-full max-w-sm md:h-[420px]">
              <div className="absolute inset-0 rounded-[2.5rem] bg-cream-foreground/[0.04]" />
              <DnaHelix tone="navy" className="relative z-10 px-8 py-4 md:px-10 md:py-6" />
              <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 rounded-2xl border border-cream-foreground/10 bg-cream/80 px-4 py-3 text-xs text-cream-foreground/70 backdrop-blur md:inset-x-8 md:bottom-8 md:text-sm">
                Sequence context · structural constraint · cellular fate
              </div>
            </div>
          </SectionReveal>
          <div className="space-y-8">
            {PRINCIPLES.map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.08}>
                <div className="border-t border-cream-foreground/10 pt-6">
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-cream-foreground/45">
                    0{index + 1}
                  </p>
                  <h3 className="mb-2 text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <Text tone="cream">{item.copy}</Text>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
