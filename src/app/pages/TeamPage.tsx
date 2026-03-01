import { useRef, useEffect, useState } from "react";
import { Github, Linkedin, ExternalLink, Mail } from "lucide-react";
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

const teamMembers = [
  {
    name: "PhD. Eliana Aguilar",
    role: "Docente Encargada del Semillero",
    area: "Dinámica y Control",
    level: "Doctora en ciencias de la Electrónica",
    fig: "Fig. 7a",
    initials: "EA",
    color: "#F5C518",
    bio: "Doctora en ciencias de la Electrónica, filántropa, ingeniera física de la univeridad del Cauca.",
    publications: 8,
    projects: 5,
  },
  {
    name: "Ing. Edwin Francisco Valdes",
    role: "Director del Semillero",
    area: "Aerodinámica Computacional",
    level: "Ingeniero Investigador",
    fig: "Fig. 7b",
    initials: "EV",
    color: "#E8A800",
    bio: "Ingeniero de la Universidad del Cauca, con maestría en Aeronáutica por la Universidad de Southampton. Experto en simulación CFD y diseño de vehículos aeroespaciales.",
    publications: 4,
    projects: 3,
  },
  {
    name: "Ing. Sarah Alejandra Cabezas",
    role: "Líder de Cohetería",
    area: "Cohetería y Propulsión",
    level: "Estudiante",
    fig: "Fig. 7c",
    initials: "SC",
    color: "#F5C518",
    bio: "Experta en diseño de motores cohete y sistemas de propulsión híbrida. Coordinadora del proyecto KATARI Society.",
    publications: 3,
    projects: 4,
  },
  {
    name: "Alejandro Urbano",
    role: "Lider Tic",
    area: "Web Page & Branding",
    level: "Estudiante",
    fig: "Fig. 7d",
    initials: "JA",
    color: "#E8A800",
    bio: "Ingeniero de sistemas, encargado de la imagen del semillero y el desarrollo de la página web.",
    publications: 2,
    projects: 3,
  },
  {
    name: "Brayan Moreno",
    role: "Lider del Satélites",
    area: "Satélites",
    level: "Estudiante",
    fig: "Fig. 7e",
    initials: "BM",
    color: "#F5C518",
    bio: "Estudiante de ingeniería física, apasionado por el diseño y construcción de nanosatélites para misiones de observación terrestre.",
    publications: 1,
    projects: 2,
  },
  {
    name: "Est. David Vargas",
    role: "Investigador Materiales",
    area: "Materiales Aeroespaciales",
    level: "Semillerista",
    fig: "Fig. 7f",
    initials: "DV",
    color: "#E8A800",
    bio: "Estudiante de maestría enfocado en caracterización mecánica de materiales compuestos para aplicaciones aeroespaciales.",
    publications: 2,
    projects: 2,
  },
  {
    name: "Est. Karen Rivera",
    role: "Investigadora Datos",
    area: "Percepción Remota",
    level: "Semillerista",
    fig: "Fig. 7g",
    initials: "KR",
    color: "#F5C518",
    bio: "Estudiante de maestría en Ingeniería de Sistemas. Aplica machine learning al análisis de imágenes satelitales multiespectrales.",
    publications: 1,
    projects: 1,
  },
  {
    name: "Est. Miguel Rodríguez",
    role: "Investigador CFD",
    area: "Aerodinámica Computacional",
    level: "Semillerista",
    fig: "Fig. 7h",
    initials: "MR",
    color: "#E8A800",
    bio: "Estudiante de pregrado en Ingeniería Aeronáutica. Trabaja en validación de códigos CFD con datos de túnel de viento.",
    publications: 1,
    projects: 2,
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

export function TeamPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

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
            Fig. 7 — Directorio del Equipo · 2025
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
            EQUIPO
            <span style={{ color: "#F5C518" }}> DESTACADO</span>
          </h1>
          <p style={{ color: "#CCCCCC", fontSize: "1rem", lineHeight: 1.8, maxWidth: "560px", margin: "0 auto" }}>
            Investigadores, estudiantes doctorales y semilleristas que impulsan 
            la excelencia científica del grupo AD ASTRA.
          </p>
        </div>
      </div>

      {/* Team grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "2rem",
          }}
        >
          {teamMembers.map((member, i) => {
            const isHovered = hoveredMember === i;
            return (
              <FadeIn key={member.name} delay={i * 70}>
                <div
                  onMouseEnter={() => setHoveredMember(i)}
                  onMouseLeave={() => setHoveredMember(null)}
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(245,197,24,0.1)",
                    padding: "2.5rem 2rem",
                    textAlign: "center",
                    position: "relative",
                    transition: "all 0.35s ease",
                    boxShadow: isHovered ? `0 12px 40px rgba(245,197,24,0.1)` : "none",
                    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                    overflow: "hidden",
                  }}
                >
                  {/* Crosshatch bg */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
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
                    {/* Orbit ring */}
                    <OrbitRing color={member.color} />
                    {/* Avatar circle */}
                    <div
                      style={{
                        position: "relative",
                        width: "88px",
                        height: "88px",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, rgba(245,197,24,0.15), rgba(232,168,0,0.08))`,
                        border: `2px solid ${member.color}`,
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
                          color: member.color,
                        }}
                      >
                        {member.initials}
                      </span>
                    </div>
                  </div>

                  {/* Level badge */}
                  <div
                    style={{
                      display: "inline-block",
                      background: `rgba(245,197,24,0.1)`,
                      border: `1px solid rgba(245,197,24,0.2)`,
                      color: member.color,
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
                  </div>

                  {/* Name */}
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      margin: 0,
                      marginBottom: "0.3rem",
                    }}
                  >
                    {member.name}
                  </h3>

                  {/* Role */}
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: member.color,
                      marginBottom: "0.3rem",
                    }}
                  >
                    {member.role}
                  </div>

                  {/* Area */}
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8rem",
                      color: "#666",
                      marginBottom: "1rem",
                    }}
                  >
                    {member.area}
                  </div>

                  {/* Bio */}
                  <p
                    style={{
                      color: "#888",
                      fontSize: "0.8rem",
                      lineHeight: 1.7,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {member.bio}
                  </p>

                  {/* Stats */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.75rem",
                      marginBottom: "1.25rem",
                      padding: "0.75rem",
                      background: "rgba(0,0,0,0.3)",
                    }}
                  >
                    {[
                      { num: member.publications, label: "Papers" },
                      { num: member.projects, label: "Proyectos" },
                    ].map((s) => (
                      <div key={s.label}>
                        <div
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.4rem",
                            fontWeight: 700,
                            color: member.color,
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

                  {/* Social links */}
                  <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem" }}>
                    {[
                      { icon: <Mail size={14} />, label: "Email" },
                      { icon: <Linkedin size={14} />, label: "LinkedIn" },
                      { icon: <ExternalLink size={14} />, label: "ResearchGate" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href="#"
                        title={social.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          border: `1px solid rgba(245,197,24,0.2)`,
                          color: "#888",
                          textDecoration: "none",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = member.color;
                          el.style.color = "#000";
                          el.style.borderColor = member.color;
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

                  {/* Fig label */}
                  <div
                    style={{
                      fontFamily: "'Caveat', cursive",
                      color: "rgba(245,197,24,0.25)",
                      fontSize: "0.75rem",
                      marginTop: "1.25rem",
                    }}
                  >
                    {member.fig}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

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
