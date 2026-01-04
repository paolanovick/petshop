import { useEffect, useState } from "react";
import ServiceSelector from "../components/turns/ServiceSelector";
import TurnCalendar from "../components/turns/TurnCalendar";
import TimeSlots from "../components/turns/TimeSlots";


export default function Turns() {
  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mascotaNombre: "",
    mascotaTipo: "perro",
    mascotaTamaño: "mediano",
  });

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // 🔄 Cargar disponibilidad cuando cambia la fecha
 
  // 🔄 Resetear fecha y horarios cuando cambia el servicio
  useEffect(() => {
    setDate("");
    setTime(null);
    setSlots([]);
  }, [service]);

  // 🔄 Resetear horario cuando cambia la fecha
  useEffect(() => {
    setTime(null);
  }, [date]);

useEffect(() => {
  if (!date) return;

  const fetchAvailability = async () => {
    setLoadingSlots(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.vagabundo.com.ar/api/appointments/availability?fecha=${date}`
      );
      const data = await res.json();
      setSlots(data.horarios || []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar horarios");
    } finally {
      setLoadingSlots(false);
    }
  };

  fetchAvailability();
}, [date]);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 📤 Enviar turno
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(
        "https://api.vagabundo.com.ar/api/appointments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            servicio: service.id,
            fecha: date,
            hora: time,
            cliente: {
              nombre: form.nombre,
              email: form.email,
              telefono: form.telefono,
            },
            mascota: {
              nombre: form.mascotaNombre,
              tipo: form.mascotaTipo,
              tamaño: form.mascotaTamaño,
            },
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al crear turno");
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto mt-24 text-center">
        <h1 className="text-3xl font-extrabold mb-4">
          🐾 ¡Turno reservado con éxito!
        </h1>
        <p className="text-gray-600">
          Te vamos a contactar para confirmar el turno.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-24 mb-24 px-4">
      <h1 className="text-4xl font-black mb-10 text-center">
        Reservar turno
      </h1>

      <ServiceSelector selected={service} onSelect={setService} />

      {service && (
        <TurnCalendar selected={date} onSelect={setDate} />
      )}

      {date && (
        <>
          {loadingSlots ? (
            <p className="text-gray-500 mb-6">Cargando horarios...</p>
          ) : (
            <TimeSlots
              slots={slots}
              selected={time}
              onSelect={setTime}
            />
          )}
        </>
      )}

      {service && date && time && (
        <form
          onSubmit={handleSubmit}
          className="mt-12 bg-gray-50 p-8 rounded-3xl border space-y-4"
        >
          <h2 className="text-xl font-extrabold mb-4">
            ✨ Datos del cliente
          </h2>

          <input
            name="nombre"
            placeholder="Nombre completo"
            required
            onChange={handleChange}
            className="w-full border-2 rounded-xl px-4 py-3"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full border-2 rounded-xl px-4 py-3"
          />

          <input
            name="telefono"
            placeholder="Teléfono / WhatsApp"
            required
            onChange={handleChange}
            className="w-full border-2 rounded-xl px-4 py-3"
          />

          <h3 className="font-bold mt-6">🐶 Mascota</h3>

          <input
            name="mascotaNombre"
            placeholder="Nombre de la mascota"
            required
            onChange={handleChange}
            className="w-full border-2 rounded-xl px-4 py-3"
          />

          <select
            name="mascotaTipo"
            onChange={handleChange}
            className="w-full border-2 rounded-xl px-4 py-3"
          >
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="otro">Otro</option>
          </select>

          <select
            name="mascotaTamaño"
            onChange={handleChange}
            className="w-full border-2 rounded-xl px-4 py-3"
          >
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>

          {error && (
            <p className="text-red-500 font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="
              w-full mt-4
              bg-primary hover:bg-primaryDark
              text-white font-extrabold text-lg
              py-4 rounded-xl
              transition shadow-xl
              disabled:opacity-50
            "
          >
            {submitting ? "Reservando..." : "🐾 Confirmar turno"}
          </button>
        </form>
      )}
    </div>
  );
}
