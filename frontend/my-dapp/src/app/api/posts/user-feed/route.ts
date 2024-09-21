//A GET request to fetch data, we need to create a route handler

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostPayloadInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get('cursor') || undefined

    const pageSize = 12

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In fyp page case, we want to show all posts of all users including ourselves
    const posts = await prisma.post.findMany({
      include: getPostPayloadInclude(user.id), //To join multiple tables, and select the data we want available on the post
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    }

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
