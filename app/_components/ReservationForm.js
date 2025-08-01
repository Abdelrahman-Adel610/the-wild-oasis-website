"use client";
import Image from "next/image";
import { useReservationContext } from "./ReservationContext";
import { differenceInDays, format } from "date-fns";
import { createReservation } from "@/app/_lib/action";
import {
  UserIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import PriceSummary from "./PriceSummary";
import SubmitButton from "./SubmitButton";
import PaymentMethodSelector from "./PaymentMethodSelector";

function ReservationForm({
  bookedDates,
  maxCapacity,
  user,
  cabin,
  breakfastPrice,
}) {
  const { range, resetRange } = useReservationContext();
  const [numGuests, setNumGuests] = useState(1);
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const startDate = range?.from;
  const endDate = range?.to;
  const numNights = differenceInDays(endDate, startDate);

  const cabinPrice = numNights * (cabin.price - cabin.discount);
  const breakfastTotal = hasBreakfast
    ? numNights * numGuests * breakfastPrice
    : 0;
  const totalPrice = cabinPrice + breakfastTotal;

  const bookingData = {
    startDate,
    endDate,
    numberOfNights: numNights,
    price: cabinPrice,
    finalPrice: totalPrice,
    cabinId: cabin.id,
    guestId: user.id,
    hasBreakfast,
    isPaid: paymentMethod === "online",
    finalPrice: totalPrice,
  };

  const createReservationWithData = createReservation.bind(
    null,
    cabin.name,
    bookingData
  );

  if (!startDate || !endDate) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarDaysIcon className="w-8 h-8 text-accent-500" />
          </div>
          <h3 className="text-lg font-semibold text-primary-200 mb-2">
            Select Your Dates
          </h3>
          <p className="text-primary-400 text-sm">
            Choose your check-in and check-out dates to continue
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Price Summary */}
      <PriceSummary
        numberOfNights={numNights}
        cabinPrice={cabinPrice}
        breakfastTotal={breakfastTotal}
        totalPrice={totalPrice}
        hasBreakfast={hasBreakfast}
      />

      {/* Form */}
      <div className="flex-1 p-6">
        <form
          action={async (formData) => {
            resetRange();
            await createReservationWithData(formData);
          }}
          className="space-y-6"
        >
          {/* Guest Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary-200 mb-3">
              <UserIcon className="w-5 h-5 text-accent-500" />
              <h3 className="font-semibold">Guest Information</h3>
            </div>

            <div className="bg-primary-800 rounded-lg p-4 border border-primary-700">
              <p className="text-sm text-primary-300 mb-1">Primary Guest</p>
              <p className="text-primary-100 font-medium">{user.name}</p>
              <p className="text-sm text-primary-400">{user.email}</p>
            </div>
          </div>

          {/* Number of Guests */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-primary-200">
              How many guests?
            </label>
            <select
              name="numberOfGuests"
              value={numGuests}
              onChange={(e) => setNumGuests(Number(e.target.value))}
              className="w-full bg-primary-800 border border-primary-700 rounded-lg px-4 py-3 text-primary-100 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none transition-colors"
              required
            >
              {Array.from({ length: cabin.maxCapacity }, (_, i) => i + 1).map(
                (x) => (
                  <option value={x} key={x}>
                    {x} {x === 1 ? "guest" : "guests"}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Breakfast Option */}
          <div className="bg-primary-800/50 rounded-lg p-4 border border-primary-700/50">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasBreakfast}
                onChange={(e) => setHasBreakfast(e.target.checked)}
                className="mt-1 w-4 h-4 text-accent-500 bg-primary-700 border-primary-600 rounded focus:ring-accent-500 focus:ring-2"
              />
              <div className="flex-1">
                <div className="font-medium text-primary-200">
                  Add breakfast
                </div>
                <div className="text-sm text-primary-400 mt-1">
                  ${breakfastPrice} per person per night
                </div>
                {hasBreakfast && (
                  <div className="text-sm text-accent-400 mt-1">
                    Total breakfast cost: ${breakfastTotal}
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Payment Method Selection */}
          <PaymentMethodSelector
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          {/* Special Requests */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary-200">
              <ChatBubbleLeftRightIcon className="w-4 h-4 text-accent-500" />
              <label className="text-sm font-medium">
                Anything we should know about your stay?
              </label>
            </div>
            <textarea
              name="observations"
              className="w-full bg-primary-800 border border-primary-700 rounded-lg px-4 py-3 text-primary-100 placeholder-primary-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none transition-colors resize-none"
              placeholder="Any pets, allergies, special requirements, etc.?"
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-primary-800">
            <SubmitButton>
              {paymentMethod === "online"
                ? "Continue to Payment"
                : "Reserve Now"}
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;
