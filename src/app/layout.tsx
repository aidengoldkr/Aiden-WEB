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
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "김건우 | Aidengoldkr",
    description:
      "Product Builder Aidengoldkr's personal portfolio site.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}