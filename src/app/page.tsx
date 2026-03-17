"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { proyectos, resenas } from "./proyectos/data";
import { ChevronLeft, ChevronRight, ExternalLink, Mail, MessageSquare, Send } from "lucide-react";

const crearSlug = (title: string) =>
  title.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

export default function Home() {
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [resenaIndex, setResenaIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const prev = () => setIndex(i => (i <= 0 ? Math.max(0, proyectos.length - itemsPerView) : i - 1));
  const next = () => setIndex(i => (i >= proyectos.length - itemsPerView) ? 0 : i + 1);
  const prevResena = () => setResenaIndex(i => (i <= 0 ? resenas.length - 1 : i - 1));
  const nextResena = () => setResenaIndex(i => (i >= resenas.length - 1 ? 0 : i + 1));

  return (
    <div className="relative min-h-screen bg-[#0b0b0c] text-slate-200 selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* HEADER GLASSMORPHISM */}
      <header className="fixed top-0 left-0 w-full bg-[#0b0b0c]/50 backdrop-blur-xl border-b border-white/5 z-[100]">
        <nav className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6">
          <motion.a 
            href="#" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-2xl font-black bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
          >
            Eliud
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {["inicio", "proyectos", "reseñas", "contacto"].map((link) => (
              <a key={link} href={`#${link}`} className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors capitalize">
                {link}
              </a>
            ))}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-white">
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <main className="pt-20">
        <section id="inicio" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          {/* Luces de fondo estilo Figma */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] z-0" />
          
          <div className="relative z-10">
            {/* CONTENEDOR DE LA GOTA Y EL EFECTO AGUA */}
            <div className="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center">
              
              {/* GOTA PRINCIPAL CON ANIMACIÓN COMPLEJA */}
              <motion.div 
                initial={{ y: -900, opacity: 1, scale: 0.2 }} 
                animate={{ 
                  y: [null, 0, 20, 0], // Cae, se hunde un poco, reaparece flotando
                  opacity: [null, 1, 0, 1], // Desaparece al chocar, reaparece al flotar
                  scale: [null, 1, 1.3, 1], // Se expande un poco en el "choque"
                }}
                transition={{ 
                  times: [0, 0.4, 0.5, 0.8], // Control exacto del timing de la secuencia
                  duration: 2.2,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="relative p-1 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-[0_0_60px_rgba(59,130,246,0.5)] z-20"
              >
                {/* Animación de flotación infinita suave (solo después de caer) */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                  className="w-full h-full flex items-center justify-center rounded-full bg-[#0b0b0c]"
                >
                  <Image 
                    src="/assets/gota.png" 
                    alt="Eliud" 
                    width={160} 
                    height={160} 
                    className="rounded-full p-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]" 
                  />
                </motion.div>
              </motion.div>

              {/* ONDAS DE AGUA (SPLASH) - Aparecen justo al impacto */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 0.6, 0], 
                    scale: [0, 2.5], 
                    borderColor: ["#60a5fa", "#22d3ee", "#60a5fa"]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 1.0 + (i * 0.2), // Sincronizado con el choque de la gota
                    ease: "easeOut" 
                  }}
                  className="absolute w-full h-full border-2 rounded-full z-10"
                  style={{ boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}
                />
              ))}

              {/* Base visual del "mar" donde choca */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[160%] h-[40px] bg-gradient-to-r from-blue-900/0 via-blue-600/20 to-blue-900/0 blur-md rounded-full z-0"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white">
              Hola, soy <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Eliud</span> 
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Desarrollador Fullstack transformando problemas complejos en soluciones <span className="text-blue-400 font-semibold">seguras y elegantes.</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#proyectos" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                Ver Proyectos
              </a>
              <a href="#contacto" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-bold transition-all active:scale-95">
                Contáctame
              </a>
            </div>
          </div>
        </section>

        {/* PROYECTOS SECTION */}
        <section id="proyectos" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">Proyectos Seleccionados</h2>
                <p className="text-slate-400">Una muestra de mis trabajos más recientes.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={prev} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-blue-600 transition-colors"><ChevronLeft /></button>
                <button onClick={next} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-blue-600 transition-colors"><ChevronRight /></button>
              </div>
            </div>

            <div className="overflow-hidden">
              <motion.div 
                className="flex gap-6"
                animate={{ x: `-${index * (100 / itemsPerView)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {proyectos.map((p, i) => (
                  <div key={i} className="flex-none" style={{ width: `calc(${100 / itemsPerView}% - 1rem)` }}>
                    <div className="group bg-white/5 border border-white/10 p-8 rounded-[2rem] h-full hover:bg-white/10 transition-all hover:-translate-y-2 duration-300">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400">
                        <MessageSquare size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{p.title}</h3>
                      <p className="text-slate-400 mb-8 line-clamp-3">{p.desc}</p>
                      {p.url ? (
                        <a href={p.url} target="_blank" className="flex items-center gap-2 text-blue-400 font-bold group-hover:text-cyan-300">
                          Explorar <ExternalLink size={16} />
                        </a>
                      ) : (
                        <Link href={`/proyectos/${crearSlug(p.title)}`} className="flex items-center gap-2 text-blue-400 font-bold">
                          Detalles <ChevronRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* RESEÑAS SECTION */}
        <section id="reseñas" className="py-32 bg-gradient-to-b from-transparent to-blue-900/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-16 italic">"Feedback que impulsa el código"</h2>
            <div className="relative bg-white/5 border border-white/10 p-10 md:p-16 rounded-[3rem] backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={resenaIndex}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium">
                    {`"${resenas[resenaIndex].mensaje}"`}
                  </p>
                  <div>
                    <h4 className="text-white font-bold text-lg">{resenas[resenaIndex].nombre}</h4>
                    <div className="flex justify-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < resenas[resenaIndex].estrellas ? "text-blue-400" : "text-slate-700"}>★</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center gap-4 mt-12">
                <button onClick={prevResena} className="p-2 text-slate-500 hover:text-white transition-colors">❮</button>
                <div className="flex items-center gap-2">
                  {resenas.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${resenaIndex === i ? "bg-blue-500 w-6" : "bg-slate-700"}`} />
                  ))}
                </div>
                <button onClick={nextResena} className="p-2 text-slate-500 hover:text-white transition-colors">❯</button>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO SECTION */}
        <section id="contacto" className="py-32 px-6">
          <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 p-10 rounded-[3rem] shadow-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4">Iniciemos un proyecto</h2>
              <p className="text-slate-400">¿Tienes una idea? Cuéntamela y hagámosla realidad.</p>
            </div>
            <form action="https://formspree.io/f/mgvgydae" method="POST" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Nombre" className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white" required />
                <input type="email" name="email" placeholder="Email" className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white" required />
              </div>
              <textarea name="message" placeholder="¿En qué puedo ayudarte?" rows={5} className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white" required />
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2 group">
                Enviar Mensaje <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </section>

        {/* BOTÓN FLOTANTE REDISEÑADO CON ANIMACIONES */}
        <div className="fixed bottom-8 right-8 flex flex-col items-end z-[9999]">
          <AnimatePresence>
            {contactOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                className="flex flex-col gap-4 mb-6"
              >
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/529513180462" 
                  target="_blank" 
                  className="w-14 h-14 bg-[#25D366] rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] flex items-center justify-center hover:scale-110 transition-transform active:scale-90"
                >
                  <MessageSquare size={28} className="text-white" />
                </a>

                {/* Gmail */}
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=beecode.mx@gmail.com" 
                  target="_blank" 
                  className="w-14 h-14 bg-white rounded-full shadow-[0_8px_30px_rgb(255,255,255,0.2)] flex items-center justify-center hover:scale-110 transition-transform active:scale-90"
                >
                  <Mail size={28} className="text-[#ea4335]" />
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com/in/eliudgh" 
                  target="_blank" 
                  className="w-14 h-14 bg-[#0077B5] rounded-full shadow-[0_8px_30px_rgb(0,119,181,0.3)] flex items-center justify-center hover:scale-110 transition-transform active:scale-90"
                >
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón Principal (La Gota Animada) */}
          <motion.button
            onClick={() => setContactOpen(!contactOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-18 h-18 bg-white rounded-full shadow-[0_0_40px_rgba(59,130,246,0.6)] flex items-center justify-center z-10 border-4 border-[#0b0b0c] relative overflow-hidden group"
          >
            {/* Efecto de pulso interno */}
            {!contactOpen && (
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute inset-0 bg-blue-400 rounded-full"
              />
            )}
            
            <Image 
              src="/assets/gota.png" 
              width={45} 
              height={45} 
              className={`relative z-10 transition-all duration-700 ease-in-out ${
                contactOpen ? "rotate-[135deg] scale-75" : "scale-110"
              }`} 
              alt="Logo" 
            />
          </motion.button>
        </div>
      </main>
    </div>
  );
}