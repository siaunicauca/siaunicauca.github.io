import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { StarField } from "../components/StarField";

import coverImg from "../../media/Bienvenida/welcom1.jpeg";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.07 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

type Category = "Todos" | "Evento" | "Conferencia" | "Laboratorio" | "Simulación" | "Premio" | "Publicación";

interface NewsItem {
  id: number;
  image: string;
  category: Exclude<Category, "Todos">;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  featured: boolean;
  readTime: string;
  slug: string;
}

const news: NewsItem[] = [
  {
    id: 1,
    image: coverImg,
    category: "Evento",
    title: "Semillero de Ingeniería Aeroespacial SIA es presentado oficialmente ante la comunidad académica de la Universidad del Cauca",
    excerpt:
      "El 5 de diciembre de 2025 se llevó a cabo la presentación oficial del Semillero de Ingeniería Aeroespacial SIA ante la comunidad académica de la Universidad del Cauca, en un evento realizado en el auditorio principal de la Facultad de Ciencias Naturales, Exactas y de la Educación (FACNED), marcando un hito tras obtener su reconocimiento oficial por parte de la Vicerrectoría de Investigaciones (VRI).",
    date: "5 Diciembre, 2025",
    author: "Semillero SIA",
    featured: true,
    readTime: "6 min",
    slug: "presentacion-oficial-sia-2025",
  },
];

const categoryColors: Record<Category, { bg: string; text: string; border: string }> = {
  Todos:       { bg: "rgba(245,197,24,0.1)",   text: "#F5C518", border: "rgba(245,197,24,0.3)" },
  Evento:      { bg: "rgba(100,180,255,0.1)",  text: "#64b4ff", border: "rgba(100,180,255,0.3)" },
  Conferencia: { bg: "rgba(100,180,255,0.1)",  text: "#64b4ff", border: "rgba(100,180,255,0.3)" },
  Laboratorio: { bg: "rgba(34,197,94,0.1)",    text: "#22c55e", border: "rgba(34,197,94,0.3)" },
  Simulación:  { bg: "rgba(200,100,255,0.1)",  text: "#c864ff", border: "rgba(200,100,255,0.3)" },
  Premio:      { bg: "rgba(245,197,24,0.12)",  text: "#F5C518", border: "rgba(245,197,24,0.4)" },
  Publicación: { bg: "rgba(255,150,50,0.1)",   text: "#ff9632", border: "rgba(255,150,50,0.3)" },
};

export function NewsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("Todos");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filters: Category[] = ["Todos", "Evento"];
  const filtered = activeFilter === "Todos" ? news : news.filter((n) => n.category === activeFilter);
  const featured = filtered.filter((n) => n.featured);
  const regular = filtered.filter((n) => !n.featured);

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", paddingTop: "72px" }}>

      {/* Page hero */}
      <div
        style={{
          position: "relative",
          padding: "5rem 2rem 4rem",
          borderBottom: "1px solid rgba(245,197,24,0.1)",
          overflow: "hidden",
        }}
      >
        <StarField density={90} />
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Caveat', cursive", color: "rgba(245,197,24,0.4)", fontSize: "0.95rem", marginBottom: "0.75rem" }}>
            Fig. 5 — Registro Cronológico · Semillero SIA
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: 0,
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            NOTICIAS DEL
            <span style={{ color: "#F5C518" }}> SEMILLERO</span>
          </h1>
          <p style={{ color: "#CCCCCC", fontSize: "1rem", lineHeight: 1.8, maxWidth: "580px", margin: "0 auto" }}>
            Logros, eventos y avances del Semillero de Ingeniería Aeroespacial SIA.
            Nuestra trayectoria hacia las estrellas, documentada.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "4rem 2rem" }}>

        {/* Filter pills */}
        <FadeIn>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            {filters.map((f) => {
              const col = categoryColors[f];
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    background: isActive ? col.bg : "transparent",
                    color: isActive ? col.text : "#888",
                    border: isActive ? `1px solid ${col.border}` : "1px solid rgba(255,255,255,0.1)",
                    padding: "0.4rem 1rem",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Featured news */}
        {featured.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(245,197,24,0.5)",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ width: "30px", height: "1px", background: "rgba(245,197,24,0.4)", display: "block" }} />
              Destacado
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1.5rem",
                maxWidth: "760px",
              }}
            >
              {featured.map((item) => {
                const col = categoryColors[item.category];
                const isHovered = hoveredCard === item.id;
                return (
                  <FadeIn key={item.id}>
                    <div
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        background: "#111111",
                        border: "1px solid rgba(245,197,24,0.12)",
                        borderLeft: "4px solid #F5C518",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.3s",
                        boxShadow: isHovered ? "0 12px 40px rgba(245,197,24,0.1)" : "none",
                        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      }}
                    >
                      <div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter: "brightness(0.65)",
                            transform: isHovered ? "scale(1.03)" : "scale(1)",
                            transition: "transform 0.4s",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "80px",
                            background: "linear-gradient(transparent, rgba(17,17,17,0.97))",
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "1rem",
                            left: "1rem",
                            background: col.bg,
                            border: `1px solid ${col.border}`,
                            color: col.text,
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            padding: "0.25rem 0.6rem",
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div style={{ padding: "1.75rem", flex: 1 }}>
                        <h3
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            margin: 0,
                            marginBottom: "0.8rem",
                            lineHeight: 1.35,
                          }}
                        >
                          {item.title}
                        </h3>
                        <p style={{ color: "#999", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                          {item.excerpt}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: "1rem",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            flexWrap: "wrap",
                            gap: "0.75rem",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                color: "#666",
                                fontFamily: "'Caveat', cursive",
                                fontSize: "0.85rem",
                              }}
                            >
                              <Calendar size={12} color="rgba(245,197,24,0.5)" /> {item.date}
                            </span>
                            <span style={{ color: "#555", fontSize: "0.78rem" }}>{item.readTime} lectura</span>
                          </div>
                          <Link
                            to={`/noticias/${item.slug}`}
                            style={{
                              color: "#F5C518",
                              textDecoration: "none",
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontSize: "0.75rem",
                              letterSpacing: "0.06em",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              border: "1px solid rgba(245,197,24,0.3)",
                              padding: "0.35rem 0.85rem",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(245,197,24,0.08)";
                              e.currentTarget.style.borderColor = "rgba(245,197,24,0.6)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.borderColor = "rgba(245,197,24,0.3)";
                            }}
                          >
                            Leer más <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular news grid */}
        {regular.length > 0 && (
          <>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(245,197,24,0.4)",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ width: "30px", height: "1px", background: "rgba(245,197,24,0.3)", display: "block" }} />
              Más Noticias
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.5rem",
              }}
              className="news-grid"
            >
              {regular.map((item, i) => {
                const col = categoryColors[item.category];
                const isHovered = hoveredCard === item.id;
                return (
                  <FadeIn key={item.id} delay={i * 80}>
                    <div
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        background: "#111111",
                        border: "1px solid rgba(245,197,24,0.08)",
                        overflow: "hidden",
                        transition: "all 0.3s",
                        boxShadow: isHovered ? "0 8px 32px rgba(245,197,24,0.08)" : "none",
                        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                      }}
                    >
                      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter: "brightness(0.6)",
                            transform: isHovered ? "scale(1.04)" : "scale(1)",
                            transition: "transform 0.4s",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "60px",
                            background: "linear-gradient(transparent, rgba(17,17,17,0.97))",
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "0.75rem",
                            left: "0.75rem",
                            background: col.bg,
                            border: `1px solid ${col.border}`,
                            color: col.text,
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.58rem",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            padding: "0.2rem 0.5rem",
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div style={{ padding: "1.5rem" }}>
                        <h4
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            margin: 0,
                            marginBottom: "0.6rem",
                            lineHeight: 1.4,
                          }}
                        >
                          {item.title}
                        </h4>
                        <p style={{ color: "#888", fontSize: "0.82rem", lineHeight: 1.65, marginBottom: "1rem" }}>
                          {item.excerpt.substring(0, 100)}...
                        </p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span
                            style={{
                              fontFamily: "'Caveat', cursive",
                              color: "rgba(245,197,24,0.4)",
                              fontSize: "0.82rem",
                            }}
                          >
                            {item.date}
                          </span>
                          <Link
                            to={`/noticias/${item.slug}`}
                            style={{
                              color: "#F5C518",
                              textDecoration: "none",
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontSize: "0.7rem",
                              letterSpacing: "0.06em",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                            }}
                          >
                            Leer más <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "5rem 2rem", color: "#555" }}>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              Sin resultados para esta categoría
            </div>
            <button
              onClick={() => setActiveFilter("Todos")}
              style={{
                background: "none",
                border: "1px solid rgba(245,197,24,0.3)",
                color: "#F5C518",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.72rem",
                marginTop: "1rem",
              }}
            >
              Ver todas
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .news-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
