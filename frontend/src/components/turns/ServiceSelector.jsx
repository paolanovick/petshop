export default function ServiceSelector({ selected, onSelect }) {
  const services = [
    { id: "bath", name: "Baño" },
    { id: "grooming", name: "Peluquería" },
  ];

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3">Elegí el servicio</h2>

      <div className="flex gap-4">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s)}
            className={`px-6 py-3 rounded border font-semibold
              ${selected?.id === s.id ? "bg-primary text-white" : "bg-white"}`}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}
