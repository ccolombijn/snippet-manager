import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { description, language } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Generate ${language} code for the following description: "${description}". \nReturn ONLY the raw code. Do not wrap it in markdown code blocks (no \`\`\`). Do not include the language name or any explanations.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let code = response.text().trim();

    // Remove markdown code block formatting if present
    if (code.startsWith('```')) {
      code = code.replace(/^```\w*\s*/, '').replace(/\s*```$/, '');
    }

    return NextResponse.json({ code });
  } catch (error) {
    console.error("Code generation failed:", error);
    return NextResponse.json({ error: "Failed to generate code" }, { status: 500 });
  }
}
