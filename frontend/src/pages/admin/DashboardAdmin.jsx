import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Package, Users, LogOut, Dog, Cat, ShoppingBag, Utensils, Scissors, Star } from 'lucide-react';

const CATEGORIES = [
  { id: 'perros', name: 'Perros', icon: Dog, color: 'bg-orange-100 text-orange-600 hover:bg-orange-200' },
  { id: 'gatos', name: 'Gatos', icon: Cat, color: 'bg-purple-100 text-purple-600 hover:bg-purple-200' },
  { id: 'accesorios', name: 'Accesorios', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600 hover:bg-blue-200' },
  { id: 'alimentos', name: 'Alimentos', icon: Utensils, color: 'bg-green-100 text-green-600 hover:bg-green-200' },
  { id: 'peluqueria', name: 'Peluquería', icon: Scissors, color: 'bg-pink-100 text-pink-600 hover:bg-pink-200' },
  { id: 'premium', name: 'Premium', icon: Star, color: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' },
];

export default function DashboardAdmin() {
  const { admin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Panel Administrativo</h1>
            <p className="text-sm text-gray-600 mt-1">Bienvenido, {admin?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sección de Gestión General */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Gestión General</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gestión de Turnos */}
            <Link
              to="/admin/appointments"
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 group"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Gestión de Turnos</h3>
              <p className="text-gray-600 text-sm">Ver y administrar todos los turnos del sistema</p>
            </Link>

            {/* Gestión de Productos */}
            <Link
              to="/admin/products"
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Gestión de Productos</h3>
              <p className="text-gray-600 text-sm">Crear y administrar productos de la tienda</p>
            </Link>

            {/* Gestión de Clientes */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 opacity-60 cursor-not-allowed">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Gestión de Clientes</h3>
              <p className="text-gray-600 text-sm">Próximamente</p>
            </div>
          </div>
        </div>

        {/* Sección de Categorías */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboards por Categoría</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/admin/category/${category.id}`}
                  className={`${category.color} p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 group text-center`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white bg-opacity-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}