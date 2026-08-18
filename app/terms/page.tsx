import { LegalPage } from "@/components/common/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms">
      This website is a public research overview for NOVA BIO. Content is provided for scientific
      communication and is not medical advice. Partnership discussions are non-binding until a
      written agreement is executed. All research marks, models, and visual systems on this site
      remain the property of Nova Bio Laboratories.
    </LegalPage>
  );
}
