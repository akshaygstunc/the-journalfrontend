import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutClient from "@/src/components/layout/LayoutClient";
import ToastProvider from "../admin/components/ToastProvider";
import Schema from "@/src/components/Schema"; // 👈 ADD THIS

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SOPHIE MEDIA",
  description: "Latest news and updates",
};

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

// ✅ ORGANIZATION SCHEMA
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sophie Media",
  url: baseUrl,
  logo: {
    "@type": "ImageObject",
    url: `${baseUrl}/logo.png`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#F9F6F3] text-gray-900`}
      >
        {/* ✅ ADD HERE (TOP LEVEL) */}
        <Schema schemas={[organizationSchema]} />

        <LayoutClient>{children}</LayoutClient>
        <ToastProvider />
      </body>
    </html>
  );
}