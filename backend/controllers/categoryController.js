const Category = require('../models/Category');

const DEFAULT_CATEGORIES = [
  { name: 'Alimentos', slug: 'alimentos', icon: '🍖', description: 'Para perros y gatos', order: 1 },
  { name: 'Accesorios', slug: 'accesorios', icon: '🎀', description: 'Collares, correas y más', order: 2 },
  { name: 'Juguetes', slug: 'juguetes', icon: '🎾', description: 'Diversión garantizada', order: 3 },
  { name: 'Higiene', slug: 'higiene', icon: '🧼', description: 'Limpieza y cuidado', order: 4 },
  { name: 'Otros', slug: 'otros', icon: '📦', description: 'Más productos', order: 5 },
];

// Seed inicial si no hay categorías
exports.seedIfEmpty = async () => {
  const count = await Category.countDocuments();
  if (count === 0) {
    await Category.insertMany(DEFAULT_CATEGORIES);
    console.log('✅ Categorías iniciales creadas');
  }
};

// GET /api/categories — públicas (solo visibles)
exports.getPublicCategories = async (req, res) => {
  try {
    const categories = await Category.find({ visible: true }).sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
  }
};

// GET /api/categories/admin — todas (admin)
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
  }
};

// POST /api/categories
exports.createCategory = async (req, res) => {
  try {
    const { name, description, icon, visible } = req.body;
    const slug = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
    const count = await Category.countDocuments();
    const category = await Category.create({ name, slug, description, icon, visible, order: count + 1 });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear categoría', error: error.message });
  }
};

// PUT /api/categories/:id
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar categoría', error: error.message });
  }
};

// DELETE /api/categories/:id
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar categoría', error: error.message });
  }
};

// PATCH /api/categories/reorder — recibe array de { _id, order }
exports.reorderCategories = async (req, res) => {
  try {
    const { items } = req.body;
    await Promise.all(items.map(({ _id, order }) =>
      Category.findByIdAndUpdate(_id, { order })
    ));
    res.json({ message: 'Orden actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al reordenar', error: error.message });
  }
};
