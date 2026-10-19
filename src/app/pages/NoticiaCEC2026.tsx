import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { StarField } from "../components/StarField";

import img1 from "../../media/cec2026/2.jpeg";
import img2 from "../../media/cec2026/3.jpeg";
import img3 from "../../media/cec2026/4.jpeg";
import img4 from "../../media/cec2026/1.jpeg";

const images = [img1, img2, img3, img4];

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
            alt={`Fotografía de la participación ${i + 1}`}
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,10,10,0.65) 0%, transparent 50%)",
          }}
        />
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
        <button
          onClick={prev}
          aria-label="Anterior"
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
          onClick={next}
          aria-label="Siguiente"
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
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a foto ${i + 1}`}
            style={{
              width: i === current ? "1.6rem" : "0.45rem",
              height: "0.45rem",
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
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: "68px", height: "48px", flexShrink: 0, padding: 0,
              border: i === current ? "2px solid #F5C518" : "2px solid transparent",
              cursor: "pointer", overflow: "hidden", transition: "border-color 0.2s", background: "none",
            }}
          >
            <img
              src={src}
              alt={`Miniatura ${i + 1}`}
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

export function NoticiaCEC2026() {
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
            Semillero SIA participa en el III Congreso Espacial Centroamericano CEC 2026 en Guatemala
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "flex", alignItems: "center", gap: "0.35rem",
                fontFamily: "'Caveat', cursive", color: "rgba(245,197,24,0.55)", fontSize: "1rem",
              }}
            >
              <Calendar size={13} color="rgba(245,197,24,0.4)" />
              Septiembre de 2026
            </span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", color: "#555", letterSpacing: "0.05em" }}>
              Semillero SIA · Ciudad de Guatemala, Guatemala
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
              Galería fotográfica
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
              En septiembre de 2026, integrantes del Semillero de Ingeniería Aeroespacial (SIA) de la Universidad del Cauca participaron en el <strong style={{ color: "#e0e0e0" }}>III Congreso Espacial Centroamericano (CEC 2026)</strong>, realizado del 16 al 18 de septiembre en la Universidad del Valle de Guatemala (UVG), en Ciudad de Guatemala. El evento reunió a estudiantes, investigadores y profesionales del sector espacial, propiciando el intercambio de conocimientos, la divulgación científica y la creación de conexiones académicas internacionales.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <p style={{ marginBottom: "1.8rem" }}>
              La representación del semillero estuvo a cargo de <strong style={{ color: "#e0e0e0" }}>Daniela García Córdoba, Danna Isabela Agredo Ruiz y Juan Pablo Cadena Quevedo</strong>, estudiantes de Ingeniería Física, quienes participaron como ponentes en modalidad oral con el trabajo <em>"Diseño, desarrollo y validación del hidrocohete multietapa con módulo de sensado atmosférico KALA - ATLAS X"</em>. La ponencia expuso el proceso de diseño, desarrollo y validación de KALA, un hidrocohete multietapa concebido como plataforma experimental para la aplicación de principios de ingeniería aeroespacial.
            </p>
          </FadeIn>

          <FadeIn delay={120}>
            <p style={{ marginBottom: "1.8rem" }}>
              Esta presentación permitió compartir los avances del proyecto ante una audiencia internacional y visibilizar las capacidades técnicas y científicas desarrolladas por los estudiantes de la Universidad del Cauca. Asimismo, las actividades del congreso ofrecieron espacios para intercambiar experiencias y perspectivas con representantes de distintas instituciones vinculadas al sector espacial.
            </p>
          </FadeIn>

          <FadeIn delay={140}>
            <p style={{ marginBottom: "1.8rem" }}>
              Entre los encuentros destacados se encuentra la oportunidad de compartir experiencias con el <strong style={{ color: "#e0e0e0" }}>Dr. Jason Reimuller</strong>, fundador y director ejecutivo del International Institute for Astronautical Sciences (IIAS), y <strong style={{ color: "#e0e0e0" }}>Daichi Hirano</strong>, ingeniero e investigador sénior en investigación y desarrollo de la Agencia Japonesa de Exploración Aeroespacial (JAXA). Estos acercamientos, junto con los vínculos establecidos con estudiantes, investigadores y profesionales de diferentes países, abren posibilidades para futuras colaboraciones académicas y de investigación, y contribuyen al fortalecimiento de las redes de cooperación del SIA.
            </p>
          </FadeIn>

          <FadeIn delay={160}>
            <p style={{ marginBottom: "1.8rem" }}>
              La participación en el CEC 2026 representa un avance en la proyección internacional del Semillero de Ingeniería Aeroespacial y reafirma su compromiso con la investigación aplicada, la divulgación científica y el desarrollo de soluciones tecnológicas. De esta manera, el SIA continúa consolidando espacios para que sus integrantes compartan sus desarrollos, establezcan alianzas y contribuyan al crecimiento de la comunidad aeroespacial desde la Universidad del Cauca.
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
