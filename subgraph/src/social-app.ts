import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  EtherWithdrawn as EtherWithdrawnEvent,
  PlatformMessageUpdated as PlatformMessageUpdatedEvent,
  PostCommented as PostCommentedEvent,
  PostLiked as PostLikedEvent,
  UserFollowed as UserFollowedEvent,
  UserPostCreated as UserPostCreatedEvent,
  UserProfileCreated as UserProfileCreatedEvent,
} from "../generated/SocialApp/SocialApp"; // Import events from the contract
import {
  User,
  EtherWithdrawn,
  PlatformMessageUpdated,
  PostCommented,
  PostLiked,
  UserFollow,
  UserPostCreated,
  UserProfileCreated,
  Post,
} from "../generated/schema"; // Import entity schemas
import { getOrCreateUser, getOrCreatePost } from "./helpers"; // Import helper functions

// Handle the EtherWithdrawn event
export function handleEtherWithdrawn(event: EtherWithdrawnEvent): void {
  let user = getOrCreateUser(event.params.owner); // Get or create the user who withdrew ether
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString(); // Unique ID for the withdrawal
  let withdrawal = new EtherWithdrawn(id); // Create the EtherWithdrawn entity
  withdrawal.owner = user.id; // Assign the user's ID to the withdrawal
  withdrawal.amount = event.params.amount; // Set the withdrawal amount
  withdrawal.timestamp = event.params.timestamp; // Set the timestamp
  withdrawal.blockNumber = event.block.number; // Set the block number
  withdrawal.transactionHash = event.transaction.hash; // Record the transaction hash
  withdrawal.save(); // Save the EtherWithdrawn entity to the store
}

// Handle the PlatformMessageUpdated event
export function handlePlatformMessageUpdated(
  event: PlatformMessageUpdatedEvent
): void {
  let user = getOrCreateUser(event.params.updater); // Get or create the user who updated the message
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString(); // Unique ID for the message update
  let messageUpdate = new PlatformMessageUpdated(id); // Create the PlatformMessageUpdated entity
  messageUpdate.updater = user.id; // Assign the updater's ID
  messageUpdate.newMessage = event.params.newMessage; // Set the updated message content
  messageUpdate.premiumUser = event.params.premiumUser; // Set premium user status
  messageUpdate.value = event.params.value; // Set associated value
  messageUpdate.timestamp = event.params.timestamp; // Set the timestamp
  messageUpdate.save(); // Save the entity to the store
}

// Handle the PostCommented event
export function handlePostCommented(event: PostCommentedEvent): void {
  let user = getOrCreateUser(event.params.userAddress); // Get or create the user who commented
  let post = getOrCreatePost(event.params.postId, event.params.userAddress); // Get or create the post
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString(); // Unique ID for the comment
  let comment = new PostCommented(id); // Create the PostCommented entity
  comment.user = user.id; // Set the commenter's ID
  comment.post = post.id; // Set the post's ID
  comment.content = event.params.content; // Set the comment's content
  comment.timestamp = event.params.timestamp; // Set the timestamp
  comment.blockNumber = event.block.number; // Set the block number
  comment.save(); // Save the comment to the store
}

// Handle the PostLiked event
export function handlePostLiked(event: PostLikedEvent): void {
  let user = getOrCreateUser(event.params.userAddress); // Get or create the user who liked the post
  let post = getOrCreatePost(event.params.postId, event.params.userAddress); // Get or create the post
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString(); // Unique ID for the like
  let like = new PostLiked(id); // Create the PostLiked entity
  like.user = user.id; // Set the user's ID
  like.post = post.id; // Set the post's ID
  like.timestamp = event.params.timestamp; // Set the timestamp
  like.blockNumber = event.block.number; // Set the block number

  // Update the post's likes count
  post.likesCount = post.likesCount.plus(BigInt.fromI32(1)); // Increment the likes count by 1
  post.save(); // Save the updated post

  like.save(); // Save the like to the store
}

// Handle the UserFollowed event
export function handleUserFollowed(event: UserFollowedEvent): void {
  let follower = getOrCreateUser(event.params.follower); // Get or create the follower
  let followee = getOrCreateUser(event.params.followee); // Get or create the followee

  follower.followingCount = follower.followersCount;
  followee.followersCount = followee.followersCount;

  // Save the updated entities
  follower.save();

  let followId =
    event.params.follower.toHex() + "-" + event.params.followee.toHex(); // Unique ID for the follow relationship
  let userFollow = new UserFollow(followId); // Create the UserFollow entity
  userFollow.follower = follower.id; // Set the follower's ID
  userFollow.followee = followee.id; // Set the followee's ID
  userFollow.timestamp = event.params.timestamp; // Set the timestamp
  userFollow.blockNumber = event.block.number; // Set the block number
  userFollow.save(); // Save the follow relationship
}

// Handle the UserPostCreated event
export function handleUserPostCreated(event: UserPostCreatedEvent): void {
  let user = getOrCreateUser(event.params.userAddress); // Get or create the user who created the post
  let postId = event.transaction.hash.toHex() + "-" + event.logIndex.toString(); // Unique ID for the post
  let post = new UserPostCreated(postId); // Create the UserPostCreated entity
  post.user = user.id; // Set the user's ID
  post.content = event.params.content; // Set the post's content
  post.timestamp = event.params.timestamp; // Set the timestamp
  post.blockNumber = event.block.number; // Set the block number
  post.save(); // Save the post
}

// Handle the UserProfileCreated event
export function handleUserProfileCreated(event: UserProfileCreatedEvent): void {
  let user = getOrCreateUser(event.params.userAddress); // Get or create the user associated with the profile
  user.username = event.params.username; // Set the username
  user.bio = event.params.bio; // Set the bio
  user.avatarUrl = event.params.avatarUrl; // Set the avatar URL
  user.createdAt = event.params.timestamp; // Set the creation timestamp
  user.save(); // Save the updated user profile

  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString(); // Unique ID for the UserProfileCreated entity
  let userProfile = new UserProfileCreated(id); // Create the UserProfileCreated entity
  userProfile.user = user.id; // Set the user's ID
  userProfile.username = event.params.username; // Set the username
  userProfile.bio = event.params.bio; // Set the bio
  userProfile.avatarUrl = event.params.avatarUrl; // Set the avatar URL
  userProfile.timestamp = event.params.timestamp; // Set the timestamp
  userProfile.blockNumber = event.block.number; // Set the block number
  userProfile.transactionHash = event.transaction.hash; // Record the transaction hash
  userProfile.save(); // Save the profile creation record
}
