import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/providers/providers";
import { SITE } from "@/lib/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://novabio.lab"),
  title: {
    default: "NOVA BIO — Engineering the Future of Life",
    template: "%s — NOVA BIO",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "biotechnology",
    "computational biology",
    "genetic engineering",
    "cellular engineering",
    "scientific research",
  ],
  authors: [{ name: SITE.legalName }],
  openGraph: {
    title: "NOVA BIO — Engineering the Future of Life",
    description: SITE.description,
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA BIO — Engineering the Future of Life",
    description: SITE.description,
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen bg-background font-sans">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
