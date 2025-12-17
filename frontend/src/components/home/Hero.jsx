import { Link } from "react-router-dom";
import { ShoppingBag, Calendar, Sparkles, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-400 via-gray-300 to-gray-200 text-gray-800 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gray-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gray-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gray-600 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Paw prints decoration */}
      <div className="absolute inset-0 opacity-15">
        <svg
          className="absolute top-20 left-1/4 w-16 h-16 animate-bounce text-gray-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm8 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM12 8c2.21 0 4 1.79 4 4 0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2 0-2.21 1.79-4 4-4z" />
        </svg>
        <svg
          className="absolute bottom-32 right-1/4 w-12 h-12 animate-bounce delay-700 text-gray-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm8 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM12 8c2.21 0 4 1.79 4 4 0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2 0-2.21 1.79-4 4-4z" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-400 shadow-lg">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-700">
                Tu mejor amigo merece lo mejor
              </span>
            </div>

            {/* Title con Adlery Blockletter - Rojo #a73132 con sombra negra */}
            <div className="space-y-4">
              <h1
                className="font-display text-5xl md:text-7xl leading-tight tracking-wide text-primary"
                style={{
                  textShadow:
                    "4px 4px 8px rgba(0, 0, 0, 0.9), -1px -1px 3px rgba(0, 0, 0, 0.5)",
                }}
              >
                PET SHOP
                <span className="block text-6xl md:text-8xl">VAGABUNDO</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-800 max-w-2xl font-sans font-medium">
                Todo para tu mascota: alimentos premium, accesorios únicos y
                servicios profesionales de baño y peluquería
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/shop"
                className="group relative bg-primary hover:bg-primaryDark text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Explorar productos
                </span>
              </Link>

              <Link
                to="/turns"
                className="group bg-white border-3 border-primary text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Reservar turno
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6">
              <div className="flex items-center gap-2 text-gray-800">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">
                    500+
                  </div>
                  <div className="text-xs text-gray-700">Clientes felices</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-800">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">
                    Premium
                  </div>
                  <div className="text-xs text-gray-700">Productos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Logo sin fondo con animación */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>

              {/* Logo container */}
              <div className="relative bg-white/70 backdrop-blur-md p-8 rounded-3xl border-4 border-white shadow-2xl hover:scale-105 transition-transform duration-300">
                <img
                  src="/logoSF.png"
                  alt="Pet Shop Vagabundo"
                  className="w-64 h-64 object-contain drop-shadow-2xl animate-float"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-6 -right-6 bg-primary text-white px-4 py-2 rounded-full font-bold text-sm shadow-xl animate-bounce">
                ¡Nuevo!
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white text-primary border-2 border-primary px-4 py-2 rounded-full font-bold text-sm shadow-xl animate-bounce delay-500">
                Ofertas
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#ffffff"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
}
