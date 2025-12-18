import { Link } from "react-router-dom";
import { useCart } from "../../context/useCart";
import { ShoppingCart, Calendar, Store, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-xl py-2"
          : "bg-gradient-to-b from-white/90 to-transparent backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
         <Link to="/" className="flex items-center gap-3">
  <img
    src="/logoSF.png"
    alt="Pet Shop Vagabundo"
    className="w-20 h-20"
  />

  <img
    src="/titulo.png"
    alt="Pet Shop Vagabundo"
    className="
      h-20
      w-auto
      object-contain
      hidden sm:block
    "
  />
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <Link
              to="/shop"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 text-gray-700 hover:bg-primary/10 hover:text-primary"
            >
              <Store className="w-5 h-5" />
              <span>Tienda</span>
            </Link>

            <Link
              to="/turns"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 text-gray-700 hover:bg-primary/10 hover:text-primary"
            >
              <Calendar className="w-5 h-5" />
              <span>Turnos</span>
            </Link>

            {/* Search bar */}
            <div
              className={`relative ${
                isScrolled ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-48 px-4 py-2 pl-10 bg-gray-100 border-2 border-transparent focus:border-primary rounded-xl text-sm focus:outline-none focus:w-64 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Cart button */}
            <Link
              to="/cart"
              className="relative ml-2 bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl rounded-b-3xl overflow-hidden animate-slideDown">
            <nav className="flex flex-col p-6 gap-2">
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-gray-700 hover:text-primary font-semibold transition-all"
              >
                <Store className="w-5 h-5" />
                <span>Tienda</span>
              </Link>

              <Link
                to="/turns"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-gray-700 hover:text-primary font-semibold transition-all"
              >
                <Calendar className="w-5 h-5" />
                <span>Turnos</span>
              </Link>

              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl font-bold shadow-lg mt-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Carrito</span>
                {totalItems > 0 && (
                  <span className="ml-auto bg-gray-800 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        )}
      </div>

     
    </header>
  );
}
