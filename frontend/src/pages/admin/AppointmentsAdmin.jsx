import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, PawPrint, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AppointmentsAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/appointments`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
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

  const updateStatus = async (id, estado) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/appointments/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ estado }),
      });

      if (!res.ok) {
        throw new Error('Error al actualizar estado');
      }

      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, estado } : a))
      );

      const messages = {
        confirmado: 'Turno confirmado',
        terminado: 'Turno marcado como terminado',
        rechazado: 'Turno rechazado',
      };

      showToast(messages[estado] || 'Estado actualizado', 'success');
    } catch {
      showToast('Error al actualizar estado', 'error');
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
        {appointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay turnos</h3>
            <p className="text-gray-500">Los turnos reservados aparecerán aquí</p>
          </div>
        ) : (
          <>
            {/* DESKTOP: Tabla */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Fecha</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Hora</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Servicio</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Cliente</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Mascota</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Estado</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {appointments.map((a) => (
                    <tr key={a._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        {new Date(a.fecha).toLocaleDateString('es-AR')}
                      </td>
                      <td className="px-4 py-3 font-semibold">{a.hora}</td>
                      <td className="px-4 py-3 capitalize">{a.servicio}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">{a.cliente?.nombre}</p>
                          <p className="text-xs text-gray-500">{a.cliente?.telefono}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">{a.mascota?.nombre}</p>
                          <p className="text-xs text-gray-500 capitalize">
                            {a.mascota?.tipo} • {a.mascota?.tamaño}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold
                            ${
                              a.estado === "confirmado"
                                ? "bg-blue-100 text-blue-700"
                                : a.estado === "terminado"
                                ? "bg-green-100 text-green-700"
                                : a.estado === "rechazado"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          `}
                        >
                          {a.estado === "confirmado" && "Confirmado"}
                          {a.estado === "terminado" && "Terminado"}
                          {a.estado === "rechazado" && "Rechazado"}
                          {a.estado === "pendiente" && "Pendiente"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {a.estado !== "confirmado" && a.estado !== "terminado" && (
                            <button
                              onClick={() => updateStatus(a._id, "confirmado")}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Confirmar"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}

                          {a.estado === "confirmado" && (
                            <button
                              onClick={() => updateStatus(a._id, "terminado")}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Marcar como terminado"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}

                          {a.estado !== "rechazado" && a.estado !== "terminado" && (
                            <button
                              onClick={() => updateStatus(a._id, "rechazado")}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Rechazar"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE: Cards */}
            <div className="md:hidden space-y-4">
              {appointments.map((a) => (
                <div key={a._id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-semibold">
                        {new Date(a.fecha).toLocaleDateString('es-AR')}
                      </span>
                      <Clock className="w-4 h-4 text-gray-400 ml-2" />
                      <span className="text-sm font-semibold">{a.hora}</span>
                    </div>

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold
                        ${
                          a.estado === "confirmado"
                            ? "bg-blue-100 text-blue-700"
                            : a.estado === "terminado"
                            ? "bg-green-100 text-green-700"
                            : a.estado === "rechazado"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {a.estado === "confirmado" && "Confirmado"}
                      {a.estado === "terminado" && "Terminado"}
                      {a.estado === "rechazado" && "Rechazado"}
                      {a.estado === "pendiente" && "Pendiente"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm capitalize font-medium">{a.servicio}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{a.cliente?.nombre}</p>
                        <p className="text-xs text-gray-500">{a.cliente?.telefono}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <PawPrint className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{a.mascota?.nombre}</p>
                        <p className="text-xs text-gray-500 capitalize">
                          {a.mascota?.tipo} • {a.mascota?.tamaño}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t">
                    {a.estado !== "confirmado" && a.estado !== "terminado" && (
                      <button
                        onClick={() => updateStatus(a._id, "confirmado")}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-lg font-semibold transition"
                      >
                        Confirmar
                      </button>
                    )}

                    {a.estado === "confirmado" && (
                      <button
                        onClick={() => updateStatus(a._id, "terminado")}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-lg font-semibold transition"
                      >
                        Terminado
                      </button>
                    )}

                    {a.estado !== "rechazado" && a.estado !== "terminado" && (
                      <button
                        onClick={() => updateStatus(a._id, "rechazado")}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg font-semibold transition"
                      >
                        Rechazar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}