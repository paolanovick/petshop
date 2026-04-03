import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, ChevronUp, ChevronDown, Eye, EyeOff, X, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const API_URL = import.meta.env.VITE_API_URL;

const EMPTY_FORM = { name: '', description: '', icon: '📦', visible: true };

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const { logout } = useAuth();
  const { showToast } = useToast();

  const token = () => localStorage.getItem('token');

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories/admin`, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      if (res.status === 401) { logout(); return; }
      const data = await res.json();
      setCategories(data);
    } catch {
      showToast('Error al cargar categorías', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({ name: cat.name, description: cat.description, icon: cat.icon, visible: cat.visible });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return showToast('El nombre es obligatorio', 'error');
    setSaving(true);
    try {
      const url = editing
        ? `${API_URL}/api/categories/${editing._id}`
        : `${API_URL}/api/categories`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      showToast(editing ? 'Categoría actualizada' : 'Categoría creada', 'success');
      setShowModal(false);
      fetchCategories();
    } catch {
      showToast('Error al guardar categoría', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`¿Eliminar "${cat.name}"? Esta acción no se puede deshacer.`)) return;
    try {
      const res = await fetch(`${API_URL}/api/categories/${cat._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token()}` },
      });
      if (!res.ok) throw new Error();
      showToast('Categoría eliminada', 'info');
      fetchCategories();
    } catch {
      showToast('Error al eliminar', 'error');
    }
  };

  const toggleVisible = async (cat) => {
    try {
      await fetch(`${API_URL}/api/categories/${cat._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ visible: !cat.visible }),
      });
      fetchCategories();
    } catch {
      showToast('Error al actualizar visibilidad', 'error');
    }
  };

  const move = async (index, direction) => {
    const newList = [...categories];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newList.length) return;
    [newList[index], newList[swapIndex]] = [newList[swapIndex], newList[index]];
    const items = newList.map((cat, i) => ({ _id: cat._id, order: i + 1 }));
    setCategories(newList);
    try {
      await fetch(`${API_URL}/api/categories/reorder`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ items }),
      });
    } catch {
      showToast('Error al reordenar', 'error');
      fetchCategories();
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-gray-400 hover:text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Categorías</h1>
              <p className="text-sm text-gray-500">{categories.length} categorías</p>
            </div>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition"
          >
            <Plus className="w-4 h-4" />
            Nueva categoría
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {categories.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-4">No hay categorías todavía</p>
            <button onClick={openCreate} className="px-6 py-2 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition">
              Crear primera categoría
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {categories.map((cat, index) => (
              <div
                key={cat._id}
                className={`flex items-center gap-4 px-6 py-4 border-b border-gray-100 last:border-0 ${!cat.visible ? 'opacity-50' : ''}`}
              >
                {/* Flechas reordenar */}
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-20 transition"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === categories.length - 1}
                    className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-20 transition"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Ícono */}
                <span className="text-3xl w-10 text-center">{cat.icon}</span>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800">{cat.name}</p>
                  {cat.description && (
                    <p className="text-sm text-gray-500 truncate">{cat.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">slug: {cat.slug}</p>
                </div>

                {/* Badge visible */}
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${cat.visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {cat.visible ? 'Visible' : 'Oculta'}
                </span>

                {/* Acciones */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleVisible(cat)}
                    title={cat.visible ? 'Ocultar' : 'Mostrar'}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    {cat.visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => openEdit(cat)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal crear/editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">
                {editing ? 'Editar categoría' : 'Nueva categoría'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ícono (emoji)</label>
                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-2xl"
                  placeholder="📦"
                  maxLength={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Ej: Accesorios"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Ej: Collares, correas y más"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.visible}
                  onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                />
                <span className="text-sm font-medium text-gray-700">Visible en la tienda</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition disabled:opacity-60"
                >
                  {saving ? 'Guardando...' : editing ? 'Guardar cambios' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
