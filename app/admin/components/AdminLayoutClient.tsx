"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import Providers from "../../providers";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
  return <>{children}</>;
}

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <Providers className="flex-1 p-6">{children}</Providers>
      </div>
    </div>
  );
}