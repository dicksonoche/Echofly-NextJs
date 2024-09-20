import { Prisma } from "@prisma/client";

export const userProjection = {
  id: true,
  username: true,
  displayName: true,
  avartarUrl: true,
} satisfies Prisma.UserSelect;

export const PostPayloadInclude = {
  user: {
    select: userProjection,
  },
} satisfies Prisma.PostInclude;

export type PostPayload = Prisma.PostGetPayload<{
  include: typeof PostPayloadInclude;
}>;
//This creates the post type for getting a post with the "include" gotten inside the PostPayloadInclude
// And whenever we update the "include", the type automatically updates

export interface PostsPage {
  posts: PostPayload[];
  nextCursor: string | null;
}
