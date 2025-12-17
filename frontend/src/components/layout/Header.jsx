import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logoSF.png"
            alt="Pet Shop Vagabundo"
            className="h-24 w-auto"
          />
          <span className="text-xl font-bold">Pet Shop Vagabundo</span>
        </Link>

        {/* Navegación */}
        <nav className="flex items-center gap-6">
          <Link to="/shop" className="hover:text-primary">
            Tienda
          </Link>
          <Link to="/turns" className="hover:text-primary">
            Turnos
          </Link>

          <Link
            to="/cart"
            className="relative bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded font-semibold"
          >
            Carrito
            <span className="absolute -top-2 -right-2 bg-white text-dark text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
