"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();
  const filter = params.get("capacity");

  function handleFilter(filter) {
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border-1 mb-2 text-primary-300">
      <Button
        isActive={filter === "all"}
        clickHandler={() => handleFilter("all")}
      >
        All cabins
      </Button>
      <Button
        isActive={filter === "small"}
        clickHandler={() => handleFilter("small")}
      >
        1-3 Guests
      </Button>
      <Button
        isActive={filter === "medium"}
        clickHandler={() => handleFilter("medium")}
      >
        4-8 Guests
      </Button>
      <Button
        isActive={filter === "large"}
        clickHandler={() => handleFilter("large")}
      >
        8+ Guests
      </Button>
    </div>
  );
}
function Button({ children, clickHandler, isActive }) {
  return (
    <button
      className={`hover:bg-primary-500 cursor-pointer hover:text-primary-200  px-2 py-1 ${
        isActive ? "bg-primary-500 text-primary-200" : ""
      }`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
