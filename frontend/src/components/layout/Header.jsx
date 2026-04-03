import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ShoppingCart, Calendar, Store, Menu, X, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function Header() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Buscar cuando cambia el query
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchResults = async () => {
      setSearching(true);
      try {
        const res = await fetch(`${API_URL}/api/products?search=${encodeURIComponent(debouncedQuery)}&activo=true`);
        const data = await res.json();
        setResults(data.slice(0, 6));
        setShowDropdown(true);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleSelect = (id) => {
    setQuery('');
    setResults([]);
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
    navigate(`/product/${id}`);
  };

  const SearchBox = ({ className = '' }) => (
    <div ref={searchRef} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setShowDropdown(true)}
        placeholder="Buscar productos..."
        className="w-48 px-4 py-2 pl-10 bg-gray-100 border-2 border-transparent focus:border-primary rounded-xl text-sm focus:outline-none focus:w-64 transition-all"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

      {showDropdown && (
        <div className="absolute top-full mt-2 left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          {searching ? (
            <div className="px-4 py-3 text-sm text-gray-500">Buscando...</div>
          ) : results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">Sin resultados</div>
          ) : (
            results.map((product) => (
              <button
                key={product._id}
                onMouseDown={() => handleSelect(product._id)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors text-left"
              >
                {product.images?.[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                  <p className="text-xs text-orange-500 font-semibold">${product.price.toLocaleString()}</p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );

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
            <img src="/logoSF.png" alt="Pet Shop Vagabundo" className="w-20 h-20" />
            <img src="/titulo.png" alt="Pet Shop Vagabundo" className="h-20 w-auto object-contain hidden sm:block" />
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

            <SearchBox className={`transition-opacity ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />

            {/* Cart button - Desktop */}
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

          {/* Mobile: Cart + Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/cart"
              className="relative p-3 bg-primary hover:bg-primaryDark text-white rounded-xl shadow-lg transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl rounded-b-3xl overflow-visible animate-slideDown">
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

              <div className="pt-2">
                <SearchBox className="w-full" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
