import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Clock, Star, Users, Play } from "lucide-react";
import { useState } from "react";

const coursesData = [
  {
    id: 1,
    title: "Machine Learning Complete Bootcamp",
    platform: "Coursera",
    instructor: "Andrew Ng",
    rating: 4.8,
    students: 125000,
    duration: "48h",
    level: "Avancé",
    category: "Informatique",
    price: "Gratuit",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.7,
    students: 89000,
    duration: "32h",
    level: "Débutant",
    category: "Développement Web",
    price: "49.99€",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Data Science Professional Certificate",
    platform: "edX",
    instructor: "Harvard University",
    rating: 4.9,
    students: 156000,
    duration: "60h",
    level: "Intermédiaire",
    category: "Data Science",
    price: "Gratuit",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "Python for Everybody",
    platform: "Coursera",
    instructor: "Dr. Chuck",
    rating: 4.8,
    students: 234000,
    duration: "28h",
    level: "Débutant",
    category: "Programmation",
    price: "Gratuit",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
  },
  {
    id: 5,
    title: "Digital Marketing Masterclass",
    platform: "Udemy",
    instructor: "Phil Ebiner",
    rating: 4.6,
    students: 78000,
    duration: "24h",
    level: "Intermédiaire",
    category: "Marketing",
    price: "39.99€",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
  },
  {
    id: 6,
    title: "Cloud Computing with AWS",
    platform: "edX",
    instructor: "AWS Training",
    rating: 4.7,
    students: 92000,
    duration: "36h",
    level: "Avancé",
    category: "Cloud",
    price: "Gratuit",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
  },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = coursesData.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">
              Catalogue de Cours
            </h1>
            <p className="text-muted-foreground">
              Plus de 5000 cours issus de Coursera, edX et Udemy
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un cours, une catégorie..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          </div>

          {/* Courses Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <Badge className="bg-primary">{course.platform}</Badge>
                      <Button size="sm" className="gap-2">
                        <Play className="h-4 w-4" />
                        Voir
                      </Button>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between">
                    <Badge variant="outline">{course.level}</Badge>
                    <span className="text-sm font-semibold text-primary">{course.price}</span>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{(course.students / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <Button className="mt-4 w-full" variant="outline">
                    Ajouter au Parcours
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                Aucun cours trouvé pour "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
