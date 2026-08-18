import { MagneticButton } from "@/components/base/MagneticButton";
import { Heading } from "@/components/base/Heading";
import { Text } from "@/components/base/Text";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-xs uppercase tracking-[0.24em] text-primary">404</p>
      <Heading as="h1" size="lg">
        This sequence is not in the atlas.
      </Heading>
      <Text tone="muted" className="mt-4 max-w-md">
        The page you requested does not exist. Return to the research overview.
      </Text>
      <div className="mt-8">
        <MagneticButton href="/">Back to NOVA BIO</MagneticButton>
      </div>
    </main>
  );
}
