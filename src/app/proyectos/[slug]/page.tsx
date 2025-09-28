"use client";

import { proyectos } from "../data";
import Carrusel from "../../../../components/carrousel";
import { usePathname } from "next/navigation";

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

export default function ProyectoPage() {
  // Extrae slug de la URL
  const pathname = usePathname(); // ej: "/proyectos/plataforma-de-conexion"
  const slug = pathname.split("/").pop() || "";

  const proyecto = proyectos.find((p) => generateSlug(p.title) === slug);

  if (!proyecto)
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg text-center">Proyecto no encontrado</p>
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      {/* Botón regresar */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Regresar
      </button>

      {/* Título */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-8">
        {proyecto.title}
      </h1>

      {/* Carrusel y descripción */}
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
        {proyecto.images && proyecto.images.length > 0 ? (
          <Carrusel images={proyecto.images} />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl mb-4">
            <p className="text-gray-500">No hay imágenes disponibles</p>
          </div>
        )}

        <p className="mt-6 text-gray-700 text-justify">{proyecto.desc}</p>

        {/* Botón a proyecto externo si existe */}
        {proyecto.url && proyecto.url.trim() !== "" && (
          <a
            href={proyecto.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg shadow-md transition"
          >
            Ir al proyecto
          </a>
        )}
      </div>
    </div>
  );
}
