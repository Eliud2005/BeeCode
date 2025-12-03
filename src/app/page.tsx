"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { proyectos, resenas } from "./proyectos/data";

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
  const [contactOpen, setContactOpen] = useState(false); // ← menú flotante

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

  const prev = () =>
    setIndex(i => (i <= 0 ? Math.max(0, proyectos.length - itemsPerView) : i - 1));

  const next = () =>
    setIndex(i => (i >= proyectos.length - itemsPerView ? 0 : i + 1));

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

          {/* Menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </nav>

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
            Fundador de BeeCode, desarrollador web y entusiasta de la programación, transformo problemas en oportunidades.
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
<button
  onClick={prev}
  className="
    absolute -left-12
    top-1/2 -translate-y-1/2
    bg-white/90 backdrop-blur
    border border-gray-300
    p-3
    rounded-full
    shadow-lg
    hover:scale-110 hover:bg-white
    transition
    z-20
  "
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M15 19l-7-7 7-7" />
  </svg>
</button>

<button
  onClick={next}
  className="
    absolute -right-12
    top-1/2 -translate-y-1/2
    bg-white/90 backdrop-blur
    border border-gray-300
    p-3
    rounded-full
    shadow-lg
    hover:scale-110 hover:bg-white
    transition
    z-20
  "
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 5l7 7-7 7" />
  </svg>
</button>


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
                      <a href={p.url} target="_blank" className="text-blue-600 font-medium hover:underline">Ver proyecto →</a>
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
<button
  onClick={prevResena}
  className="
    absolute -left-12
    top-1/2 -translate-y-1/2
    bg-white/90 backdrop-blur
    border border-gray-300
    p-3
    rounded-full
    shadow-lg
    hover:scale-110 hover:bg-white
    transition
    z-20
  "
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M15 19l-7-7 7-7" />
  </svg>
</button>

<button
  onClick={nextResena}
  className="
    absolute -right-12
    top-1/2 -translate-y-1/2
    bg-white/90 backdrop-blur
    border border-gray-300
    p-3
    rounded-full
    shadow-lg
    hover:scale-110 hover:bg-white
    transition
    z-20
  "
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 5l7 7-7 7" />
  </svg>
</button>


            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 gap-4"
                style={{ transform: `translateX(-${resenaIndex * 100}%)` }}>
                {resenas.map((r, i) => (
                  <div key={i} className="flex-none w-full bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                    <p className="text-gray-700 mb-4">{`"${r.mensaje}"`}</p>
                    <h3 className="font-semibold text-lg">{r.nombre}</h3>
                    <span className="text-yellow-500">
                      {"★".repeat(r.estrellas)}{"☆".repeat(5 - r.estrellas)}
                    </span>
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

            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">
              Enviar mensaje
            </button>
          </form>
        </section>

      {/* Botón flotante de contacto */}
<div className="fixed bottom-6 right-6 flex flex-col items-end z-50">

  {/* Opciones del menú */}
  {menuOpen && (
    <div className="flex flex-col gap-4 mb-4 transition-all duration-300">

      {/* WhatsApp */}
      <a 
        href="https://wa.me/529513180462"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32" height="32"
          viewBox="0 0 48 48"
        >
          <path fill="#fff" d="M4.868 43.922L8.2 34.472a19.1 19.1 0 1 1 7.242 7.138z"/>
          <path fill="#fff" d="M24.463 40.803a16.34 16.34 0 1 1 16.34-16.34a16.358 16.358 0 0 1-16.34 16.34"/>
          <path fill="#4caf50" d="M4.868 43.922L8.2 34.472a19.1 19.1 0 1 1 7.242 7.138z"/>
          <path fill="#fafafa" d="M24.463 40.803a16.34 16.34 0 1 1 16.34-16.34a16.358 16.358 0 0 1-16.34 16.34"/>
          <path fill="#4caf50" d="M34.31 28.014c-.52-.26-3.07-1.5-3.55-1.66s-.82-.26-1.17.26s-1.34 1.66-1.64 2s-.6.39-1.11.13a13.3 13.3 0 0 1-3.93-2.42a14.5 14.5 0 0 1-2.73-3.42c-.28-.49 0-.76.21-1a11.2 11.2 0 0 0 .73-1.28s.24-.48 0-.86s-1.17-2.8-1.6-3.84s-.84-.91-1.17-.93h-1a1.91 1.91 0 0 0-1.34.63a5.56 5.56 0 0 0-1.74 4.13a9.7 9.7 0 0 0 .2 1.92a17.65 17.65 0 0 0 3.77 6.92c2.3 2.66 5.58 4.71 8.46 5.5a18.4 18.4 0 0 0 1.92.56a5.3 5.3 0 0 0 2.43.15a4 4 0 0 0 2.61-1.83a3.2 3.2 0 0 0 .22-1.83c-.09-.15-.47-.26-.97-.52"/>
        </svg>
      </a>

      {/* Gmail */}
      <a 
        href="mailto:beecode.mx@gmail.com"
        className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" height="32"
          viewBox="0 0 48 48"
        >
          <path fill="#e75a4d" d="M40 39h-4V23.1L24 31.5 12 23.1V39H8V9l16 12 16-12z"/>
          <path fill="#f2f2f2" d="m24 21l16-12H8z"/>
        </svg>
      </a>

      {/* LinkedIn */}
      <a 
        href="https://linkedin.com/in/eliudgh"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" height="32"
          viewBox="0 0 48 48"
        >
          <path fill="#0288d1" d="M42 4H6a2 2 0 0 0-2 2v36a2 2 0 0 0 2 2h36a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
          <path fill="#fff" d="M12 19h6v17h-6zM15 12a3 3 0 1 1 0 6a3 3 0 0 1 0-6m9 7h6v2.5h.1c.8-1.4 2.8-3 5.9-3c6.3 0 7.5 4.1 7.5 9.4V36h-6V28c0-2-.1-4.7-3-4.7c-3 0-3.5 2.2-3.5 4.5V36h-6z"/>
        </svg>
      </a>

    </div>
  )}

  {/* Botón principal */}
 <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="
    bg-white 
    border-2 border-black 
    p-4 
    rounded-full 
    shadow-md
    hover:shadow-xl 
    transition 
    transform 
    hover:scale-110 
    active:scale-95
  "
>
  <img 
  src="/assets/bee.svg"
  alt="BeeCode Logo"
  className={`
    w-8 h-8
    scale-125
    transition-transform
    ${menuOpen ? "rotate-45 scale-150" : ""}
  `}
/>
</button>


</div>


      </main>
    </>
  );
}
