"use server";

import { getDbConnection } from "@/lib/db";

export default async function addUploadToCount(email: string) {
  try {
    const sql = await getDbConnection();
    await sql`
    UPDATE users 
    SET upload_count = upload_count + 1 
    WHERE email = ${email}`;

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
    const sql = await getDbConnection();
    const paymentResult = await verifyUserPayment(email);

    if (paymentResult) {
      return false;
    }

    const result = await sql`
      SELECT upload_count FROM users WHERE email = ${email}
    `;
    if (result[0]?.upload_count >= 3) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching upload count", error);
    return 0;
  }
}

export async function verifyUserPayment(email: string) {
  try {
    const sql = await getDbConnection();
    const result = await sql`
      SELECT price_id FROM users WHERE email = ${email} AND status = 'active'
    `;
    return result[0]?.price_id || null;
  } catch (error) {
    console.error("Error verifying user payment", error);
    return null;
  }
}
