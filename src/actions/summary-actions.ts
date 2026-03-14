"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction({
  summaryId,
}: {
  summaryId: string;
}) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const supabase = await getDbConnection();

    // Delete from DB
    const { data, error } = await supabase
      .from("pdf_summaries")
      .delete()
      .eq("id", summaryId)
      .eq("user_id", userId)
      .select("id");

    if (error) {
      console.error("Error deleting summary", error);
      return { success: false };
    }

    if (data && data.length > 0) {
      revalidatePath("/dashboard");
      return { success: true };
    }

    return { success: false };
  } catch (error) {
    console.error("Error deleting summary", error);
    return { success: false };
  }
}
