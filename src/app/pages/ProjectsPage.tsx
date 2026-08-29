import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Camera, Trophy, X } from "lucide-react";
import { StarField } from "../components/StarField";

import logoSia from "../../media/Logos/LOGO_SIA_FORMATO_CIRCULAR.PNG";

// ── SIA KIDS — Formación aeroespacial para la infancia ────────────────────────
import kids_Afiche        from "../../media/Proyectos/SiaKids/afichePromocionalSiaKids.jpeg";
import kids_Trabajos      from "../../media/Proyectos/SiaKids/trabajosPequenosAviadores.jpeg";
import kids_PrimerDia     from "../../media/Proyectos/SiaKids/primerDiaSiaKids.jpeg";
// ── Sentinel — ZAGI AESS RACE, Bogotá ─────────────────────────────────────────
import sentinel_Jueces      from "../../media/Proyectos/Sentinel/evaluacionJuecesZagiRace.jpeg";
import sentinel_Premiacion  from "../../media/Proyectos/Sentinel/equipoPremiacionZagiRace.jpeg";
// ── Katari Society — LASC 2023 (Brasil) · ENMICE 2025 (México) ────────────────
import katari_EquipoLasc    from "../../media/Proyectos/KatariSociety/equipoLascBrasil2023.jpeg";
import katari_Ceremonia     from "../../media/Proyectos/KatariSociety/equipoCeremoniaLasc2023.jpeg";
import katari_CoheteCampo   from "../../media/Proyectos/KatariSociety/coheteKatariCampoLasc.jpeg";
import katari_StandEnmice   from "../../media/Proyectos/KatariSociety/standKatariEnmice2025.jpeg";
import katari_Sayula        from "../../media/Proyectos/KatariSociety/equipoSayulaEnmice2025.jpeg";
import katari_CargaUtil     from "../../media/Proyectos/KatariSociety/revisionCargaUtilEnmice.jpeg";
// ── UDC Rocket SIA — Robotic People Fest Aeroespacial, UMNG Bogotá ────────────
import udc_Lanzamiento      from "../../media/Proyectos/UdcRocketSia/lanzamientoCoheteUmng.jpeg";
import udc_Estacion         from "../../media/Proyectos/UdcRocketSia/equipoEstacionTerrena.jpeg";
import udc_EquipoCohetes    from "../../media/Proyectos/UdcRocketSia/equipoCohetesUmng.jpeg";
import udc_PlazaBolivar     from "../../media/Proyectos/UdcRocketSia/coheteAguaPlazaBolivar.jpeg";
import udc_Etitc            from "../../media/Proyectos/UdcRocketSia/equipoEtitcBogota.jpeg";
import udc_EquipoUmng       from "../../media/Proyectos/UdcRocketSia/equipoCoheteUmng.jpeg";
// ── TULCAN-SAT — Concurso Mundial CanSat, PEU UNAM (México) ───────────────────
import tulcan_Bandera       from "../../media/Proyectos/TulcanSat/equipoBanderaUnam.jpeg";
import tulcan_Concurso      from "../../media/Proyectos/TulcanSat/equipoConcursoMundialCansat.jpeg";
import tulcan_Carpa         from "../../media/Proyectos/TulcanSat/equipoCansatCarpa.jpeg";
import tulcan_Integracion   from "../../media/Proyectos/TulcanSat/integracionCansatDron.jpeg";
import tulcan_Reconocim     from "../../media/Proyectos/TulcanSat/equipoReconocimientos.jpeg";
import tulcan_Directivos    from "../../media/Proyectos/TulcanSat/equipoDirectivosUnam.jpeg";
import tulcan_Hangar        from "../../media/Proyectos/TulcanSat/visitaHangarTurbina.jpeg";
import tulcan_LadoB         from "../../media/Proyectos/TulcanSat/reconocimientoLadoB.jpeg";
import tulcan_Institucional from "../../media/Proyectos/TulcanSat/grupoInstitucionalUnam.jpeg";
// ── Atlas X — HidroChallenge IPN 2025 (México) ────────────────────────────────
import atlas_CoheteKala     from "../../media/Proyectos/AtlasX/equipoCoheteKalaIpn.jpeg";
import atlas_Pendon         from "../../media/Proyectos/AtlasX/equipoPendonHidroChallenge.jpeg";
import atlas_CargaUtil      from "../../media/Proyectos/AtlasX/cargaUtilAvionica.jpeg";
import atlas_Prueba         from "../../media/Proyectos/AtlasX/equipoPruebaPopayan.jpeg";
// ── Flylejon — HidroChallenge IPN 2025 (México) ───────────────────────────────
import fly_EquipoIpn        from "../../media/Proyectos/Flylejon/equipoCoheteIpn.jpeg";
import fly_Pendon           from "../../media/Proyectos/Flylejon/pendonEquipoFlylejon.jpeg";
import fly_Prueba           from "../../media/Proyectos/Flylejon/equipoPruebaPopayan.jpeg";
import fly_Cohete           from "../../media/Proyectos/Flylejon/coheteAguaPruebaVuelo.jpeg";
// ── Airsat — ENMICE 2025 (Jalisco, México) ───────────────────────────────────
import airsat_Stand         from "../../media/Proyectos/Airsat/standAirsatEnmice.jpeg";
import airsat_Ganadores     from "../../media/Proyectos/Airsat/ganadoresCargaUtilEnmice.jpeg";
// ── Astrek — ENMICE 2025 (Jalisco, México) ───────────────────────────────────
import astrek_Rover         from "../../media/Proyectos/Astrek/equipoRoverCertificado.jpeg";
import astrek_Escenario     from "../../media/Proyectos/Astrek/equipoEscenarioEnmice.jpeg";
import astrek_Resultados    from "../../media/Proyectos/Astrek/resultadosRoverEnmice.jpeg";

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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface Project {
  id: number;
  title: string;
  category: string;
  fig: string;
  images: { src: string; alt: string }[];
  description: string;
  achievements: string[];
  venue: { label: string; value: string };
  duration: string;
  tags: string[];
  press?: { label: string; url: string }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "SIA KIDS: Formación Aeroespacial para Niñas, Niños y Jóvenes",    category: "Educación",
    fig: "Fig. 3a",
    images: [
      { src: kids_Afiche, alt: "Pieza de convocatoria del semillero de ingeniería aeroespacial para niñas y niños" },
      { src: kids_Trabajos, alt: "Trabajos de los participantes de SIA KIDS: planeadores, carpas de papel y modelos de aeronaves" },
      { src: kids_PrimerDia, alt: "Primer día de la versión virtual de SIA KIDS: sesión sobre planeadores y actividades prácticas" },
    ],
    description:
      "Estrategia de educación para enseñar ciencias aeroespaciales a niños de 5 a 10 años y jóvenes de la ciudad de Popayán y Colombia. El proyecto se ha realizado desde el año 2021 de manera presencial en distintas instituciones educativas de la ciudad de Popayán, y en una versión virtual a nivel nacional.",
    achievements: [
      "Ediciones presenciales en instituciones educativas de Popayán desde 2021",
      "Versión virtual con alcance nacional",
      "Cerca de 30 niños participantes por cada versión",
    ],
    venue: { label: "Alcance", value: "Popayán y Colombia" },
    duration: "2021 — Presente",
    tags: ["Educación", "Divulgación", "Niñas y Niños", "Jóvenes"],
    press: [
      {
        label: "Nota de prensa — Universidad del Cauca",
        url: "https://portalantiguo.unicauca.edu.co/versionP/noticias/interacci%C3%B3n-social/con-%C3%A9xito-colectivo-de-unicauca-culmina-actividad-de-formaci%C3%B3n-aeroespacial-para-ni%C3%B1os-y-ni%C3%B1",
      },
    ],
  },
  {
    id: 2,
    title: "Sentinel: Aeronave Ala Delta con Control e Inteligencia Artificial",    category: "Aeronaves",
    fig: "Fig. 3b",
    images: [
      { src: sentinel_Premiacion, alt: "Equipo Sentinel con medallas y trofeo junto a las aeronaves tipo ala delta" },
      { src: sentinel_Jueces, alt: "Presentación de la aeronave ante la mesa de evaluación" },
    ],
    description:
      "Proyecto en el que se diseñó, construyó y voló una aeronave tipo ala delta (zagi) como participación en la competencia ZAGI AESS RACE, organizada por el capítulo profesional AESS Colombia y desarrollada en la ciudad de Bogotá. En su segunda versión el equipo incorporó algoritmos de control e inteligencia artificial a la aeronave.",
    achievements: [
      "4.º puesto en la categoría Radiofrecuencia — ZAGI AESS RACE 2021",
      "2.º lugar en la categoría Profesional IA — ZAGI AESS RACE 2022",
    ],
    venue: { label: "Competencia", value: "ZAGI AESS RACE · Bogotá" },
    duration: "2021 — 2022",
    tags: ["Ala Delta", "Zagi", "Control", "IA"],
    press: [
      {
        label: "Nota de prensa — Universidad del Cauca",
        url: "https://portalantiguo.unicauca.edu.co/versionP/noticias/universidad/estudiantes-y-egresados-de-unicauca-ganadores-en-competencia-nacional-de-drones",
      },
    ],
  },
  {
    id: 3,
    title: "Katari Society: Cohete de Propulsión Sólida y Carga Útil",    category: "Cohetería",
    fig: "Fig. 3c",
    images: [
      { src: katari_EquipoLasc, alt: "Equipo Katari Society en el Latin American Space Challenge 2023, Brasil" },
      { src: katari_CoheteCampo, alt: "Cohete Katari en el campo de la competencia LASC 2023" },
      { src: katari_Ceremonia, alt: "Equipo Katari Society en el Latin American Space Challenge 2023" },
      { src: katari_Sayula, alt: "Equipo Katari Society con el cohete durante el ENMICE 2025" },
      { src: katari_StandEnmice, alt: "Presentación del cohete Katari en el stand del ENMICE 2025" },
      { src: katari_CargaUtil, alt: "Preparación de la carga útil en el ENMICE 2025" },
    ],
    description:
      "Proyecto que diseñó, construyó y probó un cohete propulsado por combustible sólido tipo candy para un apogeo de 1 km y transporte de carga útil. Se consolidó como el primer cohete propulsado por combustible sólido construido en la Universidad del Cauca y el suroccidente colombiano. Su satélite enlatado desarrolló una misión orientada al monitoreo ambiental del Amazonas.",
    achievements: [
      "Primer cohete de combustible sólido de la Universidad del Cauca y el suroccidente colombiano",
      "10.º lugar en la categoría Cohete — LASC 2023, Tatuí, São Paulo (Brasil)",
      "9.º lugar en la categoría Carga Útil — LASC 2023",
      "Participación en el ENMICE 2025 — Guadalajara y Sayula, Jalisco (México)",
    ],
    venue: { label: "Competencia", value: "LASC 2023 · ENMICE 2025" },
    duration: "2023 — 2025",
    tags: ["Propulsión Sólida", "Candy", "Apogeo 1 km", "CanSat"],
  },
  {
    id: 4,
    title: "UDC Rocket SIA: Cohete Hidropropulsado de Una Etapa",    category: "Cohetería",
    fig: "Fig. 3d",
    images: [
      { src: udc_Lanzamiento, alt: "Lanzamiento del cohete de agua durante la competencia" },
      { src: udc_EquipoUmng, alt: "Equipo UDC Rocket SIA con el cohete en la Universidad Militar Nueva Granada" },
      { src: udc_EquipoCohetes, alt: "Equipo con los cohetes y la base de lanzamiento en la Universidad Militar Nueva Granada" },
      { src: udc_Estacion, alt: "Equipo UDC Rocket SIA revisando la electrónica del cohete" },
      { src: udc_PlazaBolivar, alt: "Cohete UDC Rocket SIA en Bogotá" },
      { src: udc_Etitc, alt: "Equipo del semillero en la Escuela Tecnológica Instituto Técnico Central (ETITC), Bogotá" },
    ],
    description:
      "El proyecto consistió en el diseño, construcción y vuelo de un cohete propulsado por agua de una etapa, capaz de transportar una carga útil y transmitir variables atmosféricas a una estación terrena. El equipo participó de la competencia Robotic People Fest Aeroespacial, desarrollada en la Universidad Militar Nueva Granada, en Bogotá, Colombia.",
    achievements: [
      "1.er lugar de la categoría — Robotic People Fest Aeroespacial 2023",
      "2.º lugar de la categoría — Robotic People Fest Aeroespacial 2024",
    ],
    venue: { label: "Competencia", value: "Robotic People Fest · UMNG" },
    duration: "2023 — 2024",
    tags: ["Cohete de Agua", "Carga Útil", "Telemetría"],
    press: [
      { label: "Nota de prensa — Instagram", url: "https://www.instagram.com/p/C1c2GhzNm6f/?igsh=NTFlMWlqOGg2bTI2" },
    ],
  },
  {
    id: 5,
    title: "TULCAN-SAT: Minisatélites CanSat y CubeSat 2U",    category: "Satélites",
    fig: "Fig. 3e",
    images: [
      { src: tulcan_Bandera, alt: "Equipo TULCAN-SAT en Ciudad Universitaria, UNAM" },
      { src: tulcan_Concurso, alt: "Equipo en el Concurso Mundial de Satélites Enlatados de la UNAM" },
      { src: tulcan_Carpa, alt: "Equipo TULCAN-SAT con el satélite enlatado" },
      { src: tulcan_Integracion, alt: "Integración del CanSat en el dron de lanzamiento" },
      { src: tulcan_Reconocim, alt: "Integrantes del equipo con los reconocimientos obtenidos" },
      { src: tulcan_LadoB, alt: "Pieza conmemorativa del equipo TULCAN-SAT" },
      { src: tulcan_Directivos, alt: "Equipo TULCAN-SAT durante la competencia en la UNAM" },
      { src: tulcan_Institucional, alt: "Fotografía grupal de los equipos participantes" },
      { src: tulcan_Hangar, alt: "Equipo del semillero frente a una turbina aeronáutica" },
    ],
    description:
      "El proyecto diseñó, construyó, probó y lanzó dos minisatélites en la competencia Mundial CanSat, organizada por el Programa Espacial Universitario (PEU) de la Universidad Nacional Autónoma de México (UNAM). En la versión de 2024 la misión consistió en un minisatélite tipo cansat (satélite enlatado) capaz de transportar una carga útil, medir y transmitir variables atmosféricas y descender mediante un sistema de autogiro. En 2025 la misión se desarrolló con un minisatélite tipo cubesat de dos unidades (10×10×20), capaz de transportar semillas y agua, medir y transmitir variables atmosféricas y descender mediante un sistema de autogiro.",
    achievements: [
      "Puesto 14 entre más de 100 equipos inscritos — Mundial CanSat 2024",
      "Puesto 8 entre más de 120 equipos inscritos — Mundial CanSat 2025",
      "Mejor equipo colombiano del Mundial CanSat 2025",
    ],
    venue: { label: "Competencia", value: "Concurso Mundial CanSat · UNAM" },
    duration: "2024 — 2025",
    tags: ["CanSat", "CubeSat 2U", "Autogiro", "Telemetría"],
    press: [
      {
        label: "Nota de prensa — Universidad del Cauca",
        url: "https://www.unicauca.edu.co/noticias-actualidad/unicaucanos-y-unicaucanas-expertos-en-robotica-se-posicionan-como-el-mejor-equipo-colombiano-en-el-mundial-cansat-2025/",
      },
      { label: "Nota de prensa — Facebook", url: "https://www.facebook.com/share/p/195ddk1iHa/" },
    ],
  },
  {
    id: 6,
    title: "Atlas X: Cohete Hidropropulsado Multietapa",    category: "Cohetería",
    fig: "Fig. 3f",
    images: [
      { src: atlas_CoheteKala, alt: "Equipo Atlas X con el cohete KALA durante el HidroChallenge IPN 2025" },
      { src: atlas_Pendon, alt: "Equipo Atlas X junto al pendón del HidroChallenge IPN 2025" },
      { src: atlas_CargaUtil, alt: "Carga útil y electrónica de a bordo del cohete" },
      { src: atlas_Prueba, alt: "Equipo Atlas X con el cohete multietapa" },
    ],
    description:
      "El proyecto diseñó, construyó, probó y lanzó un cohete propulsado por agua multietapa capaz de llevar una carga útil que midiera variables atmosféricas y las transmitiera a una estación terrena. El equipo participó de la competencia HidroChallenge IPN 2025, en México.",
    achievements: [
      "1.er puesto en la categoría Universidades — HidroChallenge IPN 2025",
    ],
    venue: { label: "Competencia", value: "HidroChallenge IPN 2025 · México" },
    duration: "2025",
    tags: ["Cohete de Agua", "Multietapa", "Carga Útil", "Telemetría"],
    press: [
      { label: "Nota de prensa — Instagram", url: "https://www.instagram.com/p/DQXBNJHESy5/?igsh=MWI1eWZkMjB6bmE2ag==" },
    ],
  },
  {
    id: 7,
    title: "Flylejon: Cohete Hidropropulsado Multietapa",    category: "Cohetería",
    fig: "Fig. 3g",
    images: [
      { src: fly_EquipoIpn, alt: "Equipo Flylejon con el cohete durante el HidroChallenge IPN 2025" },
      { src: fly_Pendon, alt: "Pendón del equipo Flylejon en el HidroChallenge IPN 2025" },
      { src: fly_Prueba, alt: "Equipo Flylejon con el cohete hidropropulsado" },
      { src: fly_Cohete, alt: "Cohete hidropropulsado en su base de lanzamiento" },
    ],
    description:
      "El proyecto diseñó, construyó, probó y lanzó un cohete propulsado por agua multietapa capaz de llevar una carga útil que midiera variables atmosféricas y las transmitiera a una estación terrena. El equipo participó de la competencia HidroChallenge IPN 2025, en México.",
    achievements: [
      "5.º lugar tras la fase de evaluación técnica — HidroChallenge IPN 2025",
    ],
    venue: { label: "Competencia", value: "HidroChallenge IPN 2025 · México" },
    duration: "2025",
    tags: ["Cohete de Agua", "Multietapa", "Carga Útil"],
  },
  {
    id: 8,
    title: "Airsat: CanSat para Monitoreo de Calidad del Aire",    category: "Satélites",
    fig: "Fig. 3h",
    images: [
      { src: airsat_Stand, alt: "Equipo Airsat en su stand del ENMICE 2025" },
      { src: airsat_Ganadores, alt: "Anuncio de AIR-SAT como primer lugar en la subcategoría picosatélite" },
    ],
    description:
      "El proyecto diseñó y construyó un satélite enlatado tipo cansat que desarrollaba su misión orientada al monitoreo de la calidad del aire. El equipo participó en el Encuentro Mexicano de Ingeniería en Cohetería Experimental (ENMICE 2025), desarrollado en Guadalajara y Sayula, Jalisco, México.",
    achievements: [
      "1.er lugar en la categoría Carga Útil, subcategoría Picosatélite — ENMICE 2025",
    ],
    venue: { label: "Competencia", value: "ENMICE 2025 · Jalisco" },
    duration: "2025",
    tags: ["CanSat", "Calidad del Aire", "Carga Útil"],
    press: [
      { label: "Nota de prensa — Instagram", url: "https://www.instagram.com/p/DS3U-jREYL6/?igsh=aGV6YndpcWNuczZl" },
    ],
  },
  {
    id: 9,
    title: "Astrek: Rover con Navegación Autónoma",    category: "Rovers",
    fig: "Fig. 3i",
    images: [
      { src: astrek_Rover, alt: "Equipo Astrek con el rover y el certificado del ENMICE 2025" },
      { src: astrek_Escenario, alt: "Equipo Astrek en el escenario del ENMICE 2025" },
      { src: astrek_Resultados, alt: "Anuncio de Astrek como segundo lugar en la subcategoría vehículo rover" },
    ],
    description:
      "El proyecto diseñó, construyó y probó un rover capaz de medir variables atmosféricas y transmitirlas a una estación terrena. Además, el rover seguía navegación autónoma para regresar a su punto de lanzamiento. El equipo participó en el Encuentro Mexicano de Ingeniería en Cohetería Experimental (ENMICE 2025), desarrollado en Guadalajara y Sayula, Jalisco, México.",
    achievements: [
      "2.º lugar en la categoría Carga Útil, subcategoría Vehículo Rover — ENMICE 2025",
    ],
    venue: { label: "Competencia", value: "ENMICE 2025 · Jalisco" },
    duration: "2025",
    tags: ["Rover", "Navegación Autónoma", "Telemetría"],
  },
];

/** Panel de respaldo para proyectos que aún no tienen fotografías. */
function LogoPanel() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 50% 40%, rgba(245,197,24,0.09), #0A0A0A 70%)",
      }}
    >
      <img src={logoSia} alt="Semillero SIA" style={{ width: "88px", opacity: 0.5 }} />
    </div>
  );
}

/** Carrusel deslizante de fotografías para la tarjeta de proyecto. */
function ProjectSlider({
  images,
  paused,
  onOpen,
}: {
  images: { src: string; alt: string }[];
  paused: boolean;
  onOpen: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = images.length;

  useEffect(() => {
    if (paused || total < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), 4500);
    return () => clearInterval(timer);
  }, [paused, total]);

  if (total === 0) {
    return (
      <div style={{ height: "220px", overflow: "hidden" }}>
        <LogoPanel />
      </div>
    );
  }

  const go = (next: number) => setIndex(((next % total) + total) % total);

  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "32px",
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(10,10,10,0.72)",
    border: "1px solid rgba(245,197,24,0.28)",
    color: "#F5C518",
    cursor: "pointer",
    padding: 0,
    zIndex: 3,
    transition: "background 0.2s, opacity 0.25s",
  };

  return (
    <div
      style={{ position: "relative", height: "220px", overflow: "hidden" }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1);
        touchStartX.current = null;
      }}
    >
      {/* Pista deslizante */}
      <div
        onClick={() => onOpen(index)}
        style={{
          display: "flex",
          height: "100%",
          width: `${total * 100}%`,
          transform: `translateX(-${(index * 100) / total}%)`,
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "zoom-in",
        }}
      >
        {images.map((img, i) => (
          <img
            key={`${img.src}-${i}`}
            src={img.src}
            alt={img.alt}
            style={{
              width: `${100 / total}%`,
              height: "100%",
              flexShrink: 0,
              objectFit: "cover",
              filter: "brightness(0.62) saturate(0.85)",
            }}
          />
        ))}
      </div>

      {/* Degradado inferior */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(transparent, rgba(17,17,17,0.98))",
          pointerEvents: "none",
        }}
      />

      {/* Flechas */}
      {total > 1 && (
        <>
          <button
            aria-label="Foto anterior"
            onClick={(e) => {
              e.stopPropagation();
              go(index - 1);
            }}
            style={{ ...arrowStyle, left: 0 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(245,197,24,0.9)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(10,10,10,0.72)")}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            aria-label="Foto siguiente"
            onClick={(e) => {
              e.stopPropagation();
              go(index + 1);
            }}
            style={{ ...arrowStyle, right: 0 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(245,197,24,0.9)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(10,10,10,0.72)")}
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Indicadores */}
      {total > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "0.9rem",
            left: "1rem",
            display: "flex",
            gap: "0.3rem",
            zIndex: 3,
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir a la foto ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                go(i);
              }}
              style={{
                width: i === index ? "18px" : "8px",
                height: "3px",
                padding: 0,
                border: "none",
                cursor: "pointer",
                background: i === index ? "#F5C518" : "rgba(255,255,255,0.35)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}

      {/* Contador */}
      <div
        style={{
          position: "absolute",
          bottom: "0.75rem",
          right: "1rem",
          background: "rgba(10,10,10,0.8)",
          border: "1px solid rgba(245,197,24,0.2)",
          color: "#F5C518",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.1em",
          padding: "0.25rem 0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <Camera size={11} /> {index + 1} / {total}
      </div>
    </div>
  );
}

/** Visor de galería a pantalla completa. */
function Lightbox({
  project,
  index,
  onClose,
  onNavigate,
}: {
  project: Project;
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const total = project.images.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % total);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, total, onClose, onNavigate]);

  const arrowStyle: React.CSSProperties = {
    background: "rgba(10,10,10,0.75)",
    border: "1px solid rgba(245,197,24,0.25)",
    color: "#F5C518",
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5,5,5,0.94)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      {/* Encabezado */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid rgba(245,197,24,0.12)",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              color: "rgba(245,197,24,0.5)",
              fontSize: "0.8rem",
            }}
          >
            {project.fig}
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#FFFFFF",
              fontSize: "0.95rem",
              fontWeight: 700,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {project.title}
          </div>
        </div>
        <button onClick={onClose} aria-label="Cerrar galería" style={{ ...arrowStyle, width: "38px", height: "38px" }}>
          <X size={18} />
        </button>
      </div>

      {/* Imagen */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ display: "flex", alignItems: "center", gap: "1rem", maxWidth: "1100px", width: "100%" }}
      >
        {total > 1 && (
          <button onClick={() => onNavigate((index - 1 + total) % total)} aria-label="Imagen anterior" style={arrowStyle}>
            <ChevronLeft size={20} />
          </button>
        )}
        <img
          src={project.images[index].src}
          alt={project.images[index].alt}
          style={{ flex: 1, minWidth: 0, maxHeight: "72vh", objectFit: "contain" }}
        />
        {total > 1 && (
          <button onClick={() => onNavigate((index + 1) % total)} aria-label="Imagen siguiente" style={arrowStyle}>
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Pie de foto */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: "1.25rem",
          maxWidth: "700px",
          textAlign: "center",
          color: "#999",
          fontSize: "0.85rem",
          lineHeight: 1.6,
        }}
      >
        {project.images[index].alt}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            color: "#666",
            marginTop: "0.5rem",
          }}
        >
          {index + 1} / {total}
        </div>
      </div>

      {/* Tira de miniaturas */}
      {total > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "1.25rem",
            maxWidth: "100%",
            overflowX: "auto",
            padding: "0 0.25rem 0.25rem",
          }}
        >
          {project.images.map((img, i) => (
            <img
              key={`${img.src}-${i}`}
              src={img.src}
              alt={img.alt}
              onClick={() => onNavigate(i)}
              style={{
                height: "56px",
                width: "80px",
                flexShrink: 0,
                objectFit: "cover",
                cursor: "pointer",
                border: i === index ? "2px solid #F5C518" : "2px solid transparent",
                opacity: i === index ? 1 : 0.5,
                transition: "opacity 0.2s, border-color 0.2s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectsPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [gallery, setGallery] = useState<{ projectId: number; index: number } | null>(null);

  const openProject = gallery ? projects.find((p) => p.id === gallery.projectId) : undefined;

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
        <StarField density={100} />
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              color: "rgba(245,197,24,0.4)",
              fontSize: "0.95rem",
              marginBottom: "0.75rem",
            }}
          >
            Fig. 3 — Registro de Proyectos · Semillero SIA
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
            NUESTROS
            <span style={{ color: "#F5C518" }}> PROYECTOS</span>
          </h1>
          <p style={{ color: "#CCCCCC", fontSize: "1rem", lineHeight: 1.8, maxWidth: "620px", margin: "0 auto" }}>
            Cohetería experimental, satélites enlatados, aeronaves, rovers y divulgación:
            los proyectos del semillero y su participación en competencias nacionales e internacionales.
          </p>
        </div>
      </div>

      {/* Projects grid */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "2rem",
          }}
          className="projects-grid"
        >
          {projects.map((project, i) => {
            const isHovered = hoveredCard === project.id;
            return (
              <FadeIn key={project.id} delay={i * 80}>
                <div
                  onMouseEnter={() => setHoveredCard(project.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(245,197,24,0.1)",
                    overflow: "hidden",
                    transition: "all 0.35s ease",
                    boxShadow: isHovered ? "0 12px 48px rgba(245,197,24,0.12)" : "none",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Carrusel de fotos */}
                  <div style={{ position: "relative" }}>
                    <ProjectSlider
                      images={project.images}
                      paused={isHovered}
                      onOpen={(index) => setGallery({ projectId: project.id, index })}
                    />
                    {/* Category */}
                    <div
                      style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        background: "rgba(10,10,10,0.8)",
                        color: "#F5C518",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        padding: "0.25rem 0.6rem",
                        zIndex: 3,
                        pointerEvents: "none",
                      }}
                    >
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "'Caveat', cursive",
                        color: "rgba(245,197,24,0.35)",
                        fontSize: "0.78rem",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {project.fig}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        margin: 0,
                        marginBottom: "0.8rem",
                        lineHeight: 1.35,
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        color: "#999",
                        fontSize: "0.85rem",
                        lineHeight: 1.7,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: "rgba(245,197,24,0.06)",
                            border: "1px solid rgba(245,197,24,0.15)",
                            color: "#888",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.62rem",
                            letterSpacing: "0.08em",
                            padding: "0.2rem 0.5rem",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Logros */}
                    <div style={{ marginBottom: "1.25rem", marginTop: "auto" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "0.65rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#666",
                          marginBottom: "0.6rem",
                        }}
                      >
                        <Trophy size={11} /> Logros
                      </div>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                        {project.achievements.map((item) => (
                          <li
                            key={item}
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                              color: "#999",
                              fontSize: "0.8rem",
                              lineHeight: 1.55,
                            }}
                          >
                            <span style={{ color: "#F5C518", flexShrink: 0 }}>—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Notas de prensa */}
                    {project.press && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
                        {project.press.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.4rem",
                              color: "#F5C518",
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontSize: "0.7rem",
                              letterSpacing: "0.06em",
                              textDecoration: "none",
                              opacity: 0.85,
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                          >
                            <ExternalLink size={11} /> {link.label}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        paddingTop: "1rem",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.6rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#555",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {project.venue.label}
                        </div>
                        <div style={{ color: "#888", fontSize: "0.78rem" }}>
                          {project.venue.value}
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: "'Caveat', cursive",
                          color: "rgba(245,197,24,0.4)",
                          fontSize: "0.8rem",
                          flexShrink: 0,
                        }}
                      >
                        {project.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {openProject && gallery && (
        <Lightbox
          project={openProject}
          index={gallery.index}
          onClose={() => setGallery(null)}
          onNavigate={(next) => setGallery({ projectId: gallery.projectId, index: next })}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
