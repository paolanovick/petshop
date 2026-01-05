import { useEffect, useState } from "react";
import { Heart, PawPrint } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function OurFriends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await fetch(`${API_URL}/api/friends`);
      const data = await response.json();
      setFriends(data);
    } catch (error) {
      console.error('Error al cargar amigos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (friends.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 via-white to-orange-50 relative overflow-hidden">
      {/* Patrón de fondo con patitas */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full text-orange-600 font-semibold mb-4">
            <PawPrint className="w-5 h-5" />
            Galería Vagabunda
          </div>

          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Nuestros Amigos Vagabundos
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¡Conocé a los peludos más adorables que pasaron por nuestra tienda! 🐾
          </p>
        </div>

        {/* Galería en Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {friends.map((friend, index) => (
            <div
              key={friend._id}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Imagen */}
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                <img
                  src={friend.image}
                  alt={friend.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Overlay con info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    <h3 className="text-white font-bold text-lg">{friend.name}</h3>
                  </div>
                  
                  {friend.description && (
                    <p className="text-white/90 text-sm line-clamp-2">
                      {friend.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Badge flotante */}
              <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                Vagabundo ❤️
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}