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
  // 🔹 Extrae slug de la URL
  const pathname = usePathname(); // ej: "/proyectos/plataforma-de-conexion"
  const slug = pathname.split("/").pop() || "";

  const proyecto = proyectos.find((p) => generateSlug(p.title) === slug);

  if (!proyecto)
    return (
      <p className="p-6 text-red-600 text-center text-lg">
        Proyecto no encontrado
      </p>
    );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <button
        onClick={() => window.history.back()}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Regresar
      </button>

      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
        {proyecto.title}
      </h1>

      {proyecto.images && proyecto.images.length > 0 && (
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <Carrusel images={proyecto.images} />

          <p className="mt-6 text-gray-700 text-justify">{proyecto.desc}</p>

          {proyecto.url && (
            <a
              href={proyecto.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg shadow-md transition"
            >
              Ir al proyecto
            </a>
          )}
        </div>
      )}
    </div>
  );
}
