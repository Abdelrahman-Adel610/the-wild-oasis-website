import { eachDayOfInterval } from "date-fns";
import supabase from "./supabase";
import { notFound } from "next/navigation";
/////////////
// GET
export async function getCabin(id) {
  const { data, error } = await supabase
    .from("Cabins")
    .select("*")
    .eq("id", id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    notFound();
    console.error(error);
  }

  return data;
}

export async function getCabinPrice(id) {
  const { data, error } = await supabase
    .from("Cabins")
    .select("price, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCabins = async function () {
  const { data, error } = await supabase
    .from("Cabins")
    .select("id, name, maxCapacity, price, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

// Guests are uniquely identified by their email address
export async function getGuest(email) {
  const { data, error } = await supabase
    .from("Guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id) {
  const { data, error, count } = await supabase
    .from("Bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookings(guestId) {
  const { data, error, count } = await supabase
    .from("Bookings")
    .select(
      "id, created_at, startDate, endDate, numberOfNights, numberOfGuests, price,finalPrice, guestId, cabinId, Cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("Bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data.map((booking) => {
    return {
      start: new Date(booking.startDate),
      end: new Date(booking.endDate),
    };
  });

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("Settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getBreakfastPrice() {
  const { data, error } = await supabase
    .from("Settings")
    .select("breakfastPrice")
    .single();

  if (error) {
    console.error(error);
    return { breakfastPrice: 5 }; // Default fallback
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest) {
  const { data, error } = await supabase.from("Guests").insert([newGuest]);

  if (error) {
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from("Bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  const { data, error } = await supabase
    .from("Guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(id, updatedFields) {
  const { data, error } = await supabase
    .from("Bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id) {
  const { data, error } = await supabase.from("Bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
export async function createPaymentTransaction(sessionData, eventType) {
  const { data, error } = await supabase
    .from("payment_transactions")
    .insert({
      stripe_session_id: sessionData.id,
      stripe_payment_intent_id: sessionData.payment_intent,
      cabinId: sessionData.metadata.cabinId
        ? parseInt(sessionData.metadata.cabinId)
        : null,
      payment_status: sessionData?.payment_status || "Failed",
      session_status: sessionData.status,
      event_type: eventType,
      amount_total: sessionData?.amount_total || 0,
      currency: sessionData.currency,
      customer_email: sessionData.customer_details?.email,
      customer_name: sessionData.customer_details?.name,
      customer_country: sessionData.customer_details?.address?.country,
      mode: sessionData.mode,
      livemode: sessionData.livemode,
      stripe_session_data: sessionData,
      stripe_created_at: new Date(sessionData.created * 1000),
      expires_at: new Date(sessionData.expires_at * 1000),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating payment transaction:", error);
    throw error;
  }

  return data;
}

export async function updateBookingPaymentStatus(
  bookingId,
  paymentStatus,
  paymentTransactionId = null
) {
  const updateData = { payment_status: paymentStatus };
  if (paymentTransactionId) {
    updateData.payment_transaction_id = paymentTransactionId;
  }

  const { data, error } = await supabase
    .from("Bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error("Error updating booking payment status:", error);
    throw error;
  }

  return data;
}
