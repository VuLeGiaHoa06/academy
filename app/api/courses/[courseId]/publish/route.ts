import { Course } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

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

    if (!course)
      return new NextResponse("Course is not found", { status: 404 });

    const isPublishedSections = course.sections.some(
      (section) => section.isPublished
    );
    // just 1 field-ispublish = true of section, course can publish on media

    if (
      !course.title ||
      !course.description ||
      !course.categoryId ||
      !course.subCategoryId ||
      !course.levelId ||
      !course.imageUrl ||
      !course.price ||
      !isPublishedSections
    )
      return new NextResponse("Missing required fields", { status: 400 });

    const pusblishedCourse = await db.course.update({
      where: {
        id: courseId,
        instructorId: userId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(pusblishedCourse, { status: 200 });
  } catch (error) {
    console.log("courseId_publish_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
