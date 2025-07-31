"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";

export default function Bookings({ bookings }) {
  const [opt_bookings, deleteBooking] = useOptimistic(bookings, (items, id) =>
    items.filter((book) => book.id !== id)
  );
  return (
    <ul className="space-y-6">
      {opt_bookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          deletefn={deleteBooking}
        />
      ))}
    </ul>
  );
}
