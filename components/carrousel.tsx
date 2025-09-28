"use client";

import { useState } from "react";
import Image from "next/image";

interface CarruselProps {
  images: string[];
}

export default function Carrusel({ images }: CarruselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg">
      {/* Contenedor de imágenes */}
      <div
        className="flex transition-transform duration-700"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full flex justify-center items-center h-96 bg-gray-100 rounded-xl p-2"
          >
            <Image
              src={img.startsWith("/") ? img : `/${img}`}
              alt={`Imagen ${i + 1}`}
              width={1280}
              height={720}
              style={{ objectFit: "contain" }}
              className="rounded-xl max-w-full max-h-full"
            />
          </div>
        ))}
      </div>

      {/* Botones manuales */}
      <button
        onClick={() =>
          setCurrentIndex(
            currentIndex === 0 ? images.length - 1 : currentIndex - 1
          )
        }
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
      >
        ◀
      </button>
      <button
        onClick={() =>
          setCurrentIndex(
            currentIndex === images.length - 1 ? 0 : currentIndex + 1
          )
        }
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
      >
        ▶
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === i ? "bg-blue-600" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
