const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const appointmentController = require("../controllers/appointmentController");
const verifyAdmin = require("../middleware/verifyAdmin");

const createLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Demasiados intentos. Esperá un minuto e intentá de nuevo." },
});

// Público
router.get("/availability", appointmentController.getAvailabilityByDate);
router.post("/", createLimiter, appointmentController.createAppointment);

// Admin (protegido)
router.get("/", verifyAdmin, appointmentController.getAllAppointments);
router.get("/:id", verifyAdmin, appointmentController.getAppointmentById);
router.put("/:id", verifyAdmin, appointmentController.updateAppointment);
router.patch("/:id/status", verifyAdmin, appointmentController.updateAppointmentStatus);
router.delete("/:id", verifyAdmin, appointmentController.deleteAppointment);

module.exports = router;
