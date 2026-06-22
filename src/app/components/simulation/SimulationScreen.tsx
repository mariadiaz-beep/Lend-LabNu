import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, User, Fingerprint, Calculator, Calendar, DollarSign, ChevronRight, Info, Table as TableIcon } from "lucide-react";
import { ColombiaBackground } from "../shared/ColombiaBackground";
import { NuBrandMark } from "../shared/NuBrandMark";
import { useAIAssistant } from "../../context/AIAssistantContext";
import { useSharedState } from "../../context/SharedStateContext";
import { AIBubbleMenu } from "../shared/AIBubbleMenu";
import { motion, AnimatePresence } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export function SimulationScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isTopRight, language } = useAIAssistant();
  const { abonoExtra, setAbonoExtra, plazo, setPlazo, hasSimulated, setHasSimulated } = useSharedState();
  
  // Mock Base Data for Simulation
  const saldoActual = 508800;
  const tasaInteres = 0.02; // 2% EM

  // Calcs
  const nuevoSaldo = Math.max(0, saldoActual - abonoExtra);
  const nuevaCuota = nuevoSaldo > 0 ? (nuevoSaldo * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -plazo)) : 0;
  const totalIntereses = (nuevaCuota * plazo) - nuevoSaldo;
  
  const cuotaActualEstimada = (saldoActual * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -6));
  const interesesOriginales = (cuotaActualEstimada * 6) - saldoActual;
  const ahorroIntereses = Math.max(0, interesesOriginales - totalIntereses);

  const chartData = [
    { name: "Capital", value: nuevoSaldo, color: "var(--chart-2)" }, // Strict requirement: Capital is #A374CC (chart-2)
    { name: "Intereses", value: Math.max(0, totalIntereses), color: "var(--accent)" }
  ];

  // Generar tabla
  let saldoRestante = nuevoSaldo;
  const tablaAmortizacion = Array.from({ length: plazo }).map((_, i) => {
    const interes = saldoRestante * tasaInteres;
    const capital = nuevaCuota - interes;
    saldoRestante -= capital;
    return {
      mes: i + 1,
      cuota: nuevaCuota,
      capital,
      interes,
      saldo: Math.max(0, saldoRestante)
    };
  });

  return (
    <div className="relative w-full h-[100svh] overflow-hidden bg-background">
      <AIBubbleMenu />
      
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <ColombiaBackground />
      </div>

      {/* ── Main Content Area ── */}
      <div className="relative z-10 h-full flex flex-col font-sans">
        
        {/* Header / Nav - Fixed Top */}
        <header className="flex-shrink-0 flex items-center justify-between px-10 pt-8 pb-4 bg-gradient-to-b from-background/60 to-transparent">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/profile/${id || '123'}`)}
              className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-border bg-card/70 text-foreground cursor-pointer transition-all duration-200 hover:bg-card/90 shadow-sm backdrop-blur-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <h1 className="m-0 text-sm font-extrabold flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-md shadow-sm relative overflow-hidden group tracking-wide uppercase">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-50"></div>
                <Calculator className="text-accent relative z-10" size={16} strokeWidth={2.5} />
                <span className="text-accent tracking-tight relative z-10 font-heading">
                  Simulación
                </span>
              </h1>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/50 text-muted-foreground text-xs font-medium tracking-widest uppercase backdrop-blur-sm cursor-pointer hover:bg-card/70 transition-colors" onClick={() => navigate(`/profile/${id || '123'}`)}>
                <Fingerprint size={14} />
                <span className="font-heading">ADN Financiero</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/50 text-muted-foreground text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
                <span className="font-heading">LEND-LAB</span>
                <NuBrandMark height={13} />
              </div>
            </div>
          </div>

          <div className={`flex items-center gap-3 transition-all duration-500 ease-in-out ${isTopRight ? 'mr-20' : 'mr-0'}`}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/50 text-muted-foreground text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
              <span className="font-heading">{language === "en" ? "ai.advisor@nubank.com.co" : "asesor.ia@nubank.com.co"}</span>
            </div>
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-card/50 border border-border text-accent cursor-pointer hover:bg-card/80 transition-colors shadow-sm backdrop-blur-sm">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Workspace - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-12 pt-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:items-start items-stretch">
            
            {/* Left Panel: Configuración */}
            <motion.div 
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex-shrink-0 w-full ${hasSimulated ? 'lg:w-[400px]' : 'max-w-xl mx-auto'} bg-card/60 backdrop-blur-xl border border-border rounded-[var(--radius-xl)] shadow-lg overflow-hidden flex flex-col transition-all duration-500`}
            >
              <div className="p-6 border-b border-border/50 bg-gradient-to-r from-accent/5 to-transparent">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center">
                    <Calculator size={20} />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-foreground m-0">Simulación de pago</h2>
                </div>
                <p className="text-sm text-muted-foreground font-sans m-0 mt-2">
                  Configura tu escenario de abono o cambio de plazo para ver cómo afecta tu crédito actual.
                </p>
              </div>

              <div className="p-6 flex flex-col gap-6">
                {/* Info Saldo Actual */}
                <div className="bg-background/50 rounded-[var(--radius-lg)] p-4 border border-border/50 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-medium">Saldo Actual</span>
                  <span className="text-lg font-heading font-bold text-foreground">{formatCurrency(saldoActual)}</span>
                </div>

                {/* Abono Extra Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <DollarSign size={16} className="text-accent" />
                    Monto de abono a capital
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                    <input 
                      type="number" 
                      value={abonoExtra || ""}
                      onChange={(e) => setAbonoExtra(Number(e.target.value))}
                      className="w-full bg-background border border-border rounded-[var(--radius-md)] py-3 pl-8 pr-4 text-foreground font-heading focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                      placeholder="0"
                    />
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max={saldoActual} 
                    step="10000"
                    value={abonoExtra}
                    onChange={(e) => setAbonoExtra(Number(e.target.value))}
                    className="w-full accent-accent cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$0</span>
                    <span>{formatCurrency(saldoActual)}</span>
                  </div>
                </div>

                {/* Plazo Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Calendar size={16} className="text-accent" />
                    Nuevo plazo (Meses)
                  </label>
                  <input 
                    type="number" 
                    value={plazo || ""}
                    onChange={(e) => setPlazo(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded-[var(--radius-md)] py-3 px-4 text-foreground font-heading focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                    min="1"
                    max="72"
                  />
                </div>

                <button
                  onClick={() => setHasSimulated(true)}
                  className="mt-4 w-full bg-accent text-accent-foreground py-3.5 rounded-full font-heading font-bold flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors shadow-md shadow-accent/20"
                >
                  {hasSimulated ? "Actualizar Simulación" : "Calcular Simulación"}
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>

            {/* Right Panel: Resultados y Tabla */}
            <AnimatePresence>
              {hasSimulated && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 flex flex-col gap-6"
                >
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-card/60 backdrop-blur-xl border border-border rounded-[var(--radius-xl)] p-5 shadow-sm flex flex-col justify-center">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Nueva Cuota</span>
                      <span className="text-2xl font-heading font-bold text-foreground">{formatCurrency(nuevaCuota)}</span>
                    </div>
                    <div className="bg-card/60 backdrop-blur-xl border border-border rounded-[var(--radius-xl)] p-5 shadow-sm flex flex-col justify-center">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Ahorro en Intereses</span>
                      <span className="text-2xl font-heading font-bold text-accent">{formatCurrency(ahorroIntereses)}</span>
                    </div>
                    <div className="bg-card/60 backdrop-blur-xl border border-border rounded-[var(--radius-xl)] p-5 shadow-sm flex flex-col justify-center">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Nuevo Saldo</span>
                      <span className="text-2xl font-heading font-bold text-foreground">{formatCurrency(nuevoSaldo)}</span>
                    </div>
                  </div>

                  {/* Chart and Table Container */}
                  <div className="bg-card/60 backdrop-blur-xl border border-border rounded-[var(--radius-xl)] shadow-lg overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <h3 className="font-heading font-bold text-lg m-0 flex items-center gap-2">
                        <TableIcon className="text-accent" size={20} />
                        Tabla de Amortización Estimada
                      </h3>
                      
                      <div className="flex items-center gap-4 text-xs font-medium">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-chart-2"></div>
                          <span className="text-muted-foreground">Capital</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-accent"></div>
                          <span className="text-muted-foreground">Intereses</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col xl:flex-row">
                      {/* Chart Section */}
                      <div className="w-full xl:w-1/3 p-6 border-b xl:border-b-0 xl:border-r border-border/50 flex flex-col items-center justify-center">
                        <div className="h-[200px] w-full relative">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                              >
                                {chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value: number) => formatCurrency(value)}
                                contentStyle={{ backgroundColor: 'var(--card)', borderRadius: 'var(--radius-md)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                                itemStyle={{ fontWeight: 'bold' }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                          {/* Centered label */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-widest">Total Pagar</span>
                            <span className="font-heading font-bold text-sm text-foreground">{formatCurrency(nuevoSaldo + totalIntereses)}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center mt-2 px-4 flex items-start gap-1">
                          <Info size={14} className="flex-shrink-0 mt-0.5" />
                          Proporción del saldo reestructurado.
                        </p>
                      </div>

                      {/* Table Section */}
                      <div className="w-full xl:w-2/3 overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                          <thead className="text-xs text-muted-foreground uppercase bg-muted/20">
                            <tr>
                              <th className="px-6 py-4 font-medium">Mes</th>
                              <th className="px-6 py-4 font-medium text-right">Cuota</th>
                              <th className="px-6 py-4 font-medium text-right">Capital</th>
                              <th className="px-6 py-4 font-medium text-right">Interés</th>
                              <th className="px-6 py-4 font-medium text-right">Saldo Restante</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/50">
                            {tablaAmortizacion.map((row) => (
                              <tr key={row.mes} className="hover:bg-muted/10 transition-colors">
                                <td className="px-6 py-3 font-medium text-foreground">{row.mes}</td>
                                <td className="px-6 py-3 text-right text-foreground font-heading">{formatCurrency(row.cuota)}</td>
                                <td className="px-6 py-3 text-right text-chart-2">{formatCurrency(row.capital)}</td>
                                <td className="px-6 py-3 text-right text-accent">{formatCurrency(row.interes)}</td>
                                <td className="px-6 py-3 text-right text-foreground font-medium">{formatCurrency(row.saldo)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </div>
  );
}
