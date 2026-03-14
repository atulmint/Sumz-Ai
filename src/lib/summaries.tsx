"use server";

import { getDbConnection } from "./db";

export async function getSummaries(userId: string) {
  try {
    const db = await getDbConnection();

    const { data, error } = await db
      .from("pdf_summaries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching summaries:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching summaries:", error);
    return [];
  }
}

export async function getSummaryById(id: string) {
  try {
    const db = await getDbConnection();

    const { data, error } = await db
      .from("pdf_summaries")
      .select(`
        id,
        user_id,
        title,
        original_file_url,
        summary_text,
        status,
        created_at,
        updated_at,
        file_name
      `)
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      console.error("Error fetching summary by id:", error);
      return null;
    }

    const wordCount = data.summary_text
      ? data.summary_text.trim().split(/\s+/).length
      : 0;

    return {
      ...data,
      word_count: wordCount,
    };
  } catch (error) {
    console.error("Error fetching summary by id:", error);
    return null;
  }
}

export async function getUserUploadCount(userId: string) {
  try {
    const db = await getDbConnection();

    const { data, error } = await db
      .from("pdf_summaries")
      .select("id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching user upload count:", error);
      return 0;
    }

    return data?.length || 0;
  } catch (error) {
    console.error("Error fetching user upload count:", error);
    return 0;
  }
}