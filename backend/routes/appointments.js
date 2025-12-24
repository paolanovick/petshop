const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const verifyAdmin = require("../middleware/verifyAdmin");

// Público
router.get("/availability", appointmentController.getAvailabilityByDate);
router.post("/", appointmentController.createAppointment);

// Admin (protegido)
router.get("/", verifyAdmin, appointmentController.getAllAppointments);
router.get("/:id", verifyAdmin, appointmentController.getAppointmentById);
router.put("/:id", verifyAdmin, appointmentController.updateAppointment);
router.patch("/:id/status", verifyAdmin, appointmentController.updateAppointmentStatus);
router.delete("/:id", verifyAdmin, appointmentController.cancelAppointment);

module.exports = router;
