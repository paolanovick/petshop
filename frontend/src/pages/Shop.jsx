import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import CategoryCarousel from "../components/shop/CategoryCarousel";
import ProductGridCard from "../components/shop/ProductGridCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function Shop() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFilter = params.get("category");
  
  // Redirección para URLs viejas de subcategorías
  useEffect(() => {
    if (categoryFilter && ['alimentos-perros', 'alimentos-gatos', 'alimentos-ambos'].includes(categoryFilter)) {
      window.location.href = '/shop?category=alimentos';
    }
  }, [categoryFilter]);
  
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');

  const sortProducts = (products) => {
    const sorted = [...products];
    if (sortOrder === 'price_asc') return sorted.sort((a, b) => a.price - b.price);
    if (sortOrder === 'price_desc') return sorted.sort((a, b) => b.price - a.price);
    if (sortOrder === 'name_asc') return sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOrder === 'name_desc') return sorted.sort((a, b) => b.name.localeCompare(a.name));
    return sorted;
  };
  // ... resto del código

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.search]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories`);
        const data = await res.json();
        setCategories(data);
      } catch {
        console.error('Error al cargar categorías');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;
    const fetchProducts = async () => {
      try {
        if (categoryFilter) {
          const response = await fetch(`${API_URL}/api/products?category=${categoryFilter}&activo=true`);
          const data = await response.json();
          setProductsByCategory({ [categoryFilter]: data });
        } else {
          const promises = categories.map(async (category) => {
            const response = await fetch(`${API_URL}/api/products?category=${category.slug}&activo=true`);
            const data = await response.json();
            return { categoryId: category.slug, products: data };
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
  }, [categoryFilter, categories]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentCategory = categories.find(cat => cat.slug === categoryFilter);
  const categoriesToShow = categoryFilter ? categories.filter(cat => cat.slug === categoryFilter) : categories;

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
    <>
      {/* Selector de ordenamiento */}
      <div className="flex justify-end mb-6">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        >
          <option value="default">Ordenar por...</option>
          <option value="price_asc">Precio: menor a mayor</option>
          <option value="price_desc">Precio: mayor a menor</option>
          <option value="name_asc">Nombre: A-Z</option>
          <option value="name_desc">Nombre: Z-A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categoriesToShow.map((category) => {
        const products = productsByCategory[category.slug] || [];

        // Para Alimentos: combinar todas las subcategorías
        if (category.slug === 'alimentos') {
          const perros = products.filter(p => p.subcategory === 'perros');
          const gatos = products.filter(p => p.subcategory === 'gatos');
          const ambos = products.filter(p => p.subcategory === 'ambos' || !p.subcategory);
          const allProducts = sortProducts([...perros, ...gatos, ...ambos]);

          return allProducts.map(product => (
            <ProductGridCard key={product._id} product={product} />
          ));
        }

        // Otras categorías
        return sortProducts(products).map(product => (
          <ProductGridCard key={product._id} product={product} />
        ));
      })}
      </div>
    </>
  ) : (
   // ============ VISTA CAROUSELES - Sin filtro ============
<div className="space-y-16">
  {categoriesToShow.map((category) => {
    const products = productsByCategory[category.slug] || [];
    
    // Caso especial: Alimentos - separar por subcategoría
    if (category.slug === 'alimentos') {
      const perros = products.filter(p => p.subcategory === 'perros');
      const gatos = products.filter(p => p.subcategory === 'gatos');
      const ambos = products.filter(p => p.subcategory === 'ambos' || !p.subcategory);

      return (
        <div key={category.slug} className="space-y-16">
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
      name: 'Alimentos', 
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
        key={category.slug}
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