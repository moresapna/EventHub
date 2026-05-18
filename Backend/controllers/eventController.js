import asyncHandler from "express-async-handler";
import Event from "../models/Event.js";

// GET /api/events
export const getEvents = asyncHandler(async (req, res) => {
  const { search, category, location, date } = req.query;
  const query = {};

  if (search) query.title = { $regex: search, $options: "i" };
  if (category) query.category = category;
  if (location) query.venue = { $regex: location, $options: "i" };
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    query.date = { $gte: start, $lt: end };
  }

  const events = await Event.find(query).sort({ date: 1 });
  res.json(events);
});

// GET /api/events/:id
export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  res.json(event);
});

// POST /api/events  (admin)
export const createEvent = asyncHandler(async (req, res) => {
  const { totalSeats } = req.body;
  const event = await Event.create({
    ...req.body,
    availableSeats: totalSeats,
    createdBy: req.user._id,
  });
  res.status(201).json(event);
});

// PUT /api/events/:id  (admin)
export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  // Adjust availableSeats proportionally if totalSeats changes
  if (req.body.totalSeats && req.body.totalSeats !== event.totalSeats) {
    const diff = req.body.totalSeats - event.totalSeats;
    event.availableSeats = Math.max(0, event.availableSeats + diff);
  }

  Object.assign(event, req.body);
  const updated = await event.save();
  res.json(updated);
});

// DELETE /api/events/:id  (admin)
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  await event.deleteOne();
  res.json({ message: "Event removed" });
});
