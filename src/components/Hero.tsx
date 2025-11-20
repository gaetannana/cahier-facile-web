import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-learning.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="AI Learning Pathways"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Personnalisation par IA</span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Votre Parcours d'Apprentissage,{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-ai bg-clip-text text-transparent">
              Optimisé par l'IA
            </span>
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl md:text-2xl">
            POCIA analyse votre progression en temps réel et crée un parcours personnalisé en 
            combinant les meilleurs cours de Coursera, edX et Udemy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/signup" className="group">
              <Button variant="hero" size="lg" className="group">
                Commencer Gratuitement
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const el = document.getElementById("how-it-works");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Découvrir Comment Ça Marche
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">80%+</div>
              <div className="text-sm text-muted-foreground">Pertinence IA</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-3xl font-bold">5000+</div>
              <div className="text-sm text-muted-foreground">Cours Disponibles</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <div className="text-3xl font-bold">{"<"}5s</div>
              <div className="text-sm text-muted-foreground">Génération Parcours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-pulse-slow" />
      <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl animate-pulse-slow" />
    </section>
  );
};
