import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `Detect the programming language of the following code snippet. Return only the language name in lowercase (e.g., typescript, python, rust, javascript, html, css). If unknown or plain text, return 'plaintext'. Do not include markdown formatting.\n\nCode:\n${code}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const language = response.text().trim().toLowerCase();

    return NextResponse.json({ language });
  } catch (error) {
    console.error("Language detection failed:", error);
    return NextResponse.json({ language: "plaintext" }, { status: 500 });
  }
}
