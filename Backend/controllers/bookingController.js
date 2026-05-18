import asyncHandler from "express-async-handler";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import QRCode from "qrcode";

// POST /api/bookings
export const createBooking = asyncHandler(
  async (req, res) => {

    const {
      eventId,
      ticketsBooked
    } = req.body;

    const tickets =
      Number(ticketsBooked);

    if (!tickets || tickets < 1) {
      res.status(400);
      throw new Error(
        "Invalid ticket quantity"
      );
    }

    const event =
      await Event.findById(eventId);

    if (!event) {
      res.status(404);
      throw new Error(
        "Event not found"
      );
    }

    if (
      event.availableSeats < tickets
    ) {
      res.status(400);
      throw new Error(
        "Not enough seats available"
      );
    }

    // Reduce seats
    event.availableSeats -= tickets;

    await event.save();

    // Create booking
    const booking =
      await Booking.create({
        userId: req.user._id,
        eventId,
        ticketsBooked: tickets,
        totalAmount:
          tickets * event.price,
      });

    // QR Data
    const qrData = `
Booking ID: ${booking._id}
User ID: ${req.user._id}
Event: ${event.title}
Tickets: ${tickets}
Amount: ₹${tickets * event.price}
`;

    // Generate QR
    const qrCode =
      await QRCode.toDataURL(
        qrData
      );

    // Save QR
    booking.qrCode = qrCode;

    await booking.save();

    res.status(201).json(booking);
  }
);

// GET /api/bookings/my
export const getMyBookings =
  asyncHandler(async (req, res) => {

    const bookings =
      await Booking.find({
        userId: req.user._id,
      })
        .populate("eventId")
        .sort({ createdAt: -1 });

    res.json(bookings);
  });

// PUT /api/bookings/:id/cancel
export const cancelBooking =
  asyncHandler(async (req, res) => {

    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {
      res.status(404);
      throw new Error(
        "Booking not found"
      );
    }

    if (
      booking.userId.toString() !==
      req.user._id.toString()
    ) {
      res.status(403);
      throw new Error(
        "Not allowed"
      );
    }

    if (
      booking.bookingStatus ===
      "cancelled"
    ) {
      res.status(400);
      throw new Error(
        "Already cancelled"
      );
    }

    booking.bookingStatus =
      "cancelled";

    await booking.save();

    // Return seats
    const event =
      await Event.findById(
        booking.eventId
      );

    if (event) {

      event.availableSeats =
        Math.min(
          event.totalSeats,
          event.availableSeats +
            booking.ticketsBooked
        );

      await event.save();
    }

    res.json({
      message:
        "Booking cancelled",
      booking,
    });
  });

// GET /api/bookings (admin)
export const getAllBookings =
  asyncHandler(async (req, res) => {

    const bookings =
      await Booking.find()
        .populate(
          "userId",
          "name email"
        )
        .populate(
          "eventId",
          "title date venue"
        )
        .sort({ createdAt: -1 });

    res.json(bookings);
  });

// POST /api/bookings/scan/:id
export const scanTicket =
  asyncHandler(async (req, res) => {

    const booking =
      await Booking.findById(
        req.params.id
      ).populate("eventId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Cancelled ticket
    if (
      booking.bookingStatus ===
      "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "Cancelled ticket",
      });
    }

    // =========================
    // DATE VALIDATION
    // =========================

    const eventDate =
      new Date(
        booking.eventId.date
      );

    const today =
      new Date();

    const eventDay =
      eventDate
        .toISOString()
        .split("T")[0];

    const todayDay =
      today
        .toISOString()
        .split("T")[0];

    // Future QR
    if (eventDay > todayDay) {

      return res.status(400).json({
        success: false,
        message:
          "Future event QR not allowed",
      });
    }

    // Past QR
    if (eventDay < todayDay) {

      return res.status(400).json({
        success: false,
        message:
          "QR expired",
      });
    }

    // Entry limit
    if (
      booking.scannedCount >=
      booking.ticketsBooked
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Entry limit exceeded",
      });
    }

    // Allow entry
    booking.scannedCount += 1;

    await booking.save();

    res.json({
      success: true,
      message: "Entry allowed",
      scannedCount:
        booking.scannedCount,
      totalTickets:
        booking.ticketsBooked,
    });
  });