import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { StarField } from "../components/StarField";

import flyer from "../../media/PilotosRC/flyer.png";

const FORM_URL = "https://forms.gle/xPXF97LKKeVpapcx6";

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

export function NoticiaPilotosRC() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", paddingTop: "72px" }}>

      {/* Hero */}
      <div
        style={{
          position: "relative",
          padding: "4.5rem 2rem 3.5rem",
          borderBottom: "1px solid rgba(245,197,24,0.1)",
          overflow: "hidden",
        }}
      >
        <StarField density={70} />
        <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          <Link
            to="/noticias"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              color: "rgba(245,197,24,0.6)", fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase",
              textDecoration: "none", marginBottom: "2rem", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5C518")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,197,24,0.6)")}
          >
            <ArrowLeft size={13} /> Noticias
          </Link>

          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                background: "rgba(100,180,255,0.1)", border: "1px solid rgba(100,180,255,0.3)",
                color: "#64b4ff", fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em",
                textTransform: "uppercase", padding: "0.28rem 0.65rem",
              }}
            >
              Convocatoria
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.45rem, 3.8vw, 2.4rem)",
              fontWeight: 700, color: "#FFFFFF",
              margin: 0, marginBottom: "1.5rem", lineHeight: 1.25,
            }}
          >
            Abren convocatorias para la División de Pilotos RC del Semillero SIA
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "flex", alignItems: "center", gap: "0.35rem",
                fontFamily: "'Caveat', cursive", color: "rgba(245,197,24,0.55)", fontSize: "1rem",
              }}
            >
              <Calendar size={13} color="rgba(245,197,24,0.4)" />
              Octubre de 2026
            </span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", color: "#555", letterSpacing: "0.05em" }}>
              Semillero SIA · AESS Unicauca
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3.5rem 2rem 5rem" }}>

        <FadeIn>
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.62rem",
                letterSpacing: "0.25em", textTransform: "uppercase",
                color: "rgba(245,197,24,0.45)", marginBottom: "0.85rem",
                display: "flex", alignItems: "center", gap: "0.6rem",
              }}
            >
              <span style={{ width: "24px", height: "1px", background: "rgba(245,197,24,0.35)", display: "block" }} />
              Flyer de la convocatoria
            </div>
            <div style={{ display: "flex", justifyContent: "center", background: "#111", padding: "1rem" }}>
              <img
                src={flyer}
                alt="Flyer de la convocatoria a la División de Pilotos RC"
                style={{ width: "100%", maxWidth: "460px", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={60}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.8rem" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(245,197,24,0.1)" }} />
            <div style={{ width: "6px", height: "6px", background: "#F5C518", transform: "rotate(45deg)", flexShrink: 0 }} />
            <div style={{ flex: 1, height: "1px", background: "rgba(245,197,24,0.1)" }} />
          </div>
        </FadeIn>

        <div style={{ fontFamily: "'Inter', 'DM Sans', sans-serif", fontSize: "1.02rem", lineHeight: 1.85, color: "#C8C8C8" }}>

          <FadeIn delay={80}>
            <div><p style={{ marginBottom: "1.8rem" }}>El Semillero de Ingeniería Aeroespacial (SIA) y <strong style={{ color: "#e0e0e0" }}>AESS Unicauca</strong> abren oficialmente las convocatorias para la <strong style={{ color: "#e0e0e0" }}>División de Pilotos RC</strong>. Si te apasiona la aviación, los drones y la tecnología, y quieres llevar la teoría de las aulas directamente al espacio aéreo, este es tu lugar.</p></div>
          </FadeIn>

          <FadeIn delay={100}>
            <div><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#FFFFFF", margin: "0 0 0.9rem" }}>¿Qué haremos en la división?</h2><p style={{ marginBottom: "1.8rem" }}>Nuestro objetivo es capacitar a los integrantes en el diseño, construcción y pilotaje de sistemas aéreos radiocontrolados no tripulados. Durante este semestre y los próximos, trabajaremos en proyectos prácticos como:</p><ul style={{ margin: "0 0 1.8rem", paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}><li>Entrenamiento de vuelo y memoria muscular en simuladores.</li><li>Diseño, corte y ensamblaje de aeronaves de ala fija desde cero.</li><li>Prácticas de vuelo real (línea de visión y FPV) y desarrollo de misiones lúdicas.</li></ul></div>
          </FadeIn>

          <FadeIn delay={120}>
            <div><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#FFFFFF", margin: "0 0 0.9rem" }}>¿Quiénes pueden unirse?</h2><p style={{ marginBottom: "1.8rem" }}>Buscamos estudiantes curiosos y comprometidos. <strong style={{ color: "#e0e0e0" }}>No es requisito tener experiencia previa volando ni contar con equipos propios</strong>. Aquí te enseñaremos desde las bases de la aerodinámica hasta la configuración de tu primer controlador de vuelo.</p></div>
          </FadeIn>

          <FadeIn delay={140}>
            <div><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#FFFFFF", margin: "0 0 0.9rem" }}>¡Inscríbete ahora!</h2><p style={{ marginBottom: "1.8rem" }}>¿Listo para ser parte de la nueva generación de pilotos RC? Asegura tu cupo escaneando el código QR del flyer o ingresando al formulario de inscripción.</p><a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  color: "#0A0A0A", background: "#F5C518", fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  textDecoration: "none", padding: "0.75rem 1.4rem",
                }}
              >
                Inscribirme ahora <ArrowRight size={14} />
              </a></div>
          </FadeIn>
        </div>

        <FadeIn delay={180}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "3rem 0 2.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(245,197,24,0.1)" }} />
            <div style={{ width: "6px", height: "6px", background: "rgba(245,197,24,0.4)", transform: "rotate(45deg)", flexShrink: 0 }} />
            <div style={{ flex: 1, height: "1px", background: "rgba(245,197,24,0.1)" }} />
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <Link
              to="/noticias"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                color: "#F5C518", fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.75rem", letterSpacing: "0.08em", textDecoration: "none",
                border: "1px solid rgba(245,197,24,0.3)", padding: "0.55rem 1.1rem", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,197,24,0.08)"; e.currentTarget.style.borderColor = "rgba(245,197,24,0.6)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(245,197,24,0.3)"; }}
            >
              <ArrowLeft size={13} /> Volver a Noticias
            </Link>
            <div style={{ fontFamily: "'Caveat', cursive", color: "rgba(245,197,24,0.35)", fontSize: "0.88rem" }}>
              Semillero SIA · Universidad del Cauca
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
