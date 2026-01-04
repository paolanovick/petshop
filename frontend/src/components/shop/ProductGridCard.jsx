import { Link } from "react-router-dom";
import { ShoppingBag, ChevronRight } from "lucide-react";

export default function ProductGridCard({ product }) {
  const sinStock = product.stock === 0;

  return (
    <div
      className={`rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border ${
        sinStock ? 'bg-gray-100 border-gray-200 opacity-75' : 'bg-white border-gray-100'
      }`}
    >
      <Link to={`/product/${product._id}`} className="block relative">
  {/* Badge Destacado - Ribbon diagonal */}
  {product.destacado && !sinStock && (
    <div className="absolute top-0 left-0 z-10 overflow-hidden w-32 h-32 pointer-events-none">
      <div className="absolute top-6 -left-8 bg-red-600 text-white text-xs font-bold py-1 px-12 rotate-[-45deg] shadow-lg text-center">
        DESTACADO
      </div>
    </div>
  )}

  {/* Badge Sin Stock */}
  {sinStock && (
    <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg">
      Sin stock
    </div>
  )}
  
  <div className={`h-48 flex items-center justify-center overflow-hidden p-4 ${
    sinStock ? 'bg-gray-200' : 'bg-gray-50'
  }`}>
    {product.images?.[0] ? (
      <img
        src={product.images[0]}
        alt={product.name}
        className={`max-w-full max-h-full object-contain transition duration-300 ${
          sinStock ? 'grayscale opacity-50' : 'group-hover:scale-105'
        }`}
      />
    ) : (
      <ShoppingBag className={`w-12 h-12 ${sinStock ? 'text-gray-400' : 'text-gray-300'}`} />
    )}
  </div>
</Link>

      <div className="p-5 bg-white">
        <h4 className={`font-bold mb-2 h-12 overflow-hidden line-clamp-2 ${
          sinStock ? 'text-gray-500' : 'text-gray-800'
        }`}>
          {product.name}
        </h4>
        
        <p className={`text-sm mb-3 h-10 overflow-hidden line-clamp-2 ${
          sinStock ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {product.description}
        </p>
        
        <div className="mb-4">
          <span className={`font-bold text-2xl ${
            sinStock ? 'text-gray-400' : 'text-primary'
          }`}>
            ${product.price.toLocaleString()}
          </span>
        </div>

        {sinStock ? (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-2.5 px-4 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2 mb-3"
          >
            <span>Sin stock</span>
          </button>
        ) : (
          <Link
            to={`/product/${product._id}`}
            className="w-full bg-primary hover:bg-primaryDark text-white py-2.5 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mb-3"
          >
            <span>Ver detalles</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}

       
      </div>
    </div>
  );
}