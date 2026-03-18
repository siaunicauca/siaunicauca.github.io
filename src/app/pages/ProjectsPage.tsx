import { useRef, useEffect, useState } from "react";
import { ArrowRight, CheckCircle, Clock, Zap } from "lucide-react";
import { StarField } from "../components/StarField";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

type StatusType = "Activo" | "Completado" | "En Pausa";

const projects = [
  {
    id: 1,
    title: "ASTRA-1: CubeSat de Observación Terrestre",
    status: "Activo" as StatusType,
    category: "Satélites",
    fig: "Fig. 3a",
    image: "https://images.unsplash.com/photo-1770370419338-f9a813302baa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBzcGFjZWNyYWZ0JTIwb3JiaXQlMjBlYXJ0aHxlbnwxfHx8fDE3NzE2Mjg2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Diseño y construcción de un CubeSat formato 1U para observación terrestre en órbita baja. El proyecto incluye el desarrollo del subsistema de comunicaciones, potencia y determinación de actitud.",
    team: ["Torres, F.", "López, J.", "Gómez, S."],
    duration: "2024 — Presente",
    tags: ["CubeSat", "LEO", "Electrónica", "GNC"],
    progress: 45,
  },
  {
    id: 2,
    title: "AeroOpt: Optimización Aerodinámica de UAV de Ala Fija",
    status: "Activo" as StatusType,
    category: "Aerodinámica",
    fig: "Fig. 3b",
    image: "https://images.unsplash.com/photo-1769986515211-40bca134a0fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMFVBViUyMGZsaWdodCUyMHRlc3QlMjBvdXRkb29yfGVufDF8fHx8MTc3MTYyODY1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Optimización de la geometría alar de un UAV para aplicaciones de monitoreo ambiental en zonas de alta montaña. Se aplican técnicas de diseño por gradiente combinadas con evaluaciones CFD de alta fidelidad.",
    team: ["García, L.", "Pérez, A.", "Rivera, K."],
    duration: "2024 — Presente",
    tags: ["CFD", "UAV", "Optimización", "OpenFOAM"],
    progress: 68,
  },
  {
    id: 3,
    title: "ProSolid: Motor Cohete Sólido para Sondeo Atmosférico",
    status: "Activo" as StatusType,
    category: "Propulsión",
    fig: "Fig. 3c",
    image: "https://images.unsplash.com/photo-1600115352168-970e7f6e911f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJvc3BhY2UlMjByb2NrZXQlMjBsYXVuY2glMjBuaWdodCUyMGRhcmslMjBza3l8ZW58MXx8fHwxNzcxNjI4NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Desarrollo y caracterización de un motor cohete de propelente sólido para lanzar cargas científicas a 10 km de altitud. Incluye diseño de tobera, análisis de estabilidad dinámica y sistema de recuperación.",
    team: ["Martínez, C.", "Rodríguez, M.", "Vargas, D."],
    duration: "2023 — Presente",
    tags: ["Propulsión", "Sólido", "Sondeo", "Recuperación"],
    progress: 80,
  },
  {
    id: 4,
    title: "WindTest: Campaña de Ensayos en Túnel de Viento",
    status: "Completado" as StatusType,
    category: "Experimental",
    fig: "Fig. 3d",
    image: "https://images.unsplash.com/photo-1764675903774-336e6ef8d09c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwdHVubmVsJTIwYWVyb2R5bmFtaWNzJTIwdGVzdCUyMGFlcm9zcGFjZXxlbnwxfHx8fDE3NzE2Mjg2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Campaña experimental de medición de fuerzas aerodinámicas sobre 6 perfiles NACA a diferentes ángulos de ataque y números de Reynolds. Los datos sirven como base de validación para nuestros códigos CFD.",
    team: ["García, L.", "Torres, F.", "Pérez, A."],
    duration: "2023 — 2024",
    tags: ["Experimental", "NACA", "Tunnel", "Validación"],
    progress: 100,
  },
  {
    id: 5,
    title: "CompStruct: Análisis de Fatiga en Laminados CFRP",
    status: "Completado" as StatusType,
    category: "Materiales",
    fig: "Fig. 3e",
    image: "https://images.unsplash.com/photo-1756751579863-49b26247e1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDRkQlMjBjb21wdXRhdGlvbmFsJTIwZmx1aWQlMjBkeW5hbWljcyUyMHNpbXVsYXRpb24lMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3MTYyODY1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Caracterización experimental de la resistencia a la fatiga de laminados de fibra de carbono con diferentes secuencias de apilamiento. Se generaron curvas S-N para uso en diseño estructural aeroespacial.",
    team: ["Vargas, D.", "Roa, M."],
    duration: "2022 — 2023",
    tags: ["CFRP", "Fatiga", "Materiales", "S-N"],
    progress: 100,
  },
  {
    id: 6,
    title: "EarthVision: Análisis Multiespectral para Agricultura",
    status: "En Pausa" as StatusType,
    category: "Percepción Remota",
    fig: "Fig. 3f",
    image: "https://images.unsplash.com/photo-1705727210721-961cc64a6895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJvc3BhY2UlMjBlbmdpbmVlcmluZyUyMHN0dWRlbnQlMjB1bml2ZXJzaXR5JTIwbGFifGVufDF8fHx8MTc3MTYyODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Desarrollo de algoritmos de clasificación de cobertura terrestre usando imágenes Sentinel-2 y modelos de deep learning. Aplicación enfocada en agricultura de precisión en el altiplano cundiboyacense.",
    team: ["Rivera, K.", "Gómez, S."],
    duration: "2023 — En Pausa",
    tags: ["ML", "Sentinel-2", "Agricultura", "Python"],
    progress: 35,
  },
];

const statusConfig = {
  "Activo": { color: "#22c55e", bg: "rgba(34,197,94,0.12)", icon: <Zap size={11} /> },
  "Completado": { color: "#F5C518", bg: "rgba(245,197,24,0.12)", icon: <CheckCircle size={11} /> },
  "En Pausa": { color: "#888", bg: "rgba(136,136,136,0.12)", icon: <Clock size={11} /> },
};

export function ProjectsPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
        <StarField density={100} />
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              color: "rgba(245,197,24,0.4)",
              fontSize: "0.95rem",
              marginBottom: "0.75rem",
            }}
          >
            Fig. 3 — Registro de Proyectos · Semillero SIA
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
            NUESTROS
            <span style={{ color: "#F5C518" }}> PROYECTOS</span>
          </h1>
          <p style={{ color: "#CCCCCC", fontSize: "1rem", lineHeight: 1.8, maxWidth: "580px", margin: "0 auto" }}>
            Investigación aplicada en aerodinámica, propulsión, satélites y percepción remota.
            Cada proyecto combina teoría, simulación y validación experimental.
          </p>
        </div>
      </div>

      {/* Projects grid */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "2rem",
          }}
          className="projects-grid"
        >
          {projects.map((project, i) => {
            const status = statusConfig[project.status];
            const isHovered = hoveredCard === project.id;
            return (
              <FadeIn key={project.id} delay={i * 80}>
                <div
                  onMouseEnter={() => setHoveredCard(project.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(245,197,24,0.1)",
                    overflow: "hidden",
                    transition: "all 0.35s ease",
                    boxShadow: isHovered ? "0 12px 48px rgba(245,197,24,0.12)" : "none",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(0.6) saturate(0.8)",
                        transition: "transform 0.4s ease",
                        transform: isHovered ? "scale(1.04)" : "scale(1)",
                      }}
                    />
                    {/* Yellow hover overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(245,197,24,0.08)",
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.3s",
                      }}
                    />
                    {/* Gradient */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "80px",
                        background: "linear-gradient(transparent, rgba(17,17,17,0.98))",
                      }}
                    />
                    {/* Status badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        background: status.bg,
                        border: `1px solid ${status.color}`,
                        color: status.color,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "0.3rem 0.6rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      {status.icon} {project.status}
                    </div>
                    {/* Category */}
                    <div
                      style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        background: "rgba(10,10,10,0.8)",
                        color: "#F5C518",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        padding: "0.25rem 0.6rem",
                      }}
                    >
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "1.75rem" }}>
                    <div
                      style={{
                        fontFamily: "'Caveat', cursive",
                        color: "rgba(245,197,24,0.35)",
                        fontSize: "0.78rem",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {project.fig}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        margin: 0,
                        marginBottom: "0.8rem",
                        lineHeight: 1.35,
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        color: "#999",
                        fontSize: "0.85rem",
                        lineHeight: 1.7,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: "rgba(245,197,24,0.06)",
                            border: "1px solid rgba(245,197,24,0.15)",
                            color: "#888",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.62rem",
                            letterSpacing: "0.08em",
                            padding: "0.2rem 0.5rem",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div style={{ marginBottom: "1.25rem" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "0.4rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.65rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#666",
                          }}
                        >
                          Progreso
                        </span>
                        <span
                          style={{
                            fontFamily: "'Caveat', cursive",
                            fontSize: "0.85rem",
                            color: "#F5C518",
                          }}
                        >
                          {project.progress}%
                        </span>
                      </div>
                      <div
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          height: "3px",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            background: project.progress === 100 ? "#F5C518" : "linear-gradient(90deg, #F5C518, #E8A800)",
                            height: "100%",
                            width: `${project.progress}%`,
                            transition: "width 1s ease",
                          }}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "1rem",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.6rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#555",
                            marginBottom: "0.2rem",
                          }}
                        >
                          Equipo
                        </div>
                        <div style={{ color: "#888", fontSize: "0.78rem" }}>
                          {project.team.join(", ")}
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: "'Caveat', cursive",
                          color: "rgba(245,197,24,0.4)",
                          fontSize: "0.8rem",
                        }}
                      >
                        {project.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
