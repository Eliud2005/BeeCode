// app/proyectos/[slug]/page.tsx
import { proyectos } from "../data"; // 🔹 mismo array que Home

interface ProyectoPageProps {
  params: { slug: string };
}

const generateSlug = (title: string) =>
  title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default function ProyectoPage({ params }: ProyectoPageProps) {
  const slug = params.slug;
  const proyecto = proyectos.find(p => generateSlug(p.title) === slug);

  if (!proyecto) return <p className="p-6">Proyecto no encontrado</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{proyecto.title}</h1>
      <p className="mb-4">{proyecto.desc}</p>
      {proyecto.url && (
        <a href={proyecto.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Ir al proyecto 
        </a>
      )}
    </div>
  );
}
