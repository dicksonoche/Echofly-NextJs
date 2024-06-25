import { Bytes, BigInt } from "@graphprotocol/graph-ts";
import { User, Post } from "../generated/schema";

// Helper function to get or create a User entity
export function getOrCreateUser(address: Bytes): User {
  let user = User.load(address.toHex());
  if (user == null) {
    user = new User(address.toHex());
    user.userAddress = address;
    user.followersCount = BigInt.fromI32(0);
    user.followingCount = BigInt.fromI32(0);
    user.save();
  }
  return user as User;
}

// Helper function to get or create a Post entity
export function getOrCreatePost(postId: BigInt, userAddress: Bytes): Post {
  let postIdString = postId.toString();
  let post = Post.load(postIdString);

  // Check if the post already exists in the store
  if (post == null) {
    // Create a new post if it does not exist
    post = new Post(postIdString);
    post.postId = postId;
    post.user = userAddress.toHex(); // Assuming user address is needed to create a Post
    post.content = ""; // Initialize content, likely to be updated elsewhere
    post.likesCount = BigInt.zero(); // Initialize likes count
    post.createdAt = BigInt.zero(); // Initialize creation timestamp, should be set when post is created
    post.save();
  }

  return post as Post;
}
