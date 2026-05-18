import express from "express";
import { body } from "express-validator";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);

router.post(
  "/",
  protect,
  admin,
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("category").notEmpty(),
    body("date").isISO8601(),
    body("venue").notEmpty(),
    body("price").isFloat({ min: 0 }),
    body("totalSeats").isInt({ min: 1 }),
  ],
  validate,
  createEvent
);

router.put("/:id", protect, admin, updateEvent);
router.delete("/:id", protect, admin, deleteEvent);

export default router;
