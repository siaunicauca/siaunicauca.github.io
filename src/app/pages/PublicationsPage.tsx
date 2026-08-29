import { useRef, useEffect, useState } from "react";
import { FileText, ExternalLink, Filter } from "lucide-react";
import { StarField } from "../components/StarField";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

type PubType = "Todos" | "Conferencias" | "Tesis";

interface Publication {
  year: string;
  title: string;
  authors: string;
  venue: string;
  type: Exclude<PubType, "Todos">;
  doi?: string;
  url?: string;
  abstract?: string;
}

const SSEA_VENUE =
  "5.º Simposio sobre Actividades Educativas Espaciales (SSEA 2026) — Technische Universität München, Múnich, Alemania";

const publications: Publication[] = [
  {
    year: "2026",
    title: "Design, Simulation, and Experimental Validation of a Multi-Stage Water-Propelled Rocket",
    authors: "Semillero de Ingeniería Aeroespacial SIA — Universidad del Cauca",
    venue: SSEA_VENUE,
    type: "Conferencias",
    url: "https://mediatum.ub.tum.de/1857970?show_id=1857636",
    abstract:
      "Diseño conceptual, simulación y validación experimental de un cohete hidropropulsado multietapa desarrollado en el semillero, presentado como póster científico en el V Simposio SSEA.",
  },
  {
    year: "2026",
    title: "Robotics Fun: Learning STEM through the Play",
    authors: "Semillero de Ingeniería Aeroespacial SIA — Universidad del Cauca",
    venue: SSEA_VENUE,
    type: "Conferencias",
    url: "https://mediatum.ub.tum.de/1857970?show_id=1857605",
    abstract:
      "Propuesta pedagógica para el aprendizaje de las áreas STEM a través de actividades robóticas lúdicas, presentada como ponencia oral en el V Simposio SSEA.",
  },
  {
    year: "2020",
    title: "Diseño Conceptual y Preliminar de un Vehículo Aéreo No Tripulado para uso Agrícola",
    authors: "José Luis Figueroa Medicis, María Edith Montenegro Gutiérrez",
    venue: "Tesis de pregrado — Ingeniería Física, Universidad del Cauca",
    type: "Tesis",
  },
];

export function PublicationsPage() {
  const [activeFilter, setActiveFilter] = useState<PubType>("Todos");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const filters: PubType[] = ["Todos", "Conferencias", "Tesis"];
  const filtered = activeFilter === "Todos"
    ? publications
    : publications.filter((p) => p.type === activeFilter);

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
        <StarField density={80} />
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              color: "rgba(245,197,24,0.4)",
              fontSize: "0.95rem",
              marginBottom: "0.75rem",
            }}
          >
            Fig. 2 — Registro Bibliográfico · Semillero SIA
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
            PUBLICACIONES
            <span style={{ color: "#F5C518" }}> Y PAPERS</span>
          </h1>
          <p style={{ color: "#CCCCCC", fontSize: "1rem", lineHeight: 1.8, maxWidth: "580px", margin: "0 auto" }}>
            Producción científica del semillero: artículos presentados en
            conferencias internacionales y trabajos de grado.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem" }}>
        {/* Stats banner */}
        <FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              background: "rgba(245,197,24,0.1)",
              marginBottom: "3rem",
            }}
            className="pub-stats"
          >
            {[
              { num: "2", label: "Publicaciones" },
              { num: "1", label: "Tesis de Grado" },
              { num: "2026", label: "Última Publicación" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#111111",
                  padding: "1.5rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#F5C518",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#888",
                    marginTop: "0.2rem",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={100}>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Filter size={14} color="#888" style={{ marginRight: "0.25rem" }} />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  background: activeFilter === f ? "#F5C518" : "transparent",
                  color: activeFilter === f ? "#000" : "#999",
                  border: activeFilter === f ? "1px solid #F5C518" : "1px solid rgba(255,255,255,0.12)",
                  padding: "0.4rem 1rem",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Publications list */}
        <div>
          {filtered.map((pub, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  padding: "1.75rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  display: "grid",
                  gridTemplateColumns: "70px 1fr auto",
                  gap: "2rem",
                  alignItems: "start",
                  background: hoveredRow === i ? "rgba(245,197,24,0.03)" : "transparent",
                  transition: "background 0.2s",
                  cursor: "default",
                }}
                className="pub-row"
              >
                {/* Year */}
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#F5C518",
                    paddingTop: "0.1rem",
                  }}
                >
                  {pub.year}
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <span
                      style={{
                        background:
                          pub.type === "Conferencias"
                            ? "rgba(100,180,255,0.12)"
                            : "rgba(200,100,255,0.12)",
                        color: pub.type === "Conferencias" ? "#80c8ff" : "#cc80ff",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        padding: "0.2rem 0.5rem",
                        flexShrink: 0,
                        marginTop: "0.2rem",
                      }}
                    >
                      {pub.type}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      margin: 0,
                      marginBottom: "0.4rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {pub.title}
                  </h3>
                  <div
                    style={{
                      color: "#888",
                      fontSize: "0.82rem",
                      marginBottom: "0.3rem",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {pub.authors}
                  </div>
                  <div
                    style={{
                      color: "#666",
                      fontSize: "0.82rem",
                      fontStyle: "italic",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {pub.venue}
                  </div>
                  {pub.abstract && (
                    <p
                      style={{
                        color: "#999",
                        fontSize: "0.82rem",
                        lineHeight: 1.7,
                        margin: "0.75rem 0 0",
                        maxWidth: "62ch",
                      }}
                    >
                      {pub.abstract}
                    </p>
                  )}
                  {pub.doi && (
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.7rem",
                        color: "rgba(245,197,24,0.45)",
                        marginTop: "0.4rem",
                      }}
                    >
                      DOI: {pub.doi}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flexShrink: 0 }}>
                  {pub.doi || pub.url ? (
                    <a
                      href={pub.doi ? `https://doi.org/${pub.doi}` : pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        color: "#F5C518",
                        border: "1px solid rgba(245,197,24,0.35)",
                        padding: "0.4rem 0.75rem",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        transition: "all 0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "#F5C518";
                        el.style.color = "#000";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "transparent";
                        el.style.color = "#F5C518";
                      }}
                    >
                      <ExternalLink size={11} /> {pub.doi ? "DOI" : "Ver publicación"}
                    </a>
                  ) : (
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        color: "#666",
                        border: "1px solid rgba(255,255,255,0.08)",
                        padding: "0.4rem 0.75rem",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        background: "none",
                        cursor: "not-allowed",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <FileText size={11} /> PDF
                    </button>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom note */}
        <FadeIn delay={200}>
          <div
            style={{
              marginTop: "3rem",
              padding: "1.5rem",
              background: "rgba(245,197,24,0.04)",
              border: "1px solid rgba(245,197,24,0.12)",
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <FileText size={18} color="#F5C518" style={{ marginTop: "0.1rem", flexShrink: 0 }} />
            <div>
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: "#F5C518",
                  fontSize: "0.9rem",
                  marginBottom: "0.3rem",
                }}
              >
                Nota bibliográfica — Fig. 2.1
              </div>
              <p style={{ color: "#888", fontSize: "0.82rem", margin: 0, lineHeight: 1.6 }}>
                Para solicitar copias de preprints, pósteres o reportes técnicos, escriba a nuestro correo
                institucional. Los trabajos presentados en el V Simposio SSEA 2026 están disponibles en el
                repositorio mediaTUM de la Technische Universität München.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        .pub-stats {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 600px) {
          .pub-stats { grid-template-columns: 1fr !important; }
          .pub-row { grid-template-columns: 1fr !important; gap: 0.5rem !important; }
        }
      `}</style>
    </div>
  );
}
