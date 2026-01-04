import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, AlertCircle, Package, Search, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const CATEGORIES = [
  { value: 'alimentos', label: 'Alimentos' },
  { value: 'accesorios', label: 'Accesorios' },
  { value: 'juguetes', label: 'Juguetes' },
  { value: 'higiene', label: 'Higiene' },
  { value: 'otros', label: 'Otros' },
];

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const { logout } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
  description: '',
  price: '',
  stock: '',
  category: 'alimentos',
  subcategory: null,  // ← AGREGAR
  images: [''],
  destacado: false,
  activo: true,
  });

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        logout();
        window.location.href = '/login';
        return;
      }

      const data = await response.json();
      setProducts(data);
    } catch {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingProduct
        ? `${API_URL}/api/products/${editingProduct._id}`
        : `${API_URL}/api/products`;

      const method = editingProduct ? 'PUT' : 'POST';

      const cleanedData = {
        ...formData,
        images: formData.images.filter((img) => img.trim() !== ''),
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar producto');
      }

      await fetchProducts();
      closeModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de desactivar este producto?')) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchProducts();
    } catch {
      alert('Error al eliminar producto');
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
         name: product.name,
  description: product.description,
  price: product.price,
  stock: product.stock,
  category: product.category,
  subcategory: product.subcategory || null,  // ← AGREGAR
  images: product.images.length > 0 ? product.images : [''],
  destacado: product.destacado,
  activo: product.activo,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
  description: '',
  price: '',
  stock: '',
  category: 'alimentos',
  subcategory: null,  // ← AGREGAR
  images: [''],
  destacado: false,
  activo: true,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Gestión de Productos</h1>
              <p className="text-sm text-gray-600 mt-1">Total: {filteredProducts.length} productos</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => openModal()}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                <Plus className="w-5 h-5" />
                Nuevo Producto
              </button>
              <Link to="/admin" className="text-orange-600 hover:text-orange-700 font-medium">
                ← Volver al Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          >
            <option value="">Todas las categorías</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
                  </select>
                  
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Products Table */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay productos</h3>
            <p className="text-gray-500">Creá tu primer producto para empezar</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Imagen</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Categoría</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Precio</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    {/* Imagen */}
                    <td className="px-4 py-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-300" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Nombre */}
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.description}</p>
                      </div>
                    </td>

                    {/* Categoría */}
                    <td className="px-4 py-3">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
                        {product.category}
                      </span>
                    </td>

                    {/* Precio */}
                    <td className="px-4 py-3">
                      <span className="font-bold text-orange-600">${product.price}</span>
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-3">
                      <span
                        className={`font-semibold ${
                          product.stock > 10
                            ? 'text-green-600'
                            : product.stock > 0
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>

                    {/* Estado */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {product.destacado && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-semibold w-fit">
                            Destacado
                          </span>
                        )}
                        {!product.activo && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold w-fit">
                            Inactivo
                          </span>
                        )}
                        {product.activo && !product.destacado && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold w-fit">
                            Activo
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-800">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                          </div>
                          <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Subcategoría (opcional)
  </label>
  <select
    value={formData.subcategory || ''}
    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value || null })}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
  >
    <option value="">Sin subcategoría</option>
    <option value="perros">Para Perros</option>
    <option value="gatos">Para Gatos</option>
    <option value="ambos">Para Ambos</option>
  </select>
</div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes (URLs)</label>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  + Agregar otra imagen
                </button>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.destacado}
                    onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Producto destacado</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.activo}
                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Producto activo</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}