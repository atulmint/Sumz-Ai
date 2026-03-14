import { pricingPlans } from "@/utils/constants";
import { currentUser, User } from "@clerk/nextjs/server";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";

export const getPriceIdForActiveUser = async (email: string) => {
  const db = await getDbConnection();

  const { data, error } = await db
    .from("users")
    .select("price_id")
    .eq("email", email)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    console.error("Error fetching price_id:", error);
    return null;
  }

  return data?.price_id || null;
};

export const hasActivePlan = async (email: string) => {
  const db = await getDbConnection();

  const { data, error } = await db
    .from("users")
    .select("price_id, status")
    .eq("email", email)
    .eq("status", "active")
    .not("price_id", "is", null)
    .maybeSingle();

  if (error) {
    console.error("Error checking active plan:", error);
    return false;
  }

  return !!data;
};

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId);
  const user = await currentUser();

  const priceId = await getPriceIdForActiveUser(
    user?.emailAddresses[0].emailAddress || ""
  );

  if (!priceId) {
    return {
      hasReachedLimit: false,
      uploadLimit: 0,
    };
  }

  const isPro =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "pro";

  const uploadLimit = isPro ? 1000 : 5;

  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit,
  };
}

export const getSubscriptionStatus = async (user: User) => {
  return await hasActivePlan(user.emailAddresses[0].emailAddress);
};

export const getUserPlan = async () => {
  const user = await currentUser();

  const priceId = await getPriceIdForActiveUser(
    user?.emailAddresses[0].emailAddress || ""
  );

  const plan = pricingPlans.find((plan) => plan.priceId === priceId);

  if (!plan) return null;

  return plan.id;
};

export const getUserFromDb = async (email: string) => {
  const db = await getDbConnection();

  const { data, error } = await db
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return data;
};