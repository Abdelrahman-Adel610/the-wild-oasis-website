"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";
import Link from "next/link";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-r border-primary-900 lg:border-r-0 lg:border-b lg:border-primary-900 lg:pb-4 flex">
      <ul className="flex  lg:flex-col gap-2 h-full text-base lg:text-lg overflow-x-auto lg:overflow-x-visible justify-between w-full">
        <div className="flex  lg:flex-col gap-2 h-full text-base lg:text-lg overflow-x-auto lg:overflow-x-visible">
          {navLinks.map((link) => (
            <li key={link.name} className="flex-shrink-0">
              <Link
                className={`py-2 px-3 lg:py-3 lg:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-2 lg:gap-4 font-semibold text-primary-200 whitespace-nowrap
                ${
                  pathname === link.href
                    ? "text-primary-100 bg-primary-900"
                    : ""
                }
                `}
                href={link.href}
              >
                {link.icon}
                <span className="hidden sm:inline">{link.name}</span>
              </Link>
            </li>
          ))}
        </div>
        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
