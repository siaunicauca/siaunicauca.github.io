import { useRef, useEffect, useState } from "react";
import { Wind, Satellite, Layers, Cpu } from "lucide-react";
import { StarField } from "../components/StarField";
import { SectionHeader } from "../components/SectionHeader";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const researchAreas = [
  {
    icon: <Wind size={36} />,
    title: "Diseño, Construcción y Simulación de Sistemas Aeroespaciales",
    subtitle: "Diseño & Simulación",
    fig: "Fig. 1a",
    description:
      "Desarrollo integral de sistemas aeroespaciales desde el diseño conceptual hasta la construcción de prototipos y validación mediante simulaciones computacionales avanzadas.",
    topics: ["Diseño de cohetes", "Simulación CFD", "Prototipado", "Nanosatélites", "Análisis estructural"],
    color: "#F5C518",
    annotation: "Diseño · Construcción · Simulación",
  },
  {
    icon: <Cpu size={36} />,
    title: "Inteligencia Artificial y Sistemas Dinámicos en Aeroespacial",
    subtitle: "IA & Sistemas Dinámicos",
    fig: "Fig. 1b",
    description:
      "Aplicación de técnicas de inteligencia artificial y modelado de sistemas dinámicos para la resolución de problemas complejos en el ámbito aeroespacial.",
    topics: ["Machine Learning", "Redes neuronales", "Modelado dinámico", "Optimización", "Procesamiento de datos"],
    color: "#E8A800",
    annotation: "IA · Modelado · Optimización",
  },
  {
    icon: <Satellite size={36} />,
    title: "Automatización y Control de Procesos Aeroespaciales",
    subtitle: "Control & Automatización",
    fig: "Fig. 1c",
    description:
      "Diseño e implementación de sistemas de control y automatización para procesos y vehículos en el ámbito aeroespacial, incluyendo guía, navegación y control.",
    topics: ["Control PID/LQR", "Sistemas autónomos", "GNC", "Hardware-in-the-loop", "Rovers autónomos"],
    color: "#F5C518",
    annotation: "Control · GNC · Automatización",
  },
  {
    icon: <Layers size={36} />,
    title: "Instrumentación y Sensores para el Sector Aeroespacial",
    subtitle: "Sensores & Instrumentación",
    fig: "Fig. 1d",
    description:
      "Desarrollo y aplicación de instrumentación y sensores especializados para la adquisición de datos en entornos aeroespaciales exigentes.",
    topics: ["Sensores IMU", "Telemetría", "Adquisición de datos", "Sistemas embebidos", "Calibración"],
    color: "#E8A800",
    annotation: "Sensores · Telemetría · Datos",
  },
];

function PatentDiagram({ fig }: { fig: string }) {
  return (
    <svg width="100%" height="120" viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Grid */}
      <g opacity="0.08">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="300" y2={i * 20} stroke="#F5C518" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="120" stroke="#F5C518" strokeWidth="0.5" />
        ))}
      </g>
      {/* Airfoil cross-section */}
      <path
        d="M30 60 C60 30 120 25 200 55 C240 68 260 70 270 60 C260 55 240 50 200 45 C120 30 60 45 30 60Z"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        fill="none"
        opacity="0.35"
      />
      {/* Flow lines */}
      {[25, 35, 45, 55, 65, 75, 85].map((y, i) => (
        <path
          key={i}
          d={`M10 ${y} C50 ${y + (y < 60 ? -8 : 8)} 150 ${y + (y < 60 ? -4 : 4)} 290 ${y}`}
          stroke="#F5C518"
          strokeWidth="0.5"
          strokeDasharray={y === 60 ? "none" : "3 4"}
          fill="none"
          opacity="0.2"
        />
      ))}
      {/* Annotation */}
      <text x="10" y="115" fill="#F5C518" fontSize="9" fontFamily="'Caveat', cursive" opacity="0.5">{fig}</text>
      <line x1="150" y1="55" x2="150" y2="20" stroke="#F5C518" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.3" />
      <text x="153" y="18" fill="#F5C518" fontSize="8" fontFamily="'Caveat', cursive" opacity="0.4">α</text>
    </svg>
  );
}

export function ResearchPage() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", paddingTop: "72px" }}>
      {/* Page hero */}
      <div
        style={{
          position: "relative",
          padding: "5rem 2rem 4rem",
          background: "#0A0A0A",
          overflow: "hidden",
          borderBottom: "1px solid rgba(245,197,24,0.1)",
        }}
      >
        <StarField density={100} />
        {/* Coordinate axes decor */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <line x1="0" y1="200" x2="1440" y2="200" stroke="#F5C518" strokeWidth="0.4" strokeDasharray="6 8" opacity="0.08" />
          <line x1="720" y1="0" x2="720" y2="400" stroke="#F5C518" strokeWidth="0.4" strokeDasharray="6 8" opacity="0.08" />
          <circle cx="720" cy="200" r="80" stroke="#F5C518" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.06" fill="none" />
          <circle cx="720" cy="200" r="160" stroke="#F5C518" strokeWidth="0.4" strokeDasharray="3 8" opacity="0.04" fill="none" />
        </svg>

        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              color: "rgba(245,197,24,0.45)",
              fontSize: "0.95rem",
              marginBottom: "0.75rem",
            }}
          >
            Fig. 1 — Mapa de Conocimiento · Edición 2025
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
            LÍNEAS DE
            <span style={{ color: "#F5C518" }}> INVESTIGACIÓN</span>
          </h1>
          <p style={{ color: "#CCCCCC", fontSize: "1rem", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>
            Cuatro áreas de especialización que definen el horizonte científico del Semillero AD ASTRA, 
            alineadas con las líneas de investigación del Grupo SIDICO.
          </p>
        </div>
      </div>

      {/* Research cards */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
          {researchAreas.map((area, i) => (
            <FadeIn key={area.title} delay={i * 80}>
              <div
                style={{
                  background: "#111111",
                  border: "1px solid rgba(245,197,24,0.1)",
                  borderLeft: `4px solid ${area.color}`,
                  padding: "2.5rem",
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 1.2fr",
                  gap: "2.5rem",
                  alignItems: "start",
                  transition: "box-shadow 0.3s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "0 8px 40px rgba(245,197,24,0.08)";
                  el.style.borderColor = "rgba(245,197,24,0.3)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "none";
                  el.style.borderColor = "rgba(245,197,24,0.1)";
                }}
                className="research-card"
              >
                {/* Blueprint crosshatch bg */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "180px",
                    height: "180px",
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(245,197,24,0.03) 0, rgba(245,197,24,0.03) 1px, transparent 0, transparent 50%)",
                    backgroundSize: "12px 12px",
                    pointerEvents: "none",
                  }}
                />

                {/* Left: Icon + Title */}
                <div>
                  <div style={{ color: area.color, marginBottom: "1rem" }}>{area.icon}</div>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: area.color,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {area.subtitle}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      margin: 0,
                      marginBottom: "0.75rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {area.title}
                  </h3>
                  <div
                    style={{
                      fontFamily: "'Caveat', cursive",
                      color: "rgba(245,197,24,0.35)",
                      fontSize: "0.82rem",
                    }}
                  >
                    {area.fig}
                  </div>
                </div>

                {/* Center: Description + Topics */}
                <div>
                  <p
                    style={{
                      color: "#CCCCCC",
                      fontSize: "0.9rem",
                      lineHeight: 1.8,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {area.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {area.topics.map((topic) => (
                      <span
                        key={topic}
                        style={{
                          background: "rgba(245,197,24,0.08)",
                          border: "1px solid rgba(245,197,24,0.2)",
                          color: "#CCCCCC",
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "0.68rem",
                          letterSpacing: "0.06em",
                          padding: "0.3rem 0.65rem",
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Patent diagram */}
                <div>
                  <PatentDiagram fig={area.fig} />
                  <div
                    style={{
                      fontFamily: "'Caveat', cursive",
                      color: "rgba(245,197,24,0.4)",
                      fontSize: "0.8rem",
                      textAlign: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    {area.annotation}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        .research-card {
          grid-template-columns: 1fr 2fr 1.2fr;
        }
        @media (max-width: 900px) {
          .research-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
