export default function TurnCalendar({ selected, onSelect }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-3">
        📅 Elegí el día ideal
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Te mostramos solo días disponibles
      </p>

      <input
        type="date"
        min={today}
        value={selected || ""}
        onChange={(e) => onSelect(e.target.value)}
        className="
          w-full max-w-xs
          border-2 border-gray-200 rounded-xl px-4 py-3
          focus:outline-none focus:border-primary
        "
      />
    </section>
  );
}
