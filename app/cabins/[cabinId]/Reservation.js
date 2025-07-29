import DateSelector from "@/app/_components/DateSelector";
import LoginMessage from "@/app/_components/LoginMessage";
import ReservationForm from "@/app/_components/ReservationForm";
import { auth } from "@/app/_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";

export default async function Reservation({ cabin }) {
  const [
    { minBookingPeriod, maxBookingPeriod, maxGuestsPerBooking: maxCapacity },
    bookedDates,
  ] = await Promise.all([getSettings(), getBookedDatesByCabinId(cabin.id)]);
  const session = await auth();
  return (
    <div className={`grid grid-cols-2 border border-primary-800 min-h-[400px]`}>
      <DateSelector
        maxBookingPeriod={maxBookingPeriod}
        minBookingPeriod={minBookingPeriod}
      />
      {session ? (
        <ReservationForm bookedDates={bookedDates} maxCapacity={maxCapacity} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
