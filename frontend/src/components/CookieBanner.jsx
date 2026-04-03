import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'vagabundo_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const handle = (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 flex justify-center">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            Usamos cookies para mejorar tu experiencia en el sitio.
            Al continuar navegando aceptás nuestra{' '}
            <span className="text-orange-500 font-medium">política de privacidad</span>.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={() => handle('rejected')}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
          >
            Rechazar
          </button>
          <button
            onClick={() => handle('accepted')}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
