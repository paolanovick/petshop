export default function TimeSlots({ selected, onSelect }) {
  const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  return (
    <div className="mb-6">
    <h2 className="font-semibold mb-3">
  ⏰ Elegí un horario disponible
</h2>

      <div className="flex flex-wrap gap-3">
        {slots.map((time) => (
          <button
            key={time}
            onClick={() => onSelect(time)}
            className={`px-4 py-2 rounded border
              ${selected === time ? "bg-primary text-white" : "bg-white"}`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}
