"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction(data) {
  await signIn(data.get("provider"), { redirectTo: "/" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
export async function updateMe(data) {
  const session = await auth();
  if (!session) throw new Error("You must login first");
  const [nationality, flag] = data.get("nationality").split("%");
  const nationalId = data.get("nationalID");

  if (!/^[A-Za-z0-9]{6,20}$/.test(nationalId))
    throw new Error("Invalid nationalId");

  const updates = {
    nationalId: nationalId,
    nationality: nationality,
    flag: flag,
  };
  await updateGuest(session.user.id, updates);
  revalidatePath("/account/profile");
}
export async function deletereservationAction(id) {
  const session = await auth();
  if (!session) throw new Error("you must login first");
  const userBookings = (await getBookings(session.user.id)).map((b) => b.id);
  if (!userBookings.includes(id))
    throw new Error("You are not authorized to do this operation");
  await deleteBooking(id);
  revalidatePath("/account/reservations");
}

export async function updateReservation(data) {
  const session = await auth();
  if (!session) throw new Error("you must login first");
  const userBookings = (await getBookings(session.user.id)).map((b) => +b.id);

  const id = +data.get("id");
  if (!userBookings.includes(id))
    throw new Error("not authourized to perform this operation");

  const numberOfGuests = data.get("numGuests");
  const observations = data.get("observations");
  const updatedData = {
    numberOfGuests,
    ...(observations && { observations }),
  };
  await updateBooking(id, updatedData);
  redirect("/account/reservations");
}
export async function createReservation(data, formData) {
  const session = await auth();
  if (!session) throw new Error("You must login first");
  const reservationData = {
    ...data,
    hasBreakfast: data.hasBreakfast,
    numberOfGuests: +formData.get("numberOfGuests"),
    observations: formData.get("observations"),
  };
  await createBooking(reservationData);
  redirect("/cabins/ThankYou");
}
