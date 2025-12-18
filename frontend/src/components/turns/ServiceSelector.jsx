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
  className={`
    flex-1 p-6 rounded-2xl border-2 text-center transition
    ${selected?.id === s.id
      ? "border-primary bg-primary/10 shadow-lg"
      : "border-gray-200 hover:border-primary"}
  `}
>
  <div className="text-2xl mb-2">
    {s.id === "bath" ? "🛁" : "✂️"}
  </div>
  <div className="font-bold text-lg">{s.name}</div>
</button>

        ))}
      </div>
    </div>
  );
}
