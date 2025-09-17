import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { userInput } = await req.json();

    if (!userInput) {
      return NextResponse.json({ error: "User input is required" }, { status: 400 });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      console.error("Missing API key");
      return NextResponse.json({ error: "API key is not configured" }, { status: 500 });
    }

    const response = await axios.post(
 `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: userInput }],
          },
        ],
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return NextResponse.json({ reply }, { status: 200 });

  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// Cache for storing historical data and predictions
