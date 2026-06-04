import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Calendar, MapPin, CalendarDays, Mic, BookOpen } from "lucide-react";
import { StarField } from "../components/StarField";

import coverImg from "../../media/Bienvenida/welcom1.jpeg";

// ── Imágenes de conferencias ──────────────────────────────────────────────────
// Conf 2 — Encuentro Ing. Física, Popayán 2024
import conf2_KatariSociety    from "../../media/EncuentroIngFisicaPopayan/KatariSociety.jpeg";
import conf2_Sentinel1        from "../../media/EncuentroIngFisicaPopayan/Sentinel1.jpeg";
import conf2_Sentinel2        from "../../media/EncuentroIngFisicaPopayan/Sentinel2.jpeg";
import conf2_TulcanSatEquipo  from "../../media/EncuentroIngFisicaPopayan/TulcanSatEquipo.jpeg";
import conf2_Solomon99        from "../../media/EncuentroIngFisicaPopayan/solomon99.jpeg";
import conf2_UdcRocket        from "../../media/EncuentroIngFisicaPopayan/udcRocketSia.jpeg";
import conf2_UdcRocket1       from "../../media/EncuentroIngFisicaPopayan/udcRocketSia1.jpeg";
// Conf 3 — STEM+ Colombia 2025
import conf3_EncuentroTodos   from "../../media/EncuentroStemColombia/EncuentroTodos.jpeg";
import conf3_DiversionRobotica from "../../media/EncuentroStemColombia/diversionRobotica.jpeg";
// Conf 4 — Ciencia al Parque 2025
import conf4_Rover            from "../../media/CienciaAlParqueUnicomfacauca/Rover.jpeg";
import conf4_TulcanSat        from "../../media/CienciaAlParqueUnicomfacauca/TulcanSat.jpeg";
// Conf 5 — VIII Congreso Ing. Física 2025
import conf5_OralTulcanSat        from "../../media/6CongresoIngenieriaFisicaPopayan/OralTulcanSat.jpeg";
import conf5_PosterCoheteMultietapa from "../../media/6CongresoIngenieriaFisicaPopayan/posterCoheteMultietapa.jpeg";
import conf5_EquipoKala            from "../../media/6CongresoIngenieriaFisicaPopayan/equipoKalaPosteres.jpeg";
// Conf 6 — V Simposio SSEA, Múnich 2026
import conf6_PosterCoheteAgua      from "../../media/5SimposioMunich/posterCoheteAgua.jpeg";
import conf6_EntradaSSEA           from "../../media/5SimposioMunich/entradaSSEA.jpeg";
import conf6_PresentacionRobotics  from "../../media/5SimposioMunich/presentacionRoboticsFun.jpeg";

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

type Category = "Todos" | "Evento" | "Conferencia" | "Laboratorio" | "Simulación" | "Premio" | "Publicación";

interface NewsItem {
  id: number;
  image: string;
  category: Exclude<Category, "Todos">;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  featured: boolean;
  readTime: string;
  slug: string;
}

const news: NewsItem[] = [
  {
    id: 1,
    image: coverImg,
    category: "Evento",
    title: "Semillero de Ingeniería Aeroespacial SIA es presentado oficialmente ante la comunidad académica de la Universidad del Cauca",
    excerpt:
      "El 5 de diciembre de 2025 se llevó a cabo la presentación oficial del Semillero de Ingeniería Aeroespacial SIA ante la comunidad académica de la Universidad del Cauca, en un evento realizado en el auditorio principal de la Facultad de Ciencias Naturales, Exactas y de la Educación (FACNED), marcando un hito tras obtener su reconocimiento oficial por parte de la Vicerrectoría de Investigaciones (VRI).",
    date: "5 Diciembre, 2025",
    author: "Semillero SIA",
    featured: true,
    readTime: "6 min",
    slug: "presentacion-oficial-sia-2025",
  },
  {
    id: 2,
    image: conf5_EquipoKala,
    category: "Conferencia",
    title: "Semillero SIA en el VIII Congreso Nacional de Ingeniería Física con cinco trabajos de investigación",
    excerpt:
      "En octubre de 2025, el Semillero SIA participó en el VIII Congreso Nacional de Ingeniería Física en Popayán, presentando una ponencia oral sobre el TUL-CAN SAT y cuatro pósteres científicos que abarcan propulsión, aviónica y sistemas de recuperación.",
    date: "Octubre, 2025",
    author: "Semillero SIA",
    featured: false,
    readTime: "4 min",
    slug: "viii-congreso-ingenieria-fisica-2025",
  },
  {
    id: 3,
    image: conf6_EntradaSSEA,
    category: "Conferencia",
    title: "Semillero SIA participa en el V Simposio sobre Actividades Educativas Espaciales en Múnich, Alemania",
    excerpt:
      "En abril de 2026, miembros del Semillero SIA presentaron en el V Simposio SSEA organizado por ESA y TU München, con una ponencia oral sobre robótica educativa y un póster sobre validación experimental de cohete hidropropulsado multietapa.",
    date: "Abril, 2026",
    author: "Semillero SIA",
    featured: true,
    readTime: "4 min",
    slug: "v-simposio-actividades-espaciales-munich-2026",
  },
];

const categoryColors: Record<Category, { bg: string; text: string; border: string }> = {
  Todos:       { bg: "rgba(245,197,24,0.1)",   text: "#F5C518", border: "rgba(245,197,24,0.3)" },
  Evento:      { bg: "rgba(100,180,255,0.1)",  text: "#64b4ff", border: "rgba(100,180,255,0.3)" },
  Conferencia: { bg: "rgba(100,180,255,0.1)",  text: "#64b4ff", border: "rgba(100,180,255,0.3)" },
  Laboratorio: { bg: "rgba(34,197,94,0.1)",    text: "#22c55e", border: "rgba(34,197,94,0.3)" },
  Simulación:  { bg: "rgba(200,100,255,0.1)",  text: "#c864ff", border: "rgba(200,100,255,0.3)" },
  Premio:      { bg: "rgba(245,197,24,0.12)",  text: "#F5C518", border: "rgba(245,197,24,0.4)" },
  Publicación: { bg: "rgba(255,150,50,0.1)",   text: "#ff9632", border: "rgba(255,150,50,0.3)" },
};

// ─── CONFERENCIAS ─────────────────────────────────────────────────────────────
interface Conference {
  id: number;
  name: string;
  location: string;
  date: string;
  oral: string[];
  poster: string[];
  images: { src: string; alt: string }[];
}

const conferences: Conference[] = [
  {
    id: 1,
    name: "1er Congreso de Desarrollo Aeroespacial Colombiano — CODEAC",
    location: "Medellín",
    date: "Octubre, 2023",
    oral: [
      "Sistema en agricultura de precisión: optimización de producción en cultivos de café mediante aeronave UAV",
    ],
    poster: [],
    images: [],
  },
  {
    id: 2,
    name: "Primer Encuentro de Divulgación Académica y Cultural de Estudiantes de Ingeniería Física",
    location: "Popayán",
    date: "Febrero, 2024",
    oral: [
      "TUL-CAN SAT: Satélite enlatado para el mundial cansat 2024",
      "UDC ROCKET-SIA: Cohete propulsado por agua para el Robotic People Fest Aeroespacial",
      "Katari Society: Cohete de combustible sólido para LASC 2023",
      "Salomon-99: Construcción, ambiente de simulación y manejo por radio-control de una aeronave zagi para introducción al aeromodelismo",
    ],
    poster: [
      "Desarrollo experimental de un motor de cohete sólido con combustible candy",
      "SIA: Semillero de Ingeniería Aeroespacial",
      "Sentinel: Diseño, construcción y prueba de una aeronave zagi para la competencia zagi aess race",
    ],
    images: [
      { src: conf2_TulcanSatEquipo,  alt: "Equipo TUL-CAN SAT" },
      { src: conf2_UdcRocket,        alt: "UDC Rocket SIA" },
      { src: conf2_UdcRocket1,       alt: "UDC Rocket SIA lanzamiento" },
      { src: conf2_KatariSociety,    alt: "Katari Society cohete sólido" },
      { src: conf2_Solomon99,        alt: "Salomon-99 aeronave zagi" },
      { src: conf2_Sentinel1,        alt: "Sentinel zagi aess race" },
      { src: conf2_Sentinel2,        alt: "Sentinel competencia" },
    ],
  },
  {
    id: 3,
    name: "Encuentro STEM+ Colombia 2025",
    location: "Medellín",
    date: "Agosto, 2025",
    oral: [
      "Diversión Robótica: Aprendizaje de las áreas STEM a través del juego",
    ],
    poster: [],
    images: [
      { src: conf3_EncuentroTodos,    alt: "Foto grupal Encuentro STEM+ Colombia 2025" },
      { src: conf3_DiversionRobotica, alt: "Presentación Diversión Robótica" },
    ],
  },
  {
    id: 4,
    name: "Ciencia al Parque",
    location: "Popayán",
    date: "Septiembre, 2025",
    oral: [],
    poster: [
      "Rover Astrek: Vehículo autónomo y portable para monitoreo ambiental",
      "Desarrollo de TUL-CAN SAT: Cubesat 2U con descenso autónomo por autogiro para transporte de carga útil y sensado atmosférico en el mundial cansat 2025",
      "Air-sat: Cansat de monitoreo para la contaminación del aire",
    ],
    images: [
      { src: conf4_Rover,     alt: "Póster Rover Astrek" },
      { src: conf4_TulcanSat, alt: "Póster TUL-CAN SAT" },
    ],
  },
  {
    id: 5,
    name: "VIII Congreso Nacional de Ingeniería Física",
    location: "Popayán",
    date: "Octubre, 2025",
    oral: [
      "Desarrollo de TUL-CAN SAT: Cubesat 2U con descenso autónomo por autogiro para transporte de carga útil y sensado atmosférico en el mundial cansat 2025",
    ],
    poster: [
      "Desarrollo de un cansat para el cohete kala con sistema de aviónica de alta integración y transmisión en tiempo real",
      "Optimización y selección de sistemas de recuperación con paracaídas: análisis desde un caso experimental",
      "Diseño estructural y análisis de propulsión del hidrocohete multietapa KALA-ATLAS X",
      "Diseño, simulación y validación experimental de un cohete multietapa hidropropulsado",
    ],
    images: [
      { src: conf5_OralTulcanSat,          alt: "Presentación oral TUL-CAN SAT" },
      { src: conf5_EquipoKala,             alt: "Equipo SIA con cohete KALA y pósteres" },
      { src: conf5_PosterCoheteMultietapa, alt: "Póster cohete multietapa hidropropulsado" },
    ],
  },
  {
    id: 6,
    name: "V Simposio sobre Actividades Educativas Espaciales",
    location: "Múnich, Alemania",
    date: "Abril, 2026",
    oral: [
      "Robotics Fun: Learning STEM through play",
    ],
    poster: [
      "Design, simulation and experimental validation of a multi-stage water-propelled rocket",
    ],
    images: [
      { src: conf6_EntradaSSEA,           alt: "Entrada al Symposium on Space Educational Activities — TU Munich" },
      { src: conf6_PosterCoheteAgua,      alt: "Póster cohete agua multietapa, Múnich 2026" },
      { src: conf6_PresentacionRobotics,  alt: "Presentación oral Robotics Fun: Learning STEM through Play" },
    ],
  },
];

function ConferenciasSection() {
  return (
    <section
      style={{
        background: "#080808",
        borderTop: "1px solid rgba(245,197,24,0.08)",
        padding: "5rem 2rem 6rem",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div
              style={{
                fontFamily: "'Caveat', cursive",
                color: "rgba(245,197,24,0.4)",
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
              }}
            >
              Fig. 5.1 — Registro de Ponencias
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.68rem",
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
              Participaciones en Conferencias
              <span style={{ display: "block", width: "30px", height: "1px", background: "#F5C518" }} />
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Nuestras <span style={{ color: "#F5C518" }}>Ponencias</span>
            </h2>
          </div>
        </FadeIn>

        {/* Conference cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {conferences.map((conf, i) => (
            <FadeIn key={conf.id} delay={i * 100}>
              <div
                style={{
                  background: "#111111",
                  border: "1px solid rgba(245,197,24,0.1)",
                  borderLeft: "3px solid rgba(245,197,24,0.5)",
                  padding: "1.75rem 2rem",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,197,24,0.35)";
                  (e.currentTarget as HTMLElement).style.borderLeftColor = "#F5C518";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,197,24,0.1)";
                  (e.currentTarget as HTMLElement).style.borderLeftColor = "rgba(245,197,24,0.5)";
                }}
              >
                {/* Conference number + title */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "#F5C518",
                      background: "rgba(245,197,24,0.1)",
                      border: "1px solid rgba(245,197,24,0.2)",
                      padding: "0.2rem 0.55rem",
                      flexShrink: 0,
                      marginTop: "0.2rem",
                    }}
                  >
                    {String(conf.id).padStart(2, "0")}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {conf.name}
                  </h3>
                </div>

                {/* Location + date pills */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.72rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#888",
                    }}
                  >
                    <MapPin size={11} color="#F5C518" /> {conf.location}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.72rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#888",
                    }}
                  >
                    <CalendarDays size={11} color="#F5C518" /> {conf.date}
                  </span>
                </div>

                {/* Oral presentations */}
                {conf.oral.length > 0 && (
                  <div style={{ marginBottom: conf.poster.length > 0 ? "1rem" : 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#F5C518",
                        marginBottom: "0.6rem",
                      }}
                    >
                      <Mic size={11} /> Presentación Oral
                    </div>
                    <ul style={{ margin: 0, paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {conf.oral.map((title, j) => (
                        <li
                          key={j}
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.84rem",
                            color: "#CCCCCC",
                            lineHeight: 1.55,
                          }}
                        >
                          {title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Poster presentations */}
                {conf.poster.length > 0 && (
                  <div style={{ marginBottom: conf.images.length > 0 ? "1.25rem" : 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#888",
                        marginBottom: "0.6rem",
                      }}
                    >
                      <BookOpen size={11} /> Presentación tipo Póster
                    </div>
                    <ul style={{ margin: 0, paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {conf.poster.map((title, j) => (
                        <li
                          key={j}
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.84rem",
                            color: "#888",
                            lineHeight: 1.55,
                          }}
                        >
                          {title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Photo gallery */}
                {conf.images.length > 0 && (
                  <div
                    style={{
                      borderTop: "1px solid rgba(245,197,24,0.08)",
                      paddingTop: "1.25rem",
                      marginTop: conf.oral.length === 0 && conf.poster.length === 0 ? 0 : undefined,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        overflowX: "auto",
                        paddingBottom: "0.25rem",
                      }}
                    >
                      {conf.images.map((img, j) => (
                        <img
                          key={j}
                          src={img.src}
                          alt={img.alt}
                          style={{
                            height: "150px",
                            width: "auto",
                            flexShrink: 0,
                            objectFit: "cover",
                            borderRadius: "2px",
                            filter: "brightness(0.9)",
                            transition: "filter 0.25s, transform 0.25s",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLImageElement).style.filter = "brightness(1)";
                            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.02)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.9)";
                            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                          }}
                          onClick={() => window.open(img.src, "_blank")}
                          title={img.alt}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("Todos");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filters: Category[] = ["Todos", "Evento", "Conferencia"];
  const filtered = activeFilter === "Todos" ? news : news.filter((n) => n.category === activeFilter);
  const featured = filtered.filter((n) => n.featured);
  const regular = filtered.filter((n) => !n.featured);

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
        <StarField density={90} />
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Caveat', cursive", color: "rgba(245,197,24,0.4)", fontSize: "0.95rem", marginBottom: "0.75rem" }}>
            Fig. 5 — Registro Cronológico · Semillero SIA
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
            NOTICIAS DEL
            <span style={{ color: "#F5C518" }}> SEMILLERO</span>
          </h1>
          <p style={{ color: "#CCCCCC", fontSize: "1rem", lineHeight: 1.8, maxWidth: "580px", margin: "0 auto" }}>
            Logros, eventos y avances del Semillero de Ingeniería Aeroespacial SIA.
            Nuestra trayectoria hacia las estrellas, documentada.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "4rem 2rem" }}>

        {/* Filter pills */}
        <FadeIn>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            {filters.map((f) => {
              const col = categoryColors[f];
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    background: isActive ? col.bg : "transparent",
                    color: isActive ? col.text : "#888",
                    border: isActive ? `1px solid ${col.border}` : "1px solid rgba(255,255,255,0.1)",
                    padding: "0.4rem 1rem",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Featured news */}
        {featured.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(245,197,24,0.5)",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ width: "30px", height: "1px", background: "rgba(245,197,24,0.4)", display: "block" }} />
              Destacado
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {featured.map((item) => {
                const col = categoryColors[item.category];
                const isHovered = hoveredCard === item.id;
                return (
                  <FadeIn key={item.id}>
                    <div
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        background: "#111111",
                        border: "1px solid rgba(245,197,24,0.12)",
                        borderLeft: "4px solid #F5C518",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.3s",
                        boxShadow: isHovered ? "0 12px 40px rgba(245,197,24,0.1)" : "none",
                        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      }}
                    >
                      <div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter: "brightness(0.65)",
                            transform: isHovered ? "scale(1.03)" : "scale(1)",
                            transition: "transform 0.4s",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "80px",
                            background: "linear-gradient(transparent, rgba(17,17,17,0.97))",
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "1rem",
                            left: "1rem",
                            background: col.bg,
                            border: `1px solid ${col.border}`,
                            color: col.text,
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            padding: "0.25rem 0.6rem",
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div style={{ padding: "1.75rem", flex: 1 }}>
                        <h3
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            margin: 0,
                            marginBottom: "0.8rem",
                            lineHeight: 1.35,
                          }}
                        >
                          {item.title}
                        </h3>
                        <p style={{ color: "#999", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                          {item.excerpt}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: "1rem",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            flexWrap: "wrap",
                            gap: "0.75rem",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                color: "#666",
                                fontFamily: "'Caveat', cursive",
                                fontSize: "0.85rem",
                              }}
                            >
                              <Calendar size={12} color="rgba(245,197,24,0.5)" /> {item.date}
                            </span>
                            <span style={{ color: "#555", fontSize: "0.78rem" }}>{item.readTime} lectura</span>
                          </div>
                          <Link
                            to={`/noticias/${item.slug}`}
                            style={{
                              color: "#F5C518",
                              textDecoration: "none",
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontSize: "0.75rem",
                              letterSpacing: "0.06em",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              border: "1px solid rgba(245,197,24,0.3)",
                              padding: "0.35rem 0.85rem",
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
                            Leer más <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular news grid */}
        {regular.length > 0 && (
          <>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(245,197,24,0.4)",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ width: "30px", height: "1px", background: "rgba(245,197,24,0.3)", display: "block" }} />
              Más Noticias
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.5rem",
              }}
              className="news-grid"
            >
              {regular.map((item, i) => {
                const col = categoryColors[item.category];
                const isHovered = hoveredCard === item.id;
                return (
                  <FadeIn key={item.id} delay={i * 80}>
                    <div
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        background: "#111111",
                        border: "1px solid rgba(245,197,24,0.08)",
                        overflow: "hidden",
                        transition: "all 0.3s",
                        boxShadow: isHovered ? "0 8px 32px rgba(245,197,24,0.08)" : "none",
                        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                      }}
                    >
                      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter: "brightness(0.6)",
                            transform: isHovered ? "scale(1.04)" : "scale(1)",
                            transition: "transform 0.4s",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "60px",
                            background: "linear-gradient(transparent, rgba(17,17,17,0.97))",
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "0.75rem",
                            left: "0.75rem",
                            background: col.bg,
                            border: `1px solid ${col.border}`,
                            color: col.text,
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.58rem",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            padding: "0.2rem 0.5rem",
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div style={{ padding: "1.5rem" }}>
                        <h4
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            margin: 0,
                            marginBottom: "0.6rem",
                            lineHeight: 1.4,
                          }}
                        >
                          {item.title}
                        </h4>
                        <p style={{ color: "#888", fontSize: "0.82rem", lineHeight: 1.65, marginBottom: "1rem" }}>
                          {item.excerpt.substring(0, 100)}...
                        </p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span
                            style={{
                              fontFamily: "'Caveat', cursive",
                              color: "rgba(245,197,24,0.4)",
                              fontSize: "0.82rem",
                            }}
                          >
                            {item.date}
                          </span>
                          <Link
                            to={`/noticias/${item.slug}`}
                            style={{
                              color: "#F5C518",
                              textDecoration: "none",
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontSize: "0.7rem",
                              letterSpacing: "0.06em",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                            }}
                          >
                            Leer más <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "5rem 2rem", color: "#555" }}>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              Sin resultados para esta categoría
            </div>
            <button
              onClick={() => setActiveFilter("Todos")}
              style={{
                background: "none",
                border: "1px solid rgba(245,197,24,0.3)",
                color: "#F5C518",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.72rem",
                marginTop: "1rem",
              }}
            >
              Ver todas
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .news-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <ConferenciasSection />
    </div>
  );
}
