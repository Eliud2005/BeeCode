"use client";

import { proyectos } from "../data";
import Carrusel from "../../../../components/carrousel";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, ShieldCheck, Globe } from "lucide-react";

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

export default function ProyectoPage() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";

  const proyecto = proyectos.find((p) => generateSlug(p.title) === slug);

  if (!proyecto)
    return (
      <div className="min-h-screen bg-[#0b0b0c] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
          <ShieldCheck className="text-red-500" size={40} />
        </div>
        <p className="text-slate-400 text-xl font-medium">Error 404: Proyecto no localizado</p>
        <button 
           onClick={() => window.history.back()}
           className="mt-6 text-blue-400 hover:text-white transition-colors"
        >
          Volver a la base
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-slate-200 selection:bg-blue-500/30 overflow-hidden relative">
      {/* Fondos difuminados para dar profundidad */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 relative z-10">
        
        {/* Botón regresar */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 mb-12 text-slate-400 hover:text-blue-400 font-medium transition-all"
        >
          <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
            <ArrowLeft size={18} className="group-hover:text-white" />
          </div>
          Volver a Proyectos
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Lado Izquierdo: Visual (Carrusel) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-3 shadow-2xl">
              {proyecto.images && proyecto.images.length > 0 ? (
                <Carrusel images={proyecto.images} />
              ) : (
                <div className="w-full aspect-video bg-white/5 flex flex-col items-center justify-center rounded-[2rem]">
                  <Globe className="text-slate-600 mb-2" size={48} />
                  <p className="text-slate-500">Vista previa no disponible</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Lado Derecho: Contenido */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                Caso de Estudio
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                {proyecto.title}
              </h1>
            </div>

            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                <ShieldCheck size={20} /> Sobre el proyecto
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                {proyecto.desc}
              </p>
            </div>

            {/* Detalles Extra (Simulados) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter mb-1">Tecnología</p>
                <p className="text-white font-medium">Fullstack</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter mb-1">Seguridad</p>
                <p className="text-white font-medium">Implementada</p>
              </div>
            </div>

            {/* Botón de Acción */}
            {proyecto.url && proyecto.url.trim() !== "" && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={proyecto.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-[1.5rem] shadow-xl shadow-blue-600/20 transition-all text-lg group"
              >
                Visitar Proyecto <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}