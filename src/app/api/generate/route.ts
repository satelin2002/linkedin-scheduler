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
- The post should be between 300-600 words


`;

    console.log("[GENERATE_IDEAS] Prompt:", {
      topic,
      fullPrompt: prompt,
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o",
    });

    const content = completion.choices[0].message.content;
    console.log("[GENERATE_IDEAS] Response:", content);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("[GENERATE_IDEAS] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
});
