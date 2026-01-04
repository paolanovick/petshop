import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useParams } from 'react-router-dom';
import { Plus, Edit2, Trash2, AlertCircle, Package, BarChart3, ArrowLeft } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const CATEGORY_INFO = {
  alimentos: {
    name: 'Alimentos',
    color: 'orange',
    icon: '🍖',
    description: 'Alimentos balanceados y snacks para mascotas'
  },
  accesorios: {
    name: 'Accesorios',
    color: 'purple',
    icon: '🎀',
    description: 'Collares, correas y accesorios'
  },
  juguetes: {
    name: 'Juguetes',
    color: 'blue',
    icon: '🎾',
    description: 'Juguetes y entretenimiento'
  },
  higiene: {
    name: 'Higiene',
    color: 'green',
    icon: '🧼',
    description: 'Productos de limpieza y cuidado'
  },
  otros: {
    name: 'Otros',
    color: 'gray',
    icon: '📦',
    description: 'Otros productos'
  }
};

export default function CategoryDashboard() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();

  const categoryInfo = CATEGORY_INFO[category] || CATEGORY_INFO.otros;

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/products?category=${category}`, {
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

  // Métricas
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.activo).length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const lowStock = products.filter(p => p.stock < 5 && p.activo).length;
   const perros = products.filter(p => p.subcategory === 'perros');
const gatos = products.filter(p => p.subcategory === 'gatos');
const ambos = products.filter(
  p => p.subcategory === 'ambos' || !p.subcategory
);


    

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
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Volver al Dashboard"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-3xl">{categoryInfo.icon}</span>
                  Dashboard de {categoryInfo.name}
                </h1>
                <p className="text-sm text-gray-600 mt-1">{categoryInfo.description}</p>
              </div>
            </div>
            <Link
              to="/admin/products"
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              <Plus className="w-5 h-5" />
              Nuevo Producto
            </Link>
          </div>
        </div>
      </header>

      {/* Métricas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Productos</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{totalProducts}</p>
              </div>
              <Package className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Productos Activos</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{activeProducts}</p>
              </div>
              <Package className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stock Total</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{totalStock}</p>
              </div>
              <Package className="w-10 h-10 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stock Bajo</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{lowStock}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
          </div>
        </div>

        {/* Espacio para Microsoft Clarity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">Analytics - Microsoft Clarity</h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-600">
              Acá se integrará el dashboard de Microsoft Clarity con métricas y mapa de calor
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Próximamente: Visualización de clicks, scroll depth y comportamiento de usuarios
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Productos de la categoría */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Productos en esta categoría</h3>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay productos</h3>
              <p className="text-gray-500">Aún no hay productos en esta categoría</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Imagen</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Precio</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
           <tbody className="divide-y divide-gray-200">

  {/* ===== ALIMENTOS – PERROS ===== */}
  {category === 'alimentos' && perros.length > 0 && (
    <tr className="bg-gray-100">
      <td colSpan="6" className="px-4 py-3 font-bold text-gray-800">
        🐕 Alimentos para Perros
      </td>
    </tr>
  )}
  {category === 'alimentos' &&
    perros.map((product) => (
      <tr key={product._id} className="hover:bg-gray-50 transition">
        <td className="px-4 py-3">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
            {product.images?.[0] ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-300" />
              </div>
            )}
          </div>
        </td>

        <td className="px-4 py-3">
          <p className="font-semibold text-gray-800">{product.name}</p>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.description}</p>
        </td>

        <td className="px-4 py-3">
          <span className="font-bold text-orange-600">${product.price}</span>
        </td>

        <td className="px-4 py-3">
          <span className={`font-semibold ${
            product.stock > 10 ? 'text-green-600' :
            product.stock > 0 ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {product.stock}
          </span>
        </td>

        <td className="px-4 py-3">
          {product.destacado && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-semibold">
              Destacado
            </span>
          )}
          <span className={`block text-xs mt-1 ${
            product.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          } px-2 py-0.5 rounded font-semibold w-fit`}>
            {product.activo ? 'Activo' : 'Inactivo'}
          </span>
        </td>

        <td className="px-4 py-3 text-right">
          <Link
            to="/admin/products"
            state={{ editProduct: product }}
            className="inline-flex p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Edit2 className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDelete(product._id)}
            className="inline-flex p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </td>
      </tr>
    ))}

  {/* ===== ALIMENTOS – GATOS ===== */}
  {category === 'alimentos' && gatos.length > 0 && (
    <tr className="bg-gray-100">
      <td colSpan="6" className="px-4 py-3 font-bold text-gray-800">
        🐱 Alimentos para Gatos
      </td>
    </tr>
  )}
  {category === 'alimentos' &&
    gatos.map((product) => (
      <tr key={product._id} className="hover:bg-gray-50 transition">
        {/* MISMO CONTENIDO QUE PERROS */}
        <td className="px-4 py-3">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
            {product.images?.[0] ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-300" />
              </div>
            )}
          </div>
        </td>

        <td className="px-4 py-3">
          <p className="font-semibold text-gray-800">{product.name}</p>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.description}</p>
        </td>

        <td className="px-4 py-3">
          <span className="font-bold text-orange-600">${product.price}</span>
        </td>

        <td className="px-4 py-3">
          <span className={`font-semibold ${
            product.stock > 10 ? 'text-green-600' :
            product.stock > 0 ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {product.stock}
          </span>
        </td>

        <td className="px-4 py-3">
          {product.destacado && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-semibold">
              Destacado
            </span>
          )}
          <span className={`block text-xs mt-1 ${
            product.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          } px-2 py-0.5 rounded font-semibold w-fit`}>
            {product.activo ? 'Activo' : 'Inactivo'}
          </span>
        </td>

        <td className="px-4 py-3 text-right">
          <Link
            to="/admin/products"
            state={{ editProduct: product }}
            className="inline-flex p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Edit2 className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDelete(product._id)}
            className="inline-flex p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </td>
      </tr>
    ))}

  {/* ===== ALIMENTOS – AMBOS ===== */}
  {category === 'alimentos' && ambos.length > 0 && (
    <tr className="bg-gray-100">
      <td colSpan="6" className="px-4 py-3 font-bold text-gray-800">
        🐾 Alimentos para Ambos
      </td>
    </tr>
  )}
  {category === 'alimentos' &&
    ambos.map((product) => (
      <tr key={product._id} className="hover:bg-gray-50 transition">
        {/* MISMO CONTENIDO */}
        <td className="px-4 py-3">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
            {product.images?.[0] ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-300" />
              </div>
            )}
          </div>
        </td>

        <td className="px-4 py-3">
          <p className="font-semibold text-gray-800">{product.name}</p>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.description}</p>
        </td>

        <td className="px-4 py-3">
          <span className="font-bold text-orange-600">${product.price}</span>
        </td>

        <td className="px-4 py-3">
          <span className={`font-semibold ${
            product.stock > 10 ? 'text-green-600' :
            product.stock > 0 ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {product.stock}
          </span>
        </td>

        <td className="px-4 py-3">
          {product.destacado && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-semibold">
              Destacado
            </span>
          )}
          <span className={`block text-xs mt-1 ${
            product.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          } px-2 py-0.5 rounded font-semibold w-fit`}>
            {product.activo ? 'Activo' : 'Inactivo'}
          </span>
        </td>

        <td className="px-4 py-3 text-right">
          <Link
            to="/admin/products"
            state={{ editProduct: product }}
            className="inline-flex p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Edit2 className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDelete(product._id)}
            className="inline-flex p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </td>
      </tr>
    ))}

  {/* ===== OTRAS CATEGORÍAS ===== */}
 {category !== 'alimentos' &&
  products.map((product) => (
    <tr key={product._id} className="hover:bg-gray-50 transition">
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

      <td className="px-4 py-3">
        <p className="font-semibold text-gray-800">{product.name}</p>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
          {product.description}
        </p>
      </td>

      <td className="px-4 py-3">
        <span className="font-bold text-orange-600">${product.price}</span>
      </td>

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

      <td className="px-4 py-3">
        <div className="flex flex-col gap-1">
          {product.destacado && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-semibold w-fit">
              Destacado
            </span>
          )}
          {!product.activo ? (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold w-fit">
              Inactivo
            </span>
          ) : (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold w-fit">
              Activo
            </span>
          )}
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <Link
            to="/admin/products"
            state={{ editProduct: product }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Editar"
          >
            <Edit2 className="w-4 h-4" />
          </Link>
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
          )}
        </div>
      </div>
    </div>
  );
}