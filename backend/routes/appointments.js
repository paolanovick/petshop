const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/availability', appointmentController.getAvailabilityByDate);
// GET /api/appointments - Obtener todos los turnos (con filtros opcionales)
router.get('/', appointmentController.getAllAppointments);

// GET /api/appointments/:id - Obtener un turno por ID
router.get('/:id', appointmentController.getAppointmentById);

// POST /api/appointments - Crear un turno
router.post('/', appointmentController.createAppointment);

// PUT /api/appointments/:id - Actualizar un turno
router.put('/:id', appointmentController.updateAppointment);

// PATCH /api/appointments/:id/status - Actualizar estado de un turno
router.patch('/:id/status', appointmentController.updateAppointmentStatus);

// DELETE /api/appointments/:id - Cancelar un turno
router.delete('/:id', appointmentController.cancelAppointment);



module.exports = router;