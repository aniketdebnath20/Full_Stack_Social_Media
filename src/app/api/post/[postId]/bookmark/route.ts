import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth/page";
import { BookmarkInfo } from "@/lib/type";

// GET -> check if bookmarked
export async function GET(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    console.log("📌 GET bookmark:", params.postId);

    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookmark = await prisma.bookmark.findUnique({
      where: { userId_postId: { userId: loggedInUser.id, postId: params.postId } },
    });

    const data: BookmarkInfo = { isBookmarkedByUser: !!bookmark };
    return Response.json(data);
  } catch (error) {
    console.error("❌ GET error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST -> add bookmark
export async function POST(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    console.log("📌 POST bookmark:", params.postId);

    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.bookmark.upsert({
      where: { userId_postId: { userId: loggedInUser.id, postId: params.postId } },
      create: { userId: loggedInUser.id, postId: params.postId },
      update: {},
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("❌ POST error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE -> remove bookmark
export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    console.log("📌 DELETE bookmark:", params.postId);

    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.bookmark.deleteMany({
      where: { userId: loggedInUser.id, postId: params.postId },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("❌ DELETE error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
