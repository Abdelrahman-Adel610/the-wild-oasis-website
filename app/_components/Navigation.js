"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Navigation({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block z-10 text-xl">
        <ul className="flex gap-8 lg:gap-16 items-center">
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
                <span className="flex justify-center items-center gap-1.5">
                  <Image
                    width={126}
                    height={126}
                    referrerPolicy="no-referrer"
                    src={session.user.image}
                    className="rounded-full w-8 lg:w-10"
                    alt="User avatar"
                  />
                  <span className="hidden lg:inline">Guest area</span>
                </span>
              ) : (
                "Guest area"
              )}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-primary-100 hover:text-accent-400 transition-colors p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeMenu}
            />
            <nav className="fixed top-0 right-0 h-full w-64 bg-primary-950 border-l border-primary-900 z-50 transform transition-transform duration-300 ease-in-out">
              <div className="flex flex-col h-full">
                {/* Close button */}
                <div className="flex justify-end p-4 border-b border-primary-900">
                  <button
                    onClick={closeMenu}
                    className="text-primary-100 hover:text-accent-400 transition-colors p-2"
                    aria-label="Close menu"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Menu Items */}
                <ul className="flex flex-col gap-1 p-4 text-lg">
                  <li>
                    <Link
                      href="/cabins"
                      className="block py-3 px-4 hover:bg-primary-900 hover:text-accent-400 transition-colors rounded"
                      onClick={closeMenu}
                    >
                      Cabins
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="block py-3 px-4 hover:bg-primary-900 hover:text-accent-400 transition-colors rounded"
                      onClick={closeMenu}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account"
                      className="block py-3 px-4 hover:bg-primary-900 hover:text-accent-400 transition-colors rounded"
                      onClick={closeMenu}
                    >
                      {session ? (
                        <span className="flex items-center gap-3">
                          <Image
                            width={62}
                            height={62}
                            referrerPolicy="no-referrer"
                            src={session.user.image}
                            className="rounded-full w-8"
                            alt="User avatar"
                          />
                          Guest area
                        </span>
                      ) : (
                        "Guest area"
                      )}
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </>
        )}
      </div>
    </>
  );
}
