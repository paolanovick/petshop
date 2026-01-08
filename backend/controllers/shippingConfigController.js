const ShippingConfig = require('../models/ShippingConfig');

// Obtener configuración
exports.getShippingConfig = async (req, res) => {
  try {
    let config = await ShippingConfig.findOne();
    
    // Si no existe, crear una por defecto
    if (!config) {
      config = await ShippingConfig.create({
        envio_costo: 5000,
        envio_minimo_gratis: 30000
      });
    }
    
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener configuración', error: error.message });
  }
};

// Actualizar configuración
exports.updateShippingConfig = async (req, res) => {
  try {
    const { envio_costo, envio_minimo_gratis } = req.body;
    
    let config = await ShippingConfig.findOne();
    
    if (!config) {
      config = await ShippingConfig.create({
        envio_costo,
        envio_minimo_gratis
      });
    } else {
      config.envio_costo = envio_costo;
      config.envio_minimo_gratis = envio_minimo_gratis;
      await config.save();
    }
    
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar configuración', error: error.message });
  }
};