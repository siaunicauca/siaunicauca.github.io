import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { StarField } from "../components/StarField";

import img1 from "../../media/Bienvenida/welcom1.jpeg";
import img2 from "../../media/Bienvenida/welcom2.jpeg";
import img3 from "../../media/Bienvenida/welcome3.jpeg";
import img4 from "../../media/Bienvenida/welcom4.jpeg";
import img5 from "../../media/Bienvenida/welcom5.jpeg";
import img6 from "../../media/Bienvenida/welcom6.jpeg";

const images = [img1, img2, img3, img4, img5, img6];

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
      {/* Main image */}
      <div style={{ position: "relative", height: "clamp(260px, 48vw, 560px)", background: "#111" }}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Fotografía del evento ${i + 1}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.5s ease",
              filter: "brightness(0.88)",
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,10,10,0.65) 0%, transparent 50%)",
          }}
        />

        {/* Counter */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(10,10,10,0.7)",
            border: "1px solid rgba(245,197,24,0.25)",
            color: "#F5C518",
            fontFamily: "'Caveat', cursive",
            fontSize: "0.9rem",
            padding: "0.2rem 0.7rem",
          }}
        >
          {current + 1} / {images.length}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Anterior"
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(10,10,10,0.65)",
            border: "1px solid rgba(245,197,24,0.25)",
            color: "#F5C518",
            width: "2.4rem",
            height: "2.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,197,24,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,10,10,0.65)";
          }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Siguiente"
          style={{
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(10,10,10,0.65)",
            border: "1px solid rgba(245,197,24,0.25)",
            color: "#F5C518",
            width: "2.4rem",
            height: "2.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,197,24,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,10,10,0.65)";
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dot indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "0.85rem 0",
          background: "#111111",
          borderTop: "1px solid rgba(245,197,24,0.07)",
        }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a foto ${i + 1}`}
            style={{
              width: i === current ? "1.6rem" : "0.45rem",
              height: "0.45rem",
              background: i === current ? "#F5C518" : "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "999px",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>

      {/* Thumbnails strip */}
      <div
        style={{
          display: "flex",
          gap: "0.4rem",
          padding: "0 0 0.85rem 0",
          background: "#111111",
          overflowX: "auto",
          justifyContent: "center",
        }}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: "68px",
              height: "48px",
              flexShrink: 0,
              padding: 0,
              border: i === current ? "2px solid #F5C518" : "2px solid transparent",
              cursor: "pointer",
              overflow: "hidden",
              transition: "border-color 0.2s",
              background: "none",
            }}
          >
            <img
              src={src}
              alt={`Miniatura ${i + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: i === current ? 1 : 0.45,
                transition: "opacity 0.2s",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function NoticiaPresentacionSIA() {
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

          {/* Back link */}
          <Link
            to="/noticias"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "rgba(245,197,24,0.6)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              marginBottom: "2rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5C518")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,197,24,0.6)")}
          >
            <ArrowLeft size={13} /> Noticias
          </Link>

          {/* Category badge */}
          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                background: "rgba(100,180,255,0.1)",
                border: "1px solid rgba(100,180,255,0.3)",
                color: "#64b4ff",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "0.28rem 0.65rem",
              }}
            >
              Evento
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.45rem, 3.8vw, 2.4rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: 0,
              marginBottom: "1.5rem",
              lineHeight: 1.25,
            }}
          >
            Semillero de Ingeniería Aeroespacial SIA es presentado oficialmente ante la comunidad académica de la Universidad del Cauca
          </h1>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                fontFamily: "'Caveat', cursive",
                color: "rgba(245,197,24,0.55)",
                fontSize: "1rem",
              }}
            >
              <Calendar size={13} color="rgba(245,197,24,0.4)" />
              5 de diciembre de 2025
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.72rem",
                color: "#555",
                letterSpacing: "0.05em",
              }}
            >
              Semillero SIA
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3.5rem 2rem 5rem" }}>

        {/* Photo carousel */}
        <FadeIn>
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(245,197,24,0.45)",
                marginBottom: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <span style={{ width: "24px", height: "1px", background: "rgba(245,197,24,0.35)", display: "block" }} />
              Galería fotográfica del evento
            </div>
            <Carousel />
          </div>
        </FadeIn>

        {/* Separator */}
        <FadeIn delay={60}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2.8rem",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "rgba(245,197,24,0.1)" }} />
            <div style={{ width: "6px", height: "6px", background: "#F5C518", transform: "rotate(45deg)", flexShrink: 0 }} />
            <div style={{ flex: 1, height: "1px", background: "rgba(245,197,24,0.1)" }} />
          </div>
        </FadeIn>

        {/* Article body */}
        <div
          style={{
            fontFamily: "'Inter', 'DM Sans', sans-serif",
            fontSize: "1.02rem",
            lineHeight: 1.85,
            color: "#C8C8C8",
          }}
        >

          <FadeIn delay={80}>
            <p style={{ marginBottom: "1.8rem" }}>
              El <strong style={{ color: "#e0e0e0" }}>5 de diciembre de 2025</strong> se llevó a cabo la presentación
              oficial del Semillero de Ingeniería Aeroespacial SIA ante la comunidad académica de la Universidad del
              Cauca, en un evento realizado en el auditorio principal de la{" "}
              <strong style={{ color: "#e0e0e0" }}>
                Facultad de Ciencias Naturales, Exactas y de la Educación (FACNED)
              </strong>
              . Esta actividad marcó un hito para el semillero, tras obtener su reconocimiento oficial por parte de la{" "}
              <strong style={{ color: "#e0e0e0" }}>Vicerrectoría de Investigaciones (VRI)</strong> de la universidad.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <p style={{ marginBottom: "1.8rem" }}>
              Con este reconocimiento institucional, el Semillero SIA pasa a formar parte del sistema de semilleros de
              investigación de la Universidad del Cauca, lo que le permite acceder a oportunidades de formación
              investigativa, convocatorias y espacios académicos orientados al fortalecimiento de las capacidades
              científicas de los estudiantes. El semillero se encuentra adscrito al{" "}
              <strong style={{ color: "#e0e0e0" }}>
                Grupo de Investigación en Sistemas Dinámicos, Instrumentación y Control (SIDICO)
              </strong>{" "}
              del Departamento de Física.
            </p>
          </FadeIn>

          <FadeIn delay={120}>
            <p style={{ marginBottom: "1.8rem" }}>
              El evento contó con la participación de miembros del semillero, docentes, directivos, egresados, aliados
              estratégicos y estudiantes de diferentes programas académicos, quienes atendieron la invitación abierta
              realizada a toda la comunidad universitaria. Durante la jornada se presentó la información general del
              semillero, incluyendo su misión, visión, objetivos, plan de trabajo, proyectos en desarrollo, actividades
              realizadas y principales resultados alcanzados desde su creación.
            </p>
          </FadeIn>

          {/* Highlighted quote */}
          <FadeIn delay={140}>
            <blockquote
              style={{
                borderLeft: "3px solid #F5C518",
                margin: "2.4rem 0",
                padding: "1.2rem 1.75rem",
                background: "rgba(245,197,24,0.04)",
                borderRadius: "0 2px 2px 0",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.08rem",
                  color: "#e0e0e0",
                  lineHeight: 1.7,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                "El evento incluyó intervenciones institucionales por parte del jefe del Departamento de Física, la
                mentora del semillero y el coordinador del Semillero SIA, quienes resaltaron la importancia de fortalecer
                los espacios de investigación formativa."
              </p>
            </blockquote>
          </FadeIn>

          <FadeIn delay={160}>
            <p style={{ marginBottom: "1.8rem" }}>
              Asimismo, el evento incluyó intervenciones institucionales por parte del jefe del Departamento de Física,
              la mentora del semillero y el coordinador del Semillero SIA, quienes resaltaron la importancia de
              fortalecer los espacios de investigación formativa y promover iniciativas interdisciplinarias que impulsen
              el desarrollo científico y tecnológico en áreas estratégicas como la ingeniería aeroespacial.
            </p>
          </FadeIn>

          <FadeIn delay={180}>
            <p style={{ marginBottom: "1.8rem" }}>
              Como parte del acto protocolario, se realizó la{" "}
              <strong style={{ color: "#e0e0e0" }}>entrega de reconocimientos</strong> a estudiantes y docentes que han
              contribuido al crecimiento del semillero. Las distinciones se otorgaron en diferentes categorías, entre
              ellas: <em>fundadores</em>, <em>aliados estratégicos</em>, <em>menciones de honor</em> y{" "}
              <em>proyectos destacados y de excelencia</em>, destacando el compromiso y el trabajo colaborativo que han
              permitido consolidar esta iniciativa académica.
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <p style={{ marginBottom: "1.8rem" }}>
              La jornada concluyó con un espacio de integración y una fotografía grupal con los asistentes, celebrando
              este importante paso en la consolidación del semillero y reafirmando su compromiso con la{" "}
              <strong style={{ color: "#e0e0e0" }}>formación investigativa</strong>, el{" "}
              <strong style={{ color: "#e0e0e0" }}>desarrollo tecnológico</strong> y la{" "}
              <strong style={{ color: "#e0e0e0" }}>proyección académica</strong> de la Universidad del Cauca.
            </p>
          </FadeIn>
        </div>

        {/* Bottom separator */}
        <FadeIn delay={220}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              margin: "3rem 0 2.5rem",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "rgba(245,197,24,0.1)" }} />
            <div style={{ width: "6px", height: "6px", background: "rgba(245,197,24,0.4)", transform: "rotate(45deg)", flexShrink: 0 }} />
            <div style={{ flex: 1, height: "1px", background: "rgba(245,197,24,0.1)" }} />
          </div>
        </FadeIn>

        {/* Back to news */}
        <FadeIn delay={240}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <Link
              to="/noticias"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#F5C518",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textDecoration: "none",
                border: "1px solid rgba(245,197,24,0.3)",
                padding: "0.55rem 1.1rem",
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
              <ArrowLeft size={13} /> Volver a Noticias
            </Link>

            <div
              style={{
                fontFamily: "'Caveat', cursive",
                color: "rgba(245,197,24,0.35)",
                fontSize: "0.88rem",
              }}
            >
              Semillero SIA · Universidad del Cauca
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
