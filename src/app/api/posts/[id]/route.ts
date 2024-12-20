import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const PUT = auth(async function PUT(req, { params }) {
  try {
    if (!req.auth) {
      return NextResponse.json(
        { error: "Please sign in to continue" },
        { status: 401 }
      );
    }

    const userId = req.auth.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const postId = await params?.id;

    if (!postId || Array.isArray(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const body = await req.json();
    const { content, visibility, images, topics } = body;

    const existingPost = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content,
        visibility,
        topics: topics || [],
        // Add other fields as needed
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("[POSTS_PUT]", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
});

export const DELETE = auth(async function DELETE(req, { params }) {
  try {
    if (!req.auth?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

    if (!id) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    // Soft delete by updating isDeleted flag
    await prisma.post.update({
      where: {
        id: id as string,
        authorId: req.auth.user.id,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE_POST]", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
});
