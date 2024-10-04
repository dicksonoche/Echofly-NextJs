"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostPayloadInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import {contract, contractWithSignature} from "@/lib/ethereum";
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
//create a post on the chain.
  const tx = await contract.createUserPost(content);
  //we might have to modify a thing or two.
  return newPost
}
