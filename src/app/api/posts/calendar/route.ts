import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const GET = auth(async function GET(req) {
  try {
    if (!req.auth?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: req.auth.user.id,
        status: "scheduled",
        isDeleted: false,
        scheduledFor: {
          not: null,
        },
      },
      orderBy: {
        scheduledFor: "asc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("[CALENDAR_POSTS]", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar posts" },
      { status: 500 }
    );
  }
});
