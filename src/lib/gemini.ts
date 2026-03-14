import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSummaryFromGemini(text: string) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert AI assistant that summarizes documents.

Create a clear, structured summary of the following text.

Guidelines:
- Keep it concise
- Use bullet points where helpful
- Highlight key insights

TEXT:
${text}

SUMMARY:
`;

    const result = await model.generateContent(prompt);

    const response = result.response;

    const summary = response.text();

    return summary;
  } catch (error) {
    console.error("Gemini summary error:", error);
    throw new Error("Failed to generate summary");
  }
}