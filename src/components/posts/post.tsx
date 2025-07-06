"use client";

import Link from "next/link";
import UserAvatar from "../userAvatar";
import { useSession } from "@/app/(main)/sessionProvider";
import { PostData } from "@/lib/type";
import UserTooltip from "../userTooltip";
import PostMoreButton from "./postDeleteSkeleton";
import { useRelativeTime } from "@/hooks/useRElativeTime";
import Linkify from "../linkify";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { user } = useSession();

  return (
    <article className="group/post bg-card space-y-3 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>
          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.username}`}
                className="block font-medium hover:underline"
              >
                {post.user.displayName}
              </Link>
            </UserTooltip>
            <Link
              href={`/posts/${post.id}`}
              className="text-muted-foreground block text-[14px] opacity-40 hover:underline"
              suppressHydrationWarning
            >
              {useRelativeTime(new Date(post.createdAt))}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <Linkify>
        <div className="break-words whitespace-pre-line">{post.content}</div>
      </Linkify>
    </article>
  );
}
