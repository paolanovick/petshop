export default function TimeSlots({ slots = [], selected, onSelect }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">
        ⏰ Elegí un horario
      </h2>

      <div className="flex flex-wrap gap-3">
        {slots.map(({ hora, disponible }) => {
          const active = selected === hora;

          return (
            <button
              key={hora}
              disabled={!disponible}
              onClick={() => onSelect(hora)}
              className={`
                px-5 py-3 rounded-full text-sm font-semibold transition-all
                ${!disponible
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : active
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "bg-white border-2 border-gray-200 hover:border-primary hover:shadow"}
              `}
            >
              {hora}
            </button>
          );
        })}
      </div>
    </section>
  );
}
