// app/api/create-checkout-session/route.ts
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export async function POST(req) {
  const body = await req.json();

  try {
    // Get the base URL properly
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: body.name,
            },
            unit_amount: body.amount, // amount in cents
          },
          quantity: 1,
        },
      ],
      client_reference_id: body.bookingId?.toString() || "",
      metadata: {
        cabinId: body.cabinId?.toString() || "",
        bookingId: body.bookingId?.toString() || "",
      },
      success_url: `${baseUrl}/account/reservations/success`,
      cancel_url: `${baseUrl}/account/reservations/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
