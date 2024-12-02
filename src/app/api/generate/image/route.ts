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

    const prompt = `Create a professional, LinkedIn-appropriate image for a post about "${idea}" in the context of ${topic}. 
The image should be modern, clean, and business-friendly. Avoid text in the image.`;

    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "natural",
      });

      const imageUrl = response.data[0]?.url;
      if (!imageUrl) {
        throw new Error("No image generated");
      }

      return NextResponse.json({ imageUrl });
    } catch (openaiError: any) {
      console.error("[OPENAI_IMAGE_ERROR]", openaiError);
      return NextResponse.json(
        {
          error: "AI image generation failed",
          details: openaiError.message || "Unknown error",
        },
        { status: 503 }
      );
    }
  } catch (error: any) {
    console.error("[GENERATE_IMAGE]", error);
    return NextResponse.json(
      {
        error: "Failed to generate image",
        details: error.message,
      },
      { status: 500 }
    );
  }
});
