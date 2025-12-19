"use client";

import { useState, useRef, useEffect } from "react";
import { suggestedQuestions } from "../data/suggestedQuestions";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  /* Auto resize textarea */
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [input]);

  async function ask(question: string) {
    setMessages(prev => [...prev, { from: "user", text: question }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question }),
    });

    const data = await res.json();
    setMessages(prev => [...prev, { from: "bot", text: data.reply }]);
  }

  function sendMessage() {
    if (!input.trim()) return;
    ask(input);
    setInput("");
  }

  function resetChat() {
    setMessages([]);
    setInput("");
  }

  return (
    <>
      {/* Botón flotante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed bottom-6 left-6
            w-14 h-14 rounded-full
            bg-[var(--primary)]
            text-white
            shadow-xl
            hover:scale-105
            transition
            z-[9999]
            flex items-center justify-center
            text-xl
          "
        >
          💬
        </button>
      )}

      {/* Chat */}
      {open && (
        <div
           className="
    fixed bottom-6 left-6
    w-80
    h-[460px]           /* 🔒 ALTURA FIJA */
    bg-[var(--background)]
    text-[var(--foreground)]
    rounded-2xl
    shadow-2xl
    border border-black/10
    flex flex-col
    overflow-hidden
    z-[9999]
  "
>
          {/* Header */}
          <div className="px-4 py-3 flex justify-between items-center border-b bg-white/80 backdrop-blur">
            <div>
              <p className="font-semibold text-sm text-black">
                Asistente BeeCode
              </p>
              <span className="text-xs text-green-600">● En línea</span>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-black transition"
            >
              ✕
            </button>
          </div>

          {/* Contenido */}
          <div className="flex-1 bg-gray-50 overflow-y-auto px-4 py-3 space-y-4 text-sm">
            {/* Botón volver */}
            {messages.length > 0 && (
              <button
                onClick={resetChat}
                className="text-xs text-[var(--primary)] hover:underline"
              >
                ← Volver a preguntas
              </button>
            )}

            {/* Preguntas sugeridas */}
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-xs text-white">
                  Preguntas frecuentes:
                </p>

              <div className="space-y-2">
  {suggestedQuestions.map((q, i) => (
    <button
      key={i}
      onClick={() => ask(q)}
      className="
        w-full
        text-left
        px-4 py-3
        rounded-lg
        border
        bg-white
        text-sm
        text-gray-800
        hover:border-[var(--primary)]
        hover:bg-blue-50/50
        transition
        flex justify-between items-center
      "
    >
      <span>{q}</span>
      <span className="text-gray-400">→</span>
    </button>
  ))}
</div>

              </div>
            )}

            {/* Mensajes */}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[75%] px-3 py-2 rounded-xl leading-snug ${
                  m.from === "user"
                    ? "ml-auto bg-[var(--primary)] text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t bg-white p-3">
            <div className="flex gap-2 items-end">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Escribe tu mensaje…"
                className="
                  flex-1
                  resize-none
                  max-h-32
                  border
                  rounded-lg
                  px-3 py-2
                  text-sm
                  text-black
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[var(--primary)]
                "
              />

              <button
                onClick={sendMessage}
                className="
                  bg-[var(--primary)]
                  text-white
                  px-4 py-2
                  rounded-lg
                  hover:opacity-90
                  transition
                "
              >
                →
              </button>
            </div>

            <p className="text-[10px] text-gray-400 mt-1">
              Enter para enviar · Shift + Enter para salto de línea
            </p>
          </div>
        </div>
      )}
    </>
  );
}
