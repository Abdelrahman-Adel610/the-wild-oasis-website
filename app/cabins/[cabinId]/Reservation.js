import DateSelector from "@/app/_components/DateSelector";
import LoginMessage from "@/app/_components/LoginMessage";
import ReservationForm from "@/app/_components/ReservationForm";
import { auth } from "@/app/_lib/auth";
import {
  getBookedDatesByCabinId,
  getBreakfastPrice,
  getSettings,
} from "@/app/_lib/data-service";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

export default async function Reservation({ cabin }) {
  const [
    { minBookingPeriod, maxBookingPeriod, maxGuestsPerBooking: maxCapacity },
    bookedDates,
    { breakfastPrice },
  ] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
    getBreakfastPrice(),
  ]);

  const session = await auth();
  return (
    <div className="bg-primary-950 border border-primary-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 px-8 py-6 border-b border-primary-700">
        <h2 className="text-2xl font-bold text-primary-100 mb-2">
          Reserve Bear&apos;s Den Today
        </h2>
        <p className="text-primary-300 text-sm">
          Pay on arrival • Free cancellation up to 24 hours before check-in
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-[1fr_400px] min-h-[600px]">
        {/* Date Selection */}
        <div className="bg-primary-900 border-r border-primary-800">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-primary-200 mb-4 flex items-center gap-2">
              <CalendarDaysIcon className="h-5 w-5 text-accent-500" />
              Select Your Dates
            </h3>
            <DateSelector
              maxBookingPeriod={maxBookingPeriod}
              minBookingPeriod={minBookingPeriod}
              cabin={cabin}
              bookings={bookedDates}
            />
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-primary-950">
          {session ? (
            <ReservationForm
              cabin={cabin}
              bookedDates={bookedDates}
              maxCapacity={cabin.maxCapacity}
              user={session.user}
              breakfastPrice={breakfastPrice}
            />
          ) : (
            <div className="p-8 flex items-center justify-center h-full">
              <LoginMessage />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
