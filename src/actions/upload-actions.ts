"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface pdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfText(fileUrl: string) {
  if (!fileUrl) {
    return {
      success: false,
      error: "Could not upload the file. Please try again.",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractText(fileUrl);

    if (!pdfText) {
      return {
        success: false,
        error: "Failed to fetch and extract text from PDF.",
        data: null,
      };
    }

    return {
      success: true,
      message: "PDF text generated successfully!",
      data: {
        pdfText,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Could not fetch and extract text from the PDF.",
      data: null,
    };
  }
}

export async function generatePdfSummary({
  pdfText,
  fileName,
}: {
  pdfText: string;
  fileName: string;
}) {
  try {
    let summary = null;

    try {
      summary = await generateSummaryFromGemini(pdfText);
    } catch (geminiError) {
      console.error("Error generating summary with Gemini:", geminiError);
      throw new Error("Error generating summary with AI.");
    }

    if (!summary) {
      return {
        success: false,
        error: "Failed to generate summary.",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated successfully!",
      data: {
        title: fileName,
        summary,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to generate the PDF summary.",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: pdfSummaryType) {
  try {
    const db = await getDbConnection();

    const { data, error } = await db
      .from("pdf_summaries")
      .insert({
        user_id: userId,
        original_file_url: fileUrl,
        summary_text: summary,
        title: title,
        file_name: fileName,
      })
      .select("id, summary_text")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error saving PDF summary", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: pdfSummaryType) {
  let savedSummary: any;

  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "User not authenticated.",
      };
    }

    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Error saving PDF summary, please try again.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error saving the PDF summary",
    };
  }

  revalidatePath(`/summaries/${savedSummary.id}`);

  return {
    success: true,
    message: "Summary saved successfully!",
    data: {
      id: savedSummary.id,
    },
  };
}