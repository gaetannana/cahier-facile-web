import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Search, Sparkles, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "1. Créez Votre Profil",
    description: "Renseignez vos objectifs d'apprentissage, votre niveau actuel et vos préférences.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Search,
    title: "2. Explorez les Cours",
    description: "Parcourez notre catalogue de 5000+ cours issus des meilleures plateformes.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Sparkles,
    title: "3. L'IA Analyse",
    description: "Notre intelligence artificielle évalue vos compétences et génère un parcours personnalisé.",
    color: "text-ai",
    bg: "bg-ai/10",
  },
  {
    icon: Rocket,
    title: "4. Progressez Rapidement",
    description: "Suivez votre parcours optimisé et atteignez vos objectifs 30% plus rapidement.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Comment Ça <span className="text-primary">Fonctionne</span> ?
          </h2>
          <p className="text-lg text-muted-foreground">
            Un processus simple en 4 étapes pour transformer votre apprentissage
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${step.bg}`}>
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 z-10">
                  <div className="h-0.5 w-8 bg-gradient-to-r from-primary to-secondary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
