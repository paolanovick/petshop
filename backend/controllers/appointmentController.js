const Appointment = require('../models/Appointment');
const { BUSINESS_HOURS } = require('../config/appointments');
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
    const { fecha, hora, servicio, cliente, mascota } = req.body;

    if (!fecha || !hora || !servicio || !cliente || !mascota) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    const existing = await Appointment.findOne({
      fecha: new Date(fecha),
      hora,
      estado: { $ne: 'cancelado' },
    });

    if (existing) {
      return res.status(400).json({
        message: 'Horario no disponible',
      });
    }

    const appointment = await Appointment.create({
      fecha,
      hora,
      servicio,
      cliente,
      mascota,
    });

    // 🔔 Hook n8n futuro
    // notifyN8N('appointment_created', appointment);

    res.status(201).json(appointment);

  } catch (error) {
    res.status(500).json({
      message: 'Error al crear turno',
      error: error.message,
    });
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
  const { estado } = req.body;

  if (!['pendiente', 'confirmado', 'terminado', 'rechazado'].includes(estado)) {
    return res.status(400).json({ message: 'Estado inválido' });
  }

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { estado },
    { new: true }
  );

  if (!appointment) {
    return res.status(404).json({ message: 'Turno no encontrado' });
  }

  res.json(appointment);
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



exports.getAvailabilityByDate = async (req, res) => {
  try {
    const { fecha } = req.query;

    if (!fecha) {
      return res.status(400).json({ message: 'Fecha requerida' });
    }

    const start = new Date(fecha);
    const end = new Date(fecha);
    end.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      fecha: { $gte: start, $lte: end },
      estado: { $ne: 'cancelado' },
    });

    const occupiedHours = appointments.map(a => a.hora);

    const availability = BUSINESS_HOURS.map(hour => ({
      hora: hour,
      disponible: !occupiedHours.includes(hour),
    }));

    res.json({
      fecha,
      horarios: availability,
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener disponibilidad',
      error: error.message,
    });
  }
};
