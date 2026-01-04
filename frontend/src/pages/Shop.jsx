import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import CategoryCarousel from "../components/shop/CategoryCarousel";
import ProductGridCard from "../components/shop/ProductGridCard";

const API_URL = import.meta.env.VITE_API_URL;

const CATEGORIES = [
  { id: 'alimentos', name: 'Alimentos', icon: '🍖' },
  { id: 'accesorios', name: 'Accesorios', icon: '🎀' },
  { id: 'juguetes', name: 'Juguetes', icon: '🎾' },
  { id: 'higiene', name: 'Higiene', icon: '🧼' },
  { id: 'otros', name: 'Otros', icon: '📦' },
];

export default function Shop() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFilter = params.get("category");
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (categoryFilter) {
          const response = await fetch(`${API_URL}/api/products?category=${categoryFilter}&activo=true`);
          const data = await response.json();
          setProductsByCategory({ [categoryFilter]: data });
        } else {
          const promises = CATEGORIES.map(async (category) => {
            const response = await fetch(`${API_URL}/api/products?category=${category.id}&activo=true`);
            const data = await response.json();
            return { categoryId: category.id, products: data };
          });
          const results = await Promise.all(promises);
          const grouped = {};
          results.forEach(({ categoryId, products }) => {
            grouped[categoryId] = products;
          });
          setProductsByCategory(grouped);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentCategory = CATEGORIES.find(cat => cat.id === categoryFilter);
  const categoriesToShow = categoryFilter ? CATEGORIES.filter(cat => cat.id === categoryFilter) : CATEGORIES;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <div className="flex items-center gap-3">
            {currentCategory && (
              <span className="text-5xl">{currentCategory.icon}</span>
            )}
            <div>
              <h1 className="text-4xl font-black text-gray-800">
                {currentCategory ? currentCategory.name : "Explorá nuestros productos"}
              </h1>
              {!currentCategory && (
                <p className="text-gray-600 mt-1">
                  Organizados por categoría para que encuentres todo más rápido
                </p>
              )}
            </div>
          </div>
        </div>
      </div>



      <div className="max-w-7xl mx-auto px-6 py-12">
  {categoryFilter ? (
    // ============ VISTA GRID - Cuando hay filtro ============
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categoriesToShow.map((category) => {
        const products = productsByCategory[category.id] || [];
        
        // Para Alimentos: combinar todas las subcategorías
        if (category.id === 'alimentos') {
          const perros = products.filter(p => p.subcategory === 'perros');
          const gatos = products.filter(p => p.subcategory === 'gatos');
          const ambos = products.filter(p => p.subcategory === 'ambos' || !p.subcategory);
          const allProducts = [...perros, ...gatos, ...ambos];
          
          return allProducts.map(product => (
            <ProductGridCard key={product._id} product={product} />
          ));
        }
        
        // Otras categorías
        return products.map(product => (
          <ProductGridCard key={product._id} product={product} />
        ));
      })}
    </div>
  ) : (
   // ============ VISTA CAROUSELES - Sin filtro ============
<div className="space-y-16">
  {categoriesToShow.map((category) => {
    const products = productsByCategory[category.id] || [];
    
    // Caso especial: Alimentos - separar por subcategoría
    if (category.id === 'alimentos') {
      const perros = products.filter(p => p.subcategory === 'perros');
      const gatos = products.filter(p => p.subcategory === 'gatos');
      const ambos = products.filter(p => p.subcategory === 'ambos' || !p.subcategory);

      return (
        <div key={category.id} className="space-y-16">
         {perros.length > 0 && (
  <CategoryCarousel
    category={{ 
      id: 'alimentos',  // ← Cambiar de 'alimentos-perros' a 'alimentos'
      name: 'Alimentos para Perros', 
      icon: '🐕' 
    }}
    products={perros}
    hideHeader={false}
  />
)}
{gatos.length > 0 && (
  <CategoryCarousel
    category={{ 
      id: 'alimentos',  // ← Cambiar de 'alimentos-gatos' a 'alimentos'
      name: 'Alimentos para Gatos', 
      icon: '🐱' 
    }}
    products={gatos}
    hideHeader={false}
  />
)}
{ambos.length > 0 && (
  <CategoryCarousel
    category={{ 
      id: 'alimentos',  // ← Cambiar de 'alimentos-ambos' a 'alimentos'
      name: 'Alimentos Generales', 
      icon: '🐾' 
    }}
    products={ambos}
    hideHeader={false}
  />
)}
        </div>
      );
    }

    // Caso normal: todas las demás categorías
    if (products.length === 0) return null;
    
    return (
      <CategoryCarousel
        key={category.id}
        category={category}
        products={products}
        hideHeader={false}
      />
    );
  })}
</div>
  )}
</div>
    </div>
  );
}