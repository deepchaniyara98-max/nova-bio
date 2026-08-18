import { Container } from "@/components/base/Container";
import { Logo } from "@/components/base/Logo";
import { Separator } from "@/components/ui/separator";
import { FOOTER_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <Container width="wide">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{SITE.description}</p>
          </div>
          <FooterColumn title="Research" links={FOOTER_LINKS.research} />
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn
            title="Connect"
            links={[
              { href: SITE.linkedin, label: "LinkedIn" },
              ...FOOTER_LINKS.legal,
            ]}
          />
        </div>
        <Separator className="my-8 bg-white/10" />
        <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE.copyrightYear} {SITE.legalName}. All rights reserved.</p>
          <p>{SITE.email}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <a
              href={link.href}
              className="text-foreground/80 transition-colors hover:text-primary"
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
