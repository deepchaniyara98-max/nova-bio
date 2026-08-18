"use client";

import { Container } from "@/components/base/Container";
import { Heading } from "@/components/base/Heading";
import { MagneticButton } from "@/components/base/MagneticButton";
import { Section } from "@/components/base/Section";
import { Text } from "@/components/base/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MolecularVisualization } from "@/components/MolecularVisualization";
import { useContactMutation } from "@/hooks/use-contact";
import { VISUALIZATION_EDGES, VISUALIZATION_NODES } from "@/lib/data/science";
import { FormEvent, useState } from "react";

export function CTA() {
  const mutation = useContactMutation();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitted || mutation.isPending) return;
    const form = new FormData(event.currentTarget);
    mutation.mutate(
      {
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        organization: String(form.get("organization") || ""),
        message: String(form.get("message") || ""),
      },
      {
        onSuccess: () => setSubmitted(true),
      },
    );
  };

  return (
    <Section id="contact" className="pb-12">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <MolecularVisualization
          nodes={VISUALIZATION_NODES}
          edges={VISUALIZATION_EDGES}
          interactive={false}
          palette="violet"
        />
      </div>
      <Container width="wide" className="relative">
        <div className="grid gap-10 overflow-hidden rounded-[1.6rem] border border-white/10 bg-background/70 p-5 backdrop-blur-md sm:rounded-[2.2rem] md:p-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Heading as="h2" size="xl">
              Let&apos;s engineer what&apos;s next.
            </Heading>
            <Text tone="muted" size="lead" className="mt-6 max-w-lg">
              The next breakthrough begins with a better question. Research partnerships,
              platform collaborations, and scientific inquiries are welcome.
            </Text>
            <div className="mt-8">
              <MagneticButton href="mailto:hello@novabio.lab" variant="cream" size="lg" className="w-full justify-center sm:w-auto">
                Start a Conversation
              </MagneticButton>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="contact-name">Name</Label>
                <Input id="contact-name" name="name" required placeholder="Dr. Maya Chen" disabled={submitted} />
              </div>
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="maya@institute.edu"
                  disabled={submitted}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="contact-org">Organization</Label>
              <Input
                id="contact-org"
                name="organization"
                placeholder="Research institute or company"
                disabled={submitted}
              />
            </div>
            <div>
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                name="message"
                required
                placeholder="What are you trying to understand?"
                disabled={submitted}
              />
            </div>
            <Button type="submit" disabled={mutation.isPending || submitted} className="w-full sm:w-auto">
              {mutation.isPending ? "Sending…" : submitted ? "Message received" : "Send inquiry"}
            </Button>
            {mutation.isError ? (
              <p className="text-sm text-destructive" role="alert">
                Something went wrong. Please try email instead.
              </p>
            ) : null}
            {submitted ? (
              <p className="text-sm text-emerald" role="status">
                Thank you. A scientist will follow up.
              </p>
            ) : null}
          </form>
        </div>
      </Container>
    </Section>
  );
}
