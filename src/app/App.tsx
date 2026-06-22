import { useState, useEffect, useRef } from "react";
import { createBrowserRouter, RouterProvider, useNavigate, useLocation } from "react-router";
import { ProfileScreen } from "./components/profile/ProfileScreen";
import { SimulationScreen } from "./components/simulation/SimulationScreen";
import { Search, Sparkles, User, FileText, RefreshCw, MessageSquareWarning } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import TrendingUpOutlined from "@mui/icons-material/TrendingUpOutlined";
import Face2Outlined from "@mui/icons-material/Face2Outlined";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { NuBrandMark } from "./components/shared/NuBrandMark";
import errorImage from "../imports/Captura_de_pantalla_2026-06-17_a_la_s__8.15.58_p.m..png";

import { AIAssistantProvider, useTranslations } from "./context/AIAssistantContext";
import { SharedStateProvider } from "./context/SharedStateContext";
import { AIBubbleMenu } from "./components/shared/AIBubbleMenu";

type Phase = "splash" | "welcome" | "search" | "profile" | "error";

const GREETINGS = [
  { word: "Hello,", font: "'Playfair Display', Georgia, serif" },
  { word: "Olá,",   font: "'Dancing Script', cursive" },
  { word: "Hola,",  font: "'Pacifico', cursive" },
];

// Brand colors
const BG = "var(--chart-2)"; // solid purple background
const IL = "#BDB0CA"; // illustration fill (muted lavender)

// ─── Logo — "Lab Flask" animated ─────────────────────────────────────────────
// Forma: emblem circular (ref 1) + frasco florence.
// Contenido: líquido con burbujas flat style (ref 2) en paleta #a374cc/#5c2d91/#1a0a33.
// Animación CSS: idle → shake → 2 burbujas suben → pausa → loop (ciclo 7s).
function LendLabNuLogo({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <defs>
        <style>{`
          /* ── Flask shake: 30-50% del ciclo de 7s ── */
          @keyframes llnShake {
            0%,29%,100% { transform: rotate(0deg); }
            31% { transform: rotate(-5deg); }
            34% { transform: rotate(5deg); }
            37% { transform: rotate(-5deg); }
            40% { transform: rotate(4deg); }
            43% { transform: rotate(-3deg); }
            46% { transform: rotate(2deg); }
            49% { transform: rotate(-1deg); }
            51% { transform: rotate(0deg); }
          }
          /* ── Burbuja 1: sube a los 55-75% ── */
          @keyframes llnBub1 {
            0%,54%  { opacity:0; transform:translateY(0) scale(0); }
            57%     { opacity:0.9; transform:translateY(0) scale(1); }
            72%     { opacity:0.8; transform:translateY(-13px) scale(0.65); }
            77%     { opacity:0; transform:translateY(-17px) scale(0.2); }
            100%    { opacity:0; transform:translateY(-17px) scale(0); }
          }
          /* ── Burbuja 2: sube a los 62-82% ── */
          @keyframes llnBub2 {
            0%,61%  { opacity:0; transform:translateY(0) scale(0); }
            64%     { opacity:0.9; transform:translateY(0) scale(1); }
            79%     { opacity:0.7; transform:translateY(-15px) scale(0.55); }
            85%     { opacity:0; transform:translateY(-20px) scale(0.15); }
            100%    { opacity:0; transform:translateY(-20px) scale(0); }
          }
          .lln-flask  { animation: llnShake 7s ease-in-out infinite; transform-origin: 40px 42px; }
          .lln-bub1   { animation: llnBub1  7s ease-in-out infinite; transform-origin: 38px 29px; }
          .lln-bub2   { animation: llnBub2  7s ease-in-out infinite; transform-origin: 44px 26px; }
        `}</style>

        {/* Clip = interior del cuerpo circular (r levemente menor que el outline) */}
        <clipPath id="llnClip">
          <circle cx="40" cy="53" r="21" />
        </clipPath>
      </defs>

      {/* ══ OUTER EMBLEM CIRCLE (ref 1: circular frame) ══ */}
      <circle cx="40" cy="40" r="37"
        stroke="#1a0a33" strokeWidth="2" fill="none" opacity="0.18" />

      {/* ══ DECORATIVE SWIRL (ref 1: arco que rodea el frasco) ══ */}
      <path d="M 9 58 C 6 38 14 18 34 10"
        stroke="var(--chart-2)" strokeWidth="2.2" fill="none"
        strokeLinecap="round" opacity="0.55" />

      {/* ══ FLASK GROUP — toda la animación de shake va aquí ══ */}
      <g className="lln-flask">

        {/* ── STEP 1: Flask base fill (blanco — líquido se pinta encima) ── */}
        <path d="M 33 10 L 33 31 A 22.5 22.5 0 1 1 47 31 L 47 10 Z"
          fill="white" />

        {/* ── STEP 2: Liquid layers clipeadas al círculo ── */}
        <g clipPath="url(#llnClip)">

          {/* Capa oscura base: #1a0a33 — fondo del frasco */}
          <rect x="17" y="60" width="46" height="17" fill="var(--purple-dark)" opacity="0.8" />

          {/* Ola profunda: #5c2d91 — zona media */}
          <path d="M 17 52 C 23 46 30 52 40 49 C 50 46 57 52 63 52 L 63 64 L 17 64 Z"
            fill="var(--purple-dark)" />

          {/* Ola surface: #a374cc — superficie del líquido */}
          <path d="M 17 48 C 23 42 30 48 40 45 C 50 42 57 48 63 48 L 63 55 L 17 55 Z"
            fill="var(--chart-2)" opacity="0.9" />

          {/* ── BURBUJAS ESTÁTICAS (ref 2: varios tamaños sobre el líquido) ── */}
          {/* Burbuja grande izquierda */}
          <circle cx="28" cy="40" r="7.5"  fill="var(--purple-dark)" />
          {/* Burbuja grande centro */}
          <circle cx="43" cy="37" r="5.5"  fill="var(--purple-dark)" />
          {/* Burbuja mediana izquierda */}
          <circle cx="22" cy="37" r="4"    fill="var(--chart-2)" opacity="0.9" />
          {/* Burbuja mediana derecha */}
          <circle cx="53" cy="41" r="4.5"  fill="var(--chart-2)" opacity="0.85" />
          {/* Burbuja pequeña */}
          <circle cx="36" cy="31" r="3"    fill="var(--chart-2)" opacity="0.75" />
          {/* Mini burbuja */}
          <circle cx="50" cy="33" r="2"    fill="var(--purple-dark)" opacity="0.8" />
          {/* Highlights (ref 2: reflejos blancos en las burbujas) */}
          <circle cx="25"  cy="37" r="2.2" fill="white" opacity="0.22" />
          <circle cx="41"  cy="34" r="1.6" fill="white" opacity="0.22" />
          <circle cx="20.5" cy="35" r="1.2" fill="white" opacity="0.18" />
        </g>

        {/* ── STEP 3: Flask outline ENCIMA del líquido ── */}
        <path d="M 33 10 L 33 31 A 22.5 22.5 0 1 1 47 31 L 47 10 Z"
          fill="none" stroke="var(--purple-dark)" strokeWidth="2.8" strokeLinejoin="round" />

        {/* Neck top cap */}
        <path d="M 33 10 Q 33 7 40 7 Q 47 7 47 10"
          stroke="var(--purple-dark)" strokeWidth="2.8" fill="none" strokeLinecap="round" />

        {/* ── BURBUJAS ANIMADAS que suben por el cuello ── */}
        {/* Burbuja ascendente 1 — parte del cuello, sube y desaparece */}
        <circle className="lln-bub1" cx="38" cy="29" r="3" fill="var(--chart-2)" />
        {/* Burbuja ascendente 2 — ligeramente más pequeña, offset horizontal */}
        <circle className="lln-bub2" cx="44" cy="26" r="2.2" fill="var(--purple-dark)" />

      </g>
    </svg>
  );
}



// ─── User avatar — same fill-silhouette style as background ───────────────────
function UserAvatarIllustration() {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg width="92" height="92" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="100" height="100" rx="28" fill={BG} />

        {/* ── Coffee leaves — bottom corners (decorative frame) ── */}
        <ellipse cx="14"  cy="90" rx="9"  ry="20" fill={IL} transform="rotate(-35, 14, 90)" />
        <ellipse cx="86"  cy="90" rx="9"  ry="20" fill={IL} transform="rotate(35, 86, 90)" />
        <ellipse cx="6"   cy="78" rx="7"  ry="15" fill={IL} transform="rotate(-50, 6, 78)" />
        <ellipse cx="94"  cy="78" rx="7"  ry="15" fill={IL} transform="rotate(50, 94, 78)" />
        {/* Coffee berries */}
        <circle cx="18"  cy="75" r="5" fill={IL} />
        <circle cx="82"  cy="75" r="5" fill={IL} />
        <circle cx="10"  cy="65" r="4" fill={IL} />
        <circle cx="90"  cy="65" r="4" fill={IL} />
        {/* Berry negative space (seed detail) */}
        <circle cx="18"  cy="75" r="2.2" fill={BG} />
        <circle cx="82"  cy="75" r="2.2" fill={BG} />

        {/* ── Hair (filled shape) ── */}
        <path d="M24 52 Q22 14 50 15 Q78 14 76 52 Q76 32 68 21 Q59 8 50 8 Q41 8 32 21 Q24 32 24 52 Z"
          fill={IL} />

        {/* ── Face oval ── */}
        <ellipse cx="50" cy="57" rx="24" ry="28" fill={IL} />

        {/* ── Eyes — negative space on face ── */}
        <ellipse cx="40" cy="51" rx="6.5" ry="5" fill={BG} />
        <ellipse cx="60" cy="51" rx="6.5" ry="5" fill={BG} />
        {/* Pupils — fill back in IL */}
        <circle cx="40" cy="51" r="3" fill={IL} />
        <circle cx="60" cy="51" r="3" fill={IL} />
        {/* Lashes (tiny fills above eyes) */}
        <ellipse cx="35" cy="47" rx="2.5" ry="1.2" fill={BG} transform="rotate(-20, 35, 47)" />
        <ellipse cx="55" cy="47" rx="2.5" ry="1.2" fill={BG} transform="rotate(20, 55, 47)" />

        {/* ── Nose (subtle) ── */}
        <ellipse cx="50" cy="61" rx="3" ry="2" fill={BG} opacity="0.55" />

        {/* ── Smile — negative space crescent ── */}
        <path d="M41 68 Q50 77 59 68 Q54 63 50 63 Q46 63 41 68 Z" fill={BG} />

        {/* ── Earrings (small teardrop shapes) ── */}
        <circle cx="26" cy="58" r="4" fill={IL} />
        <ellipse cx="26" cy="68" rx="3.5" ry="6" fill={IL} />
        <circle cx="74" cy="58" r="4" fill={IL} />
        <ellipse cx="74" cy="68" rx="3.5" ry="6" fill={IL} />

        {/* ── Orchid in hair — top right of head (5 petals, fill style) ── */}
        <g transform="translate(70, 28)">
          <ellipse cx="0" cy="-10" rx="5"  ry="9" fill={IL} />
          <ellipse cx="0" cy="-10" rx="5"  ry="9" fill={IL} transform="rotate(72)" />
          <ellipse cx="0" cy="-10" rx="5"  ry="9" fill={IL} transform="rotate(144)" />
          <ellipse cx="0" cy="-10" rx="5"  ry="9" fill={IL} transform="rotate(216)" />
          <ellipse cx="0" cy="-10" rx="5"  ry="9" fill={IL} transform="rotate(288)" />
          {/* Center cutout */}
          <circle cx="0" cy="0" r="6.5" fill={BG} />
          {/* Center dot */}
          <circle cx="0" cy="0" r="3.5" fill={IL} />
          <circle cx="0" cy="0" r="1.5" fill={BG} />
        </g>

        {/* ── Collar/neckline ── */}
        <path d="M34 83 Q50 92 66 83 Q60 78 50 77 Q40 78 34 83 Z" fill={BG} />
        {/* Collar detail — small geometric motif */}
        <path d="M43 82 L50 78 L57 82 L50 86 Z" fill={IL} />

        {/* Outer border accent */}
        <rect width="100" height="100" rx="28" fill="none" stroke={IL} strokeWidth="1.5" opacity="0.25" />
      </svg>

      {/* Online indicator */}
      <div style={{
        position: "absolute", bottom: 4, right: 4,
        width: 13, height: 13, borderRadius: "50%",
        background: "#6dd4a0", border: "2.5px solid white",
        boxShadow: "0 1px 5px color-mix(in srgb, #6dd4a0 40%, transparent)",
      }} />
    </div>
  );
}

// ─── Animated spheres — attract · merge · repel ───────────────────────────────
// Las esferas actúan como lámpara de lava: se mueven por los bordes separándose y 
// uniéndose lentamente. Solo una esfera central viaja por toda la pantalla.
function ColombiaBackground() {
  return (
    <>
      <style>{`
        /* Movimientos muy lentos, estilo lámpara de lava en los bordes */
        @keyframes lavaTop {
          0%   { transform: translate(0vw, 0) scale(1); }
          33%  { transform: translate(35vw, 4vh) scale(1.3, 0.85); }
          66%  { transform: translate(65vw, -2vh) scale(0.85, 1.15); }
          100% { transform: translate(0vw, 0) scale(1); }
        }
        @keyframes lavaBottom {
          0%   { transform: translate(0vw, 0) scale(1); }
          33%  { transform: translate(-40vw, -4vh) scale(1.25, 0.9); }
          66%  { transform: translate(-15vw, 2vh) scale(0.9, 1.25); }
          100% { transform: translate(0vw, 0) scale(1); }
        }
        @keyframes lavaLeft {
          0%   { transform: translate(0, 0vh) scale(1); }
          33%  { transform: translate(3vw, 25vh) scale(0.9, 1.35); }
          66%  { transform: translate(-2vw, 55vh) scale(1.15, 0.85); }
          100% { transform: translate(0, 0vh) scale(1); }
        }
        @keyframes lavaRight {
          0%   { transform: translate(0, 0vh) scale(1); }
          33%  { transform: translate(-4vw, -35vh) scale(0.85, 1.25); }
          66%  { transform: translate(2vw, -15vh) scale(1.25, 0.9); }
          100% { transform: translate(0, 0vh) scale(1); }
        }
        /* Única esfera que se mueve libremente por toda la pantalla */
        @keyframes lavaFree {
          0%   { transform: translate(0vw, 0vh) scale(1); }
          20%  { transform: translate(35vw, -30vh) scale(1.15); }
          40%  { transform: translate(-25vw, 35vh) scale(0.9); }
          60%  { transform: translate(40vw, 15vh) scale(1.2); }
          80%  { transform: translate(-15vw, -35vh) scale(0.85); }
          100% { transform: translate(0vw, 0vh) scale(1); }
        }
      `}</style>

      <div style={{ position: "absolute", inset: 0, background: "#fdfaff", overflow: "hidden" }}>
        
        {/* Borde Superior */}
        <div style={{
          position: "absolute", top: "-150px", left: "-100px",
          width: "600px", height: "350px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163,116,204,0.65) 0%, rgba(225,210,255,0.35) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(60px)",
          animation: "lavaTop 30s ease-in-out infinite",
        }} />

        {/* Borde Inferior */}
        <div style={{
          position: "absolute", bottom: "-150px", right: "-100px",
          width: "600px", height: "350px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(92,45,145,0.55) 0%, rgba(108,54,192,0.35) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(60px)",
          animation: "lavaBottom 32s ease-in-out infinite",
        }} />

        {/* Borde Izquierdo */}
        <div style={{
          position: "absolute", top: "-50px", left: "-150px",
          width: "350px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,145,250,0.45) 0%, rgba(163,116,204,0.25) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(60px)",
          animation: "lavaLeft 34s ease-in-out infinite",
        }} />

        {/* Borde Derecho */}
        <div style={{
          position: "absolute", bottom: "-50px", right: "-150px",
          width: "350px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163,116,204,0.45) 0%, rgba(225,210,255,0.25) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(60px)",
          animation: "lavaRight 37s ease-in-out infinite",
        }} />

        {/* Esfera Libre (Azul claro / Lila) */}
        <div style={{
          position: "absolute", top: "35%", left: "35%",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(130,172,252,0.55) 0%, rgba(192,218,255,0.35) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(55px)",
          animation: "lavaFree 42s ease-in-out infinite",
        }} />

      </div>
    </>
  );
}

// ─── Frosted glass widget — spec Figma glassmorphism ─────────────────────────
// 1. Fill: #FFFFFF 20% opacity  (padding-box)
// 2. Background Blur: 20px
// 3. Border: linear gradient #FFFFFF 60% → 0%, 1.5px, border-box
// 4. Drop shadow: Y4 Blur16 black 8%
const glass: React.CSSProperties = {
  background: [
    "linear-gradient(rgba(255,255,255,0.20), rgba(255,255,255,0.20)) padding-box",
    "linear-gradient(135deg, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.00) 100%) border-box",
  ].join(", "),
  border: "1.5px solid transparent",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
  borderRadius: "28px",
};

// ─── App ──────────────────────────────────────────────────────────────────────
export function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPhase = (searchParams.get("phase") as Phase) || "splash";
  
  const [phase,       setPhase]       = useState<Phase>(initialPhase);
  const [greetingIdx, setGreetingIdx] = useState(0);
  const [hoverSearch, setHoverSearch] = useState(false);
  const [hoverBtn,    setHoverBtn]    = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [hoveredErrorTag, setHoveredErrorTag] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();

  const floatingErrors = [
    { id: "err-404", code: "404", msg: "Not Found", top: "12%", left: "10%", rotate: -6, color: "var(--accent)" },
    { id: "err-500", code: "500", msg: "Server Error", top: "22%", right: "8%", rotate: 8, color: "var(--chart-1)" },
    { id: "err-403", code: "403", msg: "Forbidden", bottom: "18%", left: "15%", rotate: 5, color: "var(--chart-3)" },
    { id: "err-502", code: "502", msg: "Bad Gateway", bottom: "28%", right: "10%", rotate: -4, color: "var(--chart-4)" },
    { id: "err-400", code: "400", msg: "Bad Request", top: "50%", left: "6%", rotate: -12, color: "var(--primary)" },
    { id: "err-401", code: "401", msg: "Unauthorized", top: "60%", right: "5%", rotate: 10, color: "var(--chart-2)" },
  ];

  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    const val = searchValue.trim();
    if (!val) return;
    
    // Perfil 1 & 2 valid IDs
    const validIDs = [
      "CUST-SIM-001", "LN-SMA-001",
      "CUST-SIM-002", "LN-SMA-004"
    ];
    
    if (validIDs.includes(val)) {
      setPhase("profile");
      // Animación de loading y luego navegamos al perfil
      setTimeout(() => {
        navigate(`/profile/${val}`);
      }, 800);
    } else {
      setPhase("error");
    }
  };

  const handleScreenClick = () => {
    if (phase !== "splash") return;
    setPhase("welcome");
  };

  useEffect(() => {
    if (phase !== "welcome") return;
    const id = setInterval(() => setGreetingIdx(i => (i + 1) % GREETINGS.length), 1900);
    return () => clearInterval(id);
  }, [phase]);

  return (
    <div
      onClick={phase === "splash" ? handleScreenClick : undefined}
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        maxHeight: "900px",
        minHeight: "580px",
        overflow: "hidden",
        cursor: phase === "splash" ? "pointer" : "default",
      }}
    >
      {/* ── Illustration background ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <ColombiaBackground />
      </div>

      <AnimatePresence>
        {phase === "error" && floatingErrors.map((err, i) => (
          <motion.div
            key={err.id}
            initial={{ opacity: 0, scale: 0.5, y: 20, rotate: err.rotate - 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: err.rotate }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              ...glass,
              position: "absolute",
              top: err.top,
              left: err.left,
              right: err.right,
              bottom: err.bottom,
              padding: "8px 14px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <div style={{
              fontWeight: 700,
              fontSize: 14,
              color: err.color
            }}>
              {err.code}
            </div>
            <div style={{
              width: 1,
              height: 12,
              backgroundColor: "var(--border)"
            }} />
            <div style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--muted-foreground)"
            }}>
              {err.msg}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── Centered widget layer ── */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20
      }}>

        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.91, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            ...glass,
            maxWidth: phase === "splash" ? 400 : (phase === "search" ? 640 : (phase === "profile" ? 800 : (phase === "error" ? 400 : 420))),
            width: "88vw",
            padding: "28px 32px 30px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <AnimatePresence mode="popLayout">
            {/* ═══ SPLASH — editorial layout (ref: Visual Flow card) ═══ */}
            {phase === "splash" && (
              <motion.div
                key="splash"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* ── TOP ROW: nombre completo (izq) + logo (der) ── */}
                <motion.div
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <span style={{
                fontWeight: 800,
                fontSize: 36,
                lineHeight: 1,
                letterSpacing: "-1px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                <span style={{ color: "var(--foreground)" }}>Lend-Lab</span>
                <NuBrandMark height={34} />
              </span>
            </motion.div>

            {/* ── Badge pill — "CALCULADORA INTELIGENTE…" ── */}
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              style={{ marginTop: 14 }}
            >
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 12px",
                border: "1px solid var(--border)",
                borderRadius: 100,
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
              }}>
                Calculadora inteligente de amortización
              </span>
            </motion.div>

            {/* ── Número decorativo — como "07" en ref ── */}
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.44, ease: [0.4, 0, 0.2, 1] }}
              style={{
                color: "var(--secondary)",
                opacity: 0.38,
                marginTop: 8,
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Ícono de matraz con porcentaje, representando Lend-LabNu */}
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a2 2 0 0 0 1.84 2.75h10.88a2 2 0 0 0 1.84-2.75l-5.07-10.127a2 2 0 0 1-.211-.896V2" />
                <path d="M8.5 2h7" />
                <circle cx="10" cy="15" r="1.2" fill="currentColor" />
                <circle cx="14" cy="19" r="1.2" fill="currentColor" />
                <path d="M14.5 14.5l-5 5" strokeWidth="0.8" />
              </svg>
            </motion.div>

            {/* ── Thin rule + caption ── */}
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.44, ease: [0.4, 0, 0.2, 1] }}
            >
              <div style={{ height: 1, background: "var(--border)", marginTop: 14 }} />
              <p style={{
                fontSize: 10,
                fontWeight: 500,
                color: "var(--muted-foreground)",
                textTransform: "uppercase",
                letterSpacing: "1.4px",
                marginTop: 12,
                marginBottom: 0,
              }}>
                → Simulación de préstamos
              </p>
            </motion.div>

            {/* ── Botón "Comenzar" con ícono MUI TrendingUp ──
                 Reposo (ref 1): pill sutil, borde suave, ícono en var(--secondary)
                 Hover  (ref 2): pill con fondo lavanda + borde accent + ícono accent   */}
            {true && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                style={{ marginTop: 16, display: "flex", justifyContent: "center" }}
              >
                <button
                  onClick={handleScreenClick}
                  onMouseEnter={() => setHoverBtn(true)}
                  onMouseLeave={() => setHoverBtn(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 24px",
                    borderRadius: 100,
                    border: hoverBtn
                      ? "2px solid var(--accent)"
                      : "1.5px solid var(--border)",
                    background: hoverBtn
                      ? "color-mix(in srgb, var(--accent) 12%, white)"
                      : "rgba(255,255,255,0.25)",
                    cursor: "pointer",
                    transition: "all 0.22s ease",
                  }}
                >
                  <TrendingUpOutlined
                    style={{
                      fontSize: 20,
                      color: hoverBtn ? "var(--accent)" : "var(--secondary)",
                      transition: "color 0.22s ease",
                    }}
                  />
                  <span style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: hoverBtn ? "var(--accent)" : "var(--muted-foreground)",
                    letterSpacing: "0.2px",
                    transition: "color 0.22s ease",
                  }}>
                    Comenzar
                  </span>
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ═══ WELCOME — editorial layout (ref: Visual Flow card) ═══ */}
        {phase === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", flexDirection: "column" }}
          >
              {/* MARKER-MAKE-KIT-INVOKED */}

              {/* ── ROW 1: badge (top-left) + logo (top-right) ── */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                {/* Badge — small caps label with Nu mark inline */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  border: "1px solid var(--border)",
                  borderRadius: "100px",
                  padding: "4px 10px",
                }}>
                  <span>LEND-LAB</span>
                  <NuBrandMark height={13} />
                </div>
                {/* User Icon — moved up to the right of the badge as a profile icon */}
                <div style={{
                  color: "var(--secondary)",
                  opacity: 0.38,
                  display: "flex",
                  alignItems: "center",
                }}>
                  <svg style={{ fontSize: 38, width: "1em", height: "1em" }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>

              {/* ── ROW 2: Animated greeting — large, like "VISUAL" in ref ── */}
              <div style={{ marginTop: 40, minHeight: 52, lineHeight: 1 }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={GREETINGS[greetingIdx].word}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    style={{
                      display: "block",
                      fontFamily: GREETINGS[greetingIdx].font,
                      fontSize: 44,
                      color: "var(--accent)", // Nu purple strictly mapped
                      lineHeight: 1,
                    }}
                  >
                    {GREETINGS[greetingIdx].word}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* ── ROW 3: Name — ultra bold, like "FLOW" in ref ── */}
              <div style={{
                fontWeight: 800,
                fontSize: 50,
                color: "var(--foreground)",
                lineHeight: 1,
                letterSpacing: "-1.5px",
                marginTop: 2,
              }}>
                Maria
              </div>

              {/* ── Thin rule ── */}
              <div style={{
                height: 1,
                background: "var(--border)",
                marginTop: 16,
              }} />

              {/* ── ROW 5: Arrow caption — like "→ DESIGNED FOR…" in ref ── */}
              <div style={{ marginTop: 14 }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 10,
                  fontWeight: 500,
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                  letterSpacing: "1.4px",
                  lineHeight: 1.6,
                }}>
                  <span>→ {t.language === "en" ? "Welcome to Lend-Lab" : "Bienvenida a Lend-Lab"}</span>
                  <NuBrandMark height={15} />
                </div>
                <p style={{
                  fontSize: 12,
                  color: "var(--muted-foreground)",
                  lineHeight: 1.65,
                  marginTop: 6,
                  opacity: 0.85,
                }}>
                  {t.language === "en" 
                    ? "Amortization simulation tool. Use the search to find a client and view their amortization table." 
                    : "Herramienta de simulación de amortizaciones. Usa la lupa para buscar un cliente y consultar su tabla de amortización."}
                </p>
              </div>

              {/* ── ROW 6: Search button — centered ── */}
              <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
                <div
                  onClick={(e) => { e.stopPropagation(); setPhase("search"); }}
                  onMouseEnter={() => setHoverSearch(true)}
                  onMouseLeave={() => setHoverSearch(false)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: hoverSearch ? "2px solid var(--accent)" : "2px solid var(--chart-2)",
                    background: hoverSearch ? "var(--purple-light)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: hoverSearch
                      ? "0 5px 18px rgba(163, 116, 204, 0.4)"
                      : "0 3px 10px rgba(163, 116, 204, 0.1)",
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={hoverSearch ? "var(--accent)" : "var(--chart-2)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s ease" }}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
            </motion.div>
          )}
            {/* ═══ SEARCH — simplified layout ═══ */}
            {phase === "search" && (
              <motion.div
                key="search"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* ── ROW 1: badge (top-left) + logo (top-right) ── */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: 9, fontWeight: 500,
                    letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--muted-foreground)",
                    border: "1px solid var(--border)", borderRadius: "100px", padding: "4px 10px",
                  }}>
                    <span>LEND-LAB</span>
                    <NuBrandMark height={13} />
  
                  </div>
                  <div style={{ color: "var(--secondary)", opacity: 0.38, display: "flex", alignItems: "center" }}>
                    <User size={32} />
                  </div>
                </div>

                {/* ── ROW 2: Simplified Instruction ── */}
                <div style={{ marginTop: 40, marginBottom: 20 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 10,
                    fontWeight: 500,
                    color: "var(--muted-foreground)",
                    textTransform: "uppercase",
                    letterSpacing: "1.4px",
                    lineHeight: 1.6,
                    marginBottom: 12
                  }}>
                    <span>→ {t.note}</span>
                  </div>
                  <p style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "var(--foreground)",
                    lineHeight: 1.6,
                    margin: 0,
                    opacity: 0.85
                  }}>
                    {t.note_desc1}<span style={{ color: "var(--accent)", fontWeight: 500 }}>Customer ID</span>{t.note_desc2}<span style={{ color: "var(--accent)", fontWeight: 500 }}>Loan ID</span>{t.note_desc3}
                  </p>
                </div>
              </motion.div>
            )}

            {/* ═══ PROFILE — placeholder layout ═══ */}
            {phase === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{ display: "flex", flexDirection: "column", padding: "40px 0", alignItems: "center", justifyContent: "center" }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "var(--foreground)"
                }}>
                  <Sparkles size={24} color="var(--accent)" />
                  <span>{t.loading_profile}</span>
                </div>
              </motion.div>
            )}

            {/* ═══ ERROR — popup layout ═══ */}
            {phase === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "10px 0" }}
              >
                {/* ── ERROR IMAGE ── */}
                <div style={{ width: "100%", marginBottom: 32, borderRadius: 16, overflow: "hidden", display: "flex", justifyContent: "center" }}>
                  <ImageWithFallback src={errorImage} alt="Error not found" style={{ width: "100%", height: "auto", objectFit: "contain", mixBlendMode: "multiply", transform: "scale(1.15)" }} />
                </div>
                
                {/* ── TEXT ── */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <h3 style={{
                    fontWeight: 800,
                    fontSize: 28,
                    color: "var(--foreground)",
                    margin: 0,
                    marginBottom: 12
                  }}>
                    {t.error}
                  </h3>
                  <p style={{
                    fontSize: 15,
                    color: "var(--muted-foreground)",
                    lineHeight: 1.5,
                    margin: 0,
                    marginBottom: 32,
                    padding: "0 20px"
                  }}>
                    {t.error_desc}
                  </p>
                </div>

                {/* ── ACTIONS ── */}
                <div style={{ display: "flex", gap: 8, justifyContent: "center", width: "100%", flexWrap: "wrap" }}>
                  {[
                    { label: t.refresh, icon: RefreshCw, color: "var(--accent)", action: () => { setSearchValue(""); setPhase("search"); } },
                    { label: t.assistance, icon: MessageSquareWarning, color: "var(--chart-4)", action: () => {} },
                  ].map((tag) => {
                    const isHovered = hoveredErrorTag === tag.label;
                    return (
                      <motion.div
                        key={tag.label}
                        onMouseEnter={() => setHoveredErrorTag(tag.label)}
                        onMouseLeave={() => setHoveredErrorTag(null)}
                        onClick={tag.action}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "8px 14px",
                          borderRadius: "100px",
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: "pointer",
                          borderStyle: "solid",
                          borderWidth: "1px",
                          backgroundColor: isHovered ? `color-mix(in srgb, ${tag.color} 15%, transparent)` : `color-mix(in srgb, ${tag.color} 15%, transparent)`,
                          borderColor: tag.color,
                          color: tag.color,
                          boxShadow: isHovered ? `0 2px 8px color-mix(in srgb, ${tag.color} 30%, transparent)` : "0 2px 8px transparent",
                          transition: "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
                        }}
                      >
                        <tag.icon size={14} />
                        <span style={{ whiteSpace: "nowrap" }}>{tag.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Widget 2: Search Bar & Tags ── */}
        <AnimatePresence>
          {phase === "search" && (
            <motion.div
              layout
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{
                ...glass,
                width: "88vw",
                maxWidth: 640,
                padding: "16px",
                display: "flex",
                flexDirection: searchFocused ? "column" : "row",
                alignItems: searchFocused ? "stretch" : "center",
                gap: searchFocused ? 20 : 16,
                borderRadius: "24px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Search Input Area */}
              <motion.div 
                layout
                style={{ flex: searchFocused ? "none" : 1, display: "flex", alignItems: "center", position: "relative" }}
              >
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute", left: 16, 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--accent)"
                  }}
                >
                  <Sparkles size={18} />
                </motion.div>
                <input 
                  ref={searchInputRef}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchValue.trim().length > 0) {
                      handleSearchSubmit();
                    }
                  }}
                  placeholder={t.search}
                  style={{
                    width: "100%",
                    padding: "14px 16px 14px 44px",
                    background: "var(--input-background)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    outline: "none",
                    color: "var(--foreground)",
                    fontSize: "var(--text-base)",
                    transition: "all 0.3s ease",
                    boxShadow: searchFocused ? "0 0 0 2px var(--ring)" : "none",
                  }}
                />
              </motion.div>

              {/* Tags Area */}
              <motion.div 
                layout
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: searchFocused ? "flex-start" : "flex-end",
                }}
              >
                {[
                  { label: "Customer ID", icon: User, color: "var(--accent)" },
                  { label: "Loan ID", icon: FileText, color: "var(--primary)" },
                  { label: t.refresh, icon: RefreshCw, color: "var(--chart-3)" },
                  { label: t.search_btn, icon: Search, color: "var(--chart-4)" },
                ].map((tag, idx) => {
                  const Icon = tag.icon;
                  const isMainTag = tag.label === "Customer ID" || tag.label === "Loan ID";
                  const isActionTag = tag.label === t.refresh || tag.label === t.search_btn;
                  const isSimple = !searchFocused;
                  const hasText = searchValue.trim().length > 0;
                  const isActiveAction = isActionTag && hasText;

                  return (
                    <motion.div
                      layout
                      key={tag.label}
                      onMouseDown={(e) => {
                        if (!isMainTag) e.preventDefault(); // Keep focus when clicking action buttons
                      }}
                      onMouseEnter={(e) => {
                        setHoveredTag(tag.label);
                      }}
                      onMouseLeave={(e) => {
                        setHoveredTag(null);
                      }}
                      onClick={() => {
                        if (tag.label === t.refresh) {
                          setSearchValue("");
                          searchInputRef.current?.focus();
                        } else if (tag.label === t.search_btn) {
                          if (hasText) {
                            handleSearchSubmit();
                          } else {
                            searchInputRef.current?.focus();
                          }
                        }
                      }}
                      initial={{ 
                        opacity: 0, 
                        scale: 0.8,
                      }}
                      animate={{ 
                        opacity: isSimple ? 0.6 : (isMainTag || isActiveAction ? 1 : 0.6), 
                        scale: 1,
                      }}
                      whileTap={
                        isActionTag ? {
                          scale: 0.95,
                        } : undefined
                      }
                      style={{
                        backgroundColor: (hoveredTag === tag.label && isActionTag) ? `color-mix(in srgb, ${tag.color} 15%, transparent)` : (isSimple ? "transparent" : (isMainTag || isActiveAction ? `color-mix(in srgb, ${tag.color} 15%, transparent)` : "transparent")),
                        borderColor: (hoveredTag === tag.label && isActionTag) ? tag.color : (isSimple ? "transparent" : (isMainTag || isActiveAction ? tag.color : "transparent")),
                        color: (hoveredTag === tag.label && isActionTag) ? tag.color : (isSimple ? "var(--muted-foreground)" : (isMainTag || isActiveAction ? tag.color : "var(--muted-foreground)")),
                        boxShadow: (hoveredTag === tag.label && isActionTag) ? `0 2px 8px color-mix(in srgb, ${tag.color} 30%, transparent)` : (isSimple ? "0 2px 8px transparent" : (isMainTag || isActiveAction ? `0 2px 8px color-mix(in srgb, ${tag.color} 30%, transparent)` : "0 2px 8px transparent")),
                        transition: "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: isSimple ? 0 : (isMainTag || isActiveAction ? 6 : 4),
                        padding: isSimple ? "6px" : (isMainTag ? "8px 14px" : "6px 10px"),
                        borderRadius: "100px",
                        fontSize: isSimple ? 13 : (isMainTag ? 13 : 12),
                        fontWeight: 500,
                        cursor: isMainTag ? "default" : "pointer",
                        borderStyle: "solid",
                        borderWidth: "1px",
                      }}
                    >
                      <motion.div
                        animate={{ opacity: isSimple ? 1 : (isMainTag || isActiveAction ? 1 : 0.6) }}
                        whileHover={isActionTag ? { opacity: 1 } : undefined}
                      >
                        <Icon size={isSimple ? 16 : (isMainTag || isActiveAction ? 14 : 14)} />
                      </motion.div>
                      {!isSimple && <span style={{ whiteSpace: "nowrap" }}>{tag.label}</span>}
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/profile/:id",
    Component: ProfileScreen,
  },
  {
    path: "/simulation/:id",
    Component: SimulationScreen,
  },
  {
    path: "/simulation/:id",
    Component: SimulationScreen,
  }
]);

export default function App() {
  return (
    <AIAssistantProvider>
      <SharedStateProvider>
        <RouterProvider router={router} />
      </SharedStateProvider>
    </AIAssistantProvider>
  );
}
