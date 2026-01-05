import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Link } from "react-router-dom";
import { PawPrint, Plus, Trash2, Edit2, X } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function FriendsAdmin() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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
      setShowModal(false);
      fetchFriends();
    } catch (error) {
      console.error(error);
      showToast('Error al crear amigo', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Eliminar a ${name} de la galería?`)) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/friends/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Error al eliminar');

      showToast(`${name} eliminado`, 'info');
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
    <div className="min-h-screen bg-gray-50">
      {/* Header - mismo estilo que ProductsAdmin */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Amigos de Vagabundo</h1>
              <p className="text-sm text-gray-600 mt-1">Total: {friends.length} peluditos 🐾</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                <Plus className="w-5 h-5" />
                Nuevo Amigo
              </button>
              <Link to="/admin" className="text-orange-600 hover:text-orange-700 font-medium">
                ← Volver al Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {friends.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <PawPrint className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Todavía no hay amigos en la galería
            </h3>
            <p className="text-gray-500">¡Agregá el primer peludo!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 overflow-hidden group"
              >
                {/* Imagen */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={friend.image}
                    alt={friend.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{friend.name}</h3>
                  
                  {friend.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {friend.description}
                    </p>
                  )}

                  {/* Acciones */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(friend._id, friend.name)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal - mismo estilo que ProductsAdmin */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-800">
                Nuevo Amigo Vagabundo
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del peludo
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej: Max, Luna, Rocky..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de la foto
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                />
                {form.image && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción (opcional)
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Ej: El más juguetón de la cuadra..."
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Agregar Amigo 🐾
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}