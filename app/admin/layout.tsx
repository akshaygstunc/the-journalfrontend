import AdminSidebar from "./components/AdminSidebar";
import "./../globals.css";
import AdminNavbar from "./components/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
