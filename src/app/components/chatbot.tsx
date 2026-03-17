"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { suggestedQuestions } from "../data/suggestedQuestions";
import { MessageSquare, X, Send, RotateCcw, Bot } from "lucide-react";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
      {/* Botón flotante Estilo Figma */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 left-6 w-16 h-16 rounded-full bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all z-[9999] flex items-center justify-center border border-white/20"
          >
            <MessageSquare size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana de Chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-6 w-[350px] h-[520px] bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden z-[9999]"
          >
            {/* Header Pro */}
            <div className="px-6 py-5 flex justify-between items-center border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                  <Bot size={22} />
                </div>
                <div>
                  <p className="font-bold text-sm text-white tracking-wide">
                    Eliud AI
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">En línea</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenedor de Mensajes */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
            >
              {/* Botón Reset */}
              {messages.length > 0 && (
                <button
                  onClick={resetChat}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-blue-400 hover:text-cyan-400 mb-4 transition-colors"
                >
                  <RotateCcw size={12} /> Reiniciar conversación
                </button>
              )}

              {/* Estado Inicial: Preguntas sugeridas */}
              {messages.length === 0 && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
                    Consultas rápidas:
                  </p>
                  <div className="space-y-2">
                    {suggestedQuestions.map((q, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => ask(q)}
                        className="w-full text-left px-4 py-3 rounded-xl border border-white/5 bg-white/5 text-sm text-slate-300 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all flex justify-between items-center group"
                      >
                        <span className="group-hover:text-white">{q}</span>
                        <Send size={14} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Burbujas de Mensaje */}
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    m.from === "user"
                      ? "ml-auto bg-blue-600 text-white shadow-lg shadow-blue-600/20 rounded-tr-none"
                      : "bg-white/10 text-slate-200 border border-white/10 rounded-tl-none"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
            </div>

            {/* Input Área Pro */}
            <div className="p-4 bg-white/5 border-t border-white/5">
              <div className="flex gap-2 items-center bg-[#0b0b0c] border border-white/10 rounded-2xl p-2 focus-within:border-blue-500/50 transition-colors">
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
                  placeholder="Escribe tu duda..."
                  className="flex-1 resize-none max-h-24 bg-transparent px-3 py-2 text-sm text-white focus:outline-none placeholder:text-slate-600"
                />

                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-500 transition-all disabled:opacity-30 disabled:hover:bg-blue-600"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[9px] text-slate-500 text-center mt-3 uppercase tracking-tighter">
                Tecnología GPT-4o · Eliud
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}