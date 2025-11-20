import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { X, MessageSquare } from "lucide-react";

type Msg = { id: number; sender: "user" | "ai"; text: string };

const STORAGE_KEY = "pocia_chat_messages";

export const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Msg[]) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const idRef = useRef(messages.length + 1);
  const listRef = useRef<HTMLDivElement | null>(null);

  // When the widget is closed, clear messages and localStorage
  useEffect(() => {
    if (!open) {
      setMessages([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        // ignore
      }
      idRef.current = 1;
    }
  }, [open]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat", handler as EventListener);
    return () => window.removeEventListener("open-chat", handler as EventListener);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const API_URL = (import.meta.env.VITE_CHAT_API_URL as string) || "http://localhost:3001";

  // If you want to use the real OpenAI proxy, set VITE_USE_REAL_CHAT=true in your .env
  const useRealChat = (import.meta.env.VITE_USE_REAL_CHAT as string) === "true";

  const cannedResponses = [
    "Super ! Parlez-moi de vos objectifs d'apprentissage.",
    "Je peux vous proposer un parcours personnalisé en fonction de votre niveau.",
    "Quels sont vos domaines préférés ? (ex: Data, Web, IA)",
    "Commencez par me dire votre niveau actuel et je vous recommande un parcours.",
  ];

  const send = async (text: string) => {
    const userMsg: Msg = { id: idRef.current++, sender: "user", text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);

    if (useRealChat) {
      try {
        const r = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        if (!r.ok) throw new Error("Bad response");
        const body = await r.json();
        const reply = body?.reply || cannedResponses[messages.length % cannedResponses.length] || "Désolé, je n'ai pas de réponse.";
        const aiMsg: Msg = { id: idRef.current++, sender: "ai", text: String(reply).trim() };
        setMessages((m) => [...m, aiMsg]);
      } catch (err) {
        console.error("Chat error", err);
        const aiMsg: Msg = { id: idRef.current++, sender: "ai", text: "Désolé, le service est indisponible pour le moment." };
        setMessages((m) => [...m, aiMsg]);
      } finally {
        setLoading(false);
      }
    } else {
      // Local canned response simulation
      const delay = 700 + Math.random() * 800;
      setTimeout(() => {
        const reply = cannedResponses[messages.length % cannedResponses.length] || "Je peux vous aider à commencer.";
        const aiMsg: Msg = { id: idRef.current++, sender: "ai", text: reply };
        setMessages((m) => [...m, aiMsg]);
        setLoading(false);
      }, delay);
    }
  };

  return (
    <>
      {/* Floating bubble */}
      <button
        aria-label={open ? "Fermer chat" : "Ouvrir chat"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-full transition-all ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <Card>
          <CardContent className="p-3">
            <div className="mb-2 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center font-semibold">AI</div>
              <div className="flex-1 text-sm font-medium">Assistant POCIA</div>
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={listRef} className="mb-3 max-h-60 overflow-y-auto space-y-2 px-1">
              {messages.length === 0 && (
                <div className="text-sm text-muted-foreground">Bonjour 👋 — posez une question pour commencer.</div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                      m.sender === "user"
                        ? "bg-accent/10 text-accent-foreground"
                        : "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center">
                  <div className="h-3 w-10 animate-pulse rounded-full bg-muted/60" />
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const text = (fd.get("message") as string) || "";
                if (!text.trim()) return;
                (e.currentTarget as HTMLFormElement).reset();
                send(text.trim());
              }}
              className="flex gap-2"
            >
              <Input name="message" placeholder="Écrivez un message..." />
              <Button type="submit" disabled={loading}>
                Envoyer
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ChatWidget;
