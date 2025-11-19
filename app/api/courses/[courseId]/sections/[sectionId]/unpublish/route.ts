import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; sectionId: string }> }
) => {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { courseId, sectionId } = await params;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        instructorId: userId,
      },
    });

    if (!course)
      return new NextResponse("Course is not found", { status: 404 });

    const unpublishedSection = await db.section.update({
      where: {
        id: sectionId,
        courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const publishedSectionsInCourse = await db.section.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    }); // find in sections - have any section is published?

    if (publishedSectionsInCourse.length === 0) {
      await db.course.update({
        where: {
          id: courseId,
          instructorId: userId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(unpublishedSection, { status: 200 });
  } catch (error) {
    console.log("sectionId_unpublish_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
