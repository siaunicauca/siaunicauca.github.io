import { useRef, useEffect, useState } from "react";
import { MapPin, CalendarDays, Mic, BookOpen } from "lucide-react";
import { StarField } from "../components/StarField";

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

function ConferenciasList() {
  return (
    <section style={{ background: "#0A0A0A", padding: "4rem 2rem 6rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Conference cards — `conferences` va en orden cronológico y aquí se
            invierte para mostrar primero la más reciente. El número de la
            tarjeta conserva el orden cronológico del evento. */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[...conferences].reverse().map((conf, i) => (
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

export function PresentationsPage() {
  const totalOral = conferences.reduce((acc, c) => acc + c.oral.length, 0);
  const totalPoster = conferences.reduce((acc, c) => acc + c.poster.length, 0);

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
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              color: "rgba(245,197,24,0.4)",
              fontSize: "0.95rem",
              marginBottom: "0.75rem",
            }}
          >
            Fig. 6 — Registro de Ponencias · Semillero SIA
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
            PONENCIAS Y
            <span style={{ color: "#F5C518" }}> PRESENTACIONES</span>
          </h1>
          <p style={{ color: "#CCCCCC", fontSize: "1rem", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>
            Participaciones del Semillero SIA en congresos, encuentros y simposios
            nacionales e internacionales, con presentaciones orales y pósteres científicos.
          </p>

          {/* Resumen */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1px",
              background: "rgba(245,197,24,0.12)",
              border: "1px solid rgba(245,197,24,0.12)",
              marginTop: "2.5rem",
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {[
              { num: String(conferences.length), label: "Eventos" },
              { num: String(totalOral), label: "Ponencias Orales" },
              { num: String(totalPoster), label: "Pósteres" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#111111", padding: "1.25rem 1rem", flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.8rem",
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
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#888",
                    marginTop: "0.35rem",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConferenciasList />
    </div>
  );
}
