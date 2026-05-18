import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t bg-white text-center py-4 text-sm text-slate-500">
        © {new Date().getFullYear()} EventHub
      </footer>
    </div>
  );
}
