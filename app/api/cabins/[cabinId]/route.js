import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(_, { params }) {
  const { cabinId } = await params;
  try {
    const [cabin, bookings] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookings });
  } catch (error) {
    return Response.json({ error });
  }
}
