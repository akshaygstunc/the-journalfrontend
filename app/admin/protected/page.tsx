import { redirect } from "next/navigation";

export default function AdminProtectedPage() {
  // Example protected page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Protected Admin Page</h1>
        <p>This page is only accessible to authenticated admins.</p>
      </div>
    </div>
  );
}
