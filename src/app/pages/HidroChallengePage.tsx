import { useState, useEffect, useRef } from "react";
import { StarField } from "../components/StarField";
import {
  Clock,
  FileText,
  ExternalLink,
  Image as ImageIcon,
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
  { date: "1 Mar 2026", title: "Apertura de convocatoria", description: "Se abre la inscripción para equipos nacionales e internacionales.", icon: <CalendarDays size={18} /> },
  { date: "30 Jun 2026", title: "Cierre de inscripciones", description: "Fecha límite para registrar tu equipo y enviar documentación.", icon: <FileText size={18} /> },
  { date: "15 Ago 2026", title: "Revisión de diseño preliminar", description: "Los equipos presentan su diseño de cohete para evaluación técnica.", icon: <Rocket size={18} /> },
  { date: "1 Oct 2026", title: "Entrega de informe final", description: "Documentación técnica completa y video del proceso de manufactura.", icon: <FileText size={18} /> },
  { date: "14-16 Oct 2026", title: "Evento presencial — Lanzamientos", description: "Competencia de lanzamientos en el Instituto Politécnico Nacional, Ciudad de México.", icon: <MapPin size={18} /> },
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
                  <p style={{ color: "#AAAAAA", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
                    {ev.description}
                  </p>
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
const galleryImages = [
  { src: "/images/hidrochallenge/img1.jpg", alt: "Lanzamiento de cohete hidropropulsado", caption: "Lanzamiento — HidroChallenge 2024" },
  { src: "/images/hidrochallenge/img2.jpg", alt: "Equipo de trabajo en el taller", caption: "Manufactura — Equipo Ad Astra" },
  { src: "/images/hidrochallenge/img3.jpg", alt: "Revisión de diseño", caption: "Revisión de diseño preliminar" },
  { src: "/images/hidrochallenge/img4.jpg", alt: "Ceremonia de premiación", caption: "Ceremonia — HidroChallenge 2024" },
];

function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section style={{ background: "#0F0F0F", padding: "5rem 2rem", position: "relative", overflow: "hidden" }}>
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

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
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
              Galería
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
              Momentos <span style={{ color: "#F5C518" }}>Destacados</span>
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
          {galleryImages.map((img, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div
                onClick={() => setSelected(i)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: "4px",
                  border: "1px solid rgba(245,197,24,0.1)",
                  aspectRatio: "4/3",
                  background: "#1A1A1A",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(245,197,24,0.4)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(245,197,24,0.1)")}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    e.currentTarget.parentElement!.querySelector<HTMLElement>(".placeholder")!.style.display = "flex";
                  }}
                />
                {/* Placeholder when image not found */}
                <div
                  className="placeholder"
                  style={{
                    display: "none",
                    position: "absolute",
                    inset: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "0.5rem",
                    color: "rgba(245,197,24,0.3)",
                  }}
                >
                  <ImageIcon size={32} />
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
                    Sin imagen
                  </span>
                </div>
                {/* Caption overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                    padding: "2rem 0.75rem 0.75rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Caveat', cursive",
                      color: "rgba(245,197,24,0.6)",
                      fontSize: "0.8rem",
                    }}
                  >
                    {img.caption}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            padding: "2rem",
          }}
        >
          <img
            src={galleryImages[selected].src}
            alt={galleryImages[selected].alt}
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "4px" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              color: "#CCCCCC",
              fontFamily: "'Caveat', cursive",
              fontSize: "1rem",
            }}
          >
            {galleryImages[selected].caption}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── DOCUMENTO PDF ──────────────────────────────────────────────────────────
function DocumentSection() {
  // Cambia esta ruta al PDF real de la convocatoria
  const pdfUrl = "/documents/hidrochallenge-convocatoria-2026.pdf";

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
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── ENLACE EXTERNO ─────────────────────────────────────────────────────────
function ExternalLinkSection() {
  const externalUrl = "https://hidrochallenge.com"; // Cambia al enlace real

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
        <p style={{ color: "#CCCCCC", fontSize: "1rem", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>
          Competencia internacional de cohetes hidropropulsados organizada por el Instituto Politécnico Nacional. 
          El Semillero Ad Astra participa representando a la Universidad del Cauca.
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
      <GallerySection />
      <DocumentSection />
      <ExternalLinkSection />
    </div>
  );
}