"use client";
import {
  addDays,
  differenceInDays,
  isPast,
  isWithinInterval,
  nextDay,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservationContext } from "./ReservationContext";

function DateSelector({ minBookingPeriod, maxBookingPeriod, cabin, bookings }) {
  // CHANGE
  const regularPrice = cabin.price;
  const discount = cabin.discount;
  const { range, setRange } = useReservationContext();
  const isValidRange =
    range.from &&
    !bookings.some((booking_range) =>
      isWithinInterval(range.from, booking_range)
    );
  const numNights = Math.abs(differenceInDays(range.from, range.to));
  const cabinPrice = (regularPrice - discount) * numNights;
  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="py-6 place-self-center text-primary-200 rdp"
        mode="range"
        min={minBookingPeriod + 1}
        max={maxBookingPeriod}
        fromMonth={addDays(new Date(), 1)}
        fromDate={addDays(new Date(), 1)}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={1}
        disabled={(now) => {
          return (
            isPast(now) ||
            (bookings.length &&
              bookings.reduce((crnt, book_interval) => {
                return isWithinInterval(now, book_interval) || crnt;
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

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {(range.from || range.to) && isValidRange ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold rounded-2xl hover:bg-primary-800 hover:text-accent-500 cursor-pointer transition duration-100"
            onClick={() => setRange({ from: null, to: null })}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
