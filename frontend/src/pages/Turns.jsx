import { useState } from "react";

import ServiceSelector from "../components/turns/ServiceSelector";
import TurnCalendar from "../components/turns/TurnCalendar";
import TimeSlots from "../components/turns/TimeSlots";
import TurnForm from "../components/turns/TurnForm";

export default function Turns() {
  const [service, setService] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Título */}
      <h1 className="text-4xl font-black mb-2 text-center">
        Reservá el turno de tu mascota 🐶🐱
      </h1>

      <p className="text-gray-600 text-center mb-10">
        Elegí el servicio, el día y el horario que más te convenga
      </p>

      {/* Pasos */}
      <div className="flex justify-center mb-10">
        <div className="flex gap-4 text-sm font-semibold">
          <span className={service ? "text-primary" : "text-gray-400"}>
            1️⃣ Servicio
          </span>
          <span className={date ? "text-primary" : "text-gray-400"}>
            2️⃣ Día
          </span>
          <span className={time ? "text-primary" : "text-gray-400"}>
            3️⃣ Horario
          </span>
          <span className={time ? "text-primary" : "text-gray-400"}>
            4️⃣ Datos
          </span>
        </div>
      </div>

      {/* Card principal */}
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {/* Servicio */}
        <ServiceSelector selected={service} onSelect={setService} />

        {/* Día */}
        {service && (
          <div className="border-t pt-6">
            <TurnCalendar selected={date} onSelect={setDate} />
          </div>
        )}

        {/* Horario */}
        {date && (
          <div className="border-t pt-6">
            <TimeSlots selected={time} onSelect={setTime} />
          </div>
        )}

        {/* Resumen */}
        {time && (
          <div className="bg-primary/10 border border-primary rounded-2xl p-6">
            <h3 className="font-bold mb-2">🐾 Resumen de tu turno</h3>
            <p>
              <strong>Servicio:</strong> {service.name}
            </p>
            <p>
              <strong>Día:</strong> {date}
            </p>
            <p>
              <strong>Horario:</strong> {time}
            </p>
          </div>
        )}

        {/* Formulario */}
        {time && (
          <div className="border-t pt-6">
            <TurnForm service={service} date={date} time={time} />
          </div>
        )}
      </div>
    </div>
  );
}
