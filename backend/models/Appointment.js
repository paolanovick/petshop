const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  cliente: {
    nombre: {
      type: String,
      required: [true, 'El nombre del cliente es obligatorio'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono es obligatorio']
    }
  },
  mascota: {
    nombre: {
      type: String,
      required: [true, 'El nombre de la mascota es obligatorio'],
      trim: true
    },
    tipo: {
      type: String,
      required: [true, 'El tipo es obligatorio'],
      enum: ['perro', 'gato', 'otro']
    },
    raza: String,
    tamaño: {
      type: String,
      enum: ['pequeño', 'mediano', 'grande'],
      required: true
    }
  },
  servicio: {
    type: String,
    required: [true, 'El servicio es obligatorio'],
    enum: ['baño', 'peluquería', 'baño_y_peluquería', 'corte_uñas', 'limpieza_oidos']
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es obligatoria']
  },
  hora: {
    type: String,
    required: [true, 'La hora es obligatoria'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)']
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'cancelado', 'completado'],
    default: 'pendiente'
  },
  notas: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);