import { Prisma } from "@prisma/client";

export const userProjection = {
  id: true,
  username: true,
  displayName: true,
  avartarUrl: true,
} satisfies Prisma.UserSelect;

export const postPayloadInclude = {
  user: {
    select: userProjection,
  },
} satisfies Prisma.PostInclude;

export type postPayload = Prisma.PostGetPayload<{
  include: typeof postPayloadInclude;
}>;
//This creates the post type for getting a post with the "include" gotten inside the postPayloadInclude
// And whenever we update the "include", the type automatically updates
