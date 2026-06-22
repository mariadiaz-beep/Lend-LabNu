import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AIAssistantContextType {
  isTopRight: boolean;
  setIsTopRight: (value: boolean) => void;
  language: "es" | "en";
  setLanguage: (value: "es" | "en") => void;
  theme: "light" | "dark";
  setTheme: (value: "light" | "dark") => void;
}

const AIAssistantContext = createContext<AIAssistantContextType>({
  isTopRight: false,
  setIsTopRight: () => {},
  language: "es",
  setLanguage: () => {},
  theme: "light",
  setTheme: () => {},
});

export function AIAssistantProvider({ children }: { children: ReactNode }) {
  const [isTopRight, setIsTopRight] = useState(false);
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <AIAssistantContext.Provider value={{ isTopRight, setIsTopRight, language, setLanguage, theme, setTheme }}>
      {children}
    </AIAssistantContext.Provider>
  );
}

export function useAIAssistant() {
  return useContext(AIAssistantContext);
}

const translations = {
  es: {
    lang_code: "es",
    hello: "¡Hola!",
    assistant: "Asistente IA",
    ask_ai: "Pregunta a la IA...",
    profile: "Perfil",
    client: "Cliente",
    products: "Productos",
    name: "Nombre",
    document: "Documento",
    email: "Correo",
    keys: "Claves",
    consistent_payment: "Pago consistente",
    consistent_payment_desc: "Historial de pago estable.",
    consistent_payment_focus: "Enfócate en ahorro de intereses o reducción de plazo.",
    occasional_delays: "Atrasos ocasionales",
    occasional_delays_desc: "Atrasos leves, mantiene continuidad.",
    occasional_delays_focus: "Plantea escenarios y montos realistas para su flujo.",
    irregular_payment: "Cumplimiento irregular",
    irregular_payment_desc: "Atrasos frecuentes, dificultad de pago.",
    irregular_payment_focus: "Prioriza explicar fechas y monto objetivo.",
    loans: "Préstamos",
    paid: "Pagado",
    active: "Activo",
    loan_info: "Información",
    status: "Estado",
    amount: "Monto",
    term: "Plazo",
    behavior: "Comportamiento",
    capital_paid: "Capital Pagado",
    interest_paid: "Intereses Pagados",
    late_interest: "Intereses Mora",
    details: "Amortización",
    quota: "Cuota",
    estimated_date: "Fecha Estimada",
    simulation: "Simulación",
    simulation_desc: "Puedes realizar una simulación del pago de este crédito",
    loan_paid_no_sim: "Préstamo pagado, no requiere simulación.",
    start_simulation: "Comenzar Simulación",
    search: "Buscar...",
    loading_profile: "Cargando perfil...",
    error: "ERROR",
    error_desc: "Inténtalo de nuevo o solicita asistencia.",
    refresh: "Refresh",
    assistance: "Asistencia",
    search_btn: "Búsqueda",
    note: "A tener en cuenta",
    note_desc1: "Busca el perfil con el ",
    note_desc2: " o ",
    note_desc3: " para iniciar la simulación.",
  },
  en: {
    lang_code: "en",
    hello: "Hello!",
    assistant: "AI Assistant",
    ask_ai: "Ask the AI...",
    profile: "Profile",
    client: "Client",
    products: "Products",
    name: "Name",
    document: "Document",
    email: "Email",
    keys: "Keys",
    consistent_payment: "Consistent Payment",
    consistent_payment_desc: "Stable payment history.",
    consistent_payment_focus: "Focus on interest savings or term reduction.",
    occasional_delays: "Occasional Delays",
    occasional_delays_desc: "Mild delays, maintains continuity.",
    occasional_delays_focus: "Propose realistic scenarios and amounts for their cash flow.",
    irregular_payment: "Irregular Compliance",
    irregular_payment_desc: "Frequent delays, payment difficulties.",
    irregular_payment_focus: "Prioritize explaining dates and target amount.",
    loans: "Loans",
    paid: "Paid",
    active: "Active",
    loan_info: "Information",
    status: "Status",
    amount: "Amount",
    term: "Term",
    behavior: "Behavior",
    capital_paid: "Capital Paid",
    interest_paid: "Interest Paid",
    late_interest: "Late Interest",
    details: "Amortization",
    quota: "Installment",
    estimated_date: "Estimated Date",
    simulation: "Simulation",
    simulation_desc: "You can perform a payment simulation for this loan",
    loan_paid_no_sim: "Loan paid, simulation not required.",
    start_simulation: "Start Simulation",
    search: "Search...",
    loading_profile: "Loading profile...",
    error: "ERROR",
    error_desc: "Try again or request assistance.",
    refresh: "Refresh",
    assistance: "Assistance",
    search_btn: "Search",
    note: "Keep in mind",
    note_desc1: "Search the profile using the ",
    note_desc2: " or ",
    note_desc3: " to start the simulation.",
  }
};

export function useTranslations() {
  const { language } = useAIAssistant();
  return translations[language];
}
