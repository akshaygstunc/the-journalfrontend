"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/src/components/layout/Navbar";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/login" ||
    pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="min-h-screen">{children}</main>
    </>
  );
}