import { LegalPage } from "@/components/common/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      NOVA BIO collects only the information you submit through our inquiry form: name, email,
      organization, and message. We use that information to respond to scientific partnership
      requests. We do not sell personal data. Inquiry records are retained only as long as needed
      to continue a conversation you initiated.
    </LegalPage>
  );
}
