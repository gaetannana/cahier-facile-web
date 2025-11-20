import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import aiBrain from "@/assets/ai-brain.png";

export const CTA = () => {
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
                    onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
                  >
                    Commencer Maintenant
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">✓ Gratuit pendant 14 jours</div>
                  <div className="flex items-center gap-1">✓ Sans carte bancaire</div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 backdrop-blur-sm">
                  <img src={aiBrain} alt="AI Brain" className="w-full h-auto animate-float" />
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

export default CTA;
