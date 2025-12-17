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
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Reservar turno</h1>

      <ServiceSelector selected={service} onSelect={setService} />

      {service && <TurnCalendar selected={date} onSelect={setDate} />}

      {date && <TimeSlots selected={time} onSelect={setTime} />}

      {time && <TurnForm service={service} date={date} time={time} />}
    </div>
  );
}
