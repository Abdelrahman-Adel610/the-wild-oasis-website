"use server";

import { signIn, signOut } from "./auth";

export async function signInAction(data) {
  console.log(data.get("provider"));
  await signIn(data.get("provider"), { redirectTo: "/" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
