"use client";
import {
  addDays,
  differenceInDays,
  isPast,
  isWithinInterval,
  format,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservationContext } from "./ReservationContext";

function DateSelector({ minBookingPeriod, maxBookingPeriod, cabin, bookings }) {
  const { range, setRange } = useReservationContext();

  const isValidRange =
    range.from &&
    !bookings.some((booking_range) =>
      isWithinInterval(range.from, booking_range)
    );

  const numNights =
    range.from && range.to
      ? Math.abs(differenceInDays(range.from, range.to))
      : 0;

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="bg-primary-800 rounded-lg p-4 shadow-lg">
        <DayPicker
          className="rdp text-primary-200"
          mode="range"
          min={minBookingPeriod + 1}
          max={maxBookingPeriod}
          fromMonth={addDays(new Date(), 1)}
          fromDate={addDays(new Date(), 1)}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={1}
          disabled={(date) => {
            return (
              isPast(date) ||
              (bookings.length &&
                bookings.reduce((current, booking_interval) => {
                  return isWithinInterval(date, booking_interval) || current;
                }, false))
            );
          }}
          onSelect={(new_range) => {
            if (!new_range) return;
            if (range?.from && range?.to) {
              setRange();
              setRange({
                from:
                  new_range?.from === range?.from
                    ? new_range?.to
                    : new_range?.from,
                to: null,
              });
            } else setRange(new_range);
          }}
          selected={(isValidRange && range) || { from: null, to: null }}
        />
      </div>

      {/* Selection Summary */}
      {range.from && range.to && (
        <div className="bg-primary-800 rounded-lg p-4 border border-primary-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-300 mb-1">Selected Dates</p>
              <p className="text-primary-100 font-medium">
                {format(range.from, "MMM dd")} —{" "}
                {format(range.to, "MMM dd, yyyy")}
              </p>
              <p className="text-sm text-accent-400 mt-1">
                {numNights} night{numNights !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => setRange({ from: null, to: null })}
              className="text-sm text-primary-400 hover:text-primary-200 underline"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Booking Guidelines */}
      <div className="bg-primary-800/50 rounded-lg p-4 border border-primary-700/50">
        <h4 className="text-sm font-medium text-primary-200 mb-2">
          Booking Guidelines
        </h4>
        <ul className="text-xs text-primary-300 space-y-1">
          <li>• Minimum stay: {minBookingPeriod} nights</li>
          <li>• Maximum stay: {maxBookingPeriod} nights</li>
          <li>• Free cancellation up to 24 hours before check-in</li>
          <li>• Check-in: 3:00 PM | Check-out: 11:00 AM</li>
        </ul>
      </div>
    </div>
  );
}

export default DateSelector;
