import {
  createPaymentTransaction,
  updateBookingPaymentStatus,
} from "@/app/_lib/data-service";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const paymentTransaction = await createPaymentTransaction(
      session,
      event.type
    );

    if (session.metadata.bookingId) {
      await updateBookingPaymentStatus(
        parseInt(session.metadata.bookingId),
        "paid",
        paymentTransaction.id
      );
    }
  }
  if (
    event.type === "checkout.session.async_payment_failed" ||
    event.type === "checkout.session.expired" ||
    event.type === "payment_intent.payment_failed"
  ) {
    const session = event.data.object;
    try {
      const paymentTransaction = await createPaymentTransaction(
        session,
        event.type
      );
    } catch (error) {
      console.error("Webhook processing error:", error);
      return new NextResponse("Webhook processing failed", { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
