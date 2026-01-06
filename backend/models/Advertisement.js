const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Advertisement', advertisementSchema);