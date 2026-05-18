import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

const empty = {
  title: "",
  description: "",
  category: "Music",
  date: "",
  venue: "",
  price: 0,
  totalSeats: 50,
  availableSeats: 50,
  image: "",
};

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const { data } = await api.get("/events");
    setEvents(data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/events/${editingId}`, form);
        toast.success("Event updated");
      } else {
        await api.post("/events", form);
        toast.success("Event created");
      }

      setForm(empty);
      setEditingId(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    }
  };

  const edit = (ev) => {
    setEditingId(ev._id);

    setForm({
      ...ev,
      date: ev.date?.slice(0, 16),
    });
  };

  const remove = async (id) => {
    if (!confirm("Delete this event?")) return;

    await api.delete(`/events/${id}`);

    toast.success("Deleted");

    load();
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* Form */}
      <form
        onSubmit={submit}
        className="card p-6 space-y-4 h-fit"
      >
        <h2 className="text-2xl font-bold">
          {editingId ? "Edit Event" : "Create Event"}
        </h2>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Event Title
          </label>

          <input
            className="input"
            placeholder="Enter event title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>

          <textarea
            className="input"
            placeholder="Enter event description"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Category
          </label>

          <select
            className="input"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          >
            {[
              "Music", "Sports", "Tech", "Theatre", "Workshop","Natak","Stand-up Comedy","Dance","Exhibition","Food Festival","Other"
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Event Date & Time
          </label>

          <input
            type="datetime-local"
            className="input"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Venue */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Venue / Location
          </label>

          <input
            className="input"
            placeholder="Enter venue"
            value={form.venue}
            onChange={(e) =>
              setForm({
                ...form,
                venue: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Price + Seats */}
        <div className="grid grid-cols-3 gap-4">

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Ticket Price (₹)
            </label>

            <input
              type="number"
              className="input"
              placeholder="Enter price"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: Number(e.target.value),
                })
              }
              required
            />
          </div>

          {/* Total Seats */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Total Seats
            </label>

            <input
              type="number"
              className="input"
              placeholder="Total seats"
              value={form.totalSeats}
              onChange={(e) =>
                setForm({
                  ...form,
                  totalSeats: Number(e.target.value),
                })
              }
              required
            />
          </div>

          {/* Remaining Seats */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Remaining Seats
            </label>

            <input
              type="number"
              className="input"
              placeholder="Available seats"
              value={form.availableSeats}
              onChange={(e) =>
                setForm({
                  ...form,
                  availableSeats: Number(e.target.value),
                })
              }
              required
            />
          </div>

        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Event Image URL
          </label>

          <input
            className="input"
            placeholder="Paste image URL"
            value={form.image}
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.value,
              })
            }
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          <button className="btn-primary flex-1">
            {editingId ? "Update Event" : "Create Event"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn-outline"
              onClick={() => {
                setForm(empty);
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          )}

        </div>
      </form>

      {/* Events List */}
      <div className="space-y-3">

        <h2 className="text-2xl font-bold">
          All Events ({events.length})
        </h2>

        {events.map((ev) => (
          <div
            key={ev._id}
            className="card p-4 flex justify-between gap-3"
          >
            <div>

              <h3 className="font-semibold text-lg">
                {ev.title}
              </h3>

              <p className="text-sm text-slate-500">
                {new Date(ev.date).toLocaleString()}
              </p>

              <p className="text-sm text-slate-500">
                {ev.venue}
              </p>

              <p className="text-sm mt-2">
                Remaining Seats:
                <span className="font-medium">
                  {" "}
                  {ev.availableSeats}/{ev.totalSeats}
                </span>
              </p>

              <p className="text-sm">
                Ticket Price:
                <span className="font-medium">
                  {" "}
                  ₹{ev.price}
                </span>
              </p>

            </div>

            <div className="flex flex-col gap-2">

              <button
                onClick={() => edit(ev)}
                className="btn-outline text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => remove(ev._id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}