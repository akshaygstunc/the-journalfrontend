import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <ul className="space-y-4">
          <li><Link href="/admin/articles" className="text-blue-600 hover:underline">Articles</Link></li>
          <li><Link href="/admin/media-library" className="text-blue-600 hover:underline">Media Library</Link></li>
          <li><Link href="/admin/source-management" className="text-blue-600 hover:underline">Source Management</Link></li>
          <li><Link href="/admin/user-roles" className="text-blue-600 hover:underline">User Roles</Link></li>
          <li><Link href="/admin/analytics" className="text-blue-600 hover:underline">Analytics</Link></li>
          <li><Link href="/admin/settings" className="text-blue-600 hover:underline">Settings</Link></li>
        </ul>
      </div>
    </div>
  );
}
