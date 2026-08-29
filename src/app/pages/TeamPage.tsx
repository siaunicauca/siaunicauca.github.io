import { useRef, useEffect, useState } from "react";
import { Linkedin, Mail, GraduationCap } from "lucide-react";
import { StarField } from "../components/StarField";

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

interface Member {
  name: string;
  initials: string;
  role: string;
  level: string;
  area?: string;
  bio?: string;
  publications?: number;
  projects?: number;
  email?: string;
  linkedin?: string;
  scholar?: string;
}

interface TeamGroup {
  key: string;
  label: string;
  title: string;
  subtitle: string;
  members: Member[];
}

const teamGroups: TeamGroup[] = [
  {
    key: "mentoria",
    label: "Mentoría & Asesoría",
    title: "Mentoría y Asesoría",
    subtitle: "Acompañamiento académico y científico del semillero.",
    members: [
      {
        name: "PhD. Eliana Margarita Aguilar Larrarte",
        initials: "EA",
        role: "Mentora del Semillero",
        level: "Doctora en Ciencias de la Electrónica",
        area: "Realidad Aumentada",
        publications: 11,
        projects: 2,
        email: "eaguilar@unicauca.edu.co",
        linkedin: "https://www.linkedin.com/in/eliana-aguilar-65b34b7/",
        scholar: "https://scholar.google.com/citations?hl=es&user=GfiQpbMAAAAJ",
      },
      {
        name: "Sarah Alejandra Cabeza Longo",
        initials: "SC",
        role: "Asesora del Semillero",
        level: "Estudiante",
      },
      {
        name: "Edwin Francisco Valdes Arias",
        initials: "EV",
        role: "Asesor del Semillero",
        level: "Ingeniero Físico",
        area: "Remote Sensing · Image Processing · Data Science",
        bio: "Ingeniero Físico de la Universidad del Cauca con experiencia en las ciencias aeroespaciales y el procesamiento de imágenes, con la teledetección como punto de convergencia.",
        publications: 2,
        projects: 5,
        email: "evaldes@unicauca.edu.co",
        linkedin: "https://www.linkedin.com/in/edwin-francisco-valdes-arias-16334a227/",
        scholar: "https://scholar.google.com.mx/citations?user=gzXOnMUAAAAJ&hl=es",
      },
    ],
  },
  {
    key: "coordinacion",
    label: "Comité Coordinador",
    title: "Comité Coordinador",
    subtitle: "Dirección, administración y organización interna del semillero.",
    members: [
      {
        name: "Evelyn Karina Velasco Caicedo",
        initials: "EV",
        role: "Coordinadora del Semillero",
        level: "Estudiante",
      },
      {
        name: "Daniela Garcia Cordoba",
        initials: "DG",
        role: "Vicecoordinadora del Semillero",
        level: "Estudiante",
      },
      {
        name: "Jesús Santiago Moyan Vidal",
        initials: "JM",
        role: "Secretario del Semillero",
        level: "Estudiante",
      },
      {
        name: "Wilfredo Antonio Guaca Ijaji",
        initials: "WG",
        role: "Tesorero del Semillero",
        level: "Estudiante",
      },
      {
        name: "Yoan Esneider Useche",
        initials: "YU",
        role: "Líder de las Líneas de Investigación",
        level: "Estudiante",
      },
    ],
  },
  {
    key: "divisiones",
    label: "Divisiones",
    title: "Líderes de División",
    subtitle: "Responsables de cada área técnica y de divulgación del semillero.",
    members: [
      {
        name: "Nathaly Michell Bonilla Villaquira",
        initials: "NB",
        role: "Líder de la División de Cohetería",
        level: "Estudiante",
        area: "Cohetería",
      },
      {
        name: "Yoan Esneider Useche",
        initials: "YU",
        role: "Líder de la División de Satélites",
        level: "Estudiante",
        area: "Satélites",
      },
      {
        name: "Evelyn Karina Velasco Caicedo",
        initials: "EV",
        role: "Líder de la División de Rovers",
        level: "Estudiante",
        area: "Rovers",
      },
      {
        name: "Jesús Santiago Moyan Vidal",
        initials: "JM",
        role: "Co-Líder de la División de Rovers",
        level: "Estudiante",
        area: "Rovers",
      },
      {
        name: "Manuel Andrés Patiño Muñoz",
        initials: "MP",
        role: "Líder de la División de Aeronaves",
        level: "Estudiante",
        area: "Aeronaves",
      },
      {
        name: "Maicol Sneider Hermida Alvira",
        initials: "MH",
        role: "Co-Líder de la División de Aeronaves",
        level: "Estudiante",
        area: "Aeronaves",
      },
      {
        name: "Michelle Maureny Muñoz Muñoz",
        initials: "MM",
        role: "Líder de la División de SIA KIDS",
        level: "Estudiante",
        area: "SIA KIDS",
      },
      {
        name: "Franco Julian Campo Herrera",
        initials: "FC",
        role: "Co-Líder de la División de SIA KIDS",
        level: "Ingeniero Físico",
        area: "SIA KIDS",
      },
      {
        name: "Juan Alejandro Cardenas Urbano",
        initials: "JC",
        role: "Líder de la División de Página Web",
        level: "Estudiante",
        area: "Página Web",
      },
    ],
  },
];

// Orbit ring decorative element around photo
function OrbitRing({ color }: { color: string }) {
  return (
    <svg
      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }}
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
    >
      <circle cx="65" cy="65" r="60" stroke={color} strokeWidth="0.7" strokeDasharray="5 4" opacity="0.3" />
      <circle cx="65" cy="65" r="50" stroke={color} strokeWidth="0.4" strokeDasharray="3 6" opacity="0.15" />
      {/* Orbit dot */}
      <circle cx="65" cy="5" r="3" fill={color} opacity="0.5" />
    </svg>
  );
}

function MemberCard({ member, fig, color }: { member: Member; fig: string; color: string }) {
  const [isHovered, setIsHovered] = useState(false);

  const socials = [
    member.email && { icon: <Mail size={14} />, label: "Correo", href: `mailto:${member.email}` },
    member.linkedin && { icon: <Linkedin size={14} />, label: "LinkedIn", href: member.linkedin },
    member.scholar && { icon: <GraduationCap size={14} />, label: "Google Scholar", href: member.scholar },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; href: string }[];

  const hasStats = member.publications !== undefined || member.projects !== undefined;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "#111111",
        border: "1px solid rgba(245,197,24,0.1)",
        padding: "2.5rem 2rem",
        textAlign: "center",
        position: "relative",
        transition: "all 0.35s ease",
        boxShadow: isHovered ? "0 12px 40px rgba(245,197,24,0.1)" : "none",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Crosshatch bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(245,197,24,0.02) 0, rgba(245,197,24,0.02) 1px, transparent 0, transparent 50%)",
          backgroundSize: "14px 14px",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      />

      {/* Profile photo area */}
      <div style={{ position: "relative", width: "100px", height: "100px", margin: "0 auto 1.5rem" }}>
        <OrbitRing color={color} />
        <div
          style={{
            position: "relative",
            width: "88px",
            height: "88px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(245,197,24,0.15), rgba(232,168,0,0.08))",
            border: `2px solid ${color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "6px auto 0",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.6rem",
              fontWeight: 700,
              color: color,
            }}
          >
            {member.initials}
          </span>
        </div>
      </div>

      {/* Level badge */}
      <div>
        <span
          style={{
            display: "inline-block",
            background: "rgba(245,197,24,0.1)",
            border: "1px solid rgba(245,197,24,0.2)",
            color: color,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "0.2rem 0.6rem",
            marginBottom: "0.75rem",
          }}
        >
          {member.level}
        </span>
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.02rem",
          fontWeight: 700,
          color: "#FFFFFF",
          margin: 0,
          marginBottom: "0.4rem",
          lineHeight: 1.35,
        }}
      >
        {member.name}
      </h3>

      {/* Role */}
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.68rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: color,
          marginBottom: "0.3rem",
          lineHeight: 1.5,
        }}
      >
        {member.role}
      </div>

      {/* Area */}
      {member.area && (
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.78rem",
            color: "#666",
            marginBottom: "0.75rem",
          }}
        >
          {member.area}
        </div>
      )}

      {/* Bio */}
      {member.bio && (
        <p
          style={{
            color: "#888",
            fontSize: "0.8rem",
            lineHeight: 1.7,
            marginTop: "0.5rem",
            marginBottom: 0,
          }}
        >
          {member.bio}
        </p>
      )}

      {/* Stats */}
      {hasStats && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
            marginTop: "1.25rem",
            padding: "0.75rem",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          {[
            { num: member.publications, label: "Papers" },
            { num: member.projects, label: "Proyectos" },
          ]
            .filter((s) => s.num !== undefined)
            .map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: color,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#555",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Social links */}
      {socials.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "1.25rem" }}>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              title={social.label}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                border: "1px solid rgba(245,197,24,0.2)",
                color: "#888",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = color;
                el.style.color = "#000";
                el.style.borderColor = color;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.color = "#888";
                el.style.borderColor = "rgba(245,197,24,0.2)";
              }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      )}

      {/* Fig label */}
      <div
        style={{
          fontFamily: "'Caveat', cursive",
          color: "rgba(245,197,24,0.25)",
          fontSize: "0.75rem",
          marginTop: "auto",
          paddingTop: "1.25rem",
        }}
      >
        {fig}
      </div>
    </div>
  );
}

export function TeamPage() {
  let figIndex = 0;
  const totalMembers = teamGroups.reduce((acc, g) => acc + g.members.length, 0);

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
        <StarField density={120} />
        {/* Blueprint grid */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1={i * 160} y1="0" x2={i * 160} y2="400" stroke="#F5C518" strokeWidth="0.3" opacity="0.04" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 80} x2="1440" y2={i * 80} stroke="#F5C518" strokeWidth="0.3" opacity="0.04" />
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
            Fig. 7 — Directorio del Equipo · Semillero SIA
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
            NUESTRO
            <span style={{ color: "#F5C518" }}> EQUIPO</span>
          </h1>
          <p style={{ color: "#CCCCCC", fontSize: "1rem", lineHeight: 1.8, maxWidth: "620px", margin: "0 auto" }}>
            Mentoría, comité coordinador y líderes de división: las {totalMembers} posiciones
            que sostienen el trabajo del Semillero de Ingeniería Aeroespacial SIA.
          </p>
        </div>
      </div>

      {/* Team groups */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
        {teamGroups.map((group, gi) => (
          <section key={group.key} style={{ marginBottom: gi === teamGroups.length - 1 ? 0 : "4.5rem" }}>
            <FadeIn>
              <div style={{ marginBottom: "2rem" }}>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#F5C518",
                    marginBottom: "0.6rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span style={{ display: "block", width: "30px", height: "1px", background: "#F5C518" }} />
                  {group.label}
                </div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    margin: 0,
                    marginBottom: "0.5rem",
                  }}
                >
                  {group.title}
                </h2>
                <p style={{ color: "#888", fontSize: "0.9rem", margin: 0, lineHeight: 1.7 }}>
                  {group.subtitle}
                </p>
              </div>
            </FadeIn>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "2rem",
              }}
            >
              {group.members.map((member, i) => {
                const fig = `Fig. 7${String.fromCharCode(97 + figIndex)}`;
                const color = figIndex % 2 === 0 ? "#F5C518" : "#E8A800";
                figIndex += 1;
                return (
                  <FadeIn key={`${group.key}-${member.name}-${member.role}`} delay={i * 70}>
                    <MemberCard member={member} fig={fig} color={color} />
                  </FadeIn>
                );
              })}
            </div>
          </section>
        ))}

        {/* Join CTA */}
        <FadeIn delay={200}>
          <div
            style={{
              marginTop: "4rem",
              textAlign: "center",
              padding: "3rem",
              background: "#111111",
              border: "1px solid rgba(245,197,24,0.15)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(245,197,24,0.04) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                fontFamily: "'Caveat', cursive",
                color: "rgba(245,197,24,0.4)",
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
              }}
            >
              Fig. 7.x — Posición Vacante
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "0.75rem",
              }}
            >
              ¿Quieres unirte al equipo?
            </h3>
            <p style={{ color: "#999", fontSize: "0.9rem", maxWidth: "500px", margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
              El semillero siempre está abierto a nuevos talentos. Si eres estudiante apasionado
              por la ingeniería aeroespacial, contáctanos.
            </p>
            <a
              href="/contacto"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#F5C518",
                color: "#000",
                padding: "0.75rem 2rem",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "2px solid #F5C518",
                transition: "all 0.25s",
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
              Aplicar al Semillero
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
