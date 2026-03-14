"use server";

import { getDbConnection } from "@/lib/db";

export default async function addUploadToCount(email: string) {
  try {
    const db = await getDbConnection();

    const { data, error } = await db
      .from("users")
      .select("upload_count")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    const newCount = (data?.upload_count || 0) + 1;

    const { error: updateError } = await db
      .from("users")
      .update({ upload_count: newCount })
      .eq("email", email);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return {
      success: true,
      message: "Upload count updated successfully",
    };
  } catch (error) {
    console.error("Error updating upload count", error);
    return {
      success: false,
      message: "Failed to update upload count",
    };
  }
}

export async function verifyReachedUploadLimit(email: string) {
  try {
    const db = await getDbConnection();

    const paymentResult = await verifyUserPayment(email);

    if (paymentResult) {
      return false;
    }

    const { data, error } = await db
      .from("users")
      .select("upload_count")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error(error);
      return false;
    }

    return (data?.upload_count || 0) >= 3;
  } catch (error) {
    console.error("Error fetching upload count", error);
    return false;
  }
}

export async function verifyUserPayment(email: string) {
  try {
    const db = await getDbConnection();

    const { data, error } = await db
      .from("users")
      .select("price_id")
      .eq("email", email)
      .eq("status", "active")
      .maybeSingle();

    if (error) {
      return null;
    }

    return data?.price_id || null;
  } catch (error) {
    console.error("Error verifying user payment", error);
    return null;
  }
}