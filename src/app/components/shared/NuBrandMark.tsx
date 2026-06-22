import React from "react";

// ─── Nu official brand mark — badge inline ───────────────────────────────────
// Badge redondeado con "nu" en blanco sobre var(--accent).
// Se usa inline junto a "Lend-Lab" reemplazando el texto "Nu".
// height prop controla la altura; el ancho se escala proporcionalmente.
export function NuBrandMark({ height = 32 }: { height?: number }) {
  const w = height; // Hecho más cuadrado
  const rx = Math.round(height * 0.28);
  const fontSize = Math.round(height * 0.56);
  return (
    <svg
      width={w}
      height={height}
      viewBox={`0 0 ${w} ${height}`}
      fill="none"
      style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 4 }}
    >
      <rect width={w} height={height} rx={rx} fill="#8A05BE" />
      <text
        x={w / 2}
        y={height * 0.725}
        textAnchor="middle"
        fontWeight="800"
        fontSize={fontSize}
        letterSpacing="0.5"
        fill="white"
      >
        Nu
      </text>
    </svg>
  );
}
