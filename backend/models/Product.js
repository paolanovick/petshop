const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: 0
  },
  stock: {
    type: Number,
    required: [true, 'El stock es obligatorio'],
    min: 0,
    default: 0
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: ['alimentos', 'accesorios', 'juguetes', 'higiene', 'otros']
  },
 images: [{
  type: String,
  validate: {
    validator: function(v) {
      return /^https?:\/\/.+/i.test(v);
    },
    message: 'Debe ser una URL válida'
  }
}],
  destacado: {
    type: Boolean,
    default: false
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);