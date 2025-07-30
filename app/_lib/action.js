"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { deleteBooking, getBookings, updateGuest } from "./data-service";

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
