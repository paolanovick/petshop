import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import {
  getAnalyticsConsent,
  loadGoogleAnalytics,
  setAnalyticsCollectionEnabled,
  setAnalyticsConsent,
  trackPageView,
} from '../utils/analytics';

function useDialogFocusTrap(active) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!active || !dialogRef.current) return undefined;
    const dialog = dialogRef.current;
    const getFocusable = () => Array.from(dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return;
      const focusable = getFocusable(); if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const onFocusIn = (event) => { if (!dialog.contains(event.target)) getFocusable()[0]?.focus(); };
    document.addEventListener('keydown', onKeyDown); document.addEventListener('focusin', onFocusIn);
    return () => { document.removeEventListener('keydown', onKeyDown); document.removeEventListener('focusin', onFocusIn); };
  }, [active]);
  return dialogRef;
}

export default function CookieBanner() {
  const { pathname, search } = useLocation();
  const [visible, setVisible] = useState(() => {
    const saved = getAnalyticsConsent();
    return saved !== 'accepted' && saved !== 'rejected';
  });
  const dialogRef = useDialogFocusTrap(visible);

  useEffect(() => {
    if (getAnalyticsConsent() === 'accepted') {
      loadGoogleAnalytics();
    }
  }, []);

  useEffect(() => () => setAnalyticsCollectionEnabled(false), []);

  useEffect(() => {
    trackPageView(`${pathname}${search}`);
  }, [pathname, search]);

  useEffect(() => {
    if (!visible) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [visible]);

  const handleAccept = () => {
    setAnalyticsConsent('accepted');
    loadGoogleAnalytics();
    setVisible(false);
  };

  const handleReject = () => {
    setAnalyticsConsent('rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[2147483647] min-h-screen min-h-[100dvh] bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center">
      <section ref={dialogRef} style={{ width: "min(100%, 36rem)", boxSizing: "border-box", maxHeight: "calc(100dvh - 2rem)", overflowY: "auto" }} role="dialog" aria-modal="true" aria-labelledby="analytics-consent-title" aria-describedby="analytics-consent-description" className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-6 sm:p-8">
        <div className="w-12 h-12 rounded-full bg-orange-100 grid place-items-center mb-4" aria-hidden="true">
          <Cookie className="w-6 h-6 text-orange-500" />
        </div>
        <h2 id="analytics-consent-title" className="text-2xl font-bold text-gray-900 mb-3">Elegí cómo querés navegar</h2>
        <p id="analytics-consent-description" className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Las cookies esenciales permiten que Vagabundo funcione. Si aceptás estadísticas, Google Analytics y Microsoft Clarity nos ayudan a conocer las visitas y mejorar el sitio. No reciben los datos que escribís en formularios.
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-3">
          Podés entrar aunque no aceptes estadísticas. Sin elegir una opción no se puede continuar.{' '}
          <a className="text-orange-600 underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacidad de Google</a>
        </p>
        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
          <button
            autoFocus
            onClick={handleReject}
            className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
          >
            Continuar solo con esenciales
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition"
          >
            Aceptar estadísticas
          </button>
        </div>
      </section>
    </div>
  );
}
