import PostEditor from "@/components/posts/editor/postEditor";
import ForYouFeed from "./forYouFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "./followingFeed";
import TrendsSidebar from "@/components/trendsSidebar";

export default function Home() {
  return (
    <>
      <main className="flex w-full min-w-0 gap-5">
        <div className="w-full min-w-0 space-y-5">
          <PostEditor />
          <Tabs defaultValue="for-you">
            <TabsList>
              <TabsTrigger value="for-you">For you</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="for-you">
              <ForYouFeed />
            </TabsContent>
            <TabsContent value="following">
              <FollowingFeed />
            </TabsContent>
          </Tabs>
        </div>
        <TrendsSidebar />
      </main>
    </>
  );
}

// async function WhoToFollow() {
//   const { user } = await validateRequest();

//   if (!user) return null;

//   const usersToFollow = await prisma.user.findMany({
//     where: {
//       NOT: {
//         id: user.id,
//       },
//       // followers: {
//       //   none: {
//       //     followerId: user.id,
//       //   },
//       // },
//     },
//     select: getUserDataSelect(user.id),
//     take: 5,
//   });

//   return (
//     <div className="bg-card space-y-5 rounded-2xl p-5 shadow-sm">
//       <div className="text-xl font-bold">Who to follow</div>
//       {usersToFollow.map((user) => (
//         <div key={user.id} className="flex items-center justify-between gap-3">
//           <UserTooltip user={user}>
//             <Link
//               href={`/users/${user.username}`}
//               className="flex items-center gap-3"
//             >
//               <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
//               <div>
//                 <p className="line-clamp-1 font-semibold break-all hover:underline">
//                   {user.displayName}
//                 </p>
//                 <p className="text-muted-foreground line-clamp-1 break-all">
//                   @{user.username}
//                 </p>
//               </div>
//             </Link>
//           </UserTooltip>
//           {/* <FollowButton
//             userId={user.id}
//             initialState={{
//               followers: user._count.followers,
//               isFollowedByUser: user.followers.some(
//                 ({ followerId }) => followerId === user.id,
//               ),
//             }}
//           /> */}
//         </div>
//       ))}
//     </div>
//   );
// }

// const getTrendingTopics = unstable_cache(
//   async () => {
//     const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
//             SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
//             FROM posts
//             GROUP BY (hashtag)
//             ORDER BY count DESC, hashtag ASC
//             LIMIT 5
//         `;

//     return result.map((row) => ({
//       hashtag: row.hashtag,
//       count: Number(row.count),
//     }));
//   },
//   ["trending_topics"],
//   {
//     revalidate: 3 * 60 * 60,
//   },
// );

// async function TrendingTopics() {
//   const trendingTopics = await getTrendingTopics();

//   return (
//     <div className="bg-card space-y-5 rounded-2xl p-5 shadow-sm">
//       <div className="text-xl font-bold">Trending topics</div>
//       {trendingTopics.map(({ hashtag, count }) => {
//         const title = hashtag.split("#")[1];

//         return (
//           <Link key={title} href={`/hashtag/${title}`} className="block">
//             <p
//               className="line-clamp-1 font-semibold break-all hover:underline"
//               title={hashtag}
//             >
//               {hashtag}
//             </p>
//             <p className="text-muted-foreground text-sm">
//               {formatNumber(count)} {count === 1 ? "post" : "posts"}
//             </p>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }
