import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostPayloadInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";
import provider from "@/lib/ethereum"; // Your provider setup
import { Contract } from "ethers";
import ABI from "";

const contractAddress = "0x46B247D4AE99315A84a5A1e30a4744c3dF4b1b3e"; // Contract address from your .env file

export async function createPost(input: string) {
  const { user } = await validateRequest();
  if (!user) throw Error("Unauthorized");

  // Validate the input content
  const { content } = createPostSchema.parse({ content: input });

  //Using Prisma create the post in the database first
  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
    include: getPostPayloadInclude(user.id),
  });

  // Using ethers.js to interact with the smart contract
  const signer = provider.getSigner(); // Get the signer (Metamask user)
  const contract = new Contract(contractAddress, ABI, signer); // Initialize contract with ABI

  const transaction = await contract.createUserPost(content);
  await transaction.wait();

  return newPost;
}
