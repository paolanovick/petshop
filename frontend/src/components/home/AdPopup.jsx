import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdPopup() {
  const [ad, setAd] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => {
    setShow(false);
    sessionStorage.setItem('hasSeenAd', 'true');
  }, []);

  const fetchAd = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/advertisements/active`);
      const data = await response.json();
      
      if (data && data.image) {
        setAd(data);
        setShow(true);
        
        setTimeout(() => {
          handleClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Error al cargar publicidad:', error);
    }
  }, [handleClose]);

  useEffect(() => {
    const hasSeenAd = sessionStorage.getItem('hasSeenAd');
    
    if (!hasSeenAd) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAd();
    }
  }, [fetchAd]);

  if (!show || !ad) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={handleClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all hover:scale-110"
        >
          <X className="w-6 h-6" />
        </button>

        <img
          src={ad.image}
          alt="Publicidad"
          className="w-full h-auto max-h-[80vh] object-contain"
        />

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div className="h-full bg-orange-500 animate-progress" />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-progress {
          animation: progress 3s linear;
        }
      `}</style>
    </div>
  );
}