import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { Calendar, Package, LogOut, PawPrint, Image, LayoutGrid } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = [
  'bg-green-100 text-green-600 hover:bg-green-200',
  'bg-blue-100 text-blue-600 hover:bg-blue-200',
  'bg-purple-100 text-purple-600 hover:bg-purple-200',
  'bg-pink-100 text-pink-600 hover:bg-pink-200',
  'bg-yellow-100 text-yellow-600 hover:bg-yellow-200',
  'bg-teal-100 text-teal-600 hover:bg-teal-200',
  'bg-orange-100 text-orange-600 hover:bg-orange-200',
  'bg-red-100 text-red-600 hover:bg-red-200',
];

export default function DashboardAdmin() {
  const { admin, logout } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/categories/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCategories(data);
      } catch {
        console.error('Error al cargar categorías');
      }
    };
    fetchCategories();
  }, []);

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

        {/* Gestión General */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Gestión General</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <Link to="/admin/appointments" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 group">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Gestión de Turnos</h3>
              <p className="text-gray-600 text-sm">Ver y administrar todos los turnos</p>
            </Link>

            <Link to="/admin/products" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Gestión de Productos</h3>
              <p className="text-gray-600 text-sm">Crear y administrar productos</p>
            </Link>

            <Link to="/admin/friends" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 group relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-5 group-hover:opacity-10 transition"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='1'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition relative z-10">
                <PawPrint className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 relative z-10">Amigos de Vagabundo 🐾</h3>
              <p className="text-gray-600 text-sm relative z-10">Gestionar galería de mascotas</p>
            </Link>

            <Link to="/admin/advertisements" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 group">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition">
                <Image className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Publicidad y Envios</h3>
              <p className="text-gray-600 text-sm">Gestionar publicidades y Envios</p>
            </Link>

            <Link to="/admin/categories" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 group">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-200 transition">
                <LayoutGrid className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Categorías</h3>
              <p className="text-gray-600 text-sm">Gestionar categorías de la tienda</p>
            </Link>
          </div>
        </div>

        {/* Carga por Categoría — dinámica */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Carga de productos por Categoría</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => {
              const color = COLORS[index % COLORS.length];
              return (
                <Link
                  key={category.slug}
                  to={`/admin/products`}
                  state={{ filterCategory: category.slug }}
                  className={`${color} p-6 rounded-xl shadow-sm hover:shadow-md transition border border-transparent group text-center`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white bg-opacity-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition text-3xl">
                      {category.icon}
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
