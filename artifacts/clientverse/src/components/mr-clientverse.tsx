import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type Action = "lead_captured" | "suggest_booking" | undefined;

function getPageLabel(path: string): string {
  const map: Record<string, string> = {
    "/": "Homepage",
    "/services": "Services page",
    "/about": "About page",
    "/features": "Capabilities page",
    "/pricing": "Pricing page",
    "/contact": "Contact page",
    "/case-studies": "Case Studies page",
    "/blog": "Blog / Insights page",
    "/insights": "Insights page",
    "/resources": "Resources page",
    "/podcasts": "Podcasts page",
    "/videos": "Videos page",
  };
  return map[path] ?? "Website";
}

export default function MrClientVerse() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello. I'm Mr. ClientVerse — your guide to our operational systems and services. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<Action>(undefined);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages([...updatedMessages, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    setAction(undefined);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          pageContext: getPageLabel(location),
        }),
      });

      const data = await res.json();
      const reply =
        data.reply ?? "I'm having trouble connecting right now. Please try again.";

      setMessages([...updatedMessages, { role: "assistant", content: reply }]);

      if (data.action === "lead_captured") {
        setLeadCaptured(true);
        setAction("lead_captured");
      } else if (data.action === "suggest_booking") {
        setAction("suggest_booking");
      }
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] flex flex-col"
            style={{
              background: "#0e1e35",
              border: "1px solid rgba(74,196,224,0.2)",
              borderRadius: "16px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
              height: "520px",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(74,196,224,0.15)" }}
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-md text-sm font-bold flex-shrink-0"
                style={{ background: "#4AC4E0", color: "#0A1628" }}
              >
                CV
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold leading-tight">
                  Mr. ClientVerse
                </p>
                <p className="text-xs leading-tight" style={{ color: "#4AC4E0" }}>
                  {leadCaptured ? "Lead Captured ✓" : "Systems Guide"}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded"
                aria-label="Close chat"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
              style={{ minHeight: 0 }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] text-sm leading-relaxed px-3 py-2 rounded-2xl whitespace-pre-wrap"
                    style={
                      msg.role === "user"
                        ? {
                            background: "#4AC4E0",
                            color: "#0A1628",
                            borderBottomRightRadius: "4px",
                          }
                        : {
                            background: "#132038",
                            color: "#e2e8f0",
                            borderBottomLeftRadius: "4px",
                          }
                    }
                  >
                    {msg.content || (
                      <span className="flex gap-1 items-center py-0.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Action Cards */}
              <AnimatePresence>
                {action === "lead_captured" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl px-4 py-3 text-sm"
                    style={{
                      background: "rgba(74,196,224,0.1)",
                      border: "1px solid rgba(74,196,224,0.3)",
                    }}
                  >
                    <p className="font-semibold text-white mb-1">
                      ✓ You're on our radar
                    </p>
                    <p className="text-gray-400 text-xs mb-2">
                      Your details have been sent to our team. We'll be in touch shortly.
                    </p>
                    <a
                      href="https://calendly.com/clientverse/strategy-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-90"
                      style={{ background: "#4AC4E0", color: "#0A1628" }}
                    >
                      Book Your Revenue Audit →
                    </a>
                  </motion.div>
                )}

                {action === "suggest_booking" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl px-4 py-3 text-sm"
                    style={{
                      background: "rgba(74,196,224,0.08)",
                      border: "1px solid rgba(74,196,224,0.25)",
                    }}
                  >
                    <p className="font-semibold text-white mb-1">
                      Ready to find your revenue leak?
                    </p>
                    <p className="text-gray-400 text-xs mb-2">
                      A free 30-minute Revenue Audit maps your gaps, puts a dollar value on each one, and gives you a written report within 48 hours.
                    </p>
                    <a
                      href="https://calendly.com/clientverse/strategy-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-90"
                      style={{ background: "#4AC4E0", color: "#0A1628" }}
                    >
                      Book Your Revenue Audit →
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-3 py-3 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(74,196,224,0.15)" }}
            >
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{
                  background: "#132038",
                  border: "1px solid rgba(74,196,224,0.2)",
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about our services…"
                  disabled={loading}
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg transition-all disabled:opacity-30"
                  style={{ background: "#4AC4E0", color: "#0A1628" }}
                  aria-label="Send"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: open ? "#132038" : "#4AC4E0",
          border: "2px solid rgba(74,196,224,0.4)",
          boxShadow: "0 8px 32px rgba(74,196,224,0.3)",
        }}
        aria-label={open ? "Close chat" : "Open Mr. ClientVerse chat"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4AC4E0"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="#0A1628"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
