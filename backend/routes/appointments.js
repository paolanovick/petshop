const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const verifyAdmin = require("../middleware/verifyAdmin");

// 🟢 PÚBLICO — crear turno (cliente)
router.post('/', appointmentController.createAppointment);

// 🔒 ADMIN — ver todos los turnos
router.get('/', verifyAdmin, appointmentController.getAllAppointments);

// 🔒 ADMIN — obtener turno por ID
router.get('/:id', verifyAdmin, appointmentController.getAppointmentById);

// 🔒 ADMIN — actualizar turno
router.put('/:id', verifyAdmin, appointmentController.updateAppointment);

// 🔒 ADMIN — actualizar estado
router.patch('/:id/status', verifyAdmin, appointmentController.updateAppointmentStatus);

// 🔒 ADMIN — cancelar turno
router.delete('/:id', verifyAdmin, appointmentController.cancelAppointment);

module.exports = router;
