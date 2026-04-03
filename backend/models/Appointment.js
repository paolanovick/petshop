const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  cliente: {
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
  },
  mascota: {
    nombre: { type: String, required: true },
    tipo: {
      type: String,
      enum: ['perro', 'gato', 'otro'],
      required: true,
    },
    tamaño: {
      type: String,
      enum: ['pequeño', 'mediano', 'grande'],
      required: true,
    },
  },
  servicio: {
    type: String,
    enum: ['baño', 'peluquería', 'baño_y_peluquería', 'corte_uñas'],
    required: true,
  },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'terminado', 'rechazado', 'cancelado'],
    default: 'pendiente',
  },
}, { timestamps: true });

// Índice único solo para turnos activos (pendiente o confirmado)
// Esto previene double-booking a nivel de base de datos (race condition fix)
appointmentSchema.index(
  { fecha: 1, hora: 1 },
  {
    unique: true,
    partialFilterExpression: { estado: { $in: ['pendiente', 'confirmado'] } },
  }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
