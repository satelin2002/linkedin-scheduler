import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Importing the auth function from your auth configuration
import { prisma } from "@/lib/prisma"; // Fixed default import to named import
import { linkedin } from "@/lib/linkedin";
import { uploadImage } from "@/lib/upload"; // Image upload utility

export async function POST(req: Request) {
  try {
    const session = await auth(); // Get the session using Auth.js
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized - Invalid user ID", {
        status: 401,
      });
    }

    const body = await req.json();
    const {
      content,
      visibility = "anyone",
      status,
      scheduledFor,
      images,
      organizationId,
    } = body;

    // 1. Create local post first
    const post = await prisma.post.create({
      data: {
        content: content,
        visibility: visibility,
        status: status,
        scheduledFor: scheduledFor,
        authorId: session.user.id, // Use the user ID from the session
        organizationId,
      },
    });

    // 2. Handle image uploads if present
    let uploadedMedia = [];
    if (images?.length) {
      for (const image of images) {
        // Upload to your storage (e.g., S3, Cloudinary)
        const uploadedUrl = await uploadImage(image);

        // Register media with LinkedIn
        const linkedinAsset = await linkedin.registerUpload({
          type: "image",
          authorization: organizationId
            ? `urn:li:organization:${organizationId}`
            : undefined,
        });

        // Upload to LinkedIn
        await linkedin.uploadImage(linkedinAsset.uploadUrl, image);

        // Create media record
        const media = await prisma.postMedia.create({
          data: {
            postId: post.id,
            mediaType: "IMAGE",
            url: uploadedUrl,
            assetId: linkedinAsset.asset,
            uploadStatus: "ready",
          },
        });

        uploadedMedia.push(media);
      }
    }

    // 3. Create LinkedIn post
    if (status === "published") {
      const linkedinPost = await linkedin.createPost({
        author: organizationId
          ? `urn:li:organization:${organizationId}`
          : `urn:li:person:${session.user.id}`,
        commentary: content,
        visibility,
        media: uploadedMedia
          .filter(
            (media): media is typeof media & { assetId: string } =>
              typeof media.assetId === "string"
          )
          .map((media) => ({
            asset: media.assetId,
            status: "READY",
            title: media.title || undefined,
          })),
        scheduledTime: scheduledFor
          ? Math.floor(new Date(scheduledFor).getTime() / 1000)
          : undefined,
      });

      // 4. Update post with LinkedIn data
      await prisma.post.update({
        where: { id: post.id },
        data: {
          linkedinPostId: linkedinPost.id,
          linkedinPostUrl: linkedinPost.postUrl,
          status: scheduledFor ? "scheduled" : "published",
          publishedAt: scheduledFor ? undefined : new Date(),
        },
      });
    }

    // 5. Return the complete post with media
    const completePost = await prisma.post.findUnique({
      where: { id: post.id },
      include: {
        images: true,
        distributionMetrics: true,
      },
    });

    return NextResponse.json(completePost);
  } catch (error) {
    console.error("[POSTS_POST]", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal error",
      { status: 500 }
    );
  }
}
