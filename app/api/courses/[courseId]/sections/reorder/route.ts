import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { courseId } = await params;

    const course = await db.course.findUnique({
      where: {
        instructorId: userId,
        id: courseId,
      },
    });

    if (!course) return new NextResponse("Course not found", { status: 404 });

    const { list } = await req.json();

    for (let item of list) {
      await db.section.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }

    return new NextResponse("Reorder sections successfully", { status: 200 });
  } catch (error) {
    console.log("reorder_PUT", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
