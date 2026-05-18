import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-brand-600">
          EventHub
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <NavLink to="/" className="hover:text-brand-600">
            Events
          </NavLink>
          {user && (
            <NavLink to="/my-bookings" className="hover:text-brand-600">
              My Bookings
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin" className="hover:text-brand-600">
              Admin
            </NavLink>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-slate-600 hidden sm:inline">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="btn-outline text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn-outline text-sm">
                Login
              </Link>
              <Link to="/signup" className="btn-primary text-sm">
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
