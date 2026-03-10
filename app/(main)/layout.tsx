// import "../globals.css";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";

// import Navbar from "@/src/components/layout/Navbar";
// import ToastProvider from "../admin/components/ToastProvider";
// import { useMemo } from "react";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// });


// export const metadata: Metadata = {
//   title: "The Journal",
//   description: "Latest news and updates",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = typeof window !== "undefined" ? window.location.pathname : "";
//   const hideNavbar = pathname === "/login" || pathname === "/signup";
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={`${inter.variable} font-sans antialiased bg-[#F9F6F3] text-gray-900`}
//       >
//         {!hideNavbar && <Navbar />}
//         <main className="min-h-screen">{children}</main>
//         {/* <Footer /> */}
//       </body>
//     </html>
//   );
// }

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
  title: "The Journal",
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