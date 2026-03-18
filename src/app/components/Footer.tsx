import { Link } from "react-router";
import { Github, Linkedin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        background: "#000000",
        borderTop: "2px solid #F5C518",
        padding: "3rem 2rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative grid lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(245,197,24,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: "'Special Elite', serif",
              color: "#F5C518",
              fontSize: "1.3rem",
              marginBottom: "0.4rem",
            }}
          >
            SIA
          </div>
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              color: "#CCCCCC",
              fontSize: "1rem",
              marginBottom: "1rem",
            }}
          >
            Hacia las Estrellas ✦
          </div>
          <p
            style={{
              color: "#888",
              fontSize: "0.8rem",
              lineHeight: 1.7,
              maxWidth: "240px",
            }}
          >
            Semillero de Investigación en Ingeniería Aeroespacial. Explorando las fronteras de la ciencia y la tecnología espacial.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              color: "#F5C518",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
            }}
          >
            Navegación
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { to: "/", label: "Inicio" },
              { to: "/investigacion", label: "Investigación" },
              { to: "/publicaciones", label: "Publicaciones" },
              { to: "/proyectos", label: "Proyectos" },
              { to: "/equipo", label: "Equipo" },
              { to: "/noticias", label: "Noticias" },
              { to: "/contacto", label: "Contacto" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  color: "#888",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontFamily: "'Inter', sans-serif",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5C518")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#888")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Research areas */}
        <div>
          <h4
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              color: "#F5C518",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
            }}
          >
            Líneas de Investigación
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              "Aerodinámica Computacional",
              "Propulsión Aeroespacial",
              "Mecánica Orbital",
              "Materiales Aeroespaciales",
              "Sistemas de Control",
            ].map((area) => (
              <span
                key={area}
                style={{ color: "#666", fontSize: "0.82rem", fontFamily: "'Inter', sans-serif" }}
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Contact & socials */}
        <div>
          <h4
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              color: "#F5C518",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
            }}
          >
            Conectar
          </h4>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.2rem" }}>
            {[
              { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/siaunicauca" },
              { icon: <Linkedin size={18} />, label: "LinkedIn", href: "#" },
              { icon: <ExternalLink size={18} />, label: "ResearchGate", href: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                title={social.label}
                style={{
                  color: "#F5C518",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  border: "1px solid rgba(245,197,24,0.3)",
                  borderRadius: "4px",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#F5C518";
                  el.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.color = "#F5C518";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p style={{ color: "#666", fontSize: "0.8rem", lineHeight: 1.6 }}>
            siaaerospace@unicauca.edu.co
          </p>
          <p style={{ color: "#555", fontSize: "0.75rem", marginTop: "0.4rem" }}>
            Universidad del Cauca, Facultad de Educación
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "2.5rem auto 0",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "'Caveat', cursive",
            color: "#444",
            fontSize: "0.85rem",
          }}
        >
          Fig. ∞ — Semillero SIA © 2025
        </span>
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: "#444",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Semillero — Universidad del Cauca — 2025
        </span>
      </div>
    </footer>
  );
}
