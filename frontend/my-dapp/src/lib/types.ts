import { Prisma } from "@prisma/client";

export function getUserProjection(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avartarUrl: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        followers: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export function getPostPayloadInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserProjection(loggedInUserId),
    },
  } satisfies Prisma.PostInclude;
}

export type PostPayload = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostPayloadInclude>;
}>;
//This creates the post type for getting a post with the "include" gotten inside the PostPayloadInclude
// And whenever we update the "include", the type automatically updates

export interface PostsPage {
  posts: PostPayload[];
  nextCursor: string | null;
}

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}
