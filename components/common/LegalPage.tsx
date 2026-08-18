import { Container } from "@/components/base/Container";
import { Heading } from "@/components/base/Heading";
import { Logo } from "@/components/base/Logo";
import { Text } from "@/components/base/Text";
import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <main className="px-1 py-16 sm:py-20">
      <Container width="narrow">
        <Logo />
        <Heading as="h1" size="lg" className="mt-12">
          {title}
        </Heading>
        <Text tone="muted" className="mt-6">
          {children}
        </Text>
        <a href="/" className="mt-10 inline-block text-sm text-primary">
          Return home
        </a>
      </Container>
    </main>
  );
}
