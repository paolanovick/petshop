export default function TurnCalendar({ selected, onSelect }) {
  return (
    <div className="mb-6">
     <h2 className="font-semibold mb-3">
  📅 ¿Qué día te queda mejor?
</h2>

      <input
        type="date"
        value={selected || ""}
        onChange={(e) => onSelect(e.target.value)}
        className="border rounded px-4 py-2"
      />
    </div>
  );
}
