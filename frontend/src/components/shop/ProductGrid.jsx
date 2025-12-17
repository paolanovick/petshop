import ProductCard from "./ProductCard";

const mockProducts = [
  { id: 1, name: "Alimento Premium Perro", price: 12000 },
  { id: 2, name: "Alimento Gato Adulto", price: 9800 },
  { id: 3, name: "Abrigo para perro", price: 7500 },
  { id: 4, name: "Juguete interactivo", price: 4200 },
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
