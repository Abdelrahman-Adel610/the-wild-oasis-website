"use client";
import { format } from "date-fns";
import { useReservationContext } from "./ReservationContext";

function PriceSummary({
  numberOfNights,
  cabinPrice,
  breakfastTotal,
  totalPrice,
  hasBreakfast,
}) {
  const { range, setRange } = useReservationContext();

  const handleClear = () => {
    setRange({ from: null, to: null });
  };

  if (!range.from || !range.to) return null;

  return (
    <div className="bg-gradient-to-r from-accent-500 to-accent-400 text-primary-900 px-4 sm:px-8 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">
            {numberOfNights} night{numberOfNights !== 1 ? "s" : ""}
          </h3>
          <p className="text-lg font-medium opacity-90">
            {format(range.from, "MMM dd, yyyy")} —{" "}
            {format(range.to, "MMM dd, yyyy")}
          </p>
        </div>

        <div className="text-right">
          <div className="space-y-1 text-sm font-medium mb-2">
            <div className="flex justify-between gap-8">
              <span>Cabin:</span>
              <span>${cabinPrice}</span>
            </div>
            {hasBreakfast && (
              <div className="flex justify-between gap-8">
                <span>Breakfast:</span>
                <span>${breakfastTotal}</span>
              </div>
            )}
          </div>
          <div className="text-2xl font-bold border-t border-primary-800/20 pt-2 mb-3">
            Total: ${totalPrice}
          </div>

          <button
            onClick={handleClear}
            className="bg-primary-800 hover:bg-primary-700 text-primary-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border border-primary-700 hover:border-primary-600"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default PriceSummary;
