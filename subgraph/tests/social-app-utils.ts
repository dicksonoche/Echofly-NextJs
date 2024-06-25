import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  EtherWithdrawn,
  OwnershipTransferred,
  PlatformMessageUpdated,
  PostCommented,
  PostLiked,
  UserFollowed,
  UserPostCreated,
  UserProfileCreated
} from "../generated/SocialApp/SocialApp"

export function createEtherWithdrawnEvent(
  owner: Address,
  amount: BigInt,
  timestamp: BigInt
): EtherWithdrawn {
  let etherWithdrawnEvent = changetype<EtherWithdrawn>(newMockEvent())

  etherWithdrawnEvent.parameters = new Array()

  etherWithdrawnEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  etherWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  etherWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return etherWithdrawnEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPlatformMessageUpdatedEvent(
  updater: Address,
  newMessage: string,
  premiumUser: boolean,
  value: BigInt,
  timestamp: BigInt
): PlatformMessageUpdated {
  let platformMessageUpdatedEvent = changetype<PlatformMessageUpdated>(
    newMockEvent()
  )

  platformMessageUpdatedEvent.parameters = new Array()

  platformMessageUpdatedEvent.parameters.push(
    new ethereum.EventParam("updater", ethereum.Value.fromAddress(updater))
  )
  platformMessageUpdatedEvent.parameters.push(
    new ethereum.EventParam("newMessage", ethereum.Value.fromString(newMessage))
  )
  platformMessageUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "premiumUser",
      ethereum.Value.fromBoolean(premiumUser)
    )
  )
  platformMessageUpdatedEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  platformMessageUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return platformMessageUpdatedEvent
}

export function createPostCommentedEvent(
  userAddress: Address,
  postId: BigInt,
  content: string,
  timestamp: BigInt
): PostCommented {
  let postCommentedEvent = changetype<PostCommented>(newMockEvent())

  postCommentedEvent.parameters = new Array()

  postCommentedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  postCommentedEvent.parameters.push(
    new ethereum.EventParam("postId", ethereum.Value.fromUnsignedBigInt(postId))
  )
  postCommentedEvent.parameters.push(
    new ethereum.EventParam("content", ethereum.Value.fromString(content))
  )
  postCommentedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return postCommentedEvent
}

export function createPostLikedEvent(
  userAddress: Address,
  postId: BigInt,
  timestamp: BigInt
): PostLiked {
  let postLikedEvent = changetype<PostLiked>(newMockEvent())

  postLikedEvent.parameters = new Array()

  postLikedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  postLikedEvent.parameters.push(
    new ethereum.EventParam("postId", ethereum.Value.fromUnsignedBigInt(postId))
  )
  postLikedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return postLikedEvent
}

export function createUserFollowedEvent(
  follower: Address,
  followee: Address,
  timestamp: BigInt
): UserFollowed {
  let userFollowedEvent = changetype<UserFollowed>(newMockEvent())

  userFollowedEvent.parameters = new Array()

  userFollowedEvent.parameters.push(
    new ethereum.EventParam("follower", ethereum.Value.fromAddress(follower))
  )
  userFollowedEvent.parameters.push(
    new ethereum.EventParam("followee", ethereum.Value.fromAddress(followee))
  )
  userFollowedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return userFollowedEvent
}

export function createUserPostCreatedEvent(
  userAddress: Address,
  content: string,
  timestamp: BigInt
): UserPostCreated {
  let userPostCreatedEvent = changetype<UserPostCreated>(newMockEvent())

  userPostCreatedEvent.parameters = new Array()

  userPostCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  userPostCreatedEvent.parameters.push(
    new ethereum.EventParam("content", ethereum.Value.fromString(content))
  )
  userPostCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return userPostCreatedEvent
}

export function createUserProfileCreatedEvent(
  userAddress: Address,
  username: string,
  bio: string,
  avatarUrl: string,
  timestamp: BigInt
): UserProfileCreated {
  let userProfileCreatedEvent = changetype<UserProfileCreated>(newMockEvent())

  userProfileCreatedEvent.parameters = new Array()

  userProfileCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  userProfileCreatedEvent.parameters.push(
    new ethereum.EventParam("username", ethereum.Value.fromString(username))
  )
  userProfileCreatedEvent.parameters.push(
    new ethereum.EventParam("bio", ethereum.Value.fromString(bio))
  )
  userProfileCreatedEvent.parameters.push(
    new ethereum.EventParam("avatarUrl", ethereum.Value.fromString(avatarUrl))
  )
  userProfileCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return userProfileCreatedEvent
}
