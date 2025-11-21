import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Star, Users, Play } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
const defaultCourses = [
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

// Curated Unsplash images (free to use via Unsplash license) used as course thumbnails
const unsplashImages = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=800&q=80&auto=format&fit=crop",
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingAggregator, setLoadingAggregator] = useState(false);

  const [courses, setCourses] = useState(() => {
    try {
      const raw = localStorage.getItem("pocia_courses");
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      return defaultCourses;
    } catch {
      return defaultCourses;
    }
  });

  const saveCourses = (next: any) => {
    setCourses(next);
    try {
      localStorage.setItem("pocia_courses", JSON.stringify(next));
    } catch (e) {
      // ignore
    }
  };

  // Comments are stored in localStorage under `pocia_comments` as a map: { [courseId]: Comment[] }
  // Comment: { id, name, text, rating, ts }
  const COMMENTS_KEY = "pocia_comments";
  const [commentsMap, setCommentsMap] = useState<Record<string, any[]>>(() => {
    try {
      const raw = localStorage.getItem(COMMENTS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const saveCommentsMap = (next: Record<string, any[]>) => {
    setCommentsMap(next);
    try {
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(next));
    } catch (e) {
      // ignore
    }
  };

  const getCommentsFor = (courseId: any) => {
    return commentsMap[String(courseId)] || [];
  };

  const addCommentFor = (courseId: any, comment: { name: string; text: string; rating: number }) => {
    const id = `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const next = { id, name: comment.name, text: comment.text, rating: comment.rating || 0, ts: Date.now() };
    const key = String(courseId);
    const arr = Array.isArray(commentsMap[key]) ? [...commentsMap[key], next] : [next];
    const updated = { ...commentsMap, [key]: arr };
    saveCommentsMap(updated);
  };

  const computeAverageRating = (course: any) => {
    const courseBase = typeof course?.rating === "number" ? course.rating : (parseFloat(String(course?.rating || "0")) || 0);
    const comments = getCommentsFor(course.id);
    if (!comments || comments.length === 0) return courseBase || undefined;
    const sum = comments.reduce((s: number, c: any) => s + (Number(c.rating) || 0), 0);
    const avgComments = sum / comments.length;
    // Give equal weight to course base and comments if base exists
    if (courseBase && courseBase > 0) return Number(((courseBase + avgComments) / 2).toFixed(1));
    return Number(avgComments.toFixed(1));
  };

  // Local UI state for open comment panels and form values
  const [openCommentsFor, setOpenCommentsFor] = useState<string | null>(null);
  const [commentForm, setCommentForm] = useState<{ name: string; text: string; rating: number }>({ name: "", text: "", rating: 5 });

  const filteredCourses = courses.filter((course: any) => {
    const title = (course.title || "").toString().toLowerCase();
    const category = (course.category || "").toString().toLowerCase();
    const q = searchQuery.toLowerCase();
    return title.includes(q) || category.includes(q);
  });

  // Removed manual reset and add-course UI per request.

  const clearAll = () => {
    // keep function for internal use if needed, but not exposed in UI
    saveCourses(defaultCourses);
  };

  // Auto-load aggregator courses on mount and ensure at least 30 courses
  useEffect(() => {
    (async () => {
      // try aggregator silently
      await importFromAggregator(true);
      // normalize images for existing courses, then ensure we have 30 courses locally
      normalizeCourseImages();
      ensureThirtyCourses(30);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const importFromAggregator = async (suppressToast = false) => {
    try {
      setLoadingAggregator(true);
      const q = (searchQuery || "").trim();
      const url = `/api/courses?source=aggregator&query=${encodeURIComponent(q)}`;
      const r = await fetch(url);
      const data = await r.json();
      if (!r.ok) {
        console.error("Aggregator error", data);
        if (!suppressToast) toast({ title: "Erreur", description: (data && data.error) || "Échec de l'import depuis l'agrégateur" });
        return;
      }
      const items = data.results || [];
      if (!Array.isArray(items) || items.length === 0) {
        if (!suppressToast) toast({ title: "Aucun résultat", description: "Aucun cours trouvé depuis l'agrégateur." });
        return;
      }

      const normalized = items.map((c: any, idx: number) => ({
        id: c.id || `agg-${Date.now()}-${idx}`,
        title: c.title || c.name || "Untitled",
        platform: c.platform || c.source || "Agrégateur",
        instructor: c.instructor || c.provider || undefined,
        rating: c.rating || undefined,
        students: c.students || undefined,
        duration: c.duration || undefined,
        level: c.level || undefined,
        category: c.category || undefined,
        price: c.price || "Gratuit",
        image: c.image || undefined,
      }));

      // Merge + dedupe by title|platform
      const map = new Map();
      courses.forEach((c: any) => map.set(`${(c.title||"")}|${(c.platform||"")}`, c));
      normalized.forEach((c: any) => map.set(`${(c.title||"")}|${(c.platform||"")}`, c));
      const merged = Array.from(map.values());
      saveCourses(merged);
      if (!suppressToast) toast({ title: "Import terminé", description: `+${normalized.length} cours ajoutés depuis l'agrégateur.` });
    } catch (err) {
      console.error("Import aggregator failed", err);
      if (!suppressToast) toast({ title: "Erreur", description: String(err) });
    } finally {
      setLoadingAggregator(false);
    }
  };


  const openCourse = (course: any) => {
    try {
      const title = String(course?.title || "").trim();
      const q = encodeURIComponent(title);

      // allow explicit external url on the course object
      if (course?.externalUrl && typeof course.externalUrl === "string" && course.externalUrl.length > 0) {
        window.open(course.externalUrl, "_blank", "noopener,noreferrer");
        return;
      }

      const platform = String(course?.platform || "").toLowerCase();
      let url = "";
      if (platform.includes("coursera")) {
        url = `https://www.coursera.org/search?query=${q}`;
      } else {
        // default: open a W3Schools search for the course title
        url = `https://www.w3schools.com/search/?q=${q}`;
      }
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      console.error("openCourse failed", e);
    }
  };

  // Ensure every course has an image; if missing, assign a seeded picsum image and persist
  const normalizeCourseImages = () => {
    try {
      const current = Array.isArray(courses) ? courses : [];
      let changed = false;
      const mapped = current.map((c: any, idx: number) => {
        if (c.image && typeof c.image === "string" && c.image.length > 0) return c;
        changed = true;
        // Prefer unsplash images when normalizing, using a seeded selection
        const unsplash = unsplashImages[idx % unsplashImages.length];
        const seed = encodeURIComponent(String(c.id || c.title || idx));
        const fallback = `https://picsum.photos/seed/${seed}/400/250`;
        return { ...c, image: unsplash || fallback };
      });
      if (changed) saveCourses(mapped);
    } catch (e) {
      console.error("Failed to normalize course images", e);
    }
  };

  // Generate generic courses to reach `count` total courses if needed
  const ensureThirtyCourses = (count: number) => {
    try {
      const current = Array.isArray(courses) ? courses : [];
      const toAdd = Math.max(0, count - current.length);
      if (toAdd <= 0) return;

      const platforms = ["Coursera", "Udemy", "edX", "Class Central"];
      const instructors = ["Dr. Martin", "Prof. Dupont", "Sophie Martin", "Alexandre Moreau", "Team Instructors"];
      const categories = ["Informatique", "Data Science", "Développement Web", "Marketing", "Cloud", "Programmation"];
      const levels = ["Débutant", "Intermédiaire", "Avancé"];

      const generated: any[] = [];

      // collect available images from current courses to reuse
      const availableImages = current.map((c: any) => c?.image).filter(Boolean);

      for (let i = 0; i < toAdd; i++) {
        const idx = current.length + i + 1;
        const platform = platforms[i % platforms.length];
        const instructor = instructors[i % instructors.length];
        const category = categories[i % categories.length];
        const level = levels[i % levels.length];
        const rating = +(3.8 + ((i % 20) * 0.06)).toFixed(1);
        const students = 500 + (i * 120);

        // Prefer reusing existing images; otherwise use curated Unsplash list, then picsum fallback
        const reuseImage = availableImages.length > 0 ? availableImages[i % availableImages.length] : null;
        const unsplash = unsplashImages[i % unsplashImages.length];
        const imageUrl = reuseImage || unsplash || `https://picsum.photos/seed/gen-${idx}-${i}/400/250`;

        generated.push({
          id: `gen-${Date.now()}-${i}`,
          title: `Cours Générique ${idx} - ${category}`,
          platform,
          instructor,
          rating,
          students,
          duration: `${8 + (i % 40)}h`,
          level,
          category,
          price: i % 3 === 0 ? "Gratuit" : `${(19.99 + (i % 5) * 5).toFixed(2)}€`,
          image: imageUrl,
        });
      }

      const next = [...generated, ...current];
      saveCourses(next);
    } catch (e) {
      console.error("Failed to generate courses", e);
    }
  };

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

          {/* Search, Filter & Actions */}
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
              <div className="text-sm text-muted-foreground">Les cours sont chargés automatiquement.</div>
          </div>

          {/* Courses Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.image || `https://picsum.photos/seed/${encodeURIComponent(String(course.id || course.title))}/400/250`}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <Badge className="bg-primary">{course.platform}</Badge>
                      <Button size="sm" className="gap-2" onClick={() => openCourse(course)} aria-label={`Voir ${course.title}`}>
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
                  <CardTitle className="line-clamp-2 text-lg cursor-pointer" onClick={() => openCourse(course)}>
                    {course.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium">{computeAverageRating(course) ?? course.rating}</span>
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
                  <Button
                    className="mt-4 w-full"
                    variant="outline"
                    onClick={() => {
                      try {
                        window.dispatchEvent(new CustomEvent("add-to-cart", { detail: course }));
                      } catch (e) {
                        console.error("add-to-cart dispatch failed", e);
                      }
                    }}
                  >
                    Ajouter au Parcours
                  </Button>
                  {/* Comments / Ratings toggle */}
                  <div className="mt-3">
                    <button
                      className="text-sm text-muted-foreground hover:text-primary"
                      onClick={() => {
                        const id = String(course.id);
                        setOpenCommentsFor(openCommentsFor === id ? null : id);
                        if (openCommentsFor !== id) setCommentForm({ name: "", text: "", rating: 5 });
                      }}
                    >
                      {getCommentsFor(course.id).length} commentaire(s)
                    </button>

                    {openCommentsFor === String(course.id) && (
                      <div className="mt-3 border-t pt-3">
                        <div className="space-y-2">
                          {getCommentsFor(course.id).length === 0 && (
                            <div className="text-sm text-muted-foreground">Pas encore de commentaires pour ce cours.</div>
                          )}
                          {getCommentsFor(course.id).map((c: any) => (
                            <div key={c.id} className="bg-white/5 p-2 rounded">
                              <div className="flex items-center justify-between">
                                <div className="font-medium">{c.name || 'Anonyme'}</div>
                                <div className="text-sm text-muted-foreground">{new Date(c.ts).toLocaleString()}</div>
                              </div>
                              <div className="flex items-center gap-1 text-sm mt-1">
                                <Star className="h-4 w-4 fill-accent text-accent" />
                                <span className="font-medium">{c.rating}</span>
                              </div>
                              <div className="text-sm mt-1">{c.text}</div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 grid gap-2">
                          <input className="input input-sm p-2 border rounded" placeholder="Votre nom" value={commentForm.name} onChange={(e) => setCommentForm({...commentForm, name: e.target.value})} />
                          <textarea className="input input-sm p-2 border rounded" placeholder="Votre commentaire" value={commentForm.text} onChange={(e) => setCommentForm({...commentForm, text: e.target.value})} />
                          <div className="flex items-center gap-2">
                            <label className="text-sm">Note :</label>
                            <select value={commentForm.rating} onChange={(e) => setCommentForm({...commentForm, rating: Number(e.target.value)})} className="p-1 border rounded text-sm">
                              <option value={5}>5</option>
                              <option value={4}>4</option>
                              <option value={3}>3</option>
                              <option value={2}>2</option>
                              <option value={1}>1</option>
                            </select>
                          </div>
                          <div className="flex gap-2">
                            <button
                              className="px-3 py-1 bg-primary text-white rounded"
                              onClick={() => {
                                if (!commentForm.text || commentForm.text.trim().length < 2) {
                                  try { toast({ title: 'Erreur', description: 'Le commentaire est trop court.' }); } catch {}
                                  return;
                                }
                                addCommentFor(course.id, commentForm);
                                setCommentForm({ name: '', text: '', rating: 5 });
                              }}
                            >
                              Envoyer
                            </button>
                            <button className="px-3 py-1 border rounded" onClick={() => setOpenCommentsFor(null)}>Fermer</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
