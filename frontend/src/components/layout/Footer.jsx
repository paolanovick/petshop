import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-24 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern
            id="footer-paws"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10 5c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm-3 3c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm6 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zM10 9c2 0 3 1 3 3 0 1-1 2-2 2H9c-1 0-2-1-2-2 0-2 1-3 3-3z"
              fill="currentColor"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#footer-paws)" />
        </svg>
      </div>

      {/* Wave separator */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="currentColor"
            className="text-gray-900"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
  {/* LOGO */}
  <img
    src="/logoSF.png"
    alt="Pet Shop Vagabundo"
    className="w-16 h-16 md:w-20 md:h-20 object-contain"
  />

  {/* TÍTULO COMO IMAGEN */}
  <img
    src="/titulo.png"
    alt="Pet Shop Vagabundo"
    className="
      h-10
      md:h-12
      lg:h-14
      w-auto
      object-contain
    "
  />
</div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Tu tienda de confianza para el cuidado y felicidad de tu mascota.
              Productos premium y servicios profesionales.
            </p>
            {/* Social media */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick links */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white">Enlaces rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: "Tienda", to: "/shop" },
                { name: "Turnos", to: "/turns" },
                { name: "Carrito", to: "/cart" },
                { name: "Nosotros", to: "/about" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Av. Principal 1234, Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+5491122334455"
                  className="hover:text-primary transition-colors"
                >
                  +54 9 11 2233 4455
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@vagabundo.com"
                  className="hover:text-primary transition-colors"
                >
                  info@vagabundo.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Hours */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white">Horarios</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <div className="font-semibold text-white mb-2">
                    Lunes a Viernes
                  </div>
                  <div>9:00 AM - 8:00 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <div className="font-semibold text-white mb-2">Sábados</div>
                  <div>10:00 AM - 6:00 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <div className="font-semibold text-white mb-2">Domingos</div>
                  <div>Cerrado</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="border-t border-gray-700 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="font-bold text-xl">
              Suscríbete a nuestro newsletter
            </h3>
            <p className="text-gray-400 text-sm">
              Recibe ofertas exclusivas y novedades para tu mascota
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
              <button className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} Pet Shop Vagabundo</span>
              <span>•</span>
              <span>Todos los derechos reservados</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
              <span>para tu mascota</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
