const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export default function WhatsAppButton() {
  if (!WHATSAPP_NUMBER) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-transform hover:scale-110"
    >
      {/* Pulso animado */}
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-50" />

      {/* Ícono WhatsApp */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="relative w-8 h-8 fill-white"
      >
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.825.737 5.476 2.027 7.785L0 32l8.454-2.007A15.93 15.93 0 0 0 16 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.764-1.848l-.485-.287-5.018 1.191 1.271-4.883-.316-.502A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.862c-.398-.199-2.354-1.162-2.72-1.294-.365-.133-.631-.199-.897.199-.265.398-1.03 1.294-1.262 1.56-.232.266-.465.299-.863.1-.398-.2-1.681-.62-3.203-1.978-1.184-1.057-1.983-2.362-2.216-2.76-.232-.398-.025-.613.175-.811.18-.179.398-.465.597-.698.199-.232.265-.398.398-.664.133-.266.066-.498-.033-.697-.1-.2-.897-2.163-1.229-2.961-.324-.778-.652-.672-.897-.685l-.764-.013c-.265 0-.697.1-1.063.498-.365.398-1.394 1.362-1.394 3.322s1.427 3.853 1.626 4.119c.2.265 2.809 4.289 6.808 6.016.952.411 1.695.657 2.274.841.955.304 1.824.261 2.511.158.766-.114 2.354-.962 2.686-1.891.332-.93.332-1.727.232-1.892-.099-.165-.365-.265-.763-.464z" />
      </svg>
    </a>
  );
}
