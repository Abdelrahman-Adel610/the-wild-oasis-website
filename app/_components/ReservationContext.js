"use client";
import { createContext, useContext, useState } from "react";
const Reservationcntxt = createContext();
export default function ReservationContext({ children }) {
  const defaultRange = { from: undefined, to: undefined };
  const [range, setRange] = useState(defaultRange);
  const resetRange = () => setRange({ to: null, from: null });
  return (
    <Reservationcntxt.Provider value={{ range, setRange, resetRange }}>
      {children}
    </Reservationcntxt.Provider>
  );
}
export function useReservationContext() {
  const context = useContext(Reservationcntxt);
  return context;
}
export function resetRange() {}
export function handleDateSelect(new_range) {}
