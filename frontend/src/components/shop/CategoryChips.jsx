import { Link, useLocation } from "react-router-dom";

const categories = [
  "perros",
  "gatos",
  "accesorios",
  "alimentos",
  "peluqueria",
  "premium",
];

export default function CategoryChips() {
  const location = useLocation();
  const active = new URLSearchParams(location.search).get("category");

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 mb-6 sticky top-20 bg-white z-20">
      {categories.map((cat) => (
        <Link
          key={cat}
          to={`/shop?category=${cat}`}
          className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold transition
            ${
              active === cat
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}
