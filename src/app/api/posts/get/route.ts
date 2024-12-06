import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";

export const GET = auth(async function GET(req) {
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

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") as PostStatus | null;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause
    const where = {
      authorId: userId,
      isDeleted: false,
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { content: { contains: search, mode: "insensitive" as const } },
              { topics: { hasSome: [search] } },
            ],
          }
        : {}),
    };

    try {
      // Get posts with pagination
      const [posts, total] = await Promise.all([
        prisma.post.findMany({
          where,
          include: {
            images: true,
            distributionMetrics: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip,
          take: limit,
        }),
        prisma.post.count({ where }),
      ]);

      return NextResponse.json({
        posts,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit,
        },
      });
    } catch (dbError) {
      console.error("[POSTS_GET_DB]", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error("[POSTS_GET_AUTH]", error);

    // Type guard for error object
    if (error && typeof error === "object" && "name" in error) {
      if (error.name === "AdapterError" || error.name === "SessionTokenError") {
        return NextResponse.json(
          { error: "Session expired. Please sign in again." },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
});
