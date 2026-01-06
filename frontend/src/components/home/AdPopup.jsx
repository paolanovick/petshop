import { useState, useEffect } from "react";
import { X } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdPopup() {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenAd = sessionStorage.getItem('hasSeenAd');
    
    if (hasSeenAd) return;

    const fetchAds = async () => {
      try {
        const response = await fetch(`${API_URL}/api/advertisements/active`);
        const data = await response.json();
        
        if (data && Array.isArray(data) && data.length > 0) {
          setAds(data);
          setShow(true);
          
          // Auto-avanzar cada 5 segundos
          const interval = setInterval(() => {
            setCurrentIndex((prev) => {
              const next = prev + 1;
              if (next >= data.length) {
                clearInterval(interval);
                setShow(false);
                sessionStorage.setItem('hasSeenAd', 'true');
                return prev;
              }
              return next;
            });
          }, 5000);

          return () => clearInterval(interval);
        }
      } catch (error) {
        console.error('Error al cargar publicidades:', error);
      }
    };

    fetchAds();
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem('hasSeenAd', 'true');
  };

  if (!show || ads.length === 0 || !ads[currentIndex]) return null;

  const currentAd = ads[currentIndex];

  return (
    <div 
      className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={handleClose}
    >
      <div 
        className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 bg-white/95 hover:bg-white text-gray-700 rounded-full p-1.5 shadow-lg transition-all hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Indicador de múltiples ads */}
        {ads.length > 1 && (
          <div className="absolute top-3 left-3 z-10 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
            {currentIndex + 1} / {ads.length}
          </div>
        )}

        {/* Imagen */}
        <img
          src={currentAd.image}
          alt="Publicidad"
          className="w-full h-auto max-h-[70vh] object-contain"
        />

        {/* Barra de progreso */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            key={currentIndex}
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 animate-progress" 
          />
        </div>

        {/* Dots indicadores */}
        {ads.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {ads.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-orange-500 w-6' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .animate-progress {
          animation: progress 5s linear;
        }
      `}</style>
    </div>
  );
}