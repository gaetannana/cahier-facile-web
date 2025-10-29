import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, Target, TrendingUp, Users, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "IA Personnalisée",
    description: "Notre algorithme analyse votre progression, vos notes et compétences pour recommander le meilleur parcours.",
    gradient: "from-primary to-primary-glow",
  },
  {
    icon: Zap,
    title: "Recommandations Rapides",
    description: "Obtenez un parcours mis à jour en moins de 5 secondes grâce à notre technologie optimisée.",
    gradient: "from-ai to-primary",
  },
  {
    icon: Target,
    title: "Multi-Plateformes",
    description: "Accédez à plus de 5000 cours provenant de Coursera, edX et Udemy en un seul endroit.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: TrendingUp,
    title: "Suivi de Progression",
    description: "Visualisez votre évolution avec des dashboards interactifs et des statistiques détaillées.",
    gradient: "from-accent to-secondary",
  },
  {
    icon: Users,
    title: "Adapté à Tous",
    description: "Parfait pour étudiants, professionnels en reconversion ou apprentissage continu.",
    gradient: "from-primary to-ai",
  },
  {
    icon: Shield,
    title: "Sécurisé & Conforme",
    description: "Vos données sont protégées selon les normes RGPD avec chiffrement complet.",
    gradient: "from-success to-ai",
  },
];

export const Features = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Pourquoi Choisir <span className="text-primary">POCIA</span> ?
          </h2>
          <p className="text-lg text-muted-foreground">
            Une plateforme complète qui révolutionne la façon dont vous apprenez en ligne
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} shadow-md`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
              <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
