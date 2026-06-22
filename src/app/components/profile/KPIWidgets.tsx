import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Activity, Target, Landmark } from "lucide-react";

const glassStyle = {
  background: "color-mix(in srgb, var(--card) 45%, transparent)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid color-mix(in srgb, var(--border) 40%, transparent)",
  borderRadius: "var(--radius-xl)",
  boxShadow: "0 8px 32px color-mix(in srgb, var(--foreground) 5%, transparent)",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  flex: 1
};

export function KPICardsWidget({ profile, tableData }: { profile: any, tableData: Record<string, any[]> }) {
  // Calcular totales globales del cliente
  let totalApproved = 0;
  let totalPending = 0;
  
  const today = new Date("2026-06-20T00:00:00");
  
  profile.loans.forEach((l: any) => {
    const rows = tableData[l.id] || [];
    rows.forEach((row) => {
       const cap = parseInt((row.Capital || "0").replace(/[^0-9]/g, ""), 10) || 0;
       totalApproved += cap;
       
       const hasEstadoField = !!row.Estado;
       const isPaidByState = hasEstadoField && row.Estado.toLowerCase().includes("pagad");
       
       let isPaid = false;
       if (hasEstadoField) {
         isPaid = isPaidByState;
       } else {
         const rowDate = new Date(row.Fecha_estimada);
         isPaid = rowDate < today;
       }
       
       if (!isPaid) {
         totalPending += cap;
       }
    });
  });

  const activeLoans = profile.loans.filter((l: any) => l.status === "activo").length;
  
  const score = profile.customerID === "CUST-SIM-001" ? 850 : 720;
  const scoreColor = score > 800 ? "var(--primary)" : "var(--chart-3)";
  const scoreStatus = score > 800 ? "Excelente" : "Bueno";

  const fmt = (val: number) => `$ ${new Intl.NumberFormat("es-CO").format(val)}`;

  const KPICard = ({ title, value, subtitle, icon: Icon, color, delay }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      style={glassStyle as any}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ margin: 0, fontSize: "var(--text-sm, 0.8rem)", fontWeight: "var(--font-weight-medium, 500)", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{title}</p>
          <h3 style={{ margin: "8px 0 4px", fontSize: "var(--text-3xl, 1.75rem)", fontWeight: "var(--font-weight-medium, 500)", color: "var(--foreground)" }}>{value}</h3>
          <p style={{ margin: 0, fontSize: "var(--text-sm, 0.85rem)", fontWeight: "var(--font-weight-medium, 500)", color: color }}>{subtitle}</p>
        </div>
        <div style={{ 
          width: 40, height: 40, borderRadius: "50%", 
          background: `color-mix(in srgb, ${color} 15%, transparent)`,
          color: color, display: "flex", alignItems: "center", justifyContent: "center" 
        }}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
      <KPICard 
        title="Puntaje Crediticio" 
        value={score} 
        subtitle={scoreStatus} 
        icon={ShieldCheck} 
        color={scoreColor}
        delay={0.1}
      />
      <KPICard 
        title="Créditos Activos" 
        value={activeLoans} 
        subtitle={`De ${profile.loans.length} históricos`} 
        icon={Activity} 
        color="var(--chart-1)"
        delay={0.15}
      />
      <KPICard 
        title="Total Aprobado" 
        value={fmt(totalApproved)} 
        subtitle="Suma de todos los créditos" 
        icon={Landmark} 
        color="var(--chart-2)"
        delay={0.2}
      />
      <KPICard 
        title="Saldo Pendiente" 
        value={fmt(totalPending)} 
        subtitle="Por pagar actualmente" 
        icon={Target} 
        color={totalPending > 0 ? "var(--chart-4)" : "var(--primary)"}
        delay={0.25}
      />
    </div>
  );
}
