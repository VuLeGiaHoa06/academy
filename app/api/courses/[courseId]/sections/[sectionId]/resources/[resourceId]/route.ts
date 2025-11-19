import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      courseId: string;
      sectionId: string;
      resourceId: string;
    }>;
  }
) => {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { courseId, sectionId, resourceId } = await params;

    const course = await db.course.findUnique({
      where: {
        instructorId: userId,
        id: courseId,
      },
    });

    if (!course) return new NextResponse("Course not found", { status: 404 });

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
        courseId,
      },
    });

    if (!section) return new NextResponse("Section not found", { status: 404 });

    await db.resource.delete({
      // dont need to save to data into variable - just delete
      where: {
        id: resourceId,
        sectionId,
      },
    });

    return new NextResponse("Resource is deleted", { status: 200 });
  } catch (error) {
    console.log("resources_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
