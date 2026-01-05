import React from "react";

export default function SponsorsCarousel() {
  const sponsors = [
    "/brands/eukanuba.png",
    "/brands/frikis.jpeg",
    "/brands/pedigre.png",
    "/brands/proplan.jpeg",
    "/brands/purina.png",
    "/brands/royal.png",
    "/brands/whiscas.jpeg",
  ];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="relative w-full overflow-hidden">

        {/* CONTENEDOR ANIMADO */}
        <div className="flex w-max animate-sponsors gap-24 items-center">
          {[...sponsors, ...sponsors].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-40 grayscale"
              style={{ minWidth: "160px" }}
            >
              <img
                src={logo}
                alt="Marca"
                className="h-12 w-auto"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}