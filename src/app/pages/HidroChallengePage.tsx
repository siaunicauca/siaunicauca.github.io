import { useState, useEffect, useRef } from "react";
import { StarField } from "../components/StarField";
import {
  Clock,
  FileText,
  ExternalLink,
  CalendarDays,
  Rocket,
  ChevronRight,
  Download,
  MapPin,
} from "lucide-react";

// ─── FADE-IN ────────────────────────────────────────────────────────────────
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
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── COUNTDOWN ──────────────────────────────────────────────────────────────
const EVENT_DATE = new Date("2026-10-14T08:00:00-05:00");

function useCountdown(target: Date) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function CountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);

  const units = [
    { value: days, label: "Días" },
    { value: hours, label: "Horas" },
    { value: minutes, label: "Minutos" },
    { value: seconds, label: "Segundos" },
  ];

  return (
    <section style={{ background: "#0D0D0D", padding: "5rem 2rem", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(245,197,24,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              color: "rgba(245,197,24,0.4)",
              fontSize: "0.9rem",
              marginBottom: "0.5rem",
            }}
          >
            Fig. H1 — Cuenta Regresiva
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: "0 0 0.5rem",
            }}
          >
            HidroChallenge IPN - UNICAUCA <span style={{ color: "#F5C518" }}>2026</span>
          </h2>
          <p style={{ color: "#F5C518", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.15em", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
            Del 14 al 16 de Octubre, 2026
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            {units.map((u) => (
              <div
                key={u.label}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(245,197,24,0.15)",
                  borderRadius: "8px",
                  padding: "1.5rem 2rem",
                  minWidth: "110px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "2.8rem",
                    fontWeight: 700,
                    color: "#F5C518",
                    lineHeight: 1,
                  }}
                >
                  {String(u.value).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#AAAAAA",
                    marginTop: "0.5rem",
                  }}
                >
                  {u.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── ROADMAP / FECHAS IMPORTANTES ───────────────────────────────────────────
const roadmapEvents = [
  { date: "18 marzo", title: "Convocatoria", description: "Publicación de convocatoria e inicio de inscripciones", rubrica: "", icon: <CalendarDays size={18} /> },
  { date: "18 abril", title: "Cierre de inscripciones", description: "Fecha límite para registro de equipos", rubrica: "", icon: <CalendarDays size={18} /> },
  { date: "2 mayo", title: "Reunión informativa", description: "Reunión informativa de inicio de la competencia", rubrica: "", icon: <CalendarDays size={18} /> },
  { date: "9 mayo", title: "Taller 1", description: "Primer taller de la competencia", rubrica: "", icon: <FileText size={18} /> },
  { date: "16 mayo", title: "Taller 2", description: "Segundo taller de la competencia", rubrica: "", icon: <FileText size={18} /> },
  { date: "23 mayo", title: "Taller 3", description: "Tercer taller de la competencia", rubrica: "", icon: <FileText size={18} /> },
  { date: "30 mayo", title: "Taller 4", description: "Cuarto taller de la competencia", rubrica: "", icon: <FileText size={18} /> },
  { date: "6 junio", title: "Taller 5", description: "Quinto taller de la competencia", rubrica: "", icon: <FileText size={18} /> },
  { date: "12 junio", title: "Entrega PDR", description: "Entrega de Reporte de Diseño Preliminar (PDR)", rubrica: "", icon: <FileText size={18} /> },
  { date: "14 agosto", title: "Video de funcionamiento", description: "Entrega de video de funcionamiento", rubrica: "", icon: <FileText size={18} /> },
  { date: "7 septiembre", title: "Publicación de resultados", description: "Publicación de resultados parciales", rubrica: "", icon: <CalendarDays size={18} /> },
  { date: "5 octubre", title: "Espacio de pruebas", description: "Espacio de pruebas para los equipos en el lugar de lanzamiento", rubrica: "", icon: <MapPin size={18} /> },
  { date: "7 octubre", title: "Día 1 de competencia", description: "Revisión y Presentación Oral", rubrica: "", icon: <Rocket size={18} /> },
  { date: "8 octubre", title: "Día 2 de competencia", description: "Lanzamientos", rubrica: "", icon: <Rocket size={18} /> },
  { date: "9 octubre", title: "Premiación", description: "Premiación y cierre de competencia", rubrica: "", icon: <CalendarDays size={18} /> },
];

function RoadmapSection() {
  return (
    <section style={{ background: "#0A0A0A", padding: "5rem 2rem", position: "relative", overflow: "hidden" }}>
      <StarField density={50} opacity={0.3} />
      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#F5C518",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              <span style={{ display: "block", width: "30px", height: "1px", background: "#F5C518" }} />
              Fechas Importantes
              <span style={{ display: "block", width: "30px", height: "1px", background: "#F5C518" }} />
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
                fontWeight: 700,
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Roadmap <span style={{ color: "#F5C518" }}>2026</span>
            </h2>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "0.6rem",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(to bottom, rgba(245,197,24,0.4), rgba(245,197,24,0.05))",
            }}
          />

          {roadmapEvents.map((ev, i) => (
            <FadeIn key={i} delay={i * 120}>
              <div style={{ position: "relative", marginBottom: "2.5rem" }}>
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-2.18rem",
                    top: "0.25rem",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: "#0A0A0A",
                    border: "2px solid #F5C518",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(245,197,24,0.1)",
                    padding: "1.25rem 1.5rem",
                    borderRadius: "4px",
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(245,197,24,0.35)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(245,197,24,0.1)")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <span style={{ color: "#F5C518" }}>{ev.icon}</span>
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "0.7rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#F5C518",
                      }}
                    >
                      {ev.date}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      margin: "0 0 0.4rem",
                    }}
                  >
                    {ev.title}
                  </h3>
                  <p style={{ color: "#AAAAAA", fontSize: "0.85rem", lineHeight: 1.6, margin: "0 0 0.6rem" }}>
                    {ev.description}
                  </p>
                  <span style={{
                    display: "inline-block",
                    background: "rgba(245,197,24,0.12)",
                    color: "#F5C518",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    padding: "0.3rem 0.85rem",
                    borderRadius: "20px",
                    border: "1px solid rgba(245,197,24,0.2)",
                  }}>
                    {ev.rubrica}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GALERÍA DE IMÁGENES ────────────────────────────────────────────────────
// Sección deshabilitada: era de registro/historial, no de convocatoria

// ─── DOCUMENTO PDF ──────────────────────────────────────────────────────────
function DocumentSection() {
  // Cambia esta ruta al PDF real de la convocatoria
  const pdfUrl = "https://drive.google.com/file/d/1eyIowEl6zgv7TYioyCBpvj423b8Mk0Tz/view?usp=drive_link";

  return (
    <section style={{ background: "#0A0A0A", padding: "5rem 2rem", position: "relative" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(245,197,24,0.15)",
              borderRadius: "4px",
              padding: "2.5rem",
              textAlign: "center",
            }}
          >
            <div style={{ color: "#F5C518", marginBottom: "1rem" }}>
              <FileText size={40} strokeWidth={1.2} />
            </div>
            <div
              style={{
                fontFamily: "'Caveat', cursive",
                color: "rgba(245,197,24,0.4)",
                fontSize: "0.85rem",
                marginBottom: "0.5rem",
              }}
            >
              Fig. H5 — Documento Oficial
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#FFFFFF",
                margin: "0 0 0.75rem",
              }}
            >
              Convocatoria <span style={{ color: "#F5C518" }}>2026</span>
            </h3>
            <p
              style={{
                color: "#AAAAAA",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
                maxWidth: "480px",
                margin: "0 auto 1.5rem",
              }}
            >
              Descarga el documento completo con las bases, requisitos técnicos y categorías de competencia del HidroChallenge IPN 2026.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "#F5C518",
                  color: "#0A0A0A",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "0.75rem 2rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#E8A800")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#F5C518")}
              >
                <Download size={16} />
                Descargar PDF
              </a>
              <a
                href="https://forms.gle/fBARuUodm1MEVrg3A"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "transparent",
                  color: "#F5C518",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "0.75rem 2rem",
                  border: "2px solid #F5C518",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = "#F5C518";
                  (e.target as HTMLElement).style.color = "#0A0A0A";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = "transparent";
                  (e.target as HTMLElement).style.color = "#F5C518";
                }}
              >
                <ExternalLink size={16} />
                Ir al Formulario
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── ENLACE EXTERNO ─────────────────────────────────────────────────────────
function ExternalLinkSection() {
  const externalUrl = "https://hidrochallenge-ipn.org/"; 

  return (
    <section
      style={{
        background: "#111111",
        borderTop: "1px solid rgba(245,197,24,0.15)",
        borderBottom: "1px solid rgba(245,197,24,0.15)",
        padding: "4rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(245,197,24,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{ color: "#F5C518", marginBottom: "1rem" }}>
            <ExternalLink size={36} strokeWidth={1.2} />
          </div>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: "0 0 0.75rem",
            }}
          >
            Página de <span style={{ color: "#F5C518" }}>HidroChallenge del lado IPN</span>
          </h3>
          <p
            style={{
              color: "#AAAAAA",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              maxWidth: "500px",
              margin: "0 auto 1.5rem",
            }}
          >
            Visita el sitio oficial del HidroChallenge IPN para más información, inscripción y recursos técnicos.
          </p>
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "transparent",
              color: "#F5C518",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "0.75rem 2rem",
              border: "2px solid #F5C518",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = "#F5C518";
              (e.target as HTMLElement).style.color = "#0A0A0A";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "transparent";
              (e.target as HTMLElement).style.color = "#F5C518";
            }}
          >
            Ir al sitio oficial
            <ChevronRight size={16} />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── HERO SECTION ───────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <div
      style={{
        position: "relative",
        padding: "5rem 2rem 4rem",
        borderBottom: "1px solid rgba(245,197,24,0.1)",
        overflow: "hidden",
      }}
    >
      <StarField density={120} />
      {/* Blueprint grid */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 160} y1="0" x2={i * 160} y2="400" stroke="#F5C518" strokeWidth="0.3" opacity="0.04" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 80} x2="1440" y2={i * 80} stroke="#F5C518" strokeWidth="0.3" opacity="0.04" />
        ))}
      </svg>

      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontFamily: "'Caveat', cursive",
            color: "rgba(245,197,24,0.4)",
            fontSize: "0.95rem",
            marginBottom: "0.75rem",
          }}
        >
          Fig. H0 — International Rocket Challenge
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
          HIDRO
          <span style={{ color: "#F5C518" }}>CHALLENGE</span>
        </h1>
        <h2 style={{ color: "#F5C518", fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, margin: "0.5rem 0" }}>
          UNIVERSIDAD DEL CAUCA
        </h2>
        <p style={{ color: "#CCCCCC", fontSize: "1rem", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>
          Competencia internacional de cohetes hidropropulsados organizada por el Instituto Politécnico Nacional De México Y la Universidad del Cauca de Colombia. <br></br>
          
        </p>
      </div>
    </div>
  );
}

// ─── PAGE EXPORT ────────────────────────────────────────────────────────────
export function HidroChallengePage() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", paddingTop: "72px" }}>
      <HeroSection />
      <CountdownSection />
      <RoadmapSection />
      <DocumentSection />
      <ExternalLinkSection />
    </div>
  );
}