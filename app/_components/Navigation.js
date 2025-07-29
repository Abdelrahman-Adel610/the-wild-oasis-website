import Link from "next/link";
import { auth, signOut } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
  console.log(session);
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            {session ? (
              <span className="flex justify-center  items-center gap-1.5">
                <img
                  referrerPolicy="no-referrer"
                  src={session.user.image}
                  className="rounded-full w-10"
                />
                Guest area
              </span>
            ) : (
              "Guest area"
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
