"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deletereservationAction } from "@/app/_lib/action";
import { useTransition } from "react";

function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900 cursor-pointer  
      disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed"
      onClick={() => {
        startTransition(() => deletereservationAction(bookingId));
      }}
      disabled={isPending}
    >
      <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
      <span className="mt-1">{isPending ? "Deleting..." : "Delete"}</span>
    </button>
  );
}

export default DeleteReservation;
