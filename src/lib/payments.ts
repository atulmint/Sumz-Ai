import Stripe from "stripe";
import { getDbConnection } from "./db";

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
  console.log("Subscription deleted", subscriptionId);

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    // CHANGED: Using Supabase client instead of raw SQL
    const supabase = await getDbConnection();

    const { error } = await supabase
      .from("users")
      .update({ status: "canceled" })
      .eq("customer_id", subscription.customer);

    if (error) throw error;
    console.log("Subscription successfully deleted");
  } catch (error) {
    console.error("Error while deleting subscription", error);
    throw error;
  }
}

export async function handleCheckoutCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  // CHANGED: Using Supabase client instead of raw SQL
  const supabase = await getDbConnection();
  console.log("Checkout session completed", session);

  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0].price?.id as string;

  // CHANGED: Added deleted customer check
  if (customer.deleted) {
    console.error("Customer was deleted");
    return;
  }

  if ("email" in customer && priceId) {
    const { email, name } = customer;

    await createOrUpdateUser({
      supabase,
      email: email as string,
      fullName: name as string,
      customerId,
      priceId,
      status: "active",
    });

    await createPayment({
      supabase,
      session,
      priceId,
      userEmail: email as string,
    });
  }
}

// CHANGED: Replaced sql parameter with supabase client
async function createOrUpdateUser({
  email,
  fullName,
  customerId,
  priceId,
  status,
  supabase,
}: {
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
  supabase: any;
}) {
  try {
    // CHANGED: Supabase select syntax
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!existingUser) {
      // CHANGED: Supabase insert syntax
      const { error } = await supabase.from("users").insert({
        email,
        full_name: fullName,
        customer_id: customerId,
        price_id: priceId,
        status,
      });
      if (error) throw error;
    } else {
      // CHANGED: Supabase update syntax
      const { error } = await supabase
        .from("users")
        .update({ full_name: fullName, customer_id: customerId, price_id: priceId, status })
        .eq("email", email);
      if (error) throw error;
    }
  } catch (error) {
    console.error("Error creating or updating user", error);
  }
}

// CHANGED: Replaced sql parameter with supabase client
async function createPayment({
  session,
  priceId,
  userEmail,
  supabase,
}: {
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
  supabase: any;
}) {
  try {
    const { amount_total, id, status } = session;

    // CHANGED: Supabase insert syntax
    const { error } = await supabase.from("payments").insert({
      amount: amount_total,
      status,
      stripe_payment_id: id,
      price_id: priceId,
      user_email: userEmail,
    });
    if (error) throw error;
  } catch (error) {
    console.error("Error creating payment", error);
  }
}