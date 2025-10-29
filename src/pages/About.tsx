import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Zap, Shield, Award, Heart } from "lucide-react";

const About = () => {
  const stats = [
    { value: "5000+", label: "Cours Disponibles" },
    { value: "80%+", label: "Pertinence IA" },
    { value: "30%", label: "Amélioration Taux Complétion" },
    { value: "<5s", label: "Génération Parcours" },
  ];

  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "Rendre l'apprentissage en ligne plus accessible et efficace grâce à la personnalisation par IA.",
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Créer une plateforme centrée sur les besoins réels des apprenants, qu'ils soient étudiants ou professionnels.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Utiliser les dernières technologies d'intelligence artificielle pour optimiser chaque parcours d'apprentissage.",
    },
    {
      icon: Shield,
      title: "Confiance",
      description: "Garantir la sécurité et la confidentialité des données selon les normes RGPD les plus strictes.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Sélectionner uniquement les meilleurs cours issus des plateformes les plus reconnues.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Croire fermement au pouvoir transformateur de l'éducation accessible à tous.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                À Propos de{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-ai bg-clip-text text-transparent">
                  POCIA
                </span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Plateforme d'Organisation Personnalisée de Cours via IA
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2 text-4xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Notre Histoire
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  POCIA est né d'un constat simple : les plateformes d'apprentissage en ligne offrent 
                  des milliers de cours, mais leur organisation reste statique. Les apprenants se retrouvent 
                  souvent perdus face à ce catalogue immense, suivant des parcours inadaptés à leur niveau 
                  réel et leurs objectifs.
                </p>
                <p>
                  Notre équipe de passionnés d'éducation et d'intelligence artificielle a développé une 
                  solution innovante : utiliser l'IA pour analyser en temps réel la progression de chaque 
                  utilisateur et générer des parcours d'apprentissage véritablement personnalisés.
                </p>
                <p>
                  En intégrant les catalogues de Coursera, edX et Udemy, nous offrons une expérience 
                  unifiée qui adapte dynamiquement les recommandations selon les notes, le temps passé, 
                  et les compétences acquises. Le résultat ? Une amélioration de 30% du taux de complétion 
                  et des apprenants qui atteignent leurs objectifs plus rapidement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Nos Valeurs
              </h2>
              <p className="text-lg text-muted-foreground">
                Les principes qui guident notre mission
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value, index) => (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                L'Équipe
              </h2>
              <p className="text-lg text-muted-foreground">
                Un projet étudiant ambitieux développé sur 6 mois
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                        CP
                      </div>
                      <div>
                        <h3 className="font-semibold">Chef de Projet</h3>
                        <p className="text-sm text-muted-foreground">
                          Coordination et suivi du projet (50% du temps)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-bold">
                        2D
                      </div>
                      <div>
                        <h3 className="font-semibold">Développeurs Full-Stack</h3>
                        <p className="text-sm text-muted-foreground">
                          Backend (Node.js, MongoDB) et Frontend (React)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ai text-ai-foreground font-bold">
                        IA
                      </div>
                      <div>
                        <h3 className="font-semibold">Spécialiste IA</h3>
                        <p className="text-sm text-muted-foreground">
                          Intégration des APIs et algorithmes de recommandation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
                        UX
                      </div>
                      <div>
                        <h3 className="font-semibold">Designer UX</h3>
                        <p className="text-sm text-muted-foreground">
                          Maquettes et expérience utilisateur (Freelance)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
