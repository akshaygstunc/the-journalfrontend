import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutClient from "@/src/components/layout/LayoutClient";
import ToastProvider from "../admin/components/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SOPHIE MEDIA",
  description: "Latest news and updates",
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
        <LayoutClient>{children}</LayoutClient>
        <ToastProvider />
      </body>
    </html>
  );
}