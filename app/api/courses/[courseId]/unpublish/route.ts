import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauhtorized", { status: 401 });

    const { courseId } = await params;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        instructorId: userId,
      },
      include: {
        sections: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) return new NextResponse("Course not found", { status: 404 });

    const unpusblishedCourse = await db.course.update({
      where: {
        id: courseId,
        instructorId: userId,
      },
      data: {
        isPublished: false,
      },
    });

    await db.section.updateMany({
      where: {
        courseId,
        isPublished: true,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unpusblishedCourse, { status: 200 });
  } catch (error) {
    console.log("courseId_unpublish_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
