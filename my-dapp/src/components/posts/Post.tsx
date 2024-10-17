"use client"; //No need for this, beacuse the fyp(parent component) is already a client component; unless it is rendered to a server component.

import { PostPayload } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/app/(hub)/SessionProvider";
import PostMenuButton from "./PostMenuButton";

interface PostProps {
  post: PostPayload;
}

const Post = ({ post }: PostProps) => {
  //To confirm if the logged in user is the author of the post to be deleted
  const { user } = useSession();

  return (
    <article className="group/single-post bg-card space-y-3 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avartarUrl} />
          </Link>
          <div>
            <Link
              href={`/users/${post.user.username}`}
              className="block font-medium hover:underline"
            >
              {post.user.displayName}
            </Link>
            <Link
              href={`/posts/${post.id}`}
              className="text-muted-foreground block text-sm hover:underline"
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMenuButton
            post={post}
            className="opacity-0 transition-opacity group-hover/single-post:opacity-100"
          />
        )}
      </div>
      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
};

export default Post;
