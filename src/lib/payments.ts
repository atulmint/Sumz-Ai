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
    const sql = await getDbConnection();

    await sql`
      UPDATE users SET status = 'canceled' WHERE customer_id = ${subscription.customer}
    `;

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
  const sql = await getDbConnection();
  console.log("Checkout session completed", session);

  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0].price?.id as string;

  if ("email" in customer && priceId) {
    const { email, name } = customer;

    await createOrUpdateUser({
      sql,
      email: email as string,
      fullName: name as string,
      customerId,
      priceId,
      status: "active",
    });

    await createPayment({
      sql,
      session,
      priceId,
      userEmail: email as string,
    });
  }
}

async function createOrUpdateUser({
  email,
  fullName,
  customerId,
  priceId,
  status,
  sql,
}: {
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
  sql: any;
}) {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (user.length === 0) {
      // Insert new user
      await sql`
        INSERT INTO users (email, full_name, customer_id, price_id, status)
        VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})
      `;
    } else {
      // Update existing user
      await sql`
        UPDATE users
        SET full_name = ${fullName},
            customer_id = ${customerId},
            price_id = ${priceId},
            status = ${status}
        WHERE email = ${email}
      `;
    }
  } catch (error) {
    console.error("Error creating or updating user", error);
  }
}

async function createPayment({
  session,
  priceId,
  userEmail,
  sql,
}: {
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
  sql: any;
}) {
  try {
    const { amount_total, id, status } = session;

    await sql`
      INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email)
      VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})
    `;
  } catch (error) {
    console.error("Error creating payment", error);
  }
}
