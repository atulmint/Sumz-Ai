import {
  handleCheckoutCompleted,
  handleSubscriptionDeleted,
} from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
);

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!, // The webhook always changes when testing locally (e.g., using `tl --port 3000`)
    );

    switch (event.type) {
      case "checkout.session.completed":
        console.log("Checkout session completed");
        const sessionId = event.data.object.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });

        await handleCheckoutCompleted({ session, stripe });

        break;

      case "customer.subscription.deleted":
        console.log("subscription deleted");
        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionId = event.data.object.id;

        await handleSubscriptionDeleted({ subscriptionId, stripe });

        console.log("Subscription:", subscription);
        break;

      default:
        console.log("Unhandled event:", event.type);
        break;
    }
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to process the event", error },
      { status: 400 },
    );
  }
  return NextResponse.json({ status: "success" });
};
