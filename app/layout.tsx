import type { Metadata, Viewport } from "next";
import "./globals.css";
import ScrollProgress from "@/components/effects/ScrollProgress";

export const metadata: Metadata = {
  title: "Sonu Kumar — Web Developer & Designer | Delhi, India",
  description:
    "I design and develop premium websites, Shopify stores, and custom web applications that help businesses look professional, build trust, and grow online.",
  keywords: [
    "web developer delhi", "shopify developer india", "freelance web developer",
    "next.js developer", "react developer", "custom web applications",
    "website design india", "ecommerce developer",
  ],
  authors:   [{ name: "Sonu Kumar", url: "https://github.com/Code7x0" }],
  creator:   "Sonu Kumar",
  robots:    { index: true, follow: true },
  openGraph: {
    type:        "website",
    locale:      "en_IN",
    siteName:    "Sonu Kumar — Portfolio",
    title:       "Sonu Kumar — Premium Web Developer",
    description: "Premium websites that turn visitors into customers. Web development, Shopify, and custom web applications.",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Sonu Kumar — Premium Web Developer",
    description: "Premium websites that turn visitors into customers. Based in Delhi, India.",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width:            "device-width",
  initialScale:     1,
  maximumScale:     5,
  themeColor:       "#151515",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
      </head>
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
