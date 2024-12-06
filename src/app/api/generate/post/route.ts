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

    const prompt = `Write a LinkedIn post about "${idea}"${
      topic ? ` in the context of ${topic}` : ""
    }.

The tone should be professional, conversational, and motivational. Include the following hacks with examples:

Keep it Simple: For example, 'I recently shared a plain-text post about lessons learned from failing a big project—it reached over 10k views without any images or links.'

Use Emojis Thoughtfully: Highlight how emojis can enhance posts, e.g., 'A post about team wins with relevant icons performed 20% better than plain-text.'

Craft Compelling Headlines: Use examples like, 'The headline "3 Lessons I Learned from Getting Rejected 5 Times" performed far better than "My Job Search Journey."'

Start with a Story: Share examples of how posts like 'The time I almost quit my job' can drive high engagement.

Break Up Text: Demonstrate with examples like, 'Instead of one long paragraph, I broke my post into short chunks and saw a 40% increase in reads.'

Mention Influencers: Use examples like, 'I tagged a mentor who inspired me, and their comment brought 1,000+ new views.'

Include a Call-to-Action: For instance, 'I ended my post with "What’s your go-to productivity hack?" and received over 200 responses.'

End with a Question: For example, 'What’s the one thing you wish someone told you earlier in your career? Let’s discuss in the comments.'

Share Valuable IP: Highlight examples like, 'Sharing a free checklist on "Optimizing LinkedIn Profiles" led to 50+ connection requests.'

Use Hashtags Effectively: Showcase a mix like, '#CareerGrowth #LeadershipTips #LinkedInHacks,' and their impact on post visibility.

Handle Links Smartly: Provide examples like, 'Instead of putting the link in my post, I added it in the comments with a note, and the post’s engagement doubled.'


Formatting Guidelines:
- Use double line breaks between paragraphs
- Add whitespace for readability
- Preserve all formatting in the response
 
Return the response in the following JSON format:
{
  "content": "Your formatted post with proper\\n\\nline breaks and\\n🔑 Key points\\n💡 Insights\\n⭐️ Tips like this",
  "topics": ["🚀 #RelevantTopic1", "💡 #RelevantTopic2", "🌟 #RelevantTopic3"]
}

Keep the content concise (300-600 words) but ensure all formatting is preserved.`;

    try {
      console.log("[GENERATE_POST] Prompt:", {
        topic,
        idea,
        fullPrompt: prompt,
      });

      const completion = await openai.chat.completions.create({
        messages: [
          { role: "user", content: prompt },
          {
            role: "system",
            content:
              "You must respond with valid JSON containing 'content' and 'topics' fields.",
          },
        ],
        model: "gpt-4o",
        temperature: 0.7,
        max_tokens: 800,
        response_format: { type: "json_object" },
      });

      const response = completion.choices[0]?.message?.content;
      console.log("[GENERATE_POST] Raw Response:", response);

      if (!response) {
        throw new Error("No content generated");
      }

      try {
        const parsedResponse = JSON.parse(response);
        console.log("[GENERATE_POST] Parsed Response:", parsedResponse);
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
