const Product = require('../models/Product');

// Obtener todos los productos (con filtros opcionales)
exports.getAllProducts = async (req, res) => {
  try {
    const { category, destacado, activo } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (destacado) filter.destacado = destacado === 'true';
    if (activo !== undefined) filter.activo = activo === 'true';

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

// Crear un producto
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear producto', error: error.message });
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar producto', error: error.message });
  }
};

// Eliminar un producto (soft delete)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto desactivado correctamente', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
};

// Actualizar stock
exports.updateStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    product.stock += quantity;
    if (product.stock < 0) {
      return res.status(400).json({ message: 'Stock insuficiente' });
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar stock', error: error.message });
  }
};