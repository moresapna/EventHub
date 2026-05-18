import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const isSoldOut = event.availableSeats === 0;
  return (
    <div className="card overflow-hidden hover:shadow-md transition">
      <div className="h-44 bg-slate-200 overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium px-2 py-1 bg-brand-500/10 text-brand-700 rounded-full">
            {event.category}
          </span>
          <span className="text-sm font-semibold">₹{event.price}</span>
        </div>
        <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
        <p className="text-sm text-slate-500">
          {new Date(event.date).toLocaleString()}
        </p>
        <p className="text-sm text-slate-500 line-clamp-1">{event.venue}</p>
        <div className="flex items-center justify-between pt-2">
          <span
            className={`text-xs ${
              isSoldOut ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {isSoldOut ? "Sold Out" : `${event.availableSeats} seats left`}
          </span>
          <Link to={`/events/${event._id}`} className="btn-primary text-sm">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
