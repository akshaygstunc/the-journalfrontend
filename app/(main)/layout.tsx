// import "../globals.css";
import "./../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "The Journal",
  description: "Latest news and updates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#F9F6F3] text-gray-900`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}