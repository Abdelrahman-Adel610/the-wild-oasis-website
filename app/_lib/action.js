"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { updateGuest } from "./data-service";

export async function signInAction(data) {
  console.log(data.get("provider"));
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
  console.log(
    "daaaaaaaaa",
    /^[A-Za-z0-1]{6,20}$/.test(nationalId),
    nationalId,
    data
  );

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
