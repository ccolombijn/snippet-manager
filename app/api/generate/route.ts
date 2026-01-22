import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { body } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(body);
    const response = await result.response;
    const output = response.text();

    return NextResponse.json({ output });
  } catch (error) {
    console.error("Quote generation failed:", error);
    return NextResponse.json({ error: "Failed to generate quote" }, { status: 500 });
  }
}
