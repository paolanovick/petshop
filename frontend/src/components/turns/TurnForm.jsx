export default function TurnForm({ service, date, time }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      service: service.name,
      date,
      time,
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
    };

    await fetch("https://TU-N8N-WEBHOOK", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert("Turno reservado con éxito");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <h2 className="font-semibold text-lg">Datos del cliente</h2>

      <input
        name="name"
        placeholder="Nombre"
        required
        className="w-full border px-4 py-2 rounded"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full border px-4 py-2 rounded"
      />

      <input
        name="phone"
        placeholder="Teléfono"
        required
        className="w-full border px-4 py-2 rounded"
      />

      <button
        type="submit"
        className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded font-bold"
      >
        Confirmar turno
      </button>
    </form>
  );
}
