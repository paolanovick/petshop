import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Package, Users, LogOut, Dog, Cat, ShoppingBag, Utensils, Scissors, Star, PawPrint, Image  } from 'lucide-react';


const CATEGORIES = [
  { id: 'alimentos', name: 'Alimentos', icon: Utensils, color: 'bg-green-100 text-green-600 hover:bg-green-200' },
  { id: 'accesorios', name: 'Accesorios', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600 hover:bg-blue-200' },
  { id: 'juguetes', name: 'Juguetes', icon: Dog, color: 'bg-purple-100 text-purple-600 hover:bg-purple-200' },
  { id: 'higiene', name: 'Higiene', icon: Cat, color: 'bg-pink-100 text-pink-600 hover:bg-pink-200' },
  { id: 'otros', name: 'Otros', icon: Package, color: 'bg-gray-100 text-gray-600 hover:bg-gray-200' },
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
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {/* Gestión de Turnos */}
    <Link
      to="/admin/appointments"
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 group"
    >
      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition">
        <Calendar className="w-6 h-6 text-orange-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Gestión de Turnos</h3>
      <p className="text-gray-600 text-sm">Ver y administrar todos los turnos</p>
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
      <p className="text-gray-600 text-sm">Crear y administrar productos</p>
    </Link>

    {/* Amigos de Vagabundo */}
    <Link
      to="/admin/friends"
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 group relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='1'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition relative z-10">
        <PawPrint className="w-6 h-6 text-orange-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2 relative z-10">
        Amigos de Vagabundo 🐾
      </h3>
      <p className="text-gray-600 text-sm relative z-10">
        Gestionar galería de mascotas
      </p>
    </Link>

    {/* Publicidad */}
    <Link
      to="/admin/advertisements"
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 group"
    >
      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition">
        <Image className="w-6 h-6 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Publicidad Popup</h3>
      <p className="text-gray-600 text-sm">Gestionar popup de inicio</p>
    </Link>
  </div>
</div>

        {/* Sección de Categorías */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Carga de productos por Categoría</h2>
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