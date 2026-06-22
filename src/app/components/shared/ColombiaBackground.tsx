export function ColombiaBackground() {
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
