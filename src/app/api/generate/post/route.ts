import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { auth } from "@/lib/auth";

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topic, idea } = await req.json();
    if (!topic || !idea) {
      return NextResponse.json(
        { error: "Topic and idea are required" },
        { status: 400 }
      );
    }

    const prompt = `Write a LinkedIn post about "${idea}" in the context of ${topic}.

The post should:
- Be professional but maintain a conversational tone
- Include relevant insights, practical takeaways, or unique perspectives
- Use proper formatting with line breaks and paragraphs
- Use emojis for bullet points (e.g., 🔑, 💡, ⭐️, 📌)
- End with a thought-provoking question or call-to-action

Formatting Guidelines:
- Use double line breaks between paragraphs
- Start key points with emojis like:
  🔑 For key points
  💡 For insights
  ⭐️ For tips
  📌 For takeaways
- Add whitespace for readability
- Preserve all formatting in the response

Return the response in the following JSON format:
{
  "content": "Your formatted post with proper\\n\\nline breaks and\\n🔑 Key points\\n💡 Insights\\n⭐️ Tips like this",
  "topics": ["🚀 #RelevantTopic1", "💡 #RelevantTopic2", "🌟 #RelevantTopic3"]
}

Keep the content concise (200-300 words) but ensure all formatting is preserved.`;

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
          {
            role: "system",
            content:
              "You must respond with valid JSON containing 'content' and 'topics' fields.",
          },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 800,
        response_format: { type: "json_object" },
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error("No content generated");
      }

      try {
        const parsedResponse = JSON.parse(response);
        if (!parsedResponse.content || !Array.isArray(parsedResponse.topics)) {
          throw new Error("Invalid response structure");
        }

        const formattedContent = parsedResponse.content.replace(/\\n/g, "\n");

        return NextResponse.json({
          content: formattedContent,
          topics: parsedResponse.topics.slice(0, 3), // Ensure max 3 topics
        });
      } catch (parseError) {
        console.error("[PARSE_ERROR]", response);
        throw new Error("Failed to parse AI response");
      }
    } catch (openaiError: any) {
      console.error("[OPENAI_ERROR]", openaiError);
      return NextResponse.json(
        {
          error: "AI generation failed",
          details: openaiError.message || "Unknown error",
        },
        { status: 503 }
      );
    }
  } catch (error: any) {
    console.error("[GENERATE_POST]", error);
    return NextResponse.json(
      {
        error: "Failed to generate post content",
        details: error.message,
      },
      { status: 500 }
    );
  }
});
