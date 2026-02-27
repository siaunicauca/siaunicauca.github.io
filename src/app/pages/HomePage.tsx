import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronDown, Atom, Wind, Satellite, Layers, Cpu, BookOpen } from "lucide-react";
import { StarField } from "../components/StarField";
import { PatentRocket } from "../components/PatentRocket";
import { SectionHeader } from "../components/SectionHeader";

// Images
const IMG_ROCKET = "https://images.unsplash.com/photo-1600115352168-970e7f6e911f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJvc3BhY2UlMjByb2NrZXQlMjBsYXVuY2glMjBuaWdodCUyMGRhcmslMjBza3l8ZW58MXx8fHwxNzcxNjI4NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_CONFERENCE = "https://images.unsplash.com/photo-1704177094034-46a04b901bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJvc3BhY2UlMjBlbmdpbmVlcmluZyUyMGNvbmZlcmVuY2UlMjBzdHVkZW50cyUyMHJlc2VhcmNofGVufDF8fHx8MTc3MTYyODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_WIND_TUNNEL = "https://images.unsplash.com/photo-1764675903774-336e6ef8d09c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwdHVubmVsJTIwYWVyb2R5bmFtaWNzJTIwdGVzdCUyMGFlcm9zcGFjZXxlbnwxfHx8fDE3NzE2Mjg2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_CFD = "https://images.unsplash.com/photo-1756751579863-49b26247e1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDRkQlMjBjb21wdXRhdGlvbmFsJTIwZmx1aWQlMjBkeW5hbWljcyUyMHNpbXVsYXRpb24lMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3MTYyODY1MHww&ixlib=rb-4.1.0&q=80&w=1080";

// Fade-in hook
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── HERO SECTION ───────────────────────────────────────────────────────────
function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#0A0A0A",
      }}
    >
      <StarField density={200} />

      {/* Milky way gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(245,197,24,0.04) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 30% 60%, rgba(100,100,200,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Orbit arcs background */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <ellipse cx="900" cy="450" rx="450" ry="180" stroke="#F5C518" strokeWidth="0.6" strokeDasharray="8 5" opacity="0.12" fill="none" />
        <ellipse cx="900" cy="450" rx="320" ry="120" stroke="#F5C518" strokeWidth="0.4" strokeDasharray="4 7" opacity="0.08" fill="none" />
        <ellipse cx="900" cy="450" rx="560" ry="230" stroke="#F5C518" strokeWidth="0.3" strokeDasharray="6 8" opacity="0.06" fill="none" />
        {/* Grid lines faint */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 130} x2="1440" y2={i * 130} stroke="#F5C518" strokeWidth="0.3" opacity="0.04" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1={i * 160} y1="0" x2={i * 160} y2="900" stroke="#F5C518" strokeWidth="0.3" opacity="0.04" />
        ))}
        {/* Coordinate marks */}
        <text x="30" y="50" fill="#F5C518" fontSize="10" fontFamily="'Caveat', cursive" opacity="0.25">N 04°38'12"</text>
        <text x="30" y="65" fill="#F5C518" fontSize="10" fontFamily="'Caveat', cursive" opacity="0.25">W 74°05'33"</text>
        <text x="1320" y="50" fill="#F5C518" fontSize="10" fontFamily="'Caveat', cursive" opacity="0.25">ALT: 2600m</text>
      </svg>

      {/* Content grid */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "6rem 2rem 4rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
          width: "100%",
        }}
        className="hero-grid"
      >
        {/* Left: Text */}
        <div>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#F5C518",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ display: "block", width: "40px", height: "1px", background: "#F5C518" }} />
            Semillero de Investigación — 2025
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.1,
              margin: 0,
              marginBottom: "0.6rem",
            }}
          >
            SEMILLERO DE
            <br />
            <span style={{ color: "#F5C518" }}>INGENIERÍA</span>
            <br />
            AEROESPACIAL
          </h1>

          <div
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "1.4rem",
              color: "#CCCCCC",
              marginBottom: "1.5rem",
              letterSpacing: "0.02em",
            }}
          >
            Ad Astra — Hacia las Estrellas ✦
          </div>

          <p
            style={{
              color: "#999",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              maxWidth: "480px",
              marginBottom: "2.5rem",
            }}
          >
              Adscrito al grupo de investigación en Sistemas Dinámicos, 
              Instrumentación y Control - SIDICO, del departamento de 
              física, Facultad de Ciencias Naturales, Exactas y de la 
              Educación, Universidad Del Cauca.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              to="/proyectos"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#F5C518",
                color: "#000000",
                padding: "0.85rem 1.75rem",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                border: "2px solid #F5C518",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.color = "#F5C518";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#F5C518";
                el.style.color = "#000000";
              }}
            >
              Conoce Nuestro Trabajo <ArrowRight size={15} />
            </Link>
            <Link
              to="/publicaciones"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "transparent",
                color: "#FFFFFF",
                padding: "0.85rem 1.75rem",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.25)",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#F5C518";
                el.style.color = "#F5C518";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.25)";
                el.style.color = "#FFFFFF";
              }}
            >
              <BookOpen size={15} /> Ver Publicaciones
            </Link>
          </div>

          {/* Stats strip */}
          <div
            style={{
              display: "flex",
              gap: "2rem",
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(245,197,24,0.15)",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "12", label: "Investigadores" },
              { num: "8", label: "Proyectos Activos" },
              { num: "15", label: "Publicaciones" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#F5C518",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
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
        </div>

        {/* Right: Patent Rocket illustration */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Glow behind rocket */}
          <div
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(245,197,24,0.08) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <PatentRocket width={420} height={520} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: scrolled ? 0 : 1,
          transition: "opacity 0.4s",
          cursor: "pointer",
        }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "0.85rem",
            color: "rgba(245,197,24,0.5)",
          }}
        >
          Explorar
        </span>
        <ChevronDown size={20} color="rgba(245,197,24,0.5)" style={{ animation: "bounce 2s infinite" }} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .hero-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── ABOUT SECTION ──────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      style={{
        background: "#0F0F0F",
        padding: "6rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blueprint crosshatch */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(245,197,24,0.015) 0, rgba(245,197,24,0.015) 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="about-grid"
      >
        {/* Left */}
        <FadeIn>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "3px",
                background: "linear-gradient(to bottom, #F5C518, #E8A800, transparent)",
              }}
            />
            <div style={{ paddingLeft: "2rem" }}>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#F5C518",
                  marginBottom: "0.75rem",
                }}
              >
                Nuestra Misión
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 1.2,
                  margin: 0,
                  marginBottom: "1.5rem",
                }}
              >
                Construyendo el futuro del espacio desde la academia
              </h2>
              <p style={{ color: "#CCCCCC", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "1.2rem" }}>

                Nuestra mision Es Formar un espacio interdisciplinario que vincule estudiantes de diversas
                áreas del conocimiento en torno a la investigación y el desarrollo de tecnologías aeroespaciales. 
   

              </p>
              <p style={{ color: "#888", lineHeight: 1.85, fontSize: "0.9rem" }}>
                Promover proyectos que respondan a los desafíos actuales del sector 
                aeroespacial alineados con las líneas de investigación del Grupo SIDICO, fortaleciendo
                la interacción entre la Universidad, la industria y la comunidad para generar impacto
                científico, tecnológico y social.
              </p>
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: "rgba(245,197,24,0.4)",
                  fontSize: "0.85rem",
                  marginTop: "1.5rem",
                }}
              >
                — Est. 2019 · Bogotá, Colombia · Fig. 3
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Right: Stats */}
        <FadeIn delay={150}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[
              { num: "12", label: "Investigadores Activos", icon: "" },
              { num: "8", label: "Proyectos en Curso", icon: "" },
              { num: "15", label: "Publicaciones", icon: "" },
              { num: "6", label: "Años de Historia", icon: "" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "#111111",
                  border: "1px solid rgba(245,197,24,0.15)",
                  padding: "1.75rem",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(245,197,24,0.45)";
                  el.style.boxShadow = "0 4px 24px rgba(245,197,24,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(245,197,24,0.15)";
                  el.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "#F5C518",
                    lineHeight: 1,
                    marginBottom: "0.4rem",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#888",
                  }}
                >
                  {stat.label}
                </div>
                {/* Corner accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "40px",
                    height: "40px",
                    borderTop: "2px solid rgba(245,197,24,0.3)",
                    borderRight: "2px solid rgba(245,197,24,0.3)",
                  }}
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <style>{`
        .about-grid {
          grid-template-columns: 1fr 1.5fr;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── RESEARCH LINES SECTION ─────────────────────────────────────────────────
const researchLines = [
  {
    icon: <Wind size={28} />,
    title: "Diseño, Construcción y Simulación de Sistemas Aeroespaciales",
    desc: "Desarrollo integral de sistemas aeroespaciales desde el diseño conceptual hasta la construcción y validación mediante simulaciones computacionales.",
    fig: "Fig. 4a",
    tag: "Diseño · Simulación",
  },
  {
    icon: <Cpu size={28} />,
    title: "Inteligencia Artificial y Sistemas Dinámicos en Aeroespacial",
    desc: "Aplicación de técnicas de inteligencia artificial y modelado de sistemas dinámicos para la resolución de problemas en el sector aeroespacial.",
    fig: "Fig. 4b",
    tag: "IA · Sistemas Dinámicos",
  },
  {
    icon: <Satellite size={28} />,
    title: "Automatización y Control de Procesos Aeroespaciales",
    desc: "Diseño e implementación de sistemas de control y automatización para procesos y vehículos en el ámbito aeroespacial.",
    fig: "Fig. 4c",
    tag: "Control · Automatización",
  },
  {
    icon: <Layers size={28} />,
    title: "Instrumentación y Sensores para el Sector Aeroespacial",
    desc: "Desarrollo y aplicación de instrumentación y sensores especializados para la adquisición de datos en entornos aeroespaciales.",
    fig: "Fig. 4d",
    tag: "Sensores · Instrumentación",
  },
];

function ResearchSection() {
  return (
    <section
      style={{
        background: "#0A0A0A",
        padding: "6rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <StarField density={60} opacity={0.4} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <SectionHeader
            label="Ciencia & Tecnología"
            title="Líneas de Investigación"
            subtitle="Cuatro áreas de especialización que definen la frontera de nuestro trabajo científico."
            figLabel="Fig. 4 — Mapa de Investigación · Escala conceptual"
          />
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {researchLines.map((line, i) => (
            <FadeIn key={line.title} delay={i * 100}>
              <div
                style={{
                  background: "#111111",
                  border: "1px solid rgba(245,197,24,0.12)",
                  borderTop: "3px solid #F5C518",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.35s ease",
                  cursor: "default",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = "0 12px 40px rgba(245,197,24,0.12)";
                  el.style.borderColor = "rgba(245,197,24,0.4)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                  el.style.borderColor = "rgba(245,197,24,0.12)";
                }}
              >
                {/* Crosshatch corner */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "60px",
                    height: "60px",
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(245,197,24,0.06) 0, rgba(245,197,24,0.06) 1px, transparent 0, transparent 50%)",
                    backgroundSize: "8px 8px",
                  }}
                />

                <div style={{ color: "#F5C518", marginBottom: "1.2rem" }}>{line.icon}</div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(245,197,24,0.6)",
                    marginBottom: "0.6rem",
                  }}
                >
                  {line.tag}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    margin: 0,
                    marginBottom: "0.8rem",
                    lineHeight: 1.3,
                  }}
                >
                  {line.title}
                </h3>
                <p style={{ color: "#999", fontSize: "0.88rem", lineHeight: 1.75, margin: 0 }}>
                  {line.desc}
                </p>
                <div
                  style={{
                    fontFamily: "'Caveat', cursive",
                    color: "rgba(245,197,24,0.3)",
                    fontSize: "0.8rem",
                    marginTop: "1.5rem",
                  }}
                >
                  {line.fig}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            to="/investigacion"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#F5C518",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: "1px solid rgba(245,197,24,0.35)",
              padding: "0.75rem 1.5rem",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(245,197,24,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
            }}
          >
            Ver todas las líneas <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── NEWS PREVIEW SECTION ────────────────────────────────────────────────────
const newsPreview = [
  {
    id: 1,
    image: IMG_CONFERENCE,
    category: "Conferencia",
    title: "AD ASTRA presenta en el Congreso Colombiano de Ingeniería Aeronáutica",
    excerpt: "Nuestros investigadores expusieron avances en aerodinámica computacional ante más de 300 especialistas del sector aeroespacial latinoamericano.",
    date: "Enero 2025",
    featured: true,
  },
  {
    id: 2,
    image: IMG_WIND_TUNNEL,
    category: "Laboratorio",
    title: "Nuevo túnel de viento subsónico operativo en el campus",
    excerpt: "La nueva instalación experimental permite ensayos a Re hasta 500,000, fortaleciendo la capacidad de investigación del semillero.",
    date: "Diciembre 2024",
    featured: false,
  },
  {
    id: 3,
    image: IMG_CFD,
    category: "Simulación",
    title: "Simulación CFD del flujo laminar sobre ala tipo NACA 4412",
    excerpt: "Resultados preliminares muestran excelente correlación con datos experimentales, validando nuestra metodología numérica de alto orden.",
    date: "Noviembre 2024",
    featured: false,
  },
];

function NewsSection() {
  return (
    <section
      style={{
        background: "#0D0D0D",
        padding: "6rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Yellow diagonal line decoration */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(245,197,24,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <SectionHeader
            label="Noticias"
            title="Noticias del Semillero"
            subtitle="Últimas novedades, logros y avances del grupo de investigación AD ASTRA."
            figLabel="Fig. 5 — Registro Cronológico"
          />
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gridTemplateRows: "auto auto",
            gap: "1.5rem",
          }}
          className="news-grid"
        >
          {/* Featured card */}
          <FadeIn>
            <div
              style={{
                background: "#111111",
                border: "1px solid rgba(245,197,24,0.12)",
                borderLeft: "4px solid #F5C518",
                overflow: "hidden",
                gridRow: "1 / 3",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(245,197,24,0.1)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = "none")
              }
            >
              <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
                <img
                  src={newsPreview[0].image}
                  alt={newsPreview[0].title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(transparent, rgba(10,10,10,0.95))",
                    height: "80px",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    background: "#F5C518",
                    color: "#000",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.65rem",
                  }}
                >
                  {newsPreview[0].category}
                </span>
              </div>
              <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1.35,
                    margin: 0,
                    marginBottom: "0.8rem",
                  }}
                >
                  {newsPreview[0].title}
                </h3>
                <p style={{ color: "#999", fontSize: "0.88rem", lineHeight: 1.7, flex: 1 }}>
                  {newsPreview[0].excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "1.5rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Caveat', cursive",
                      color: "rgba(245,197,24,0.5)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {newsPreview[0].date}
                  </span>
                  <Link
                    to="/noticias"
                    style={{
                      color: "#F5C518",
                      textDecoration: "none",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.78rem",
                      letterSpacing: "0.08em",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    Leer más <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Regular news cards */}
          {newsPreview.slice(1).map((news, i) => (
            <FadeIn key={news.id} delay={(i + 1) * 100}>
              <div
                style={{
                  background: "#111111",
                  border: "1px solid rgba(245,197,24,0.1)",
                  overflow: "hidden",
                  display: "flex",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(245,197,24,0.08)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = "none")
                }
              >
                <div style={{ width: "120px", flexShrink: 0, overflow: "hidden" }}>
                  <img
                    src={news.image}
                    alt={news.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }}
                  />
                </div>
                <div style={{ padding: "1.25rem", flex: 1 }}>
                  <span
                    style={{
                      background: "rgba(245,197,24,0.12)",
                      color: "#F5C518",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "0.2rem 0.5rem",
                      display: "inline-block",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {news.category}
                  </span>
                  <h4
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      margin: 0,
                      marginBottom: "0.5rem",
                      lineHeight: 1.35,
                    }}
                  >
                    {news.title}
                  </h4>
                  <Link
                    to="/noticias"
                    style={{
                      color: "#F5C518",
                      textDecoration: "none",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.72rem",
                      letterSpacing: "0.06em",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    Leer más <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link
            to="/noticias"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#F5C518",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: "1px solid rgba(245,197,24,0.35)",
              padding: "0.75rem 1.5rem",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "rgba(245,197,24,0.1)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "transparent")
            }
          >
            Ver todas las noticias <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
        .news-grid {
          grid-template-columns: 1.6fr 1fr;
          grid-template-rows: auto auto;
        }
        @media (max-width: 900px) {
          .news-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
        }
      `}</style>
    </section>
  );
}

// ─── CTA BANNER ─────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section
      style={{
        background: "#111111",
        borderTop: "1px solid rgba(245,197,24,0.2)",
        borderBottom: "1px solid rgba(245,197,24,0.2)",
        padding: "5rem 2rem",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(245,197,24,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontFamily: "'Caveat', cursive",
            color: "rgba(245,197,24,0.35)",
            fontSize: "0.95rem",
            marginBottom: "0.75rem",
          }}
        >
          Fig. 6 — Convocatoria Abierta
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
            fontWeight: 700,
            color: "#FFFFFF",
            maxWidth: "700px",
            margin: "0 auto 1.2rem",
            lineHeight: 1.2,
          }}
        >
          ¿Apasionado por el espacio? Únete al semillero
        </h2>
        <p style={{ color: "#CCCCCC", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7, fontSize: "0.95rem" }}>
          Buscamos estudiantes curiosos y comprometidos para unirse a nuestra misión. No se necesita experiencia previa, solo ganas de aprender y explorar.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/contacto"
            style={{
              textDecoration: "none",
              background: "#F5C518",
              color: "#000",
              padding: "0.85rem 2rem",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: "2px solid #F5C518",
              transition: "all 0.25s",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color = "#F5C518";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#F5C518";
              el.style.color = "#000";
            }}
          >
            Contáctanos <ArrowRight size={14} />
          </Link>
          <Link
            to="/equipo"
            style={{
              textDecoration: "none",
              background: "transparent",
              color: "#FFFFFF",
              padding: "0.85rem 2rem",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#F5C518";
              el.style.color = "#F5C518";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.2)";
              el.style.color = "#FFFFFF";
            }}
          >
            Conoce el Equipo
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ResearchSection />
      <NewsSection />
      <CTABanner />
    </>
  );
}
