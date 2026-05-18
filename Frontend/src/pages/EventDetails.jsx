import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function EventDetails() {

  const { id } = useParams();

  const { user } = useAuth();

  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  const [tickets, setTickets] = useState(1);

  const [booking, setBooking] = useState(false);

  useEffect(() => {

    api
      .get(`/events/${id}`)
      .then(({ data }) => setEvent(data));

  }, [id]);

  if (!event) {
    return (
      <p className="text-center py-10">
        Loading...
      </p>
    );
  }

  const total = tickets * event.price;

  // Razorpay Payment
  const handlePayment = async () => {

    if (!user) {

      toast.error("Please login first");

      return navigate("/login");
    }

    if (tickets > event.availableSeats) {

      return toast.error(
        "Not enough seats available"
      );
    }

    setBooking(true);

    try {

      // Create Razorpay Order
      const { data } = await api.post(
        "/payment/create-order",
        {
          amount: total,
        }
      );

      const options = {

        key: "rzp_test_SqlqmCEB1QyWIr",

        amount: data.amount,

        currency: data.currency,

        name: "EventHub",

        description: event.title,

        order_id: data.id,

        handler: async function () {

          // Create Booking After Payment
          await api.post("/bookings", {
            eventId: id,
            ticketsBooked: tickets,
          });

          toast.success(
            "Payment Successful!"
          );

          navigate("/my-bookings");
        },

        remember_customer: false,

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Payment Failed"
      );

    } finally {

      setBooking(false);
    }
  };

  return (

    <div className="grid md:grid-cols-3 gap-6">

      {/* Left Side */}
      <div className="md:col-span-2 space-y-4">

        <div className="card overflow-hidden">

          {/* Event Image */}
          <div className="h-64 bg-slate-200">

            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            )}

          </div>

          {/* Event Info */}
          <div className="p-6 space-y-3">

            <span className="text-xs px-2 py-1 bg-brand-500/10 text-brand-700 rounded-full">
              {event.category}
            </span>

            <h1 className="text-3xl font-bold">
              {event.title}
            </h1>

            <p className="text-slate-600 leading-relaxed">
              {event.description}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 text-sm">

              <p>
                <span className="text-slate-500">
                  Date:
                </span>{" "}
                {new Date(event.date).toLocaleString()}
              </p>

              <p>
                <span className="text-slate-500">
                  Venue:
                </span>{" "}
                {event.venue}
              </p>

              <p>
                <span className="text-slate-500">
                  Total Seats:
                </span>{" "}
                {event.totalSeats}
              </p>

              <p>
                <span className="text-slate-500">
                  Remaining Seats:
                </span>{" "}
                {event.availableSeats}
              </p>

            </div>

          </div>
        </div>
      </div>

      {/* Booking Card */}
      <aside className="card p-6 h-fit space-y-4">

        <h2 className="text-xl font-bold">
          Book Tickets
        </h2>

        <p className="text-3xl font-bold text-brand-700">
          ₹{event.price}
        </p>

        {/* Tickets */}
        <label className="block text-sm">

          <span className="text-slate-600">
            Number of Tickets
          </span>

          <input
            type="number"
            min={1}
            max={event.availableSeats || 1}
            value={tickets}
            onChange={(e) =>
              setTickets(Number(e.target.value))
            }
            className="input mt-2"
          />

        </label>

        {/* Total */}
        <div className="flex justify-between text-sm border-t pt-4">

          <span>Total Amount</span>

          <span className="font-bold text-lg">
            ₹{total}
          </span>

        </div>

        {/* Button */}
        <button
          onClick={handlePayment}
          disabled={
            booking ||
            event.availableSeats === 0
          }
          className="btn-primary w-full disabled:opacity-50"
        >

          {event.availableSeats === 0
            ? "Sold Out"
            : booking
            ? "Processing..."
            : "Pay & Book Now"}

        </button>

      </aside>

    </div>
  );
}