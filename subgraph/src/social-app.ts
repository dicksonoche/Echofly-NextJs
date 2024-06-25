import { BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts";
import {
  EtherWithdrawn as EtherWithdrawnEvent,
  PlatformMessageUpdated as PlatformMessageUpdatedEvent,
  PostCommented as PostCommentedEvent,
  PostLiked as PostLikedEvent,
  UserFollowed as UserFollowedEvent,
  UserPostCreated as UserPostCreatedEvent,
  UserProfileCreated as UserProfileCreatedEvent,
} from "../generated/SocialApp/SocialApp";
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
} from "../generated/schema";
import { getOrCreateUser, getOrCreatePost } from "./helpers";

export function handleEtherWithdrawn(event: EtherWithdrawnEvent): void {
  // Load or create the user who is withdrawing ether
  let user = getOrCreateUser(event.params.owner);

  // Create a unique identifier for the EtherWithdrawn entity
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new EtherWithdrawn entity
  let withdrawal = new EtherWithdrawn(id);
  withdrawal.owner = user.id;
  withdrawal.amount = event.params.amount;
  withdrawal.timestamp = event.params.timestamp;
  withdrawal.blockNumber = event.block.number;
  withdrawal.transactionHash = event.transaction.hash;

  // Save the EtherWithdrawn entity to the store
  withdrawal.save();
}

export function handlePlatformMessageUpdated(
  event: PlatformMessageUpdatedEvent
): void {
  // Load or create the user who updated the message
  let user = getOrCreateUser(event.params.updater);

  // Create a unique identifier for the PlatformMessageUpdated entity
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new PlatformMessageUpdated entity
  let messageUpdate = new PlatformMessageUpdated(id);
  messageUpdate.updater = user.id;
  messageUpdate.newMessage = event.params.newMessage;
  messageUpdate.premiumUser = event.params.premiumUser;
  messageUpdate.value = event.params.value;
  messageUpdate.timestamp = event.params.timestamp;

  // Save the PlatformMessageUpdated entity to the store
  messageUpdate.save();
}

export function handlePostCommented(event: PostCommentedEvent): void {
  // Load or create the user who commented on the post
  let user = getOrCreateUser(event.params.userAddress);

  // Load or create the post that was commented on
  let post = getOrCreatePost(event.params.postId, event.params.userAddress);

  // Create a unique identifier for the PostCommented entity
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new PostCommented entity
  let comment = new PostCommented(id);
  comment.user = user.id;
  comment.post = post.id;
  comment.content = event.params.content;
  comment.timestamp = event.params.timestamp;
  comment.blockNumber = event.block.number;

  // Save the PostCommented entity to the store
  comment.save();
}

export function handlePostLiked(event: PostLikedEvent): void {
  // Load or create the user who liked the post
  let user = getOrCreateUser(event.params.userAddress);

  // Load or create the post that was liked
  let post = getOrCreatePost(event.params.postId, event.params.userAddress);

  // Create a unique identifier for the PostLiked entity
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new PostLiked entity
  let like = new PostLiked(id);
  like.user = user.id;
  like.post = post.id;
  like.timestamp = event.params.timestamp;
  like.blockNumber = event.block.number;

  // Update likes count on the post
  post.likesCount = post.likesCount.plus(BigInt.fromI32(1));
  post.save();

  // Save the PostLiked entity to the store
  like.save();
}

export function handleUserFollowed(event: UserFollowedEvent): void {
  let follower = getOrCreateUser(event.params.follower);
  let followee = getOrCreateUser(event.params.followee);

  follower.followingCount = follower.followersCount;
  followee.followersCount = followee.followersCount;
  follower.save();
  followee.save();

  let followId =
    event.params.follower.toHex() + "-" + event.params.followee.toHex();
  let userFollow = new UserFollow(followId);
  userFollow.follower = follower.id;
  userFollow.followee = followee.id;
  userFollow.timestamp = event.params.timestamp;
  userFollow.blockNumber = event.block.number;
  userFollow.save();
}

export function handleUserPostCreated(event: UserPostCreatedEvent): void {
  // Load or create the user who created the post
  let user = getOrCreateUser(event.params.userAddress);

  // Create a unique identifier for the Post entity
  let postId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new Post entity
  let post = new UserPostCreated(postId);
  post.user = user.id;
  post.content = event.params.content;
  post.timestamp = post.timestamp; // Assuming timestamp is a uint256 and needs conversion
  post.blockNumber = event.block.number;

  // Save the Post entity to the store
  post.save();
}

export function handleUserProfileCreated(event: UserProfileCreatedEvent): void {
  // Load or create the user associated with the updated profile
  let user = getOrCreateUser(event.params.userAddress);

  // Update user profile details
  user.username = event.params.username;
  user.bio = event.params.bio;
  user.avatarUrl = event.params.avatarUrl;
  user.createdAt = event.params.timestamp; // Assuming createdAt is the timestamp when the profile is created/updated

  // Save the updated user entity
  user.save();

  // Optionally, create a UserProfileCreated entity if you need to track the history of profile updates
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let userProfile = new UserProfileCreated(id);
  userProfile.user = user.id;
  userProfile.username = event.params.username;
  userProfile.bio = event.params.bio;
  userProfile.avatarUrl = event.params.avatarUrl;
  userProfile.timestamp = event.params.timestamp;
  userProfile.blockNumber = event.block.number;
  userProfile.transactionHash = event.transaction.hash;
  userProfile.save();
}
