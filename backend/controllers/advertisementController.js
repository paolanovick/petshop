const Advertisement = require('../models/Advertisement');

// Obtener publicidad activa (ahora devuelve array)
exports.getActiveAd = async (req, res) => {
  try {
    const ads = await Advertisement.find({ active: true }).sort({ createdAt: -1 });
    if (ads.length === 0) {
      return res.status(404).json({ message: 'No hay publicidad activa' });
    }
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener publicidad', error: error.message });
  }
};

// Obtener todas (admin)
exports.getAllAds = async (req, res) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener publicidades', error: error.message });
  }
};

/// Crear publicidad (ya no desactiva las demás)
exports.createAd = async (req, res) => {
  try {
    const { image } = req.body;
    
    const ad = await Advertisement.create({ image, active: true });
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear publicidad', error: error.message });
  }
};
// Actualizar
exports.updateAd = async (req, res) => {
  try {
    const ad = await Advertisement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!ad) {
      return res.status(404).json({ message: 'Publicidad no encontrada' });
    }
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar publicidad', error: error.message });
  }
};

// Eliminar
exports.deleteAd = async (req, res) => {
  try {
    await Advertisement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Publicidad eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar publicidad', error: error.message });
  }
};