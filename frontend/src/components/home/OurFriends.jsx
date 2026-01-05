import { useEffect, useState } from "react";
import { PawPrint } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function OurFriends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/friends`)
      .then(res => res.json())
      .then(data => setFriends(Array.isArray(data) ? data : []))
      .catch(() => setFriends([]));
  }, []);

  if (friends.length === 0) return null;

  return (
    <section className="relative bg-gradient-to-br from-gray-400 via-gray-300 to-gray-200 py-24 overflow-hidden">
     {/* Onda superior integrada (corte real de la sección) */}
<div className="absolute top-0 left-0 right-0 z-20">
  <svg viewBox="0 0 1440 120" className="w-full h-auto">
    <path
      fill="#ffffff"
      d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,0L0,0Z"
    />
  </svg>
</div>


      {/* === PATRÓN DE PATITAS (MISMO CONCEPTO QUE HERO) === */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern
            id="friends-paws"
            x="0"
            y="0"
            width="22"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10 5c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm-3 3c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm6 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zM10 9c2 0 3 1 3 3 0 1-1 2-2 2H9c-1 0-2-1-2-2 0-2 1-3 3-3z"
              fill="white"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#friends-paws)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-400 shadow-lg mb-4">
            <PawPrint className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-700">
              Galería Vagabunda
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
            Amigos de <span className="text-primary">Vagabundo</span>
          </h2>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Peludos que forman parte de nuestra historia 🐾
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {friends.map((friend) => (
            <div
              key={friend._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Marco tipo cuadro */}
              <div className="p-3">
                <div className="bg-white rounded-xl border-4 border-[#e6dccf] overflow-hidden">
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={friend.image}
                      alt={friend.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Nombre */}
              <div className="pb-5 text-center">
                <h3 className="font-bold text-gray-800">
                  {friend.name}
                </h3>
                <div className="flex justify-center mt-2 text-primary opacity-70">
                  <PawPrint className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
