import type { Metadata } from "next";

const FAVICON = "https://cdn.riroschool.kr/assets/img/favicon.png";

export const metadata: Metadata = {
  title: { absolute: "단대소고 진로진학사이트" },
  description: "",
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  icons: {
    icon: FAVICON,
    shortcut: FAVICON,
    apple: FAVICON,
  },
};

export default function RiroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
