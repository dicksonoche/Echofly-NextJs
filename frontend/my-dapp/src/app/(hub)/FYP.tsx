"use client";

import Post from "@/components/posts/Post";
import { postPayload } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const FYP = () => {
  // First, it returns an array of post payloads/data
  const query = useQuery<postPayload[]>({
    queryKey: ["post-feed", "for-you"], //Data cache, automatically revalidating it
    queryFn: async () => {
      const res = await fetch("/api/posts/user-feed");
      if (!res.ok) {
        throw Error(`Request failed with status code ${res.status}`);
      }
      return res.json();
    },
  });

  if (query.status === "pending") {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (query.status === "error") {
    return <p className="text-destructive text-center">Error loading posts.</p>;
  }
  return <>
  {query.data?.map((post) => (
    <Post key={post.id} post={post} />
  ))}
  </>;
};

export default FYP;
