import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";

const CATEGORIES = ["Music", "Sports", "Tech", "Theatre", "Workshop","Natak","Stand-up Comedy","Dance","Exhibition","Food Festival","Other"];

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    // date: "",
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v)
      );
      const { data } = await api.get("/events", { params });
      setEvents(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchEvents();
}, [filters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div className="space-y-6">
      <section className="bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-2xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold">Find your next event</h1>
        <p className="text-white/80 mt-2">
          Concerts, workshops, sports & more — all in one place.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="card p-4 grid grid-cols-1 md:grid-cols-5 gap-3"
      >
        <input
          className="input md:col-span-2"
          placeholder="Search events..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          className="input"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          className="input"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        {/* <input
          type="date"
          className="input"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        /> */}
        
      </form>

      {loading ? (
        <p className="text-center text-slate-500 py-10">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-slate-500 py-10">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((e) => (
            <EventCard key={e._id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}
