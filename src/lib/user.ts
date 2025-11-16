import { pricingPlans } from "@/utils/constants";
import { currentUser, User } from "@clerk/nextjs/server";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";

export const getPriceIdForActiveUser = async (email: string) => {
  const sql = await getDbConnection();
  const query = await sql`
        SELECT price_id FROM users
        WHERE email = ${email} AND status = 'active'
    `;
  return query?.[0]?.price_id || null;
};

export const hasActivePlan = async (email: string) => {
  const sql = await getDbConnection();
  const query = await sql`
        SELECT price_id, status FROM users
        WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL
    `;
  return query && query.length > 0;
};

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId);
  const user = await currentUser();
  const priceId = await getPriceIdForActiveUser(
    user?.emailAddresses[0].emailAddress || "",
  );
  
  if (!priceId) return { hasReachedLimit: false, uploadLimit: 0 };

  const isPro =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "pro";
  const uploadLimit: number = isPro ? 1000 : 5;

  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
}

export const getSubscriptionStatus = async (user: User) => {
  const hasSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress,
  );
  return hasSubscription;
};

export const getUserPlan = async () => {
  const user = await currentUser();
  const priceId = await getPriceIdForActiveUser(
    user?.emailAddresses[0].emailAddress || "",
  );

  const plan = pricingPlans.find((plan) => plan.priceId === priceId);
  if (!plan) return null;
  return plan.id;
};

export const getUserFromDb = async (email: string) => {
  const sql = await getDbConnection();
  const query = await sql`
        SELECT * FROM users
        WHERE email = ${email}
    `;
  return query?.[0] || false;
}