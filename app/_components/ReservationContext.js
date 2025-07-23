"use client";
import { createContext, useContext, useState } from "react";
const Reservationcntxt = createContext();
export default function ReservationContext({ children }) {
  const defaultRange = { from: undefined, to: undefined };
  const [range, setRange] = useState(defaultRange);

  return (
    <Reservationcntxt.Provider value={{ range, setRange }}>
      {children}
    </Reservationcntxt.Provider>
  );
}
export function useReservationContext() {
  const context = useContext(Reservationcntxt);
  return context;
}

export function handleDateSelect(new_range) {
  
}
