import { se } from "date-fns/locale";
import { auth } from "../_lib/auth";

export default async function page() {
  const session = await auth();

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session ? session.user.name : "GUEST"}
    </h2>
  );
}
