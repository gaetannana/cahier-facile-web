import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  Target, 
  BookOpen, 
  Award,
  ArrowRight,
  Sparkles
} from "lucide-react";

const Dashboard = () => {
  const userProgress = {
    currentCourses: 3,
    completedCourses: 12,
    totalHours: 48,
    averageScore: 85,
  };

  const recommendedCourses = [
    {
      title: "Advanced Machine Learning",
      platform: "Coursera",
      progress: 65,
      nextModule: "Neural Networks Deep Dive",
      difficulty: "Avancé",
      estimatedHours: 8,
    },
    {
      title: "Web Development Bootcamp",
      platform: "Udemy",
      progress: 40,
      nextModule: "React Hooks & Context",
      difficulty: "Intermédiaire",
      estimatedHours: 12,
    },
    {
      title: "Data Science Fundamentals",
      platform: "edX",
      progress: 20,
      nextModule: "Statistical Analysis",
      difficulty: "Débutant",
      estimatedHours: 6,
    },
  ];

  const aiInsights = [
    {
      type: "strength",
      message: "Excellent progrès en programmation Python ! Continuez sur cette lancée.",
    },
    {
      type: "suggestion",
      message: "Nous vous recommandons de renforcer vos compétences en statistiques.",
    },
    {
      type: "achievement",
      message: "Vous avez atteint 85% de taux de complétion ce mois-ci !",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">
              Tableau de Bord
            </h1>
            <p className="text-muted-foreground">
              Suivez votre progression et découvrez vos recommandations personnalisées
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Cours en Cours</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userProgress.currentCourses}</div>
                <p className="text-xs text-muted-foreground">+2 ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Cours Terminés</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userProgress.completedCourses}</div>
                <p className="text-xs text-muted-foreground">Depuis le début</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Heures Totales</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userProgress.totalHours}h</div>
                <p className="text-xs text-muted-foreground">Ce mois-ci</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Score Moyen</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userProgress.averageScore}%</div>
                <p className="text-xs text-success">+5% ce mois</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Insights */}
              <Card className="border-2 border-ai/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-ai" />
                    Analyses IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiInsights.map((insight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg bg-muted/50 p-3"
                    >
                      <Sparkles className="h-5 w-5 text-ai mt-0.5" />
                      <p className="text-sm">{insight.message}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recommended Courses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Votre Parcours Recommandé
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendedCourses.map((course, index) => (
                    <div
                      key={index}
                      className="rounded-lg border p-4 transition-all hover:shadow-md"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{course.title}</h3>
                          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{course.platform}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {course.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progression</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Prochain: {course.nextModule}
                        </span>
                        <span className="text-muted-foreground">
                          ~{course.estimatedHours}h
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actions Rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Explorer les Cours
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Brain className="mr-2 h-4 w-4" />
                    Actualiser Parcours IA
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Award className="mr-2 h-4 w-4" />
                    Voir Certificats
                  </Button>
                </CardContent>
              </Card>

              {/* Learning Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Objectifs du Mois</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>Heures d'apprentissage</span>
                      <span className="font-medium">48/60h</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>Modules complétés</span>
                      <span className="font-medium">12/15</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>Quiz réussis</span>
                      <span className="font-medium">8/10</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
