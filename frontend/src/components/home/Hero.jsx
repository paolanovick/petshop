import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-dark to-black text-white py-28">
      <div className="max-w-6xl mx-auto px-6 text-center flex flex-col gap-6">
        <h1 className="text-5xl md:text-6xl font-extrabold">
          Pet Shop Vagabundo
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Todo para tu mascota: alimentos, accesorios, indumentaria y servicios
          de baño y peluquería.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/shop"
            className="bg-primary hover:bg-primaryDark text-white px-8 py-4 rounded font-bold text-lg"
          >
            Comprar productos
          </Link>

          <Link
            to="/turns"
            className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded font-bold text-lg"
          >
            Sacar turno
          </Link>
        </div>
      </div>
    </section>
  );
}
