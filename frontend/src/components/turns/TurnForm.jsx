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

    alert("🐾 ¡Turno reservado con éxito!");
  };

  return (
    <section className="mt-12 bg-gray-50 p-8 rounded-3xl border">
      <h2 className="text-xl font-extrabold mb-2">
        ✨ Último paso
      </h2>

      <p className="text-sm text-gray-600 mb-6">
        Te confirmamos el turno por email o WhatsApp
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nombre completo"
          required
          className="w-full border-2 rounded-xl px-4 py-3"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border-2 rounded-xl px-4 py-3"
        />

        <input
          name="phone"
          placeholder="Teléfono / WhatsApp"
          required
          className="w-full border-2 rounded-xl px-4 py-3"
        />

        <button
          type="submit"
          className="
            w-full mt-4
            bg-primary hover:bg-primaryDark
            text-white font-extrabold text-lg
            py-4 rounded-xl
            transition shadow-xl
          "
        >
          🐶 Confirmar turno
        </button>
      </form>
    </section>
  );
}
