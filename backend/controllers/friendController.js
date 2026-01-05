const Friend = require('../models/Friend');

// Obtener todos los amigos activos (público)
exports.getAllFriends = async (req, res) => {
  try {
    const friends = await Friend.find({ active: true }).sort({ createdAt: -1 });
    res.json(friends);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener amigos', error: error.message });
  }
};

// Obtener todos (admin)
exports.getAllFriendsAdmin = async (req, res) => {
  try {
    const friends = await Friend.find().sort({ createdAt: -1 });
    res.json(friends);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener amigos', error: error.message });
  }
};

// Crear amigo
exports.createFriend = async (req, res) => {
  try {
    const { name, image, description } = req.body;

    if (!name || !image) {
      return res.status(400).json({ message: 'Nombre e imagen son requeridos' });
    }

    const friend = await Friend.create({ name, image, description });
    res.status(201).json(friend);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear amigo', error: error.message });
  }
};

// Actualizar amigo
exports.updateFriend = async (req, res) => {
  try {
    const friend = await Friend.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!friend) {
      return res.status(404).json({ message: 'Amigo no encontrado' });
    }
    
    res.json(friend);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar amigo', error: error.message });
  }
};

// Eliminar amigo
exports.deleteFriend = async (req, res) => {
  try {
    const friend = await Friend.findByIdAndDelete(req.params.id);
    
    if (!friend) {
      return res.status(404).json({ message: 'Amigo no encontrado' });
    }
    
    res.json({ message: 'Amigo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar amigo', error: error.message });
  }
};