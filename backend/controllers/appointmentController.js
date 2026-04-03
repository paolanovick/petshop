const Appointment = require('../models/Appointment');
const { BUSINESS_HOURS } = require('../config/appointments');

// Helper: obtener fecha de hoy en zona horaria Argentina
const getTodayAR = () =>
  new Date().toLocaleDateString('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' });

// Helper: parsear 'YYYY-MM-DD' a Date de forma segura (mediodía UTC = mismo día en cualquier zona)
const parseDate = (fechaStr) => new Date(fechaStr + 'T12:00:00.000Z');

// Helper: obtener día de semana en Argentina (0=Dom, 6=Sáb)
const getDayOfWeekAR = (fechaStr) => {
  const d = parseDate(fechaStr);
  return parseInt(
    new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'America/Argentina/Buenos_Aires' })
      .format(d) === 'Sun' ? 0
      : new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'America/Argentina/Buenos_Aires' })
          .format(d) === 'Sat' ? 6 : -1,
    10
  );
};

const isWeekend = (fechaStr) => {
  const dayName = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: 'America/Argentina/Buenos_Aires',
  }).format(parseDate(fechaStr));
  return dayName === 'Sun' || dayName === 'Sat';
};

// ─── OBTENER TODOS (admin) ───────────────────────────────────────────────────
exports.getAllAppointments = async (req, res) => {
  try {
    const { estado, fecha } = req.query;
    const filter = {};
    if (estado) filter.estado = estado;
    if (fecha) {
      const d = parseDate(fecha);
      const start = new Date(d); start.setUTCHours(0, 0, 0, 0);
      const end   = new Date(d); end.setUTCHours(23, 59, 59, 999);
      filter.fecha = { $gte: start, $lte: end };
    }
    const appointments = await Appointment.find(filter).sort({ fecha: 1, hora: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener turnos', error: error.message });
  }
};

// ─── OBTENER UNO (admin) ─────────────────────────────────────────────────────
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Turno no encontrado' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el turno', error: error.message });
  }
};

// ─── CREAR TURNO (público) ───────────────────────────────────────────────────
exports.createAppointment = async (req, res) => {
  try {
    const { fecha, hora, servicio, cliente, mascota } = req.body;

    // 1. Campos obligatorios
    if (!fecha || !hora || !servicio || !cliente || !mascota) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    // 2. Fecha no puede ser pasada (comparación en zona AR)
    const today = getTodayAR();
    if (fecha < today) {
      return res.status(400).json({ message: 'No se pueden reservar fechas pasadas' });
    }

    // 3. No se permite en fines de semana
    if (isWeekend(fecha)) {
      return res.status(400).json({ message: 'No atendemos los fines de semana' });
    }

    // 4. Hora debe estar dentro del horario de atención
    if (!BUSINESS_HOURS.includes(hora)) {
      return res.status(400).json({ message: `Horario no válido. Disponibles: ${BUSINESS_HOURS.join(', ')}` });
    }

    // 5. Crear turno — si hay conflicto MongoDB lanza error 11000 (duplicate key)
    //    Esto es atómico: el índice único previene el double-booking sin race condition
    const appointment = await Appointment.create({
      fecha: parseDate(fecha),
      hora,
      servicio,
      cliente,
      mascota,
    });

    // 6. Notificar webhook n8n (no bloquea si falla)
    try {
      const n8nWebhook = process.env.N8N_WEBHOOK_TURNO;
      if (n8nWebhook) {
        await fetch(n8nWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tipo: 'nuevo_turno',
            turno: {
              nombre: appointment.cliente.nombre,
              telefono: appointment.cliente.telefono,
              email: appointment.cliente.email || '',
              servicio: appointment.servicio,
              fecha: fecha,
              hora: appointment.hora,
              mascota: appointment.mascota.nombre,
            },
          }),
        });
      }
    } catch (webhookError) {
      console.error('❌ Error al notificar n8n:', webhookError.message);
    }

    res.status(201).json(appointment);

  } catch (error) {
    // Error 11000 = duplicate key = horario ya ocupado (race condition resuelto)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Ese horario ya fue reservado. Por favor elegí otro.' });
    }
    res.status(500).json({ message: 'Error interno del servidor. Intentá de nuevo más tarde.' });
  }
};

// ─── ACTUALIZAR TURNO (admin) ────────────────────────────────────────────────
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!appointment) return res.status(404).json({ message: 'Turno no encontrado' });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar turno', error: error.message });
  }
};

// ─── CAMBIAR ESTADO (admin) ──────────────────────────────────────────────────
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { estado } = req.body;
    const VALID = ['pendiente', 'confirmado', 'terminado', 'rechazado', 'cancelado'];
    if (!VALID.includes(estado)) {
      return res.status(400).json({ message: 'Estado inválido' });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id, { estado }, { new: true }
    );
    if (!appointment) return res.status(404).json({ message: 'Turno no encontrado' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar estado', error: error.message });
  }
};

// ─── CANCELAR TURNO (admin) ──────────────────────────────────────────────────
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id, { estado: 'cancelado' }, { new: true }
    );
    if (!appointment) return res.status(404).json({ message: 'Turno no encontrado' });
    res.json({ message: 'Turno cancelado correctamente', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error al cancelar turno', error: error.message });
  }
};

// ─── DISPONIBILIDAD (público) ────────────────────────────────────────────────
exports.getAvailabilityByDate = async (req, res) => {
  try {
    const { fecha } = req.query;
    if (!fecha) return res.status(400).json({ message: 'Fecha requerida' });

    // Solo bloquean horarios los turnos activos (pendiente o confirmado)
    // Rechazados, terminados y cancelados liberan el horario
    const d = parseDate(fecha);
    const start = new Date(d); start.setUTCHours(0, 0, 0, 0);
    const end   = new Date(d); end.setUTCHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      fecha: { $gte: start, $lte: end },
      estado: { $in: ['pendiente', 'confirmado'] },
    });

    const occupiedHours = appointments.map(a => a.hora);
    const horarios = BUSINESS_HOURS.map(hour => ({
      hora: hour,
      disponible: !occupiedHours.includes(hour),
    }));

    res.json({ fecha, horarios });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener disponibilidad', error: error.message });
  }
};

// ─── ELIMINAR (admin) ────────────────────────────────────────────────────────
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Turno no encontrado' });
    res.json({ message: 'Turno eliminado permanentemente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar turno', error: error.message });
  }
};
