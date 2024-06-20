import {
  EtherWithdrawn as EtherWithdrawnEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PlatformMessageUpdated as PlatformMessageUpdatedEvent,
  PostCommented as PostCommentedEvent,
  PostLiked as PostLikedEvent,
  UserFollowed as UserFollowedEvent,
  UserPostCreated as UserPostCreatedEvent,
  UserProfileCreated as UserProfileCreatedEvent
} from "../generated/SocialApp/SocialApp"
import {
  EtherWithdrawn,
  OwnershipTransferred,
  PlatformMessageUpdated,
  PostCommented,
  PostLiked,
  UserFollowed,
  UserPostCreated,
  UserProfileCreated
} from "../generated/schema"

export function handleEtherWithdrawn(event: EtherWithdrawnEvent): void {
  let entity = new EtherWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.amount = event.params.amount
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlatformMessageUpdated(
  event: PlatformMessageUpdatedEvent
): void {
  let entity = new PlatformMessageUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.updater = event.params.updater
  entity.newMessage = event.params.newMessage
  entity.premiumUser = event.params.premiumUser
  entity.value = event.params.value
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePostCommented(event: PostCommentedEvent): void {
  let entity = new PostCommented(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.postId = event.params.postId
  entity.content = event.params.content
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePostLiked(event: PostLikedEvent): void {
  let entity = new PostLiked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.postId = event.params.postId
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserFollowed(event: UserFollowedEvent): void {
  let entity = new UserFollowed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.follower = event.params.follower
  entity.followee = event.params.followee
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserPostCreated(event: UserPostCreatedEvent): void {
  let entity = new UserPostCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.content = event.params.content
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserProfileCreated(event: UserProfileCreatedEvent): void {
  let entity = new UserProfileCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.username = event.params.username
  entity.bio = event.params.bio
  entity.avatarUrl = event.params.avatarUrl
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
