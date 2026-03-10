import { Inter } from "next/font/google";
import "./../globals.css";
import AdminLayoutClient from "./components/AdminLayoutClient";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "The Journal",
  description: "Latest news and updates",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#F9F6F3] text-gray-900`}
      >
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </body>
    </html>
  );
}