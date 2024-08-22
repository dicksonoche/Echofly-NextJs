import CreatePost from "@/components/posts/editor/CreatePost";
import Post from "@/components/posts/Post";
import prisma from "@/lib/prisma";
import { postPayloadInclude } from "@/lib/types";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: postPayloadInclude, //To join multiple tables, and select the data we want available on the post
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full min-w-0">
      <div className="w-full min-w-0 space-y-5">
        <CreatePost />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
