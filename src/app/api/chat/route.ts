import { NextResponse } from "next/server";

/**
 * Tipos de intención básicos
 */
type FAQ = {
  keywords: string[];
  answers: string[];
};

/**
 * Base de conocimiento
 */
const faqs: FAQ[] = [
  // 👋 SALUDOS
  {
    keywords: ["hola", "buenas", "hey", "qué tal", "que tal"],
    answers: [
      "Hola 👋 Soy el asistente de BeeCode. ¿En qué puedo ayudarte hoy?",
      "¡Qué tal! 😊 Dime, ¿qué te gustaría saber o hacer hoy?"
    ]
  },

  // ⏰ HORARIOS
  {
    keywords: ["horario", "horarios", "abren", "cierran"],
    answers: [
      "Nuestro horario de atención es de lunes a viernes de 9:00 am a 8:00 pm ⏰."
    ]
  },

  // 💼 SERVICIOS
  {
    keywords: ["servicios", "ofrecen", "hacen", "trabajos"],
    answers: [
      "En BeeCode desarrollamos apps web, sistemas a medida, automatización, soporte técnico y asesoría en ciberseguridad 💻.",
      "Ofrecemos soluciones digitales a medida: desarrollo web, sistemas internos y automatización de procesos 🚀."
    ]
  },

  // 💰 PRECIOS / COTIZACIÓN
  {
    keywords: ["precio", "precios", "costo", "cuesta", "cotización", "cotizar"],
    answers: [
      "Cada proyecto es único 🧠. Podemos prepararte una cotización personalizada según lo que necesites.",
      "Los costos dependen del alcance del proyecto. Si gustas, te contactamos por WhatsApp y lo vemos a detalle 😊."
    ]
  },

  // 🚀 INICIO DE PROYECTO
  {
    keywords: ["empezar", "iniciar", "proyecto", "contratar", "cita", "agendar"],
    answers: [
      "¡Excelente! 🚀 ¿Qué tipo de proyecto tienes en mente?",
      "Perfecto 👍 Cuéntame un poco sobre el proyecto que quieres desarrollar."
    ]
  },

  // 🧑‍💻 SOPORTE
  {
    keywords: ["soporte", "ayuda", "problema", "error", "falla"],
    answers: [
      "Claro 👍 Cuéntame qué problema estás teniendo y vemos cómo ayudarte.",
      "Entiendo, dime un poco más del inconveniente para orientarte mejor 🛠️."
    ]
  },

  // 📍 UBICACIÓN
  {
    keywords: ["ubicación", "direccion", "donde", "ubicados"],
    answers: [
      "Trabajamos principalmente de forma remota 💻, pero atendemos proyectos locales y nacionales."
    ]
  },

  // 📱 CONTACTO
  {
    keywords: ["whatsapp", "contacto", "hablar", "mensaje"],
    answers: [
      "Puedes escribirnos directamente por WhatsApp 📲 y un asesor te atenderá de inmediato.",
      "Si prefieres, podemos continuar la conversación por WhatsApp 😊."
    ]
  },

  // 🤖 IDENTIDAD
  {
    keywords: ["eres", "quien", "chatbot", "bot"],
    answers: [
      "Soy el asistente virtual de BeeCode 🤖. Estoy aquí para ayudarte con información rápida y orientarte."
    ]
  }
];

/**
 * Respuestas fallback (cuando no entiende)
 * No suenan robóticas ni cortantes
 */
const fallbackResponses = [
  "Interesante 🤔 ¿podrías contarme un poco más?",
  "No tengo ese dato exacto, pero dime más y te ayudo con gusto 😊.",
  "Entiendo 👍 ¿me das un poco más de contexto?",
  "Puedo orientarte mejor si me das un poco más de detalle 👌."
];

/**
 * Utilidad para respuesta aleatoria
 */
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message: string = body?.message?.trim();

    if (!message) {
      return NextResponse.json({
        reply: "¿Podrías escribir tu pregunta nuevamente? 🙂"
      });
    }

    const text = message.toLowerCase();

    const match = faqs.find(faq =>
      faq.keywords.some(keyword => text.includes(keyword))
    );

    const reply = match
      ? pickRandom(match.answers)
      : pickRandom(fallbackResponses);

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({
      reply: "Ups 😅 ocurrió un error. Intenta nuevamente."
    });
  }
}
