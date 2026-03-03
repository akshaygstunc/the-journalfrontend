import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
