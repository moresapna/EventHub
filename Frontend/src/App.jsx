import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyBookings from "./pages/MyBookings";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import ScanTicket from "./pages/admin/ScanTicket";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {

  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route
          index
          element={<Home />}
        />

        <Route
          path="events/:id"
          element={<EventDetails />}
        />

        <Route
          path="login"
          element={<Login />}
        />

        <Route
          path="signup"
          element={<Signup />}
        />

        {/* User Routes */}
        <Route
          path="my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<AdminEvents />}
          />

          <Route
            path="bookings"
            element={<AdminBookings />}
          />

          <Route
            path="users"
            element={<AdminUsers />}
          />

          {/* QR Scanner */}
          <Route
            path="scan"
            element={<ScanTicket />}
          />

        </Route>

      </Route>

    </Routes>
  );
}