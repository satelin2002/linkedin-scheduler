import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { auth } from "@/lib/auth";

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topic } = await req.json();

    const prompt = `Craft a LinkedIn post about ${topic}. 
The post should be novel, insightful, and engaging, offering unique perspectives or actionable tips. 
Write in a professional yet conversational tone, making it relatable to a diverse audience. 
Incorporate a clear call-to-action or thought-provoking question to encourage engagement. 
Include relevant hashtags that enhance visibility. Keep it concise, impactful, and within LinkedIn's character limits.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const content = completion.choices[0].message.content;
    return NextResponse.json({ content });
  } catch (error) {
    console.error("[GENERATE_POST]", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
});
