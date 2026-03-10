"use client";

import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  deleteUserApi,
  updateUserApi,
} from "@/src/services/user.service";

export default function AdminUserRoles() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState<any | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "editor",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    if (!form.name || !form.email) return;

    await createUser(form);

    setForm({
      name: "",
      email: "",
      role: "editor",
    });

    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return;

    await deleteUserApi(id);
    fetchUsers();
  };

  const updateRole = async (id: string, role: string) => {
    await updateUserApi(id, { role });
    fetchUsers();
  };

  const toggleStatus = async (user: any) => {
    await updateUserApi(user._id, {
      active: !user.active,
    });

    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      ```
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">User Roles Management</h1>

        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-64"
        />
      </div>
      {/* ADD USER CARD */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="font-semibold mb-4 text-lg">Add New User</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded-lg px-3 py-2"
          />

          <input
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border rounded-lg px-3 py-2"
          />

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="border rounded-lg px-3 py-2"
          >
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="reporter">Reporter</option>
          </select>

          <button
            onClick={addUser}
            className="bg-[#861212] hover:bg-[#6e0f0f] text-white rounded-lg px-4 py-2"
          >
            Add User
          </button>
        </div>
      </div>
      {/* USERS TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center">
                    Loading users...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user._id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{user.name}</td>

                    <td className="p-4 text-gray-600">{user.email}</td>

                    <td className="p-4">
                      <select
                        value={user.role}
                        onChange={(e) => updateRole(user._id, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="reporter">Reporter</option>
                      </select>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          user.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {user.active ? "Active" : "Suspended"}
                      </span>
                    </td>

                    <td className="p-4 flex gap-3">
                      <button
                        onClick={() => toggleStatus(user)}
                        className="text-blue-600 hover:underline"
                      >
                        Toggle
                      </button>

                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => setEditUser(user)}
                        className="text-indigo-600 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* EDIT MODAL */}
      {editUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>

            <input
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
              className="border w-full mb-3 px-3 py-2 rounded"
            />

            <select
              value={editUser.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
              className="border w-full mb-4 px-3 py-2 rounded"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="reporter">Reporter</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditUser(null)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await updateUserApi(editUser._id, editUser);
                  setEditUser(null);
                  fetchUsers();
                }}
                className="bg-[#861212] text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
