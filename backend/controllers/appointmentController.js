const Appointment = require('../models/Appointment');

// Obtener todos los turnos (con filtros opcionales)
exports.getAllAppointments = async (req, res) => {
  try {
    const { estado, fecha } = req.query;
    
    const filter = {};
    if (estado) filter.estado = estado;
    if (fecha) {
      const startDate = new Date(fecha);
      const endDate = new Date(fecha);
      endDate.setHours(23, 59, 59, 999);
      filter.fecha = { $gte: startDate, $lte: endDate };
    }

    const appointments = await Appointment.find(filter).sort({ fecha: 1, hora: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener turnos', error: error.message });
  }
};

// Obtener un turno por ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el turno', error: error.message });
  }
};

// Crear un turno
exports.createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    
    // Aquí se puede agregar webhook para n8n
    // notifyN8N('new_appointment', appointment);
    
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear turno', error: error.message });
  }
};

// Actualizar un turno
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar turno', error: error.message });
  }
};

// Actualizar estado de un turno
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { estado } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true, runValidators: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    
    // Aquí se puede agregar webhook para n8n según el estado
    // notifyN8N('appointment_status_changed', appointment);
    
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar estado', error: error.message });
  }
};

// Cancelar un turno
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { estado: 'cancelado' },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    res.json({ message: 'Turno cancelado correctamente', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error al cancelar turno', error: error.message });
  }
};