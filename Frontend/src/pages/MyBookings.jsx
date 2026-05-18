import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);

    try {
      const { data } = await api.get(
        "/bookings/my"
      );

      setBookings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    if (!confirm("Cancel this booking?"))
      return;

    try {
      await api.put(
        `/bookings/${id}/cancel`
      );

      toast.success("Booking cancelled");

      load();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to cancel"
      );
    }
  };

  if (loading)
    return (
      <p className="text-center py-10">
        Loading...
      </p>
    );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-slate-500">
          You haven't booked any events
          yet.
        </p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="card p-5 flex flex-col md:flex-row justify-between gap-6"
            >
              {/* Left Side */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {b.eventId?.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {b.eventId &&
                    new Date(
                      b.eventId.date
                    ).toLocaleString()}{" "}
                  · {b.eventId?.venue}
                </p>

                <p className="text-sm">
                  Tickets:{" "}
                  <span className="font-medium">
                    {b.ticketsBooked}
                  </span>
                </p>

                <p className="text-sm">
                  Total Amount:{" "}
                  <span className="font-medium">
                    ₹{b.totalAmount}
                  </span>
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      b.bookingStatus ===
                      "confirmed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.bookingStatus}
                  </span>

                  {b.bookingStatus ===
                    "confirmed" && (
                    <button
                      onClick={() =>
                        cancel(b._id)
                      }
                      className="btn-outline text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Right Side QR */}
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-2">
                  Entry QR Ticket
                </p>

                {b.qrCode ? (
                  <img
                    src={b.qrCode}
                    alt="QR Code"
                    className="w-40 h-40 border rounded-lg p-2 bg-white"
                  />
                ) : (
                  <p className="text-sm text-slate-400">
                    No QR Available
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}