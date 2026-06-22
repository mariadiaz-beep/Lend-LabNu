import React, { createContext, useContext, useState, ReactNode } from "react";

interface SharedStateContextType {
  // Profile State
  selectedLoan: string;
  setSelectedLoan: (id: string) => void;
  
  // Simulation State
  abonoExtra: number;
  setAbonoExtra: (val: number) => void;
  plazo: number;
  setPlazo: (val: number) => void;
  hasSimulated: boolean;
  setHasSimulated: (val: boolean) => void;
  resetState: () => void;
}

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export function SharedStateProvider({ children }: { children: ReactNode }) {
  const [selectedLoan, setSelectedLoan] = useState<string>("");
  const [abonoExtra, setAbonoExtra] = useState<number>(100000);
  const [plazo, setPlazo] = useState<number>(6);
  const [hasSimulated, setHasSimulated] = useState<boolean>(false);

  const resetState = () => {
    setSelectedLoan("");
    setAbonoExtra(100000);
    setPlazo(6);
    setHasSimulated(false);
  };

  return (
    <SharedStateContext.Provider value={{
      selectedLoan, setSelectedLoan,
      abonoExtra, setAbonoExtra,
      plazo, setPlazo,
      hasSimulated, setHasSimulated,
      resetState
    }}>
      {children}
    </SharedStateContext.Provider>
  );
}

export function useSharedState() {
  const context = useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }
  return context;
}