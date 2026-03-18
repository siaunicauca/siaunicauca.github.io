import { useRef, useEffect, useState } from "react";
import { Send, Github, Linkedin, ExternalLink, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
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

// Large faint AD ASTRA watermark
function WatermarkText() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(5rem, 15vw, 12rem)",
          fontWeight: 800,
          color: "rgba(245,197,24,0.03)",
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        SIA
      </span>
    </div>
  );
}

// Diagonal decorative lines
function DiagonalLines() {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Top-right diagonal accent */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1={`${80 + i * 3}%`}
          y1="0"
          x2="100%"
          y2={`${i * 15}%`}
          stroke="#F5C518"
          strokeWidth="0.5"
          opacity={0.05 - i * 0.004}
        />
      ))}
      {/* Bottom-left diagonal accent */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1={`${60 + i * 6}%`}
          x2={`${15 + i * 3}%`}
          y2="100%"
          stroke="#F5C518"
          strokeWidth="0.5"
          opacity={0.04 - i * 0.004}
        />
      ))}
    </svg>
  );
}

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: "#111111",
    border: `1px solid ${focused === field ? "#F5C518" : "rgba(255,255,255,0.1)"}`,
    color: "#FFFFFF",
    padding: "0.85rem 1rem",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s",
    boxSizing: "border-box",
    boxShadow: focused === field ? "0 0 0 3px rgba(245,197,24,0.07)" : "none",
  });

  const socialLinks = [
    {
      icon: <Github size={20} />,
      label: "GitHub",
      sublabel: "github.com/siaunicauca",
      href: "https://github.com/siaunicauca",
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      sublabel: "linkedin.com/in/semillero-sia",
      href: "#",
    },
    {
      icon: <ExternalLink size={20} />,
      label: "ResearchGate",
      sublabel: "researchgate.net/semillero-sia",
      href: "#",
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} />,
      label: "Correo Institucional",
      value: "siaaerospace@unicauca.edu.co",
    },
    {
      icon: <MapPin size={18} />,
      label: "Ubicación",
      value: "Universidad del Cauca, Facultad de Educación",
    },
    {
      icon: <Clock size={18} />,
      label: "Horario de Atención",
      value: "Lunes a Viernes · 9:00 AM — 5:00 PM",
    },
  ];

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", paddingTop: "72px" }}>
      {/* Page Hero */}
      <div
        style={{
          position: "relative",
          padding: "5rem 2rem 4rem",
          borderBottom: "1px solid rgba(245,197,24,0.1)",
          overflow: "hidden",
        }}
      >
        <StarField density={100} />
        {/* Orbit decorations */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="200" cy="200" r="120" stroke="#F5C518" strokeWidth="0.5" strokeDasharray="5 7" opacity="0.06" fill="none" />
          <circle cx="200" cy="200" r="80" stroke="#F5C518" strokeWidth="0.3" strokeDasharray="3 8" opacity="0.04" fill="none" />
          <circle cx="1240" cy="200" r="150" stroke="#F5C518" strokeWidth="0.5" strokeDasharray="5 7" opacity="0.05" fill="none" />
          <line x1="0" y1="200" x2="1440" y2="200" stroke="#F5C518" strokeWidth="0.3" strokeDasharray="8 10" opacity="0.05" />
        </svg>

        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              color: "rgba(245,197,24,0.45)",
              fontSize: "0.95rem",
              marginBottom: "0.75rem",
            }}
          >
            Fig. 8 — Canal de Comunicaciones · Semillero SIA
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
            CONTÁCTANOS &{" "}
            <span style={{ color: "#F5C518" }}>ÚNETE</span>
          </h1>
          <p style={{ color: "#CCCCCC", fontSize: "1rem", lineHeight: 1.8, maxWidth: "580px", margin: "0 auto" }}>
            ¿Tienes preguntas, ideas de colaboración o quieres unirte al semillero?
            Escríbenos — estamos siempre explorando nuevas fronteras.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          padding: "5rem 2rem 6rem",
          overflow: "hidden",
        }}
      >
        <WatermarkText />
        <DiagonalLines />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "4rem",
            position: "relative",
            zIndex: 1,
          }}
          className="contact-grid"
        >
          {/* Left column: Info */}
          <div>
            <FadeIn>
              {/* Contact info cards */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#F5C518",
                    marginBottom: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span style={{ width: "30px", height: "1px", background: "#F5C518", display: "block" }} />
                  Información de Contacto
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {contactInfo.map((item) => (
                    <div
                      key={item.label}
                      style={{
                        background: "#111111",
                        border: "1px solid rgba(245,197,24,0.1)",
                        padding: "1.25rem 1.5rem",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1rem",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,197,24,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,197,24,0.1)";
                      }}
                    >
                      <div
                        style={{
                          color: "#F5C518",
                          marginTop: "0.1rem",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.65rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "#666",
                            marginBottom: "0.3rem",
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            color: "#CCCCCC",
                            fontSize: "0.88rem",
                            fontFamily: "'Inter', sans-serif",
                            lineHeight: 1.5,
                          }}
                        >
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Social Links */}
            <FadeIn delay={100}>
              <div style={{ marginBottom: "2.5rem" }}>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#F5C518",
                    marginBottom: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span style={{ width: "30px", height: "1px", background: "#F5C518", display: "block" }} />
                  Redes Científicas
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.9rem 1.25rem",
                        background: "#111111",
                        border: "1px solid rgba(245,197,24,0.1)",
                        textDecoration: "none",
                        transition: "all 0.25s",
                        color: "#FFFFFF",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(245,197,24,0.5)";
                        el.style.background = "rgba(245,197,24,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(245,197,24,0.1)";
                        el.style.background = "#111111";
                      }}
                    >
                      <div style={{ color: "#F5C518", flexShrink: 0 }}>{social.icon}</div>
                      <div>
                        <div
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            color: "#FFFFFF",
                            marginBottom: "0.15rem",
                          }}
                        >
                          {social.label}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.72rem",
                            color: "#666",
                          }}
                        >
                          {social.sublabel}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Patent decoration */}
            <FadeIn delay={200}>
              <div
                style={{
                  padding: "1.5rem",
                  background: "rgba(245,197,24,0.04)",
                  border: "1px solid rgba(245,197,24,0.12)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Mini patent diagram */}
                <svg width="100%" height="80" viewBox="0 0 300 80" fill="none">
                  <g opacity="0.07">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={i * 20} x2="300" y2={i * 20} stroke="#F5C518" strokeWidth="0.5" />
                    ))}
                    {Array.from({ length: 11 }).map((_, i) => (
                      <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="80" stroke="#F5C518" strokeWidth="0.5" />
                    ))}
                  </g>
                  {/* Simple satellite diagram */}
                  <rect x="130" y="30" width="40" height="20" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.5" />
                  <line x1="90" y1="40" x2="130" y2="40" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
                  <line x1="170" y1="40" x2="210" y2="40" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
                  <rect x="70" y="35" width="22" height="10" stroke="#F5C518" strokeWidth="0.8" fill="none" opacity="0.4" />
                  <rect x="208" y="35" width="22" height="10" stroke="#F5C518" strokeWidth="0.8" fill="none" opacity="0.4" />
                  <circle cx="150" cy="40" r="6" stroke="#F5C518" strokeWidth="0.8" fill="none" opacity="0.5" />
                  <line x1="150" y1="30" x2="150" y2="10" stroke="#F5C518" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.4" />
                  <text x="20" y="75" fill="#F5C518" fontSize="9" fontFamily="'Caveat', cursive" opacity="0.5">Fig. 8.1 — CubeSat ASTRA-1 · Escala 1:50</text>
                </svg>
                <div
                  style={{
                    fontFamily: "'Caveat', cursive",
                    color: "rgba(245,197,24,0.5)",
                    fontSize: "0.88rem",
                    marginTop: "0.5rem",
                  }}
                >
                  "Per aspera ad astra — A través de las dificultades hacia las estrellas."
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.7rem",
                    color: "#555",
                    marginTop: "0.3rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  SEMILLERO SIA · EST. 2019
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right column: Contact Form */}
          <FadeIn delay={150}>
            <div
              style={{
                background: "#111111",
                border: "1px solid rgba(245,197,24,0.12)",
                padding: "2.5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Corner accents */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "40px",
                  height: "40px",
                  borderTop: "2px solid #F5C518",
                  borderLeft: "2px solid #F5C518",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "40px",
                  height: "40px",
                  borderBottom: "2px solid rgba(245,197,24,0.4)",
                  borderRight: "2px solid rgba(245,197,24,0.4)",
                }}
              />
              {/* Blueprint crosshatch */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "120px",
                  height: "120px",
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(245,197,24,0.04) 0, rgba(245,197,24,0.04) 1px, transparent 0, transparent 50%)",
                  backgroundSize: "10px 10px",
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <MessageSquare size={18} color="#F5C518" />
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "#F5C518",
                    }}
                  >
                    Enviar Mensaje
                  </div>
                </div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    margin: 0,
                    marginBottom: "0.5rem",
                    lineHeight: 1.2,
                  }}
                >
                  Escríbenos
                </h2>
                <div
                  style={{
                    fontFamily: "'Caveat', cursive",
                    color: "rgba(245,197,24,0.4)",
                    fontSize: "0.88rem",
                    marginBottom: "2rem",
                  }}
                >
                  Fig. 8.2 — Formulario de Contacto
                </div>

                {submitted ? (
                  <div
                    style={{
                      background: "rgba(245,197,24,0.08)",
                      border: "1px solid rgba(245,197,24,0.4)",
                      padding: "2rem",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>✦</div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.2rem",
                        color: "#F5C518",
                        marginBottom: "0.5rem",
                      }}
                    >
                      ¡Mensaje enviado!
                    </h3>
                    <p style={{ color: "#CCCCCC", fontSize: "0.88rem", lineHeight: 1.6 }}>
                      Nos pondremos en contacto contigo a la brevedad. ¡Gracias por tu interés en el Semillero SIA!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {/* Name + Email row */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                      }}
                      className="form-row"
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.65rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#888",
                            marginBottom: "0.4rem",
                          }}
                        >
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Tu nombre"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          style={inputStyle("name")}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.65rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#888",
                            marginBottom: "0.4rem",
                          }}
                        >
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          style={inputStyle("email")}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "0.65rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#888",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Asunto
                      </label>
                      <input
                        type="text"
                        placeholder="Motivo de tu mensaje"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        onFocus={() => setFocused("subject")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("subject")}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "0.65rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#888",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Mensaje *
                      </label>
                      <textarea
                        required
                        rows={6}
                        placeholder="Cuéntanos sobre ti, tu área de interés, o tu propuesta de colaboración..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        style={{
                          ...inputStyle("message"),
                          resize: "vertical",
                          minHeight: "140px",
                        }}
                      />
                    </div>

                    {/* Interest checkboxes */}
                    <div>
                      <div
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "0.65rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#888",
                          marginBottom: "0.75rem",
                        }}
                      >
                        Área de Interés
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {[
                          "Aerodinámica",
                          "Propulsión",
                          "Mecánica Orbital",
                          "Materiales",
                          "GNC",
                          "Percepción Remota",
                          "Colaboración",
                          "Otro",
                        ].map((area) => (
                          <label
                            key={area}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.4rem",
                              cursor: "pointer",
                              background: "rgba(245,197,24,0.04)",
                              border: "1px solid rgba(245,197,24,0.15)",
                              padding: "0.3rem 0.65rem",
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontSize: "0.7rem",
                              color: "#999",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              const el = e.currentTarget as HTMLElement;
                              el.style.borderColor = "rgba(245,197,24,0.5)";
                              el.style.color = "#F5C518";
                            }}
                            onMouseLeave={(e) => {
                              const el = e.currentTarget as HTMLElement;
                              el.style.borderColor = "rgba(245,197,24,0.15)";
                              el.style.color = "#999";
                            }}
                          >
                            <input
                              type="checkbox"
                              style={{ accentColor: "#F5C518", width: "12px", height: "12px" }}
                            />
                            {area}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Submit */}
                    <div style={{ marginTop: "0.5rem" }}>
                      <button
                        type="submit"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          background: "#F5C518",
                          color: "#000000",
                          padding: "0.9rem 2rem",
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          border: "2px solid #F5C518",
                          cursor: "pointer",
                          transition: "all 0.25s",
                          width: "100%",
                          justifyContent: "center",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "transparent";
                          el.style.color = "#F5C518";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "#F5C518";
                          el.style.color = "#000000";
                        }}
                      >
                        <Send size={15} />
                        Enviar Mensaje
                      </button>
                    </div>

                    <div
                      style={{
                        fontFamily: "'Caveat', cursive",
                        color: "rgba(245,197,24,0.3)",
                        fontSize: "0.78rem",
                        textAlign: "center",
                      }}
                    >
                      Respondemos en menos de 48 horas · Lunes a Viernes
                    </div>
                  </form>
                )}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Bottom: Join CTA */}
        <div style={{ maxWidth: "1200px", margin: "4rem auto 0", position: "relative", zIndex: 1 }}>
          <FadeIn delay={200}>
            <div
              style={{
                background: "#111111",
                border: "1px solid rgba(245,197,24,0.15)",
                padding: "3rem",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "2rem",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
              }}
              className="join-cta"
            >
              {/* Background glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(ellipse 50% 80% at 15% 50%, rgba(245,197,24,0.04) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Caveat', cursive",
                    color: "rgba(245,197,24,0.4)",
                    fontSize: "0.88rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  Fig. 8.3 — Convocatoria Permanente
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    margin: 0,
                    marginBottom: "0.6rem",
                    lineHeight: 1.2,
                  }}
                >
                  ¿Quieres explorar el cosmos con nosotros?
                </h3>
                <p style={{ color: "#999", fontSize: "0.88rem", lineHeight: 1.65, margin: 0, maxWidth: "550px" }}>
                  El Semillero SIA convoca estudiantes de ingeniería y ciencias apasionados por la exploración espacial. 
                  Te esperamos en la frontera del conocimiento.
                </p>
              </div>
              <div style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#666",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  Semillero — Universidad del Cauca — 2025
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  {/* Small logo */}
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="22" stroke="#F5C518" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.5" />
                    <path d="M24 8 L28 20 L24 18 L20 20 Z" stroke="#F5C518" strokeWidth="1.5" fill="none" />
                    <path d="M20 20 L16 28 L24 26 L32 28 L28 20" stroke="#F5C518" strokeWidth="1.2" fill="none" />
                    <path d="M19 28 L17 36 L24 34 L31 36 L29 28" stroke="#F5C518" strokeWidth="1" fill="none" opacity="0.7" />
                    <circle cx="24" cy="18" r="2" stroke="#F5C518" strokeWidth="1" />
                    <path d="M20 36 C22 40 24 42 24 44 C24 42 26 40 28 36" stroke="#F5C518" strokeWidth="1.2" fill="none" opacity="0.6" />
                  </svg>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Special Elite', serif",
                        color: "#F5C518",
                        fontSize: "1rem",
                        lineHeight: 1.1,
                      }}
                    >
                      SIA
                    </div>
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        color: "#666",
                        fontSize: "0.55rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                      }}
                    >
                      Semillero de Ingeniería Aeroespacial
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        .contact-grid {
          grid-template-columns: 1fr 1.4fr;
        }
        .form-row {
          grid-template-columns: 1fr 1fr;
        }
        .join-cta {
          grid-template-columns: 1fr auto;
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .join-cta { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 500px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
