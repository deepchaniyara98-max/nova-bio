export const SITE = {
  name: "NOVA BIO",
  legalName: "Nova Bio Laboratories",
  tagline: "Engineering the future of life.",
  description:
    "NOVA BIO combines biology, computation, and advanced engineering to build technologies for the future of life.",
  url: "https://novabio.lab",
  email: "hello@novabio.lab",
  linkedin: "https://www.linkedin.com/company/novabio",
  copyrightYear: 2026,
} as const;

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#research", label: "Research" },
  { href: "#technology", label: "Technology" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  research: [
    { href: "#research", label: "Research programs" },
    { href: "#technology", label: "Discovery graph" },
    { href: "#impact", label: "Impact" },
  ],
  company: [
    { href: "#about", label: "About" },
    { href: "#capabilities", label: "Capabilities" },
    { href: "#contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;
