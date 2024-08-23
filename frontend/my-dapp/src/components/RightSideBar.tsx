import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { userProjection } from "@/lib/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { unstable_cache } from "next/cache";
import { formatNumber } from "@/lib/utils";

const RightSideBar = () => {
  return (
    <div className="lg:-w-80 sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <FollowSuggestion />
        <Trending />
      </Suspense>
    </div>
  );
};

export default RightSideBar;

async function FollowSuggestion() {
  const { user } = await validateRequest();

  if (!user) return null;
  // To show the users we're not already following
  const followusers = await prisma.user.findMany({
    where: {
      NOT: {
        id: user?.id,
      },
    },
    select: userProjection,
    take: 5, //Show a maximum of five users
  });

  return (
    <div className="bg-card space-y-5 rounded-2xl p-5 shadow-sm">
      <div className="text-xl font-bold">
        {followusers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between gap-3"
          >
            <Link
              href={`/users/${user.username}`}
              className="flex items-center gap-3"
            >
              <UserAvatar avatarUrl={user.avartarUrl} className="flex-none" />
              <div>
                <p className="line-clamp-1 break-all font-semibold hover:underline">
                  {user.displayName}
                </p>
                <p className="text-muted-foreground line-clamp-1 break-all">
                  @{user.username}
                </p>
              </div>
            </Link>
            <Button>Follow</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
//Normal cache(in the auth.ts) duplicates the same request. Unstable cache is cached on the server; allows caching of an operation between multiple requests /or different users
const getTrending = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM posts
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;

    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count), //This converts the bigint into a normal number; because we cannot send bigint server inclined components
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60,
  },
  //alnum is the regex expression to search for hashtags
); //returning the five most mentioned hashtags with the highest counts
//revalidate is a property in seconds, not milliseconds

async function Trending() {
  const trendingTopics = await getTrending();

  return (
    <div className="bg-card space-y-5 rounded-l-2xl p-5 shadow-sm">
      <div className="text-xl font-bold">Trending topics</div>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];

        return (
          <Link key={title} href={`/hashtag/${title}`} className="block">
            <p
              className="line-clamp-1 break-all font-semibold hover:underline"
              title={hashtag}
            >
              {hashtag}
            </p>
            <p className="text-muted-foreground text-sm">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
