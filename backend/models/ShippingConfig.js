const mongoose = require('mongoose');

const shippingConfigSchema = new mongoose.Schema({
  envio_costo: {
    type: Number,
    required: true,
    default: 5000
  },
  envio_minimo_gratis: {
    type: Number,
    required: true,
    default: 30000
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('ShippingConfig', shippingConfigSchema);