import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Link } from "react-router-dom";
import { Image, Plus, Trash2, X, Eye, EyeOff, DollarSign, Truck, Save } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdvertisementsAdmin() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    image: "",
  });

  const fetchAds = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/advertisements`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (res.status === 401) {
        logout();
        window.location.href = '/login';
        return;
      }

      const data = await res.json();
      setAds(data);
    } catch (error) {
      console.error('Error al cargar publicidades:', error);
      showToast('Error al cargar publicidades', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      showToast('La imagen es obligatoria', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/advertisements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Error al crear publicidad');

      showToast('Publicidad creada con éxito', 'success');
      setForm({ image: "" });
      setShowModal(false);
      fetchAds();
    } catch (error) {
      console.error(error);
      showToast('Error al crear publicidad', 'error');
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/advertisements/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ active: !currentStatus }),
      });

      if (!res.ok) throw new Error('Error al actualizar');

      showToast(
        !currentStatus ? 'Publicidad activada' : 'Publicidad desactivada',
        'success'
      );
      fetchAds();
    } catch (error) {
      console.error(error);
      showToast('Error al actualizar', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta publicidad?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/advertisements/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Error al eliminar');

      showToast('Publicidad eliminada', 'info');
      fetchAds();
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
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Publicidad Popup</h1>
              <p className="text-sm text-gray-600 mt-1">
                {ads.filter(ad => ad.active).length} activas • 5 segundos cada una
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                <Plus className="w-5 h-5" />
                Nueva Publicidad
              </button>
              <Link to="/admin" className="text-orange-600 hover:text-orange-700 font-medium">
                ← Volver
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* ← AGREGAR ESTO ACÁ */}
  <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border-2 border-indigo-200">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
        <DollarSign className="w-6 h-6 text-indigo-600" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800">Configuración de Envío</h2>
        <p className="text-sm text-gray-600">Ajustá los costos de envío a domicilio</p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {/* Costo de envío */}
      <div>
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
          <DollarSign className="w-4 h-4 text-orange-500" />
          Costo de Envío
        </label>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-400">$</span>
          <input
            type="number"
            defaultValue={localStorage.getItem('envio_costo') || '5000'}
            onBlur={(e) => {
              localStorage.setItem('envio_costo', e.target.value);
              showToast('Costo de envío guardado', 'success');
            }}
            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            min="0"
            step="100"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Precio que se cobra cuando no alcanza el mínimo
        </p>
      </div>

      {/* Mínimo para envío gratis */}
      <div>
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
          <Truck className="w-4 h-4 text-green-500" />
          Mínimo para Envío Gratis
        </label>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-400">$</span>
          <input
            type="number"
            defaultValue={localStorage.getItem('envio_minimo_gratis') || '30000'}
            onBlur={(e) => {
              localStorage.setItem('envio_minimo_gratis', e.target.value);
              showToast('Mínimo para envío gratis guardado', 'success');
            }}
            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            min="0"
            step="1000"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Si la compra supera este monto, envío gratis
        </p>
      </div>
    </div>

    {/* Preview */}
    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
      <p className="text-xs text-blue-800">
        💡 <strong>Vista previa:</strong> Compra menor a ${(localStorage.getItem('envio_minimo_gratis') || '30000')} → Costo: ${(localStorage.getItem('envio_costo') || '5000')} • Compra mayor → Envío GRATIS
      </p>
    </div>
  </div>
  {/* ← HASTA ACÁ */}
        {ads.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay publicidades</h3>
            <p className="text-gray-500">Crea tu primera publicidad popup</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <div
                key={ad._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition border-2 border-gray-200 overflow-hidden"
                style={{ borderColor: ad.active ? '#f97316' : '#e5e7eb' }}
              >
                <div className="aspect-video bg-gray-100 overflow-hidden relative">
                  <img src={ad.image} alt="Publicidad" className="w-full h-full object-contain" />
                  {!ad.active && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <EyeOff className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                      ad.active 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {ad.active ? '✓ Activa' : '✗ Inactiva'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(ad.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleActive(ad._id, ad.active)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition ${
                        ad.active
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          : 'bg-orange-500 hover:bg-orange-600 text-white'
                      }`}
                    >
                      {ad.active ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Desactivar
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Activar
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal igual que antes */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Nueva Publicidad</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL de la imagen</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://ejemplo.com/publicidad.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  required
                />
                {form.image && (
                  <div className="mt-4 rounded-lg border border-gray-200">
                    <img src={form.image} alt="Preview" className="w-full h-auto max-h-96 object-contain" />
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}