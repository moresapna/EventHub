import express from "express";

import {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  scanTicket,
} from "../controllers/bookingController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// User Routes
router.post("/", protect, createBooking);

router.get(
  "/my",
  protect,
  getMyBookings
);

router.put(
  "/:id/cancel",
  protect,
  cancelBooking
);

// Admin Routes
router.get(
  "/",
  protect,
  admin,
  getAllBookings
);

// QR Scan Validation Route
router.post(
  "/scan/:id",
  protect,
  admin,
  scanTicket
);

export default router;