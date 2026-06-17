import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aidengoldkr.dev"),

  title: {
    default: "김건우 | Aidengoldkr",
    template: "%s | Aidengoldkr",
  },

  description:
    "Product Builder Aidengoldkr's personal portfolio site. PM & Frontend developer focused on AI, SaaS, and product execution.",

  keywords: [
    "Aiden",
    "Aidengoldkr",
    "김건우",
    "Portfolio",
    "Next.js",
    "Frontend",
    "PM",
    "AI",
    "SaaS",
    "Developer",
  ],

  authors: [
    {
      name: "Aidengoldkr",
      url: "https://aidengoldkr.dev",
    },
  ],

  creator: "Aidengoldkr",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "김건우 | Aidengoldkr",
    description:
      "Product Builder Aidengoldkr's personal portfolio site.",
    url: "https://aidengoldkr.dev",
    siteName: "김건우 | Aidengoldkr",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "김건우 | Aidengoldkr",
      },
    ],
    locale: "ko_KR",
    alternateLocale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "김건우 | Aidengoldkr",
    description:
      "Product Builder Aidengoldkr's personal portfolio site.",
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/profile.png",
    shortcut: "/profile.png",
    apple: "/profile.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

import { LanguageProvider } from "./context/LanguageContext";
import QueryProvider from "./providers/QueryProvider";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kunwoo Kim",
    alternateName: ["김건우", "Aidengoldkr"],
    url: "https://aidengoldkr.dev",
    image: "https://aidengoldkr.dev/profile.png",
    jobTitle: "Product Builder / Frontend Developer",
    description:
      "Product Builder focused on AI, SaaS, and end-to-end product execution.",
    sameAs: [
      "https://blog.aidengoldkr.dev/",
      "https://www.linkedin.com/in/kunwoo-kim-62a9b0284",
      "https://www.instagram.com/kw_k.9119/",
      "https://github.com/aidengoldkr",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aidengoldkr",
    url: "https://aidengoldkr.dev",
    inLanguage: ["ko", "en"],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <QueryProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}