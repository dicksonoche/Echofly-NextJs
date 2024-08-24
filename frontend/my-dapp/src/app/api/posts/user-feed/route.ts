//A GET request to fetch data, we need to create a route handler

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postPayloadInclude } from "@/lib/types";

export async function GET() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In fyp page case, we want to show all posts of all users including ourselves
    const posts = await prisma.post.findMany({
      include: postPayloadInclude, //To join multiple tables, and select the data we want available on the post
      orderBy: { createdAt: "desc" },
    });

    return Response.json(posts);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
