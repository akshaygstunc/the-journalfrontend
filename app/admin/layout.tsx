import AdminSidebar from "./components/AdminSidebar";
import { Inter } from "next/font/google";
import "./../globals.css";
import AdminNavbar from "./components/AdminNavbar";
import type { Metadata } from "next";
import Providers from "../providers";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "The Journal",
  description: "Latest news and updates",
};
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
     <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#F9F6F3] text-gray-900`}
      >
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <Providers className="flex-1 p-6">{children}</Providers>
      </div>
    </div>
    </body>
    </html>
  );
}
