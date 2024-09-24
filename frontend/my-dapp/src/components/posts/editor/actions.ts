"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostPayloadInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

export async function createPost(input: string) {
  const { user } = await validateRequest(); //Check if the user is authenticated
  if (!user) throw Error("Unauthorized");

  const { content } = createPostSchema.parse({ content: input });

  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
    include: getPostPayloadInclude(user.id),
  });

  return newPost
}
