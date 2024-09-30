import { Bytes, BigInt } from "@graphprotocol/graph-ts";
import { User, Post } from "../generated/schema";

// Helper function to either retrieve an existing User entity or create a new one
export function getOrCreateUser(address: Bytes): User {
  // Try to load the user from the store using their address
  let user = User.load(address.toHex());

  // If the user doesn't exist yet (i.e., first interaction), create a new User
  if (user == null) {
    user = new User(address.toHex()); // Create a new User with their address as the unique ID
    user.userAddress = address; // Store the user's blockchain address

    // Set default values for their follower/following counts since it's a new user
    user.followersCount = BigInt.fromI32(0); // Start with 0 followers
    user.followingCount = BigInt.fromI32(0); // Start with 0 following

    user.save(); // Save this new User to the store
  }

  return user as User; // Return the User (whether it's new or already existed)
}

// Helper function to either retrieve an existing Post entity or create a new one
export function getOrCreatePost(postId: BigInt, userAddress: Bytes): Post {
  let postIdString = postId.toString(); // Convert the postId (a BigInt) to a string for easier lookup
  let post = Post.load(postIdString); // Try to load the post by its ID

  // If the post doesn't exist, let's create a new one
  if (post == null) {
    post = new Post(postIdString); // Create a new Post entity with the postId as the unique ID
    post.postId = postId; // Assign the provided postId to the Post entity

    // We need to associate the post with the user who created it.
    // Here, we're using the user's address as the reference
    post.user = userAddress.toHex();

    // Initialize default values for the new Post
    post.content = ""; // Default empty content, assuming it'll be set later
    post.likesCount = BigInt.zero(); // Start with 0 likes
    post.createdAt = BigInt.zero(); // Set a placeholder creation timestamp (likely updated later)

    post.save(); // Save the new Post to the store
  }

  return post as Post; // Return the Post (whether it's new or already existed)
}
