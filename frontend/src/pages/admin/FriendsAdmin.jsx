import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Link } from "react-router-dom";
import { PawPrint, Plus, Trash2, Heart, Upload } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function FriendsAdmin() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { logout } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
  });

 

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/friends/admin`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (res.status === 401) {
        logout();
        window.location.href = '/login';
        return;
      }

      const data = await res.json();
      setFriends(data);
    } catch (error) {
      console.error('Error al cargar amigos:', error);
      showToast('Error al cargar amigos', 'error');
    } finally {
      setLoading(false);
    }
    };
    useEffect(() => {
  fetchFriends();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.image) {
      showToast('Nombre e imagen son obligatorios', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/friends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Error al crear amigo');

      showToast('¡Amigo agregado con éxito! 🐾', 'success');
      setForm({ name: "", image: "", description: "" });
      setShowForm(false);
      fetchFriends();
    } catch (error) {
      console.error(error);
      showToast('Error al crear amigo', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Eliminar a ${name}?`)) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/friends/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Error al eliminar');

      showToast(`${name} eliminado 😢`, 'info');
      fetchFriends();
    } catch (error) {
      console.error(error);
      showToast('Error al eliminar', 'error');
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header divertido */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 border-b-4 border-orange-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <PawPrint className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white flex items-center gap-2">
                  Amigos Vagabundos
                  <Heart className="w-6 h-6 fill-white animate-pulse" />
                </h1>
                <p className="text-white/90 text-sm font-semibold mt-1">
                  {friends.length} peluditos en la galería 🐾
                </p>
              </div>
            </div>
            <Link
              to="/admin"
              className="text-white hover:text-orange-100 font-bold transition"
            >
              ← Volver
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botón Agregar */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            {showForm ? (
              <>Cancelar</>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Agregar Amigo Vagabundo
              </>
            )}
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-4 border-orange-200">
            <div className="flex items-center gap-3 mb-6">
              <Upload className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-black text-gray-800">
                Nuevo Amigo Peludo
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nombre del peludo 🐶
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej: Max, Luna, Rocky..."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  URL de la foto 📸
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition"
                  required
                />
                {form.image && (
                  <div className="mt-4 rounded-xl overflow-hidden border-4 border-orange-200">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Descripción (opcional) ✍️
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Ej: El más juguetón de la cuadra..."
                  rows="3"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-xl font-black text-lg shadow-lg hover:shadow-xl transition-all"
              >
                🐾 Agregar a la Galería
              </button>
            </form>
          </div>
        )}

        {/* Grid de amigos */}
        {friends.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-4 border-dashed border-orange-200">
            <PawPrint className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Todavía no hay amigos vagabundos
            </h3>
            <p className="text-gray-500">
              ¡Agregá el primer peludo a la galería!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-4 border-orange-100 hover:border-orange-300 group"
              >
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                  <img
                    src={friend.image}
                    alt={friend.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    <h3 className="font-black text-lg text-gray-800">
                      {friend.name}
                    </h3>
                  </div>

                  {friend.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {friend.description}
                    </p>
                  )}

                  <button
                    onClick={() => handleDelete(friend._id, friend.name)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold transition flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}