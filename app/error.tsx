"use client";

import { MagneticButton } from "@/components/base/MagneticButton";
import { Heading } from "@/components/base/Heading";
import { Text } from "@/components/base/Text";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Heading as="h1" size="lg">
        A pathway failed to resolve.
      </Heading>
      <Text tone="muted" className="mt-4 max-w-md">
        Something unexpected happened while loading this view. You can try again.
      </Text>
      <div className="mt-8">
        <MagneticButton type="button" onClick={reset} showArrow={false}>
          Retry
        </MagneticButton>
      </div>
    </main>
  );
}
