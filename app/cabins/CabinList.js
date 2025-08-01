import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";
import Filter from "@/app/_components/Filter";

export default async function CabinList({ filter }) {
  const cabins = await getCabins();
  let displayedCabins;
  switch (filter) {
    case "small":
      displayedCabins = cabins.filter((c) => c.maxCapacity <= 3);
      break;
    case "medium":
      displayedCabins = cabins.filter((c) => c.maxCapacity <= 8);
      break;
    case "large":
      displayedCabins = cabins.filter((c) => c.maxCapacity >= 8);
      break;
    default:
      displayedCabins = cabins;
  }

  return (
    <>
      <div className="flex justify-end ">
        <Filter />
      </div>
      <div>
        {displayedCabins.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-14">
            {displayedCabins.map((cabin) => (
              <CabinCard cabin={cabin} key={cabin.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
