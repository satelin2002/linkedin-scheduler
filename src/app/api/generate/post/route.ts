import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { auth } from "@/lib/auth";

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topic, idea } = await req.json();

    const prompt = `Write a LinkedIn post about "${idea}" in the context of ${topic}.
The post should be:
- Professional yet conversational
- Include relevant insights and practical takeaways
- Incorporate engaging hooks and storytelling elements
- End with a thought-provoking question or call-to-action
- Include 2-3 relevant hashtags
Keep it concise and impactful, around 200-300 words.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const content = completion.choices[0].message.content;
    return NextResponse.json({ content });
  } catch (error) {
    console.error("[GENERATE_POST]", error);
    return NextResponse.json(
      { error: "Failed to generate post content" },
      { status: 500 }
    );
  }
});
