import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Package, Users, LogOut } from 'lucide-react';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 opacity-60 cursor-not-allowed">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Gestión de Productos</h3>
            <p className="text-gray-600 text-sm">Próximamente</p>
          </div>

          {/* Gestión de Clientes */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 opacity-60 cursor-not-allowed">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Gestión de Clientes</h3>
            <p className="text-gray-600 text-sm">Próximamente</p>
          </div>
        </div>
      </main>
    </div>
  );
}