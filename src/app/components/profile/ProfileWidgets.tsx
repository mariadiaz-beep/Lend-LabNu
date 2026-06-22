import React, { useState } from "react";
import { motion } from "motion/react";
import { User, CheckCircle2, CircleDashed, Calendar as CalendarIcon, Calculator, Sparkles, ChevronRight, FileText, Banknote, Receipt, Activity, Table2, Minimize2, Maximize2, AlertCircle, Clock, Info, Bell } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ComposedChart, Bar, BarChart, Cell, Rectangle } from "recharts";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import avatarImgMan from "../../../imports/image.png";
import avatarImgWoman from "../../../imports/image-1.png";
import { useAIAssistant, useTranslations } from "../../context/AIAssistantContext";

const formatCOP = (val: string | number) => {
  if (val === undefined || val === null || val === "") return "-";
  const numStr = String(val).replace(/[^0-9-]/g, "");
  if (!numStr) return String(val);
  const num = parseInt(numStr, 10);
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(num);
};

const glassClassName = "bg-card/80 backdrop-blur-xl border border-border rounded-[var(--radius-xl)] shadow-lg shadow-primary/5 p-6";

// ─── Perfil Widget ─────────────────────────────────────────────────────────────
export function ProfileWidget({ profile }: { profile: any }) {
  const { language } = useAIAssistant();
  const t = useTranslations();
  
  const basicTags = [
    { label: t.name, value: profile.nombre },
    { label: t.document, value: profile.documento },
    { label: "Customer ID", value: profile.customerID },
    { label: t.email, value: profile.correo }
  ];

  const productos = profile.productos ? profile.productos.split(",").map((p: string) => p.trim()) : [];
  
  // Heurística simple para determinar si el nombre es de mujer (termina en 'a' o contiene nombres comunes)
  const firstName = profile.nombre.split(" ")[0].toLowerCase();
  const isFemale = firstName.endsWith("a") || ["carmen", "inés", "raquel", "beatriz"].includes(firstName);
  const avatarImg = isFemale ? avatarImgWoman : avatarImgMan;

  return (
    <div className={glassClassName}>
      {/* HEADER WIDGET: Icono pequeño encapsulado en círculo claro y título */}
      <div className="flex items-center gap-2 pb-4 border-b border-border mb-0">
        <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center">
          <User size={14} />
        </div>
        <h2 className="font-heading m-0 text-base font-semibold text-foreground">{t.profile}</h2>
      </div>
      
      {/* IMAGEN - Sin marco, sale de la línea de corte y se desvanece en la parte inferior */}
      <div className="w-full h-60 relative mb-2 overflow-hidden [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
        <ImageWithFallback 
          src={avatarImg} 
          alt={profile.nombre} 
          className="w-full h-full object-cover object-top" 
        />
      </div>

      {/* INFORMACIÓN: Dividida en sección Cliente y Productos */}
      <div className="flex flex-col gap-6">
        
        {/* SECCIÓN CLIENTE */}
        <div className="flex flex-col gap-2">
          <span className="text-[0.7rem] text-muted-foreground font-semibold uppercase tracking-wider border-b border-border pb-1 mb-1">
            {t.client}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {basicTags.map((tag, i) => (
              <span key={i} className="bg-secondary/30 text-foreground px-2.5 py-1 rounded-full text-xs font-medium border border-border inline-flex items-center gap-1">
                <span className="text-muted-foreground">{tag.label}:</span>
                <span>{tag.value}</span>
              </span>
            ))}
          </div>
        </div>

        {/* SECCIÓN PRODUCTOS: Tags dinámicos */}
        {productos.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[0.7rem] text-muted-foreground font-semibold uppercase tracking-wider border-b border-border pb-1 mb-1">
              {t.products}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {productos.map((prod: string, idx: number) => (
                <span key={idx} className="bg-accent/15 text-accent px-2.5 py-1 rounded-full text-xs font-medium border border-accent/30">
                  {prod}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Claves Widget ─────────────────────────────────────────────────────────────
export function ClavesWidget({ currentTableData = [] }: { currentTableData?: any[] }) {
  const [showBellTooltip, setShowBellTooltip] = useState(false);
  const t = useTranslations();

  const isEnMora = currentTableData.some(r => r.Estado && r.Estado.toLowerCase().includes("mora"));
  const hasAtrasos = currentTableData.some(r => r.Estado && r.Estado.toLowerCase().includes("atraso"));
  const paidCount = currentTableData.filter(r => r.Estado && r.Estado.toLowerCase().includes("pagad")).length;

  let labelPrincipal = t.consistent_payment;
  let descPrincipal = t.consistent_payment_desc;
  let enfoquePrincipal = t.consistent_payment_focus;
  let tagColorClass = "text-chart-2"; 
  let tagBgClass = "bg-chart-2/15";
  let tagBorderClass = "border-chart-2/30";

  if (isEnMora || hasAtrasos) {
    if (paidCount > 2) {
      labelPrincipal = t.occasional_delays;
      descPrincipal = t.occasional_delays_desc;
      enfoquePrincipal = t.occasional_delays_focus;
      tagColorClass = "text-chart-3"; 
      tagBgClass = "bg-chart-3/15";
      tagBorderClass = "border-chart-3/30";
    } else {
      labelPrincipal = t.irregular_payment;
      descPrincipal = t.irregular_payment_desc;
      enfoquePrincipal = t.irregular_payment_focus;
      tagColorClass = "text-destructive"; 
      tagBgClass = "bg-destructive/15";
      tagBorderClass = "border-destructive/30";
    }
  }

  return (
    <div className={`${glassClassName} flex flex-col gap-3 h-full px-6 py-4`}>
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-foreground/10 text-foreground flex items-center justify-center">
            <Info size={14} />
          </div>
          <h2 className="font-heading m-0 text-base font-semibold text-foreground">{t.keys}</h2>
        </div>

        <div 
          className="relative flex"
          onMouseEnter={() => setShowBellTooltip(true)}
          onMouseLeave={() => setShowBellTooltip(false)}
        >
          <motion.button 
            onClick={() => setShowBellTooltip(false)}
            animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.5 }}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-light/70 text-purple-dark border-none cursor-pointer"
          >
            <Bell size={12} />
          </motion.button>
          {showBellTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95, x: "-50%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
              className="absolute top-[calc(100%+0.5rem)] left-1/2 w-52 bg-popover text-popover-foreground p-2.5 rounded-[var(--radius-md)] shadow-lg border border-border z-50 text-xs font-medium leading-relaxed text-center pointer-events-none"
            >
              Esta información guía la simulación, no evalúa al cliente.
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2.5 flex-1">
        <div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border inline-block mb-1.5 ${tagBgClass} ${tagColorClass} ${tagBorderClass}`}>
            {labelPrincipal}
          </span>
          <p className="font-sans m-0 text-sm text-foreground italic leading-tight">
            {descPrincipal}
          </p>
        </div>

        <div className="bg-background/40 p-2.5 rounded-md border border-border mt-auto">
          <div className="text-[0.65rem] text-muted-foreground font-semibold uppercase mb-1">
            Enfoque sugerido
          </div>
          <p className="font-sans m-0 text-xs text-foreground leading-tight">
            {enfoquePrincipal}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Loans Widget ──────────────────────────────────────────────────────────────
export function LoansWidget({ loans, selectedLoanId, onSelectLoan }: { loans: any[], selectedLoanId: string, onSelectLoan: (id: string) => void }) {
  const t = useTranslations();
  
  return (
    <div className={`${glassClassName} h-full`}>
      <div className="flex items-center gap-2 pb-3 border-b border-border mb-2">
        <div className="w-6 h-6 rounded-full bg-accent/15 text-accent flex items-center justify-center">
          <FileText size={14} />
        </div>
        <h2 className="font-heading m-0 text-base font-semibold text-foreground">{t.loans}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs text-left">
          <thead>
            <tr>
              <th className="px-3 py-2 text-muted-foreground font-semibold border-b border-border">{t.products}</th>
              <th className="px-3 py-2 text-muted-foreground font-semibold border-b border-border">ID</th>
              <th className="px-3 py-2 text-muted-foreground font-semibold border-b border-border">{t.status}</th>
              <th className="px-3 py-2 border-b border-border"></th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => {
              const isActive = loan.status === "activo";
              const isSelected = selectedLoanId === loan.id;
              
              const statusColor = isActive ? "var(--accent)" : "var(--primary)";
              
              return (
                <tr
                  key={loan.id}
                  onClick={() => onSelectLoan(loan.id)}
                  className={`cursor-pointer border-b border-border transition-colors duration-200 ${isSelected ? 'bg-primary/10' : 'hover:bg-secondary/10 bg-transparent'}`}
                >
                  <td className="px-3 py-2.5 font-medium text-foreground">
                    <div className="flex items-center gap-1.5">
                      <Banknote size={14} className={isSelected ? "text-primary" : "text-muted-foreground"} />
                      Préstamo personal
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="bg-secondary/30 text-foreground px-2 py-0.5 rounded-full text-[0.65rem] font-semibold tracking-wide border border-border inline-flex items-center">
                      {loan.id}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="inline-flex items-center gap-1 text-foreground font-semibold">
                      {isActive ? <CircleDashed size={14} color={statusColor} /> : <CheckCircle2 size={14} color={statusColor} />}
                      {isActive ? t.active : t.paid}
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <ChevronRight size={16} className={`text-muted-foreground ${isSelected ? 'opacity-100' : 'opacity-30'}`} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Información Widget (Ticket) ─────────────────────────────────────────────
export function LoanInfoWidget({ currentTableData = [], loanStatus = "activo" }: { currentTableData?: any[], loanStatus?: string }) {
  const t = useTranslations();
  
  if (!currentTableData || currentTableData.length === 0) return null;

  let montoAprobado = 0;
  let saldoPendiente = 0;
  let cuotasTotales = currentTableData.length;
  let paidCount = 0;
  let isEnMora = false;
  let nextDate = "-";
  
  // Fechas simuladas para cálculo (Día de hoy = Junio 20, 2026)
  const today = new Date("2026-06-20T00:00:00");

  currentTableData.forEach((row) => {
    const cap = parseInt(String(row.Capital || "0").replace(/[^0-9]/g, ""), 10) || 0;
    const hasEstadoField = !!row.Estado;
    const isPaidByState = hasEstadoField && row.Estado.toLowerCase().includes("pagad");
    
    // Fallback a revisión de fecha si no hay estado explícito en la tabla
    let isPaid = false;
    if (hasEstadoField) {
      isPaid = isPaidByState;
    } else {
      const rowDate = new Date(row.Fecha_estimada);
      isPaid = rowDate < today;
    }
    
    montoAprobado += cap;
    if (!isPaid) {
      saldoPendiente += cap;
      const rowDate = new Date(row.Fecha_estimada);
      if (rowDate < today) {
        isEnMora = true;
      }
    } else {
      paidCount++;
    }
  });

  const pendingRow = currentTableData.find(row => {
    if (row.Estado) return !row.Estado.toLowerCase().includes("pagad");
    return new Date(row.Fecha_estimada) >= today;
  });

  if (pendingRow) {
    nextDate = pendingRow.Fecha_estimada;
  } else {
    nextDate = currentTableData[currentTableData.length - 1].Fecha_estimada;
  }

  const currentCuota = paidCount < cuotasTotales ? paidCount + 1 : cuotasTotales;
  const cuotasDisplay = `${currentCuota}/${cuotasTotales}`;
  
  let computedStatus = loanStatus === "pagado" || paidCount === cuotasTotales 
    ? t.paid 
    : (isEnMora ? "En mora a la fecha" : "Pago al día");

  const fmt = (val: number) => formatCOP(val);

  const TicketRow = ({ label, value, isBold = false, highlight = false, isStatus = false, noBorder = false }: any) => (
    <div className={`flex justify-between items-center py-3 ${noBorder ? '' : 'border-b border-dashed border-border'}`}>
      <span className="text-muted-foreground text-[0.7rem] font-medium">{label}</span>
      <span 
        className={`text-[0.75rem] ${isBold || isStatus ? 'font-bold' : 'font-medium'} ${
          highlight 
            ? 'text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/30' 
            : isStatus 
              ? computedStatus.includes("mora") 
                ? 'text-destructive bg-destructive/10 px-2 py-0.5 rounded-full border border-destructive/30'
                : 'text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/30'
              : 'text-foreground'
        }`}
      >
        {value}
      </span>
    </div>
  );

  return (
    <div className={`${glassClassName} flex flex-col h-full`}>
      <div className="flex items-center gap-2 pb-3 border-b border-border mb-4">
        <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center">
          <Receipt size={14} />
        </div>
        <h2 className="font-heading m-0 text-base font-semibold text-foreground">Resumen</h2>
      </div>
      
      <div className="bg-card/50 px-4 py-1 rounded-[var(--radius-md)] border border-border flex-1 shadow-inner">
         <TicketRow label="Monto aprobado" value={fmt(montoAprobado)} />
         <TicketRow label="Saldo pendiente" value={fmt(saldoPendiente)} isBold highlight />
         <TicketRow label="Cuotas" value={cuotasDisplay} />
         <TicketRow label="Estado" value={computedStatus} isStatus />
         <TicketRow label="Interés mensual" value="2.10%" />
         <TicketRow label="Interés anual" value="25.20%" />
         <TicketRow label={loanStatus === "pagado" ? "Último pago" : "Próxima cuota"} value={nextDate} noBorder />
      </div>
    </div>
  );
}

const BehaviorTooltip = ({ active, payload, label }: any) => {
  const t = useTranslations();
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card rounded-[var(--radius-md)] border border-border shadow-md p-3 text-xs">
        <div className="font-bold text-foreground mb-2">{label ? label.split('_')[0] : ''}</div>
        <div className="flex justify-between gap-4 mb-1">
           <span className="text-muted-foreground">{t.capital_paid}:</span>
           <span className="font-medium text-foreground">{formatCOP(data.CapitalOriginal)}</span>
        </div>
        <div className="flex justify-between gap-4 mb-1">
           <span className="text-muted-foreground">{t.interest_paid}:</span>
           <span className="font-medium text-foreground">{formatCOP(data.InteresOriginal)}</span>
        </div>
        {data.MoraOriginal > 0 && (
          <div className="flex justify-between gap-4">
             <span className="text-muted-foreground">{t.late_interest}:</span>
             <span className="font-medium text-foreground">{formatCOP(data.MoraOriginal)}</span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const MinimizedDotShape = (props: any) => {
  const { x, y, width, height, payload, isActive } = props;
  const cx = x + width / 2;
  const cy = y + height / 2;
  
  let color = "var(--chart-2)"; // Capital
  let patternId = "url(#pattern-cap-hover-min)";
  if (payload.MoraOriginal > 0) {
    color = "var(--purple-dark)";
    patternId = "url(#pattern-mora-hover-min)";
  } else if (payload.InteresOriginal > 0 && payload.CapitalOriginal === 0) {
    color = "var(--purple-light)";
    patternId = "url(#pattern-int-hover-min)";
  }

  // Dimensiones proporcionales a los puntos originales pero con estética de barra
  const w = isActive ? 24 : 16;
  const h = isActive ? 48 : 28;
  const r = isActive ? 8 : 6; // Radio para los bordes superiores
  const fill = isActive ? patternId : color;
  
  const barX = cx - w / 2;
  const barY = cy - h / 2;

  // Path que dibuja un rectángulo con las esquinas superiores redondeadas y la base plana,
  // similar a las barras del gráfico principal.
  const path = `M${barX},${barY + h} L${barX},${barY + r} A${r},${r} 0 0,1 ${barX + r},${barY} L${barX + w - r},${barY} A${r},${r} 0 0,1 ${barX + w},${barY + r} L${barX + w},${barY + h} Z`;

  return (
    <g className="cursor-pointer">
      <path 
        d={path}
        fill={fill} 
        className="transition-all duration-200 ease-out"
      />
      <text
        x={cx}
        y={barY + h + 14}
        textAnchor="middle"
        fill="var(--muted-foreground)"
        className="text-[0.625rem] font-sans font-medium"
      >
        {payload.displayName}
      </text>
    </g>
  );
};

// ─── Behavior Widget (Comportamiento) ────────────────────────────────────────
export function BehaviorWidget({ currentTableData = [] }: { currentTableData?: any[] }) {
  const t = useTranslations();
  if (!currentTableData || currentTableData.length === 0) return null;

  const today = new Date("2026-06-20T00:00:00");
  const chartData = currentTableData
    .filter(row => {
      if (row.Estado) return row.Estado.toLowerCase().includes("pagad");
      return new Date(row.Fecha_estimada) < today;
    })
    .map((row, index) => {
      const cap = parseInt(String(row.Capital || "0").replace(/[^0-9]/g, ""), 10) || 0;
      const int = parseInt(String(row.Interés || row.Interes || "0").replace(/[^0-9]/g, ""), 10) || 0;
      const mora = parseInt(String(row.Interés_mora || row.Interes_mora || "0").replace(/[^0-9]/g, ""), 10) || 0;
      
      return {
        name: `C${row.Cuota}_${index}`, // Unique for Recharts internal keys
        displayName: `C${row.Cuota}`, // For display if needed
        CapitalOriginal: cap,
        InteresOriginal: int,
        MoraOriginal: mora,
        TotalMora: cap + int + mora, // Barra de fondo (más alta)
        TotalInteres: cap + int,     // Barra intermedia
        TotalCapital: cap,           // Barra frontal
        Estado: row.Estado || "Pagado",
        ConstantY: 100 // Para la versión minificada
      };
    });

  return (
    <div className={`${glassClassName} flex flex-col transition-all duration-300 h-full relative z-50`}>
      <div className={`flex items-center justify-between pb-3 border-b border-border mb-4`}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-chart-2/15 text-chart-2 flex items-center justify-center">
            <Activity size={14} />
          </div>
          <h2 className="font-heading m-0 text-base font-semibold text-foreground">{t.behavior}</h2>
        </div>
      </div>

      <div className="flex-1 min-h-50 w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} maxBarSize={44}>
            <defs>
              <pattern id="pattern-cap-hover" patternUnits="userSpaceOnUse" width="16" height="16" patternTransform="rotate(45)">
                <rect width="16" height="16" fill="var(--chart-2)" opacity="0.4" />
                <line x1="0" y1="0" x2="0" y2="16" stroke="var(--chart-2)" strokeWidth="12" opacity="1" />
              </pattern>
              <pattern id="pattern-int-hover" patternUnits="userSpaceOnUse" width="16" height="16" patternTransform="rotate(45)">
                <rect width="16" height="16" fill="var(--purple-light)" opacity="0.6" />
                <line x1="0" y1="0" x2="0" y2="16" stroke="var(--purple-light)" strokeWidth="12" opacity="1" />
              </pattern>
              <pattern id="pattern-mora-hover" patternUnits="userSpaceOnUse" width="16" height="16" patternTransform="rotate(45)">
                <rect width="16" height="16" fill="var(--purple-dark)" opacity="0.4" />
                <line x1="0" y1="0" x2="0" y2="16" stroke="var(--purple-dark)" strokeWidth="12" opacity="1" />
              </pattern>
            </defs>
            <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis key="xaxis-0" xAxisId={0} dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: "0.65rem", fill: "var(--muted-foreground)" }} tickFormatter={(val: string) => val.split('_')[0]} minTickGap={10} interval="preserveStartEnd" />
            <XAxis key="xaxis-1" xAxisId={1} dataKey="name" hide />
            <XAxis key="xaxis-2" xAxisId={2} dataKey="name" hide />
            <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{ fontSize: "0.65rem", fill: "var(--muted-foreground)" }} formatter={(val: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", notation: "compact", maximumFractionDigits: 0 }).format(val)} />
            <Tooltip 
              key="tooltip"
              cursor={{ fill: "var(--muted)", opacity: 0.2 }}
              content={<BehaviorTooltip />}
              wrapperStyle={{ zIndex: 1000 }}
            />
            
            <Bar 
              xAxisId={0}
              key="bar-mora" 
              dataKey="TotalMora" 
              isAnimationActive={false}
              radius={[24, 24, 0, 0]}
              activeBar={<Rectangle fill="url(#pattern-mora-hover)" />}
            >
              {chartData.map((entry, index) => (
                <Cell key={`mora-${index}`} fill="var(--purple-dark)" />
              ))}
            </Bar>
            
            <Bar 
              xAxisId={1}
              key="bar-int" 
              dataKey="TotalInteres" 
              isAnimationActive={false}
              radius={[24, 24, 0, 0]}
              activeBar={<Rectangle fill="url(#pattern-int-hover)" />}
            >
              {chartData.map((entry, index) => (
                <Cell key={`int-${index}`} fill="var(--purple-light)" />
              ))}
            </Bar>

            <Bar 
              xAxisId={2}
              key="bar-cap" 
              dataKey="TotalCapital" 
              isAnimationActive={false} 
              radius={[24, 24, 0, 0]}
              activeBar={<Rectangle fill="url(#pattern-cap-hover)" />}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cap-${index}`} fill="var(--chart-2)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 pt-3 border-t border-dashed border-border">
         <div className="text-[0.75rem] text-muted-foreground flex gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
               <span className="w-2.5 h-2.5 rounded-full bg-chart-2"></span> Capital
            </span>
            <span className="flex items-center gap-1.5">
               <span className="w-2.5 h-2.5 rounded-full bg-purple-light"></span> Intereses
            </span>
            <span className="flex items-center gap-1.5">
               <span className="w-2.5 h-2.5 rounded-full bg-purple-dark"></span> Mora
            </span>
         </div>
      </div>
    </div>
  );
}

const transformDataForAmortization = (data: any[], loanId: string) => {
  let acumulado = 0;
  const today = new Date("2026-06-20T00:00:00");
  
  return data
    .map((row, idx) => {
      const statusStr = (row.Estado || "").toLowerCase();
      const isPaid = statusStr.includes("pagad");
      const isMora = statusStr.includes("mora") || statusStr.includes("atraso");
      const estDate = new Date(row.Fecha_estimada);
      const isPendingFuture = statusStr.includes("pendient") && estDate > today;
      
      const valCuotaNum = parseInt(String(row.Valor_cuota || "0").replace(/[^0-9]/g, ""), 10) || 0;
      if (isPaid) acumulado += valCuotaNum;

      return {
        _isPendingFuture: isPendingFuture,
        "Payment_ID": `PAY-${loanId}-00${idx + 1}`,
        "Fecha_del_pago": isPaid ? row.Fecha_estimada : "-",
        "Current_status": row.Estado || "Pendiente",
        "Tipo_prestamo": "Libre Inversión",
        "Monthly_interest": "2.1%",
        "Anual_interest": "25.2%",
        "Approved_amount": formatCOP("2000000"),
        "Fecha_limite_pago": row.Fecha_estimada,
        "Monto_pagado": isPaid ? formatCOP(row.Valor_cuota) : formatCOP(0),
        "Interes_corriente": formatCOP(row.Interés || row.Interes || "0"),
        "Interes_mora": formatCOP(row.Interés_mora || row.Interes_mora || "0"),
        "To_interest": formatCOP(row.Interés || row.Interes || "0"),
        "To_capital": formatCOP(row.Capital || "0"),
        "Acumulado_pagado": isPaid ? formatCOP(acumulado) : "-",
        "cuota_destino": row.Cuota || String(idx + 1),
        "Saldo_pendiente": formatCOP(row.Saldo_restante),
        "Numero_cuotas": String(data.length),
        "tipo_pago": isPaid ? "Transferencia" : "-",
        "clasificacion_del_pago": "Ordinario"
      };
    })
    .filter(row => !row._isPendingFuture)
    .map(({ _isPendingFuture, ...rest }) => rest);
};

// ─── Details Widget (Table) ────────────────────���───────────��─────────────────
export function DetailsWidget({ data, loanId = "LN-000" }: { data: any[], loanId?: string }) {
  const t = useTranslations();
  if (!data || data.length === 0) return null;
  
  const transformedData = transformDataForAmortization(data, loanId);
  const columns = Object.keys(transformedData[0]);

  return (
    <div className={`${glassClassName} flex flex-col overflow-hidden w-full`}>
      <div className="flex items-center gap-2 pb-3 border-b border-border mb-4">
        <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center">
          <Table2 size={14} />
        </div>
        <h2 className="font-heading m-0 text-base font-semibold text-foreground">{t.details}</h2>
      </div>
      
      <div className="overflow-x-auto flex-1 pb-2">
        <table className="w-full border-collapse text-[0.85rem] text-left">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col} className="px-4 py-3 bg-foreground/5 text-muted-foreground font-bold text-[0.65rem] uppercase tracking-wide whitespace-nowrap border-b border-border">
                  {col.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transformedData.map((row, i) => (
              <tr key={i} className="border-b border-border transition-colors duration-200 hover:bg-foreground/5">
                {columns.map(col => {
                  if (col === "Payment_ID") {
                    return (
                      <td key={col} className="px-4 py-3 whitespace-nowrap">
                        <span className="bg-secondary/30 text-foreground px-2 py-0.5 rounded-full text-[0.65rem] font-semibold tracking-wide border border-border inline-flex items-center">
                          {row[col as keyof typeof row]}
                        </span>
                      </td>
                    );
                  }
                  
                  if (col === "Current_status") {
                    const status = (row[col as keyof typeof row] as string).toLowerCase();
                    let bgClass = "bg-foreground/5";
                    let textClass = "text-muted-foreground";
                    
                    if (status.includes("pagad") && !status.includes("atraso")) {
                      bgClass = "bg-purple-light";
                      textClass = "text-purple-dark";
                    } else if (status.includes("atraso") || status.includes("mora")) {
                      bgClass = "bg-purple-dark";
                      textClass = "text-primary-foreground";
                    }
                    
                    return (
                      <td key={col} className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bgClass} ${textClass}`}>
                          {row[col as keyof typeof row]}
                        </span>
                      </td>
                    );
                  }
                  
                  return (
                    <td key={col} className="px-4 py-3 whitespace-nowrap text-foreground">
                      {row[col as keyof typeof row]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Progress Widget ────────────────────────────────────────────────���───���────
export function ProgressWidget({ data }: { data: any[] }) {
  const t = useTranslations();
  // Mock data for chart based on table payments
  const chartData = data.map((d, i) => ({
    name: `Cuota ${d.Cuota || i+1}`,
    capital: parseInt(String(d.Capital || "0").replace(/[^0-9]/g, ""), 10) || 0,
    interes: parseInt(String(d.Interés || d.Interes || "0").replace(/[^0-9]/g, ""), 10) || 0,
  }));

  return (
    <div className={`${glassClassName} h-full`}>
      <h2 className="font-heading m-0 mb-5 text-xl font-bold text-foreground">{t.progress || "Progreso"} (Capital vs Intereses)</h2>
      <div className="w-full h-50">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient key="gradCapital" id="colorCapital" x1="0" y1="0" x2="0" y2="1">
                <stop key="stop1" offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8}/>
                <stop key="stop2" offset="95%" stopColor="var(--chart-2)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient key="gradInteres" id="colorInteres" x1="0" y1="0" x2="0" y2="1">
                <stop key="stop3" offset="5%" stopColor="var(--chart-3)" stopOpacity={0.8}/>
                <stop key="stop4" offset="95%" stopColor="var(--chart-3)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: "0.75rem", fill: "var(--muted-foreground)" }} />
            <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{ fontSize: "0.75rem", fill: "var(--muted-foreground)" }} formatter={(val: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", notation: "compact", maximumFractionDigits: 0 }).format(val)} />
            <Tooltip 
              key="tooltip"
              contentStyle={{ background: "var(--card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              formatter={(value: any) => formatCOP(value)}
            />
            <Area isAnimationActive={false} type="monotone" dataKey="capital" name="Capital" stackId="1" stroke="var(--chart-2)" strokeWidth={3} fillOpacity={1} fill="url(#colorCapital)" />
            <Area isAnimationActive={false} type="monotone" dataKey="interes" name="Interés" stackId="1" stroke="var(--chart-3)" strokeWidth={3} fillOpacity={1} fill="url(#colorInteres)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Simulation Widget ────────────────────────────────────────────────────────
export function SimulationWidget({ isActive, onSimulateClick }: { isActive: boolean; onSimulateClick?: () => void }) {
  const t = useTranslations();
  return (
    <div className={`relative h-full w-full p-4 sm:p-5 rounded-[var(--radius-xl)] border border-border backdrop-blur-xl shadow-sm transition-all duration-300 flex flex-col justify-center ${
      isActive 
        ? "bg-card/80 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30" 
        : "bg-card/40 opacity-90 grayscale"
    }`}>
      {/* Decorative top-center plus bubble */}
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border flex items-center justify-center z-10 shadow-sm transition-colors duration-300 ${
        isActive ? 'bg-primary border-primary/50 text-primary-foreground' : 'bg-card border-border text-muted-foreground'
      }`}>
        <span className="font-heading text-base font-medium leading-none mb-0.5">+</span>
      </div>

      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-[var(--radius-xl)] pointer-events-none" />
      )}
      
      <div className="relative flex items-center justify-between gap-4">
        {/* Header styling */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}`}>
            <Calculator size={20} />
          </div>
          <div>
            <h3 className={`font-heading m-0 text-base font-semibold leading-none ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
              Simulador de pagos
            </h3>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-snug m-0 mt-1 max-w-[200px]">
              Puedes realizar una simulación del pago de este crédito
            </p>
          </div>
        </div>
        
        <button 
          disabled={!isActive}
          onClick={onSimulateClick}
          className={`font-sans relative flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border flex-shrink-0 ${
            isActive 
              ? "bg-foreground text-background border-transparent hover:scale-105 hover:bg-foreground/90 cursor-pointer shadow-md" 
              : "bg-transparent text-muted-foreground border-border/50 cursor-not-allowed shadow-none"
          }`}
        >
          Simulación
        </button>
      </div>
    </div>
  );
}