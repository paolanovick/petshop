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
      if (!response.ok) {
        throw new Error('Error al obtener amigos');
      }
      const data = await response.json();
      setFriends(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al cargar amigos:', error);
      setFriends([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (friends.length === 0) return null;

  return (
    <section className="relative bg-gray-100 overflow-hidden">
      {/* Patrón de patitas de fondo - igual que Hero */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-orange-600 font-bold mb-6 shadow-lg animate-bounce">
            <PawPrint className="w-6 h-6" />
            Galería Vagabunda
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-800 drop-shadow-sm">
            Amigos de{" "}
            <span className="text-red-600">Vagabundo</span>
          </h2>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            ¡Conocé a los peludos más adorables que nos visitaron! 🐾
          </p>
        </div>

        {/* Galería con tarjetas inclinadas y moños */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {friends.map((friend, index) => {
            // Alternar inclinación y colores de moño
            const tilt = index % 2 === 0 ? 'rotate-2' : '-rotate-2';
            const hoverTilt = 'hover:rotate-0';
            const ribbonColor = 
              index % 3 === 0 ? 'text-pink-400' : 
              index % 3 === 1 ? 'text-blue-400' : 
              'text-purple-400';
            
            return (
              <div
                key={friend._id}
                className={`group relative ${tilt} ${hoverTilt} transition-all duration-300 hover:scale-105 hover:z-10`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Moño decorativo arriba */}
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 ${ribbonColor} drop-shadow-lg`}>
                  <svg width="48" height="48" viewBox="0 0 40 40" fill="currentColor">
                    <path d="M20 8 C15 8, 12 12, 12 16 C12 12, 9 8, 4 8 L8 20 L12 16 C12 20, 15 24, 20 24 C25 24, 28 20, 28 16 L32 20 L36 8 C31 8, 28 12, 28 16 C28 12, 25 8, 20 8" />
                  </svg>
                </div>

                {/* Card con bordes redondeados */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-white relative transform transition-all duration-300 group-hover:shadow-2xl">
                  {/* Foto */}
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 relative">
                    <img
                      src={friend.image}
                      alt={friend.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay con info al hacer hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-1">
                          <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                          <h3 className="text-white font-black text-lg drop-shadow-lg">
                            {friend.name}
                          </h3>
                        </div>
                        {friend.description && (
                          <p className="text-white/95 text-sm drop-shadow-md line-clamp-2">
                            {friend.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Nombre debajo */}
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50">
                    <h3 className="text-center font-black text-gray-800 text-lg">
                      {friend.name}
                    </h3>
                  </div>
                </div>

                {/* Patita decorativa flotante */}
                <div className="absolute -bottom-2 -right-2 text-orange-400 opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity">
                  <PawPrint className="w-8 h-8 drop-shadow-lg" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Onda ondulada abajo - igual que Hero */}
      <div className="relative h-24">
        <svg
          className="absolute bottom-0 w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
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