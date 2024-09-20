import { useToast } from "@/components/ui/use-toast";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createPost } from "./actions";
import { PostsPage } from "@/lib/types";

export function useSubmitPostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed", "for-you"] };

      //Stop any running queries
      await queryClient.cancelQueries(queryFilter);

      //Take the queryClient again and setQueriesData to modify multiple feeds(on the fyp, following, profile page)
      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      //If there's a new post(probably by another user) just before the first page loads
      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast({
        description: "Post sent",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to post. Please, try again.",
      });
    },
  });

  return mutation;
}
