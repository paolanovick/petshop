export default function ServiceSelector({ selected, onSelect }) {
  const services = [
  {
    id: "baño",
    name: "Baño",
    description: "Limpieza y cuidado completo",
    icon: "🛁",
    gradient: "from-sky-100 to-sky-200",
  },
  {
    id: "peluquería",
    name: "Peluquería",
    description: "Corte, estilo y amor",
    icon: "✂️",
    gradient: "from-pink-100 to-pink-200",
  },
  {
    id: "baño_y_peluquería",
    name: "Baño + Peluquería",
    description: "Servicio completo",
    icon: "🐶",
    gradient: "from-green-100 to-green-200",
  },
];

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">
        🐶 ¿Qué servicio necesita tu mascota?
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s) => {
          const active = selected?.id === s.id;

          return (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className={`
                group relative p-6 rounded-3xl text-left transition-all duration-300
                border-2
                ${active
                  ? "border-primary shadow-xl scale-[1.02]"
                  : "border-gray-200 hover:border-primary/60 hover:shadow-lg"}
                bg-gradient-to-br ${s.gradient}
              `}
            >
              <div className="text-4xl mb-4">{s.icon}</div>

              <h3 className="text-xl font-extrabold mb-1">
                {s.name}
              </h3>

              <p className="text-sm text-gray-600">
                {s.description}
              </p>

              {active && (
                <span className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  Seleccionado
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
