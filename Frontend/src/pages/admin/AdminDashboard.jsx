import { NavLink, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const link = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm ${
      isActive ? "bg-brand-600 text-white" : "hover:bg-slate-100"
    }`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <nav className="flex gap-2 flex-wrap border-b pb-3">
        <NavLink to="/admin" end className={link}>
          Events
        </NavLink>
        <NavLink to="/admin/bookings" className={link}>
          Bookings
        </NavLink>
        <NavLink to="/admin/users" className={link}>
          Users
        </NavLink>
        <NavLink to="/admin/scan" className={link}>
          Scan Tickets
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
