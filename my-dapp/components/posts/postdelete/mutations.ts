import { useToast } from "../../ui/use-toast";
import { PostPayload, PostsPage } from "@/lib/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { deletePost } from "./actions";

export function useDeletePostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  //After deleting a post, redirect the user to another url
  const router = useRouter();
  const pathname = usePathname();

  const mutation = useMutation({
    mutationFn: deletePost,
    //Query filter
    //Cancel running queries
    //Then, mutate the queries data to remove the deleted post
    onSuccess: async (deletedPost) => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        //First argument is queryFilter, second is the function for oldData to modify it.
        queryFilter,
        (oldData) => {
          if (!oldData) return; //If oldData has no value, return.Nothing to delete

          //Otherwise, return the new Data.
          //pageParam remains the same, but pages are modified by mapping each page
          //Map into a newer page that has the same nextCursor, but update the posts.
          //Removing the posts that was deleted by comparing the IDs
          //If the post id is not equal to the id of the deletedPost, keep the post alive
          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((p) => p.id !== deletedPost.id),
            })),
          };
        },
      );

      toast({
        description: "Post deleted",
      });

      //Redirect if on the postDeleted page
      if (pathname === `/posts/${deletedPost.id}`) {
        router.push(`/users/${deletedPost.user.username}`);
      }
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to delete post. Try again later.",
      });
    },
  });

  return mutation;
}
