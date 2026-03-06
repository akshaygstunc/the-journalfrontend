"use client";

import { useEffect, useState } from "react";

export default function AdminUserRoles() {

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Editor",
  });

  /* FETCH USERS */

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const res = await fetch("/api/users");
      const data = await res.json();

      setUsers(data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  };

  /* ADD USER */

  const addUser = async () => {

    if (!form.name || !form.email) return;

    try {

      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setForm({
        name: "",
        email: "",
        role: "Editor",
      });

      fetchUsers();

    } catch (err) {
      console.error(err);
    }

  };

  /* DELETE USER */

  const deleteUser = async (id: string) => {

    if (!confirm("Delete this user?")) return;

    try {

      await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      setUsers(users.filter((u) => u._id !== id));

    } catch (err) {
      console.error(err);
    }

  };

  /* UPDATE ROLE */

  const updateRole = async (id: string, role: string) => {

    try {

      await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      fetchUsers();

    } catch (err) {
      console.error(err);
    }

  };

  /* TOGGLE STATUS */

  const toggleStatus = async (user: any) => {

    try {

      await fetch(`/api/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: !user.active,
        }),
      });

      fetchUsers();

    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="p-6 bg-[#F6F6F6] min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-semibold">
          User Roles
        </h1>

        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#E7E7E7] rounded px-4 py-2"
        />

      </div>


      {/* ADD USER */}

      <div className="bg-white border border-[#E7E7E7] rounded-lg p-6 mb-6">

        <h2 className="font-semibold mb-4">
          Add User
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border border-[#E7E7E7] rounded px-3 py-2"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="border border-[#E7E7E7] rounded px-3 py-2"
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            className="border border-[#E7E7E7] rounded px-3 py-2"
          >

            <option>Admin</option>
            <option>Editor</option>
            <option>Reporter</option>

          </select>

          <button
            onClick={addUser}
            className="bg-[#861212] text-white rounded px-4 py-2"
          >
            Add
          </button>

        </div>

      </div>


      {/* USERS TABLE */}

      <div className="bg-white border border-[#E7E7E7] rounded-lg overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-left">

            <tr>

              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  Loading users...
                </td>
              </tr>

            ) : filtered.length === 0 ? (

              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>

            ) : (

              filtered.map((user) => (

                <tr
                  key={user._id}
                  className="border-t border-[#E7E7E7]"
                >

                  <td className="p-4 font-medium">
                    {user.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="p-4">

                    <select
                      value={user.role}
                      onChange={(e) =>
                        updateRole(user._id, e.target.value)
                      }
                      className="border border-[#E7E7E7] rounded px-2 py-1"
                    >

                      <option>Admin</option>
                      <option>Editor</option>
                      <option>Reporter</option>

                    </select>

                  </td>

                  <td className="p-4">

                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        user.active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {user.active ? "Active" : "Suspended"}
                    </span>

                  </td>

                  <td className="p-4 flex gap-3 text-xs">

                    <button
                      onClick={() => toggleStatus(user)}
                      className="text-blue-600"
                    >
                      Toggle
                    </button>

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}