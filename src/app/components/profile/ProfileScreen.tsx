import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Bell, User, Fingerprint } from "lucide-react";
import { ColombiaBackground } from "../shared/ColombiaBackground";
import { NuBrandMark } from "../shared/NuBrandMark";
import { ProfileWidget, ClavesWidget, LoansWidget, LoanInfoWidget, BehaviorWidget, DetailsWidget, ProgressWidget, SimulationWidget } from "./ProfileWidgets";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAIAssistant, useTranslations } from "../../context/AIAssistantContext";
import { useSharedState } from "../../context/SharedStateContext";
import { AIBubbleMenu } from "../shared/AIBubbleMenu";

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const MOCK_PROFILES: Record<string, any> = {
  "CUST-SIM-001": {
    nombre: "Laura Gómez",
    documento: "CC-SIM-9001001",
    edad: "27",
    correo: "laura.gomez.sim@example.com",
    ciudad: "Bogotá",
    customerID: "CUST-SIM-001",
    productos: "Cuenta de ahorros, Tarjeta débito",
    loans: [
      { id: "LN-SMA-001", status: "activo" }
    ]
  },
  "CUST-SIM-002": {
    nombre: "Andrés Rojas",
    documento: "CC-SIM-9002002",
    edad: "34",
    correo: "andres.rojas.sim@example.com",
    ciudad: "Medellín",
    customerID: "CUST-SIM-002",
    productos: "Cuenta de ahorros, Tarjeta débito, Tarjeta de crédito",
    loans: [
      { id: "LN-SMA-004", status: "activo" },
      { id: "LN-SMA-003C", status: "pagado" },
      { id: "LN-SMA-002B", status: "pagado" },
      { id: "LN-SMA-001A", status: "pagado" }
    ]
  }
};

const TABLE_DATA: Record<string, any[]> = {
  "LN-SMA-001": [
    { Cuota: "1", Fecha_estimada: "2026-04-15", Valor_cuota: 110400, Capital: 91200, Interés: 19200, Interés_mora: 0, Saldo_restante: 508800, Estado: "Pagado a tiempo" },
    { Cuota: "2", Fecha_estimada: "2026-05-15", Valor_cuota: 110400, Capital: 94118, Interés: 16282, Interés_mora: 0, Saldo_restante: 414682, Estado: "Pendiente" },
    { Cuota: "3", Fecha_estimada: "2026-06-15", Valor_cuota: 110400, Capital: 97130, Interés: 13270, Interés_mora: 0, Saldo_restante: 317552, Estado: "Pendiente" },
    { Cuota: "4", Fecha_estimada: "2026-07-15", Valor_cuota: 110400, Capital: 100239, Interés: 10161, Interés_mora: 0, Saldo_restante: 217313, Estado: "Pendiente" },
    { Cuota: "5", Fecha_estimada: "2026-08-15", Valor_cuota: 110400, Capital: 103446, Interés: 6954, Interés_mora: 0, Saldo_restante: 113867, Estado: "Pendiente" },
    { Cuota: "6", Fecha_estimada: "2026-09-15", Valor_cuota: 117511, Capital: 113867, Interés: 3644, Interés_mora: 0, Saldo_restante: 0, Estado: "Pendiente" },
  ],
  "LN-SMA-001A": [
    { Cuota: "1", Fecha_estimada: "2025-01-10", Valor_cuota: 106000, Capital: 94000, Interés: 12000, Interés_mora: 0, Saldo_restante: 306000, Estado: "Pagado a tiempo" },
    { Cuota: "2", Fecha_estimada: "2025-02-10", Valor_cuota: 106000, Capital: 96820, Interés: 9180, Interés_mora: 0, Saldo_restante: 209180, Estado: "Pagado a tiempo" },
    { Cuota: "3", Fecha_estimada: "2025-03-10", Valor_cuota: 106000, Capital: 99725, Interés: 6275, Interés_mora: 0, Saldo_restante: 109455, Estado: "Pagado a tiempo" },
    { Cuota: "4", Fecha_estimada: "2025-04-10", Valor_cuota: 107195, Capital: 109455, Interés: 3285, Interés_mora: 0, Saldo_restante: 0, Estado: "Pagado a tiempo" }
  ],
  "LN-SMA-002B": [
    { Cuota: "1", Fecha_estimada: "2025-05-15", Valor_cuota: 125800, Capital: 104800, Interés: 21000, Interés_mora: 0, Saldo_restante: 595200, Estado: "Pagado a tiempo" },
    { Cuota: "2", Fecha_estimada: "2025-06-15", Valor_cuota: 125800, Capital: 107944, Interés: 17856, Interés_mora: 0, Saldo_restante: 487256, Estado: "Pagado a tiempo" },
    { Cuota: "3", Fecha_estimada: "2025-07-15", Valor_cuota: 125800, Capital: 111182, Interés: 14618, Interés_mora: 0, Saldo_restante: 376074, Estado: "Pagado a tiempo" },
    { Cuota: "4", Fecha_estimada: "2025-08-15", Valor_cuota: 125800, Capital: 112017, Interés: 11283, Interés_mora: 2500, Saldo_restante: 264057, Estado: "Pagado con atraso" },
    { Cuota: "5", Fecha_estimada: "2025-09-15", Valor_cuota: 125800, Capital: 117952, Interés: 7848, Interés_mora: 0, Saldo_restante: 146105, Estado: "Pagado a tiempo" },
    { Cuota: "6", Fecha_estimada: "2025-10-15", Valor_cuota: 126546, Capital: 122837, Interés: 3709, Interés_mora: 0, Saldo_restante: 0, Estado: "Pagado a tiempo" }
  ],
  "LN-SMA-003C": [
    { Cuota: "1", Fecha_estimada: "2025-02-20", Valor_cuota: 138500, Capital: 111500, Interés: 27000, Interés_mora: 0, Saldo_restante: 888500, Estado: "Pagado a tiempo" },
    { Cuota: "2", Fecha_estimada: "2025-03-20", Valor_cuota: 138500, Capital: 114510, Interés: 23990, Interés_mora: 0, Saldo_restante: 773990, Estado: "Pagado a tiempo" },
    { Cuota: "3", Fecha_estimada: "2025-04-20", Valor_cuota: 138500, Capital: 117602, Interés: 20898, Interés_mora: 0, Saldo_restante: 656388, Estado: "Pagado a tiempo" },
    { Cuota: "4", Fecha_estimada: "2025-05-20", Valor_cuota: 138500, Capital: 120777, Interés: 17723, Interés_mora: 0, Saldo_restante: 535611, Estado: "Pagado a tiempo" },
    { Cuota: "5", Fecha_estimada: "2025-06-20", Valor_cuota: 138500, Capital: 124038, Interés: 14462, Interés_mora: 0, Saldo_restante: 411573, Estado: "Pagado a tiempo" },
    { Cuota: "6", Fecha_estimada: "2025-07-20", Valor_cuota: 138500, Capital: 127387, Interés: 11113, Interés_mora: 0, Saldo_restante: 284186, Estado: "Pagado a tiempo" },
    { Cuota: "7", Fecha_estimada: "2025-08-20", Valor_cuota: 138500, Capital: 130827, Interés: 7673, Interés_mora: 0, Saldo_restante: 153359, Estado: "Pagado a tiempo" },
    { Cuota: "8", Fecha_estimada: "2025-09-20", Valor_cuota: 139046, Capital: 135359, Interés: 3687, Interés_mora: 0, Saldo_restante: 0, Estado: "Pagado a tiempo" }
  ],
  "LN-SMA-004": [
    { Cuota: "1", Fecha_estimada: "2026-01-10", Valor_cuota: 160860, Capital: 120260, Interés: 40600, Interés_mora: 0, Saldo_restante: 1279740, Estado: "Pagado a tiempo" },
    { Cuota: "2", Fecha_estimada: "2026-02-10", Valor_cuota: 160860, Capital: 123748, Interés: 37112, Interés_mora: 0, Saldo_restante: 1155992, Estado: "Pagado a tiempo" },
    { Cuota: "3", Fecha_estimada: "2026-03-10", Valor_cuota: 160860, Capital: 127336, Interés: 33524, Interés_mora: 0, Saldo_restante: 1028656, Estado: "Pagado a tiempo" },
    { Cuota: "4", Fecha_estimada: "2026-04-10", Valor_cuota: 160860, Capital: 131029, Interés: 29831, Interés_mora: 0, Saldo_restante: 897627, Estado: "Pagado a tiempo" },
    { Cuota: "5", Fecha_estimada: "2026-05-10", Valor_cuota: 160860, Capital: 134829, Interés: 26031, Interés_mora: 0, Saldo_restante: 762798, Estado: "Pagado a tiempo" },
    { Cuota: "6", Fecha_estimada: "2026-06-10", Valor_cuota: 160860, Capital: 136939, Interés: 22121, Interés_mora: 1800, Saldo_restante: 625859, Estado: "Pagado con atraso" },
    { Cuota: "7", Fecha_estimada: "2026-07-10", Valor_cuota: 160860, Capital: 142762, Interés: 18098, Interés_mora: 0, Saldo_restante: 481297, Estado: "Pendiente" },
    { Cuota: "8", Fecha_estimada: "2026-08-10", Valor_cuota: 160860, Capital: 146902, Interés: 13958, Interés_mora: 0, Saldo_restante: 334395, Estado: "Pendiente" },
    { Cuota: "9", Fecha_estimada: "2026-09-10", Valor_cuota: 160860, Capital: 151162, Interés: 9698, Interés_mora: 0, Saldo_restante: 183233, Estado: "Pendiente" },
    { Cuota: "10", Fecha_estimada: "2026-10-10", Valor_cuota: 188547, Capital: 183233, Interés: 5314, Interés_mora: 0, Saldo_restante: 0, Estado: "Pendiente" },
  ]
};

// Resuelve si se buscó un CustomerID o un LoanID
function resolveProfile(id: string) {
  if (MOCK_PROFILES[id]) return MOCK_PROFILES[id];
  const found = Object.values(MOCK_PROFILES).find(p => p.loans.some((l: any) => l.id === id));
  return found || MOCK_PROFILES["CUST-SIM-001"]; // Fallback
}

export function ProfileScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isTopRight, language } = useAIAssistant();
  const t = useTranslations();
  
  const profile = resolveProfile(id || "");
  const { selectedLoan, setSelectedLoan, resetState } = useSharedState();

  // Auto-select el loan si el ID de búsqueda fue un Loan ID
  useEffect(() => {
    if (!selectedLoan || !profile.loans.some((l: any) => l.id === selectedLoan)) {
      if (id && id.startsWith("LN-")) {
        setSelectedLoan(id);
      } else {
        setSelectedLoan(profile.loans[0].id);
      }
    }
  }, [id, profile, selectedLoan, setSelectedLoan]);

  const activeLoanObj = profile.loans.find((l: any) => l.id === selectedLoan);
  const isLoanActive = activeLoanObj?.status === "activo";
  const currentTableData = TABLE_DATA[selectedLoan] || [];

  return (
    <div className="relative w-full h-[100svh] overflow-hidden">
      <AIBubbleMenu />
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <ColombiaBackground />
      </div>

      {/* ── Main Content Area ── */}
      <div className="relative z-10 h-full flex flex-col font-sans">
        {/* Header / Nav - Fixed Top */}
        <header className="flex items-center justify-between px-10 pt-8 pb-4 bg-gradient-to-b from-background/40 to-transparent">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                resetState();
                navigate("/?phase=search");
              }}
              className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-border bg-card/70 text-foreground cursor-pointer transition-all duration-200 hover:bg-card/90 shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              {/* Creative Title for ADN Financiero - Smaller but highlighted color */}
              <h1 className="m-0 text-sm font-extrabold flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-md shadow-sm relative overflow-hidden group tracking-wide uppercase">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-50"></div>
                <Fingerprint className="text-primary relative z-10" size={16} strokeWidth={2.5} />
                <span className="text-primary tracking-tight relative z-10">
                  ADN Financiero
                </span>
              </h1>
              {/* Estilo Tag / Formato Píldora */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/50 text-muted-foreground text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
                <span>LEND-LAB</span>
                <NuBrandMark height={13} />
              </div>
            </div>
          </div>

          {/* Icono de usuario a la derecha y Correo */}
          <div 
            className={`flex items-center gap-3 transition-all duration-500 ease-in-out ${isTopRight ? 'mr-20' : 'mr-0'}`}
          >
            {/* Correo estilo tag Lend-Lab Nu */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/50 text-muted-foreground text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
              <span>{language === "en" ? "ai.advisor@nubank.com.co" : "asesor.ia@nubank.com.co"}</span>
            </div>
            {/* Icono de usuario */}
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-card/50 border border-border text-primary cursor-pointer hover:bg-card/80 transition-colors shadow-sm">
              <User size={20} />
            </div>
            </div>
        </header>

        {/* Scrollable Dashboard Grid */}
        <div className="flex-1 overflow-y-auto px-10 pb-10">
          <div className="flex flex-col gap-6 w-full mx-auto">

            {/* TOP SECTION: 2 Columns */}
            <div className="grid lg:grid-cols-[300px_1fr] gap-6">
              
              {/* Left Column: Perfil y Claves */}
              <div className="flex flex-col gap-6 relative z-[100]">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <ProfileWidget profile={profile} />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="flex-1 relative z-[100]">
                  <ClavesWidget currentTableData={currentTableData} />
                </motion.div>
              </div>

              {/* Right Column: Loans, Info, and Behavior */}
              <div className="flex flex-col gap-6 min-w-0 flex-1">
                
                <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-6">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="h-full flex flex-col">
                    <LoansWidget loans={profile.loans} selectedLoanId={selectedLoan} onSelectLoan={setSelectedLoan} />
                  </motion.div>
                  
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="h-full flex flex-col">
                    <LoanInfoWidget currentTableData={currentTableData} loanStatus={activeLoanObj?.status} />
                  </motion.div>
                </div>

                {/* Comportamiento Widget */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="flex flex-col flex-1 relative z-50">
                  <BehaviorWidget currentTableData={currentTableData} />
                </motion.div>

              </div>
            </div>

            {/* BOTTOM SECTION: Amortización spanning full width */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <DetailsWidget data={currentTableData} loanId={selectedLoan} />
            </motion.div>

            {/* Simulación centrada debajo de Amortización */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex justify-center w-full">
              <div className="w-full max-w-[480px]">
                <SimulationWidget 
                  isActive={isLoanActive} 
                  onSimulateClick={() => navigate(`/simulation/${selectedLoan}`)} 
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}