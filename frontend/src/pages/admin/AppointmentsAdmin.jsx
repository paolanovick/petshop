import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Calendar, Trash2, CheckCircle, XCircle, Clock } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AppointmentsAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const { logout } = useAuth();

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        logout();
        window.location.href = "/login";
        return;
      }

      const data = await response.json();
      
      // Ordenar por fecha y hora (más próximo primero)
      const sorted = data.sort((a, b) => {
        const dateA = new Date(`${a.fecha}T${a.hora}`);
        const dateB = new Date(`${b.fecha}T${b.hora}`);
        return dateA - dateB;
      });
      
      setAppointments(sorted);
    } catch (error) {
      console.error("Error al cargar turnos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, clientName) => {
    if (!window.confirm(`¿Eliminar permanentemente el turno de ${clientName}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Turno eliminado correctamente");
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error al eliminar turno:", error);
      alert("Error al eliminar turno");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado: newStatus }),
      });

      if (response.ok) {
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "todos") return true;
    return apt.estado === filter;
  });

  const getStatusColor = (estado) => {
    switch (estado) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "confirmado":
        return "bg-green-100 text-green-800 border-green-300";
      case "terminado":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "rechazado":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (estado) => {
    switch (estado) {
      case "confirmado":
        return <CheckCircle className="w-4 h-4" />;
      case "rechazado":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-orange-500" />
                Gestión de Turnos
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredAppointments.length} turnos {filter !== "todos" && `(${filter})`}
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

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["todos", "pendiente", "confirmado", "terminado", "rechazado"].map((estado) => (
            <button
              key={estado}
              onClick={() => setFilter(estado)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                filter === estado
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {estado.charAt(0).toUpperCase() + estado.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de turnos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No hay turnos {filter !== "todos" && `con estado "${filter}"`}
            </h3>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((apt) => {
              const fecha = new Date(apt.fecha);
              const hoy = new Date();
              const isPast = fecha < hoy.setHours(0, 0, 0, 0);

              return (
                <div
                  key={apt._id}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-md transition border-l-4 ${
                    isPast ? "border-gray-300 opacity-60" : "border-orange-500"
                  } p-6`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Info principal */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-orange-100 rounded-lg flex flex-col items-center justify-center">
                            <span className="text-xs text-orange-600 font-semibold">
                              {fecha.toLocaleDateString("es-AR", { month: "short" }).toUpperCase()}
                            </span>
                            <span className="text-2xl font-black text-orange-600">
                              {fecha.getDate()}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-800">
                              {apt.cliente.nombre}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                apt.estado
                              )}`}
                            >
                              {getStatusIcon(apt.estado)}
                              {apt.estado}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <p>
                              <strong>Servicio:</strong> {apt.servicio}
                            </p>
                            <p>
                              <strong>Hora:</strong> {apt.hora}
                            </p>
                            <p>
                              <strong>Mascota:</strong> {apt.mascota.nombre}
                            </p>
                            <p>
                              <strong>Teléfono:</strong> {apt.cliente.telefono}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col gap-2 md:w-48">
                      <select
                        value={apt.estado}
                        onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="terminado">Terminado</option>
                        <option value="rechazado">Rechazado</option>
                      </select>

                      <button
                        onClick={() => handleDelete(apt._id, apt.cliente.nombre)}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}