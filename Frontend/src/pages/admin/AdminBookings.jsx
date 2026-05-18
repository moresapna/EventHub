import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings").then(({ data }) => setBookings(data));
  }, []);

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-3">User</th>
            <th className="p-3">Event</th>
            <th className="p-3">Tickets</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="border-t">
              <td className="p-3">
                {b.userId?.name}
                <div className="text-xs text-slate-500">{b.userId?.email}</div>
              </td>
              <td className="p-3">{b.eventId?.title}</td>
              <td className="p-3">{b.ticketsBooked}</td>
              <td className="p-3">₹{b.totalAmount}</td>
              <td className="p-3">{b.bookingStatus}</td>
              <td className="p-3">{new Date(b.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
