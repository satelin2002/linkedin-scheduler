import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { auth } from "@/lib/auth";

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topic } = await req.json();

    const prompt = `Generate 10 engaging LinkedIn post ideas about ${topic}.
Each idea should be a compelling headline or topic that would make for an interesting professional post.
Focus on trends, insights, experiences, or practical advice.
Make them unique and attention-grabbing.
Format each idea on a new line starting with a number.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("No content generated");
    }

    // Parse the response into an array of ideas
    const ideas = content
      .split("\n")
      .filter((line) => line.trim() && /^\d+\.?\s*.+/.test(line))
      .map((line) => line.replace(/^\d+\.?\s*/, "").trim());

    if (!Array.isArray(ideas) || ideas.length === 0) {
      throw new Error("Failed to parse ideas");
    }

    return NextResponse.json({ ideas });
  } catch (error) {
    console.error("[GENERATE_IDEAS]", error);
    return NextResponse.json(
      { error: "Failed to generate ideas" },
      { status: 500 }
    );
  }
});
