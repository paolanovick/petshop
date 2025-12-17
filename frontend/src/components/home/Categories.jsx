import { Link } from "react-router-dom";

const categories = [
  { name: "Alimento Perros", slug: "alimento-perros" },
  { name: "Alimento Gatos", slug: "alimento-gatos" },
  { name: "Indumentaria", slug: "indumentaria" },
  { name: "Accesorios", slug: "accesorios" },
];

export default function Categories() {
  return (
    <section className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Categorías</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/shop?category=${cat.slug}`}
            className="border rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{cat.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
