import { BigInt, Bytes } from "@graphprotocol/graph-ts";
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

export function handleEtherWithdrawn(event: EtherWithdrawnEvent): void {
  let user = User.load(event.params.toHex());
  if (!user) {
    user = new User(event.params.toHex());
    user.userAddress = event.params.owner;
    user.save();
  }

  let entity = new EtherWithdrawn(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.owner = user.id;
  entity.amount = event.params.amount;
  entity.timestamp = event.params.timestamp;
  entity.blockNumber = event.block.number;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handlePlatformMessageUpdated(
  event: PlatformMessageUpdatedEvent
): void {
  let user = User.load(event.params.toHex());
  if (!user) {
    user = new User(event.params.toHex());
    user.userAddress = event.params[0];
    user.save();
  }

  let entity = new PlatformMessageUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.updater = user.id;
  entity.newMessage = event.params.newMessage;
  entity.premiumUser = event.params.premiumUser;
  entity.value = event.params.value;
  entity.timestamp = event.params.timestamp;
  entity.save();
}

export function handlePostCommented(event: PostCommentedEvent): void {
  let user = User.load(event.params.toHex());
  if (!user) {
    user = new User(event.params.toHex());
    user.userAddress = event.params.userAddress;
    user.save();
  }

  let post = Post.load(event.params.toHex());
  if (!post) {
    post = new Post(event.params.toHex());
    post.postId = event.params.postId;
    post.user = user.id;
    post.save();
  }

  let entity = new PostCommented(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.user = user.id;
  entity.post = post.id;
  entity.content = event.params.content;
  entity.timestamp = event.params.timestamp;
  entity.blockNumber = event.block.number;
  entity.save();
}

export function handlePostLiked(event: PostLikedEvent): void {
  let user = User.load(event.params.toHex());
  if (!user) {
    user = new User(event.params.toHex());
    user.userAddress = event.params.userAddress;
    user.save();
  }

  let post = Post.load(event.params.toHex());
  if (!post) {
    post = new Post(event.params.toHex());
    post.postId = event.params.postId;
    post.user = user.id;
    post.save();
  }

  let entity = new PostLiked(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.user = user.id;
  entity.post = post.id;
  entity.timestamp = event.params.timestamp;
  entity.blockNumber = event.block.number;
  entity.save();
}

export function handleUserFollowed(event: UserFollowedEvent): void {
  // Load or create the follower user entity
  let follower = User.load(event.params.follower.toHex());
  if (!follower) {
    follower = new User(event.params.follower.toHex());
    follower.userAddress = event.params.follower;
    follower.followersCount = BigInt.fromI32(0); // Initialize followersCount if new user
    follower.followingCount = BigInt.fromI32(0); // Initialize followingCount if new user
  }

  // Ensure followingCount is not null
  follower.followingCount = follower.followingCount
    ? follower.followingCount.plus(BigInt.fromI32(1))
    : BigInt.fromI32(1);
  follower.save();

  // Load or create the followee user entity
  let followee = User.load(event.params.followee.toHex());
  if (!followee) {
    followee = new User(event.params.followee.toHex());
    followee.userAddress = event.params.followee;
    followee.followersCount = BigInt.fromI32(0); // Initialize followersCount if new user
    followee.followingCount = BigInt.fromI32(0); // Initialize followingCount if new user
  }

  // Ensure followersCount is not null
  followee.followersCount = followee.followersCount
    ? followee.followersCount.plus(BigInt.fromI32(1))
    : BigInt.fromI32(1);
  followee.save();

  // Create the UserFollow entity
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
  let user = User.load(event.params.toHex());
  if (!user) {
    user = new User(event.params.toHex());
    user.userAddress = event.params.userAddress;
    user.save();
  }

  let entity = new UserPostCreated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.user = user.id;
  entity.content = event.params.content;
  entity.timestamp = event.params.timestamp;
  entity.blockNumber = event.block.number;
  entity.save();
}

export function handleUserProfileCreated(event: UserProfileCreatedEvent): void {
  let user = User.load(event.params.toHex());
  if (!user) {
    user = new User(event.params.toHex());
    user.userAddress = event.params.userAddress;
    user.username = event.params.username;
    user.bio = event.params.bio;
    user.avatarUrl = event.params.avatarUrl;
    user.timestamp = event.params.timestamp;
    user.save();
  }

  let entity = new UserProfileCreated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.user = user.id;
  entity.username = event.params.username;
  entity.bio = event.params.bio;
  entity.avatarUrl = event.params.avatarUrl;
  entity.timestamp = event.params.timestamp;
  entity.blockNumber = event.block.number;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}
