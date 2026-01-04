import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function AppointmentsAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  // 🔄 Cargar turnos
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/appointments`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          // Token inválido o expirado
          logout();
          window.location.href = '/login';
          return;
        }

        const data = await res.json();
        setAppointments(data);
      } catch {
        setError("Error al cargar turnos");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [logout]);

  // 🔁 Cambiar estado
  const updateStatus = async (id, estado) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/appointments/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ estado }),
      });

      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, estado } : a))
      );
    } catch {
      alert("Error al actualizar estado");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="mt-24 text-center text-red-500">{error}</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Gestión de Turnos</h1>
              <p className="text-sm text-gray-600 mt-1">
                Total: {appointments.length} turnos
              </p>
            </div>
            <Link
              to="/admin"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              ← Volver al Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Hora</th>
                <th className="p-3 text-left">Servicio</th>
                <th className="p-3 text-left">Cliente</th>
                <th className="p-3 text-left">Mascota</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr key={a._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    {new Date(a.fecha).toLocaleDateString('es-AR')}
                  </td>
                  <td className="p-3">{a.hora}</td>
                  <td className="p-3 capitalize">{a.servicio}</td>
                  <td className="p-3">{a.cliente?.nombre}</td>
                  <td className="p-3">{a.mascota?.nombre}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold
                        ${
                          a.estado === "pendiente"
                            ? "bg-yellow-100 text-yellow-700"
                            : a.estado === "confirmado"
                            ? "bg-green-100 text-green-700"
                            : a.estado === "cancelado"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-200"
                        }
                      `}
                    >
                      {a.estado}
                    </span>
                  </td>

                  <td className="p-3 space-x-2">
                    {a.estado !== "confirmado" && (
                      <button
                        onClick={() => updateStatus(a._id, "confirmado")}
                        className="px-3 py-1 text-xs font-bold bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Confirmar
                      </button>
                    )}

                    {a.estado !== "cancelado" && (
                      <button
                        onClick={() => updateStatus(a._id, "cancelado")}
                        className="px-3 py-1 text-xs font-bold bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}