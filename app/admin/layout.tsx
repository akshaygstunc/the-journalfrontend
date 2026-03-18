
import { Inter } from "next/font/google";
import "./../globals.css";
import AdminLayoutClient from "./components/AdminLayoutClient";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import ToastProvider from "./components/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SOPHIE MEDIA",
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
        <ToastProvider />
      </body>
    </html>
  );
}