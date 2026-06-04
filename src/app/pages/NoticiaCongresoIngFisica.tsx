import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { StarField } from "../components/StarField";

import img1 from "../../media/6CongresoIngenieriaFisicaPopayan/equipoKalaPosteres.jpeg";
import img2 from "../../media/6CongresoIngenieriaFisicaPopayan/OralTulcanSat.jpeg";
import img3 from "../../media/6CongresoIngenieriaFisicaPopayan/posterCoheteMultietapa.jpeg";

const images = [img1, img2, img3];

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

function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prev = () => goTo((current - 1 + images.length) % images.length);
  const next = () => goTo((current + 1) % images.length);

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div style={{ position: "relative", width: "100%", borderRadius: "2px", overflow: "hidden" }}>
      <div style={{ position: "relative", height: "clamp(260px, 48vw, 560px)", background: "#111" }}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Fotografía del congreso ${i + 1}`}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", opacity: i === current ? 1 : 0,
              transition: "opacity 0.5s ease", filter: "brightness(0.88)",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(10,10,10,0.65) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            background: "rgba(10,10,10,0.7)", border: "1px solid rgba(245,197,24,0.25)",
            color: "#F5C518", fontFamily: "'Caveat', cursive", fontSize: "0.9rem", padding: "0.2rem 0.7rem",
          }}
        >
          {current + 1} / {images.length}
        </div>
        <button
          onClick={prev} aria-label="Anterior"
          style={{
            position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
            background: "rgba(10,10,10,0.65)", border: "1px solid rgba(245,197,24,0.25)",
            color: "#F5C518", width: "2.4rem", height: "2.4rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,197,24,0.15)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,10,10,0.65)"; }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next} aria-label="Siguiente"
          style={{
            position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
            background: "rgba(10,10,10,0.65)", border: "1px solid rgba(245,197,24,0.25)",
            color: "#F5C518", width: "2.4rem", height: "2.4rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,197,24,0.15)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,10,10,0.65)"; }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        style={{
          display: "flex", justifyContent: "center", gap: "0.5rem",
          padding: "0.85rem 0", background: "#111111",
          borderTop: "1px solid rgba(245,197,24,0.07)",
        }}
      >
        {images.map((_, i) => (
          <button
            key={i} onClick={() => goTo(i)} aria-label={`Ir a foto ${i + 1}`}
            style={{
              width: i === current ? "1.6rem" : "0.45rem", height: "0.45rem",
              background: i === current ? "#F5C518" : "rgba(255,255,255,0.2)",
              border: "none", borderRadius: "999px", cursor: "pointer",
              padding: 0, transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex", gap: "0.4rem", padding: "0 0 0.85rem 0",
          background: "#111111", overflowX: "auto", justifyContent: "center",
        }}
      >
        {images.map((src, i) => (
          <button
            key={i} onClick={() => goTo(i)}
            style={{
              width: "68px", height: "48px", flexShrink: 0, padding: 0,
              border: i === current ? "2px solid #F5C518" : "2px solid transparent",
              cursor: "pointer", overflow: "hidden", transition: "border-color 0.2s", background: "none",
            }}
          >
            <img
              src={src} alt={`Miniatura ${i + 1}`}
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                opacity: i === current ? 1 : 0.45, transition: "opacity 0.2s",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function NoticiaCongresoIngFisica() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", paddingTop: "72px" }}>

      {/* Hero */}
      <div
        style={{
          position: "relative", padding: "4.5rem 2rem 3.5rem",
          borderBottom: "1px solid rgba(245,197,24,0.1)", overflow: "hidden",
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
              Conferencia
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
            Semillero SIA en el VIII Congreso Nacional de Ingeniería Física con cinco trabajos de investigación
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "flex", alignItems: "center", gap: "0.35rem",
                fontFamily: "'Caveat', cursive", color: "rgba(245,197,24,0.55)", fontSize: "1rem",
              }}
            >
              <Calendar size={13} color="rgba(245,197,24,0.4)" />
              Octubre de 2025
            </span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", color: "#555", letterSpacing: "0.05em" }}>
              Semillero SIA · Popayán, Colombia
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
              Galería fotográfica del evento
            </div>
            <Carousel />
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
            <p style={{ marginBottom: "1.8rem" }}>
              En <strong style={{ color: "#e0e0e0" }}>octubre de 2025</strong>, el Semillero de Ingeniería Aeroespacial
              SIA participó en el{" "}
              <strong style={{ color: "#e0e0e0" }}>VIII Congreso Nacional de Ingeniería Física</strong>, celebrado en la{" "}
              <strong style={{ color: "#e0e0e0" }}>Universidad del Cauca, Popayán</strong>. Este congreso es uno de los
              escenarios académicos más importantes del país en el área de la física aplicada, y reunió a investigadores,
              docentes y estudiantes de diversas universidades colombianas para presentar avances en sus líneas de trabajo.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <p style={{ marginBottom: "1.8rem" }}>
              El semillero presentó un total de{" "}
              <strong style={{ color: "#e0e0e0" }}>cinco trabajos de investigación</strong>: una{" "}
              <strong style={{ color: "#e0e0e0" }}>presentación oral</strong> y cuatro{" "}
              <strong style={{ color: "#e0e0e0" }}>pósteres científicos</strong>. La ponencia oral se tituló{" "}
              <em>
                "Desarrollo de TUL-CAN SAT: Cubesat 2U con descenso autónomo por autogiro para transporte de carga útil
                y sensado atmosférico en el mundial cansat 2025"
              </em>
              , presentando los resultados y lecciones aprendidas tras la participación del equipo en la competencia
              internacional CanSat 2025.
            </p>
          </FadeIn>

          <FadeIn delay={120}>
            <blockquote
              style={{
                borderLeft: "3px solid #F5C518", margin: "2.4rem 0",
                padding: "1.2rem 1.75rem", background: "rgba(245,197,24,0.04)", borderRadius: "0 2px 2px 0",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif", fontSize: "1.08rem",
                  color: "#e0e0e0", lineHeight: 1.7, margin: 0, fontStyle: "italic",
                }}
              >
                "El congreso fue una oportunidad para mostrar la solidez técnica de nuestros proyectos ante la comunidad
                científica nacional y recibir retroalimentación valiosa de investigadores con amplia experiencia."
              </p>
            </blockquote>
          </FadeIn>

          <FadeIn delay={140}>
            <p style={{ marginBottom: "1rem" }}>
              Los <strong style={{ color: "#e0e0e0" }}>pósteres presentados</strong> abarcaron cuatro líneas de trabajo
              activas en el semillero:
            </p>
            <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.8rem" }}>
              {[
                "Desarrollo de un cansat para el cohete KALA con sistema de aviónica de alta integración y transmisión en tiempo real",
                "Optimización y selección de sistemas de recuperación con paracaídas: análisis desde un caso experimental",
                "Diseño estructural y análisis de propulsión del hidrocohete multietapa KALA-ATLAS X",
                "Diseño, simulación y validación experimental de un cohete multietapa hidropropulsado",
              ].map((title, i) => (
                <li key={i} style={{ color: "#CCCCCC", lineHeight: 1.6 }}>
                  <em>{title}</em>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={160}>
            <p style={{ marginBottom: "1.8rem" }}>
              La participación en este congreso representó una oportunidad valiosa para visibilizar el trabajo del
              semillero a nivel nacional, recibir retroalimentación de la comunidad científica y fortalecer las redes
              académicas con otros grupos de investigación del país. La variedad de los trabajos presentados refleja la{" "}
              <strong style={{ color: "#e0e0e0" }}>diversidad de líneas de investigación</strong> que se desarrollan al
              interior del Semillero SIA, desde sistemas embebidos y aviónica hasta propulsión y aerodinámica.
            </p>
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
