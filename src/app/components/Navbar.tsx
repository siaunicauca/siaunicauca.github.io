import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/investigacion", label: "Investigación" },
  { href: "/publicaciones", label: "Publicaciones" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/equipo", label: "Equipo" },
  { href: "/noticias", label: "Noticias" },
  { href: "/contacto", label: "Contacto" },
  { href: "/hidrochallenge", label: "HidroChallenge" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? "rgba(10,10,10,0.97)"
          : "rgba(10,10,10,0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(245,197,24,0.2)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Patent-style rocket icon */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="17" stroke="#F5C518" strokeWidth="1.2" strokeDasharray="3 2" />
            <path d="M18 6 L22 16 L18 14 L14 16 Z" stroke="#F5C518" strokeWidth="1.4" fill="none" />
            <path d="M14 16 L12 22 L18 20 L24 22 L22 16" stroke="#F5C518" strokeWidth="1.2" fill="none" />
            <path d="M15 22 L13 28 L18 26 L23 28 L21 22" stroke="#F5C518" strokeWidth="1" fill="none" opacity="0.7" />
            <circle cx="18" cy="14" r="1.5" stroke="#F5C518" strokeWidth="1" />
          </svg>
          <div>
            <div
              style={{
                fontFamily: "'Special Elite', serif",
                color: "#F5C518",
                fontSize: "0.95rem",
                letterSpacing: "0.05em",
                lineHeight: 1.1,
              }}
            >
              SIA
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                color: "#CCCCCC",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              Semillero de Ingeniería Aeroespacial
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  textDecoration: "none",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isActive ? "#F5C518" : "#CCCCCC",
                  padding: "0.4rem 0.75rem",
                  borderBottom: isActive ? "2px solid #F5C518" : "2px solid transparent",
                  transition: "all 0.25s ease",
                  paddingBottom: "0.3rem",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.color = "#F5C518";
                    (e.target as HTMLElement).style.borderBottom = "2px solid rgba(245,197,24,0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.color = "#CCCCCC";
                    (e.target as HTMLElement).style.borderBottom = "2px solid transparent";
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#F5C518",
            cursor: "pointer",
            padding: "0.5rem",
            display: "none",
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(10,10,10,0.98)",
            borderTop: "1px solid rgba(245,197,24,0.2)",
            padding: "1rem 2rem 1.5rem",
          }}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  textDecoration: "none",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isActive ? "#F5C518" : "#CCCCCC",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
