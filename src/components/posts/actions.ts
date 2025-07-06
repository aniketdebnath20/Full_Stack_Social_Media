"use server";

import { validateRequest } from "@/auth/page";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/type";

export async function deletePost(id: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Post not found");
  if (post.userId !== user.id)
    throw new Error("Unauthorized to delete this post");

  const deletePost = await prisma.post.delete({
    where: { id },
    include: getPostDataInclude(user.id),
  });
  return deletePost;
}
 