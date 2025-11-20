import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import aiBrain from "@/assets/ai-brain.png";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export const CTA = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: number; sender: "user" | "ai"; text: string }>>([]);
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(1);

  const cannedResponses = [
    "Super ! Parlez-moi de vos objectifs d'apprentissage.",
    "Je peux vous proposer un parcours personnalisé en fonction de votre niveau.",
    "Quels sont vos domaines préférés ? (ex: Data, Web, IA)",
  ];

  useEffect(() => {
    // scroll to bottom when messages change
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    const userId = idRef.current++;
    setMessages((m) => [...m, { id: userId, sender: "user", text }]);

    // call server proxy to get real AI reply
    setTyping(true);
    const API_URL = (import.meta.env.VITE_CHAT_API_URL as string) || "http://localhost:3001";

    (async () => {
      try {
        const r = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });

        if (!r.ok) {
          throw new Error(`Bad response: ${r.status}`);
        }

        const body = await r.json();
        const reply = body?.reply || cannedResponses[messages.length % cannedResponses.length] || "Je peux vous aider à commencer.";
        const aiId = idRef.current++;
        setMessages((m) => [...m, { id: aiId, sender: "ai", text: reply }]);
      } catch (err) {
        console.error("Chat proxy error", err);
        const aiId = idRef.current++;
        const fallback = cannedResponses[messages.length % cannedResponses.length] || "Je peux vous aider à commencer.";
        setMessages((m) => [...m, { id: aiId, sender: "ai", text: fallback }]);
      } finally {
        setTyping(false);
      }
    })();
  };
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-ai p-1">
          <div className="rounded-3xl bg-card/95 backdrop-blur-sm p-8 md:p-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                  Prêt à Transformer Votre Apprentissage ?
                </h2>
                <p className="mb-8 text-lg text-muted-foreground">
                  Rejoignez des milliers d'apprenants qui ont amélioré leur taux de complétion 
                  de 30% grâce à notre plateforme IA.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row items-start">
                  <Button
                    variant="hero"
                    size="lg"
                    className="group"
                    onClick={() => setChatOpen((v) => !v)}
                  >
                    Commencer Maintenant
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  {/* 'Voir une Démo' retiré volontairement */}
                </div>
                {/* Chat box */}
                {chatOpen && (
                  <div className="mt-6 max-w-xl">
                    <Card>
                      <CardContent>
                        <div className="mb-2 flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">AI</div>
                          <div className="text-sm font-medium">Assistant IA</div>
                          <div className="ml-auto text-xs text-muted-foreground">En ligne</div>
                        </div>

                        <div ref={messagesRef} className="mb-3 max-h-48 overflow-y-auto space-y-2 px-1">
                          {messages.map((m) => (
                            <div
                              key={m.id}
                              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`inline-block max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                                  m.sender === "user"
                                    ? "bg-accent/10 text-accent-foreground"
                                    : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                                }`}
                                role={m.sender === "ai" ? "status" : undefined}
                                aria-live={m.sender === "ai" ? "polite" : undefined}
                              >
                                {m.text}
                              </div>
                            </div>
                          ))}
                          {typing && (
                            <div className="flex items-center">
                              <div className="h-3 w-8 animate-pulse rounded-full bg-muted/60" />
                            </div>
                          )}
                        </div>

                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const fd = new FormData(e.currentTarget as HTMLFormElement);
                            const text = (fd.get("message") as string) || "";
                            if (text.trim()) sendMessage(text.trim());
                            (e.currentTarget as HTMLFormElement).reset();
                          }}
                          className="flex gap-2"
                        >
                          <Input name="message" placeholder="Écrivez un message..." />
                          <Button type="submit">Envoyer</Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    ✓ Gratuit pendant 14 jours
                  </div>
                  <div className="flex items-center gap-1">
                    ✓ Sans carte bancaire
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 backdrop-blur-sm">
                  <img
                    src={aiBrain}
                    alt="AI Brain"
                    className="w-full h-auto animate-float"
                  />
                </div>
                <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />
                <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-secondary/30 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
