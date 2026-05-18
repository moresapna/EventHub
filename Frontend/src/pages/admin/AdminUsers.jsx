import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const load = () => api.get("/users").then(({ data }) => setUsers(data));
  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete user?")) return;
    await api.delete(`/users/${id}`);
    toast.success("User removed");
    load();
  };

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Joined</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>
              <td className="p-3">{new Date(u.createdAt).toLocaleString()}</td>
              <td className="p-3 text-right">
                {u.role !== "admin" && (
                  <button
                    onClick={() => remove(u._id)}
                    className="text-red-600 text-xs hover:underline"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
