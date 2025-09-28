"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { proyectos, resenas } from "./proyectos/data"; // 🔹 importa los datos

const crearSlug = (title: string) =>
  title.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

export default function Home() {
  const [index, setIndex] = useState(0); // Proyectos
  const [itemsPerView, setItemsPerView] = useState(3); // 🔹 cantidad visible
  const [resenaIndex, setResenaIndex] = useState(0); // Reseñas
  const [menuOpen, setMenuOpen] = useState(false);


  // Ajustar proyectos según el tamaño de pantalla
  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // móvil
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // tablet
      } else {
        setItemsPerView(3); // desktop
      }
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  // Funciones para proyectos
  const prev = () =>
    setIndex(i => (i <= 0 ? Math.max(0, proyectos.length - itemsPerView) : i - 1));

  const next = () =>
    setIndex(i => (i >= proyectos.length - itemsPerView ? 0 : i + 1));

  // Funciones para reseñas - una card por vez
  const prevResena = () =>
    setResenaIndex(i => (i <= 0 ? resenas.length - 1 : i - 1));
  const nextResena = () =>
    setResenaIndex(i => (i >= resenas.length - 1 ? 0 : i + 1));

  return (
    <>
      {/* Header */}
   <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow z-50">
  <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
    <a href="#" className="text-xl font-bold text-blue-600">BeeCode</a>

    {/* Menú desktop */}
    <div className="hidden md:flex gap-6">
      <a href="#inicio" className="text-gray-700 hover:text-blue-600 transition">Inicio</a>
      <a href="#proyectos" className="text-gray-700 hover:text-blue-600 transition">Proyectos</a>
      <a href="#contacto" className="text-gray-700 hover:text-blue-600 transition">Contacto</a>
    </div>

    {/* Botón hamburguesa (solo móvil) */}
    <div className="md:hidden">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
      >
        {menuOpen ? "✖" : "☰"}
      </button>
    </div>
  </nav>

  {/* Menú móvil */}
  {menuOpen && (
    <div className="md:hidden bg-white shadow-lg flex flex-col items-center gap-4 py-4">
      <a href="#inicio" className="text-gray-700 hover:text-blue-600 transition">Inicio</a>
      <a href="#proyectos" className="text-gray-700 hover:text-blue-600 transition">Proyectos</a>
      <a href="#contacto" className="text-gray-700 hover:text-blue-600 transition">Contacto</a>
    </div>
  )}
</header>


      {/* Inicio */}
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 text-gray-900 pt-24">
        <section id="inicio" className="flex flex-col items-center justify-center text-center py-32 px-6">
          <Image
            src="/assets/bee7.png"
            alt="Eliud profile picture"
            width={160}
            height={160}
            className="rounded-full shadow-lg mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hola, soy <span className="text-blue-600">Eliud</span> 👋
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6 text-gray-700">
            Desarrollador web y entusiasta de la programación, transformo problemas en oportunidades.
          </p>
          <div className="flex gap-4">
            <a href="#proyectos" className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">Ver proyectos</a>
            <a href="#contacto" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl shadow hover:bg-gray-300 transition">Contáctame</a>
          </div>
        </section>

        {/* Carrusel de Proyectos */}
        <section id="proyectos" className="py-20 px-6 bg-white">
          <h2 className="text-3xl font-bold text-center mb-12">🚀 Mis proyectos</h2>
          <div className="relative max-w-6xl mx-auto">
            <button onClick={prev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 transition z-10">&#8592;</button>
            <button onClick={next} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 transition z-10">&#8594;</button>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 gap-6"
                style={{ transform: `translateX(-${index * (100 / itemsPerView)}%)` }}
              >
                {proyectos.map((p, i) => (
                  <div
                    key={i}
                    className="flex-none bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <h3 className="font-semibold text-xl mb-2">{p.title}</h3>
                    <p className="text-gray-600 mb-4">{p.desc}</p>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">Ver proyecto →</a>
                    ) : (
                      <Link href={`/proyectos/${crearSlug(p.title)}`} className="text-blue-600 font-medium hover:underline">Ver más →</Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Carrusel de Reseñas */}
        <section id="reseñas" className="py-20 px-6 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-12">⭐ Reseñas</h2>
          <div className="relative max-w-md mx-auto">
            <button onClick={prevResena} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 transition z-10">&#8592;</button>
            <button onClick={nextResena} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 transition z-10">&#8594;</button>

            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 gap-4" style={{ transform: `translateX(-${(resenaIndex * 100)}%)` }}>
                {resenas.map((r, i) => (
                  <div key={i} className="flex-none w-full min-w-0 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                    <p className="text-gray-700 mb-4">"{r.mensaje}"</p>
                    <h3 className="font-semibold text-lg">{r.nombre}</h3>
                    <span className="text-yellow-500">{"★".repeat(r.estrellas)}{"☆".repeat(5-r.estrellas)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-20 px-6 bg-gray-100">
          <h2 className="text-3xl font-bold text-center mb-12">📩 Contáctame</h2>
          <form
            action="https://formspree.io/f/mzzjdypv"
            method="POST"
            className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow space-y-4"
          >
            <input type="text" name="name" placeholder="Tu nombre" className="w-full border border-gray-300 p-3 rounded-lg" required />
            <input type="email" name="email" placeholder="Tu correo" className="w-full border border-gray-300 p-3 rounded-lg" required />
            <textarea name="message" placeholder="Escribe tu mensaje..." rows={5} className="w-full border border-gray-300 p-3 rounded-lg" required></textarea>
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">Enviar mensaje</button>
          </form>
          <a href="https://wa.me/529513180462" target="_blank" rel="noopener noreferrer"
             className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M20.52 3.48A11.93 11.93 0 0 0 12 .5C5.65.5.5 5.65.5 12c0 2.12.56 4.09 1.54 5.8L.5 23l5.85-1.57A11.94 11.94 0 0 0 12 23c6.35 0 11.5-5.15 11.5-11.5 0-3.07-1.2-5.87-3.48-7.52zm-8.52 16c-1.82 0-3.62-.49-5.18-1.41l-.37-.22-3.47.93.93-3.37-.24-.36A9.46 9.46 0 0 1 2.5 12c0-5.24 4.26-9.5 9.5-9.5 2.54 0 4.92.99 6.7 2.78A9.44 9.44 0 0 1 21.5 12c0 5.24-4.26 9.5-9.5 9.5zm5.04-7.53c-.28-.14-1.65-.81-1.9-.9-.25-.1-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.31.2-.59.07-.28-.14-1.17-.43-2.23-1.38-.82-.73-1.37-1.63-1.53-1.91-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.46.14-.16.18-.28.28-.46.1-.18.05-.34-.03-.48-.08-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.46-.16 0-.35-.02-.54-.02s-.48.07-.73.34c-.25.28-.95.93-.95 2.27s.97 2.63 1.11 2.81c.14.18 1.92 2.93 4.65 4.11.65.28 1.15.45 1.54.58.65.21 1.24.18 1.71.11.52-.08 1.65-.67 1.88-1.32.22-.64.22-1.19.16-1.32-.07-.13-.25-.21-.53-.35z"/>
            </svg>
          </a>
        </section>
      </main>
    </>
  );
}
