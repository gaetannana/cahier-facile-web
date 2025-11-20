import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(express.json());

// Simple CORS headers for local development (adjust for production)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

const PORT = process.env.PORT || 3001;

// Health check
app.get("/health", (req, res) => {
  const ok = true;
  const openaiConfigured = !!process.env.OPENAI_API_KEY;
  res.json({ ok, openaiConfigured });
});

// Simple in-memory cache for course queries (key -> { ts, data })
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

// Helper to cache results
function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCached(key, data) {
  cache.set(key, { ts: Date.now(), data });
}

// Courses endpoint: source=udemy|coursera|edx, query=...
app.get("/api/courses", async (req, res) => {
  try {
    const { source = "coursera", query = "" } = req.query;
    const q = String(query || "").trim();
    const src = String(source || "coursera").toLowerCase();

    // Aggregator: use RapidAPI if configured, otherwise return a small fallback set
    if (src === "aggregator") {
      const cacheKeyAgg = `aggregator:${q}`;
      const cachedAgg = getCached(cacheKeyAgg);
      if (cachedAgg) return res.json({ source: "aggregator", query: q, cached: true, results: cachedAgg });

      const rapidKey = process.env.RAPIDAPI_KEY;
      const rapidHost = process.env.RAPIDAPI_HOST;
      const rapidPath = process.env.RAPIDAPI_PATH || "/search";

      if (rapidKey && rapidHost) {
        try {
          const base = `https://${rapidHost}${rapidPath}`;
          const sep = base.includes("?") ? "&" : "?";
          const url = `${base}${sep}q=${encodeURIComponent(q)}&limit=12`;
          const headers = {
            "X-RapidAPI-Key": rapidKey,
            "X-RapidAPI-Host": rapidHost,
            "Accept": "application/json",
          };
          const r = await fetch(url, { headers });
          const txt = await r.text();
          if (!r.ok) {
            console.error("RapidAPI error", r.status, txt);
            return res.status(502).json({ error: "RapidAPI error", detail: txt });
          }
          const data = JSON.parse(txt);
          const items = data.results || data.courses || data.items || data.data || [];
          const results = (items || []).map((c, idx) => ({
            id: c.id || c.courseId || `agg-${Date.now()}-${idx}`,
            title: c.title || c.name || c.course_name || "Untitled",
            platform: c.platform || c.source || c.provider || "Agrégateur",
            instructor: c.instructor || c.provider || undefined,
            rating: c.rating || c.avg_rating || undefined,
            students: c.students || c.learner_count || undefined,
            duration: c.duration || undefined,
            level: c.level || undefined,
            category: c.category || c.subject || undefined,
            price: c.price || c.cost || "Gratuit",
            image: c.image || c.photo || c.thumbnail || undefined,
          }));
          setCached(cacheKeyAgg, results);
          return res.json({ source: "aggregator", query: q, results });
        } catch (e) {
          console.error("Aggregator RapidAPI fetch failed", e);
          // fallthrough to fallback
        }
      }

      // Fallback generic courses when no RapidAPI config
      const fallback = [
        {
          id: `agg-fallback-1`,
          title: `Introduction à l'IA (Agrégateur)` ,
          platform: "Class Central",
          instructor: "Various",
          rating: 4.5,
          students: 42000,
          duration: "20h",
          level: "Débutant",
          category: "Intelligence Artificielle",
          price: "Gratuit",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
        },
        {
          id: `agg-fallback-2`,
          title: "Full-Stack Web Development (Agrégateur)",
          platform: "Class Central",
          instructor: "Multiple",
          rating: 4.6,
          students: 98000,
          duration: "40h",
          level: "Intermédiaire",
          category: "Développement Web",
          price: "49.99€",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
        },
        {
          id: `agg-fallback-3`,
          title: "Data Science Essentials (Agrégateur)",
          platform: "Class Central",
          instructor: "University Partners",
          rating: 4.7,
          students: 76000,
          duration: "30h",
          level: "Intermédiaire",
          category: "Data Science",
          price: "Gratuit",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
        },
      ];
      setCached(cacheKeyAgg, fallback);
      return res.json({ source: "aggregator", query: q, results: fallback });
    }

    // Allow aggregator source without a query (it can return fallback results)
    if (!q && src !== "aggregator") return res.status(400).json({ error: "Missing query parameter" });

    const cacheKey = `${src}:${q}`;
    const cached = getCached(cacheKey);
    if (cached) return res.json({ source: src, query: q, cached: true, results: cached });

    if (src === "udemy") {
      // Udemy API requires client_id:client_secret basic auth
      const clientId = process.env.UDEMY_CLIENT_ID;
      const clientSecret = process.env.UDEMY_CLIENT_SECRET;
      if (!clientId || !clientSecret) return res.status(500).json({ error: "Udemy credentials not configured (UDEMY_CLIENT_ID/UDEMY_CLIENT_SECRET)" });

      const url = `https://www.udemy.com/api-2.0/courses/?page_size=12&search=${encodeURIComponent(q)}`;
      const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
      const r = await fetch(url, { headers: { Authorization: `Basic ${basic}` } });
      const text = await r.text();
      if (!r.ok) {
        console.error("Udemy error", r.status, text);
        return res.status(502).json({ error: "Udemy error", detail: text });
      }
      const data = JSON.parse(text);
      const results = (data.results || data.courses || []).map((c) => ({
        id: c.id,
        title: c.title || c.name,
        platform: "Udemy",
        instructor: c.visible_instructors ? c.visible_instructors.map(i=>i.display_name).join(', ') : undefined,
        rating: c.avg_rating || c.rating,
        students: c.num_subscribers || undefined,
        duration: undefined,
        level: c.level || undefined,
        category: c.primary_subcategory ? c.primary_subcategory.title : undefined,
        price: c.is_paid ? c.price_detail?.amount : "Gratuit",
        image: c.image_480x270 || c.image || undefined,
      }));
      setCached(cacheKey, results);
      return res.json({ source: src, query: q, results });
    }

    if (src === "coursera") {
      // Coursera has a public catalog API for course search
      const url = `https://api.coursera.org/api/courses.v1?q=search&query=${encodeURIComponent(q)}&limit=12&fields=name,photo,partnerIds,primaryLanguages`;
      const r = await fetch(url);
      const text = await r.text();
      if (!r.ok) {
        console.error("Coursera error", r.status, text);
        return res.status(502).json({ error: "Coursera error", detail: text });
      }
      const data = JSON.parse(text);
      const results = (data.elements || []).map((c) => ({
        id: c.id,
        title: c.name,
        platform: "Coursera",
        instructor: undefined,
        rating: undefined,
        students: undefined,
        duration: undefined,
        level: undefined,
        category: undefined,
        price: "Variable",
        image: c.photo || undefined,
      }));
      setCached(cacheKey, results);
      return res.json({ source: src, query: q, results });
    }

    if (src === "edx") {
      // edX: requires an API endpoint or key; support configurable EDX_API_URL
      const edxUrl = process.env.EDX_API_URL;
      if (!edxUrl) return res.status(500).json({ error: "edX API URL not configured (EDX_API_URL)" });
      const url = `${edxUrl.replace(/\/$/,"")}/catalog/v1/courses?query=${encodeURIComponent(q)}&page_size=12`;
      const r = await fetch(url, { headers: { Authorization: process.env.EDX_API_KEY ? `Bearer ${process.env.EDX_API_KEY}` : undefined } });
      const text = await r.text();
      if (!r.ok) {
        console.error("edX error", r.status, text);
        return res.status(502).json({ error: "edX error", detail: text });
      }
      const data = JSON.parse(text);
      const results = (data.items || data.results || []).map((c) => ({
        id: c.key || c.id,
        title: c.title || c.name,
        platform: "edX",
        instructor: c.org || undefined,
        rating: undefined,
        students: undefined,
        duration: undefined,
        level: undefined,
        category: c.subjects ? c.subjects[0] : undefined,
        price: c.price || "Gratuit",
        image: c.image ? c.image.src : undefined,
      }));
      setCached(cacheKey, results);
      return res.json({ source: src, query: q, results });
    }

    return res.status(400).json({ error: "Unknown source" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Missing message" });

      console.log("[proxy] incoming message:", message);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "OPENAI_API_KEY not configured" });

    const payload = {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      max_tokens: 512,
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const textResp = await r.text();
    if (!r.ok) {
      console.error("OpenAI error", r.status, textResp);
      return res.status(502).json({ error: "OpenAI error", detail: textResp });
    }

    let data;
    try {
      data = JSON.parse(textResp);
    } catch (e) {
      console.error("Failed to parse OpenAI response", e, textResp);
      return res.status(502).json({ error: "Invalid OpenAI response", detail: textResp });
    }

    console.log("[proxy] OpenAI response choices:", data?.choices);

    // Attempt to extract assistant reply
    const reply = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || "Désolé, je n'ai pas de réponse.";

    return res.json({ reply, raw: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Chat proxy listening on http://localhost:${PORT}`);
});
