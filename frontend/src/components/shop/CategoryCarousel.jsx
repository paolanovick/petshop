import { Link } from "react-router-dom";
import { ShoppingBag, ChevronRight } from "lucide-react";

export default function CategoryCarousel({ category, products, showViewAll = false }) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center">
        <span className="text-6xl mb-4 block">{category.icon}</span>
        <h3 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
          {category.name}
        </h3>
        <p className="text-gray-500">No hay productos disponibles en esta categoría</p>
      </div>
    );
  }

  return (
    <div id={category.id} className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <h3 className="text-3xl font-bold text-gray-800 capitalize">
            {category.name}
          </h3>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
            {products.length} {products.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>
        
        {showViewAll && products.length > 6 && (
          <Link
            to={`/shop?category=${category.id}`}
            className="flex items-center gap-2 text-primary hover:text-primaryDark font-semibold transition group"
          >
            Ver solo esta categoría
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </Link>
        )}
      </div>

      <div className="relative overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 pb-4">
          {products.map((product) => (
           <Link
  key={product._id}
  to={`/product/${product._id}`}
  className="min-w-[280px] max-w-[280px] bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-2 overflow-hidden group flex-shrink-0"
>
  <div className="h-64 bg-white flex items-center justify-center overflow-hidden p-4">
    {product.images?.[0] ? (
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-contain group-hover:scale-110 transition duration-300"
      />
    ) : (
      <ShoppingBag className="w-12 h-12 text-gray-300" />
    )}
  </div>

  <div className="p-5 bg-white">
    <h4 className="font-semibold text-gray-800 mb-3 h-12 overflow-hidden line-clamp-2">
      {product.name}
    </h4>
    
    <div className="flex items-center justify-between mb-3">
      <span className="text-primary font-bold text-xl">
        ${product.price.toLocaleString()}
      </span>
      
      {product.stock > 0 ? (
        <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">
          Stock: {product.stock}
        </span>
      ) : (
        <span className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-1 rounded">
          Sin stock
        </span>
      )}
    </div>

    {product.destacado && (
      <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">
        ⭐ Destacado
      </span>
    )}
  </div>
</Link>
          ))}
        </div>
      </div>
    </div>
  );
}