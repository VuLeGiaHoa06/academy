import { Course } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
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
      include: {
        sections: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) return new NextResponse("Course not found", { status: 404 });

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
        courseId,
      },
    });

    const muxData = await db.muxData.findUnique({
      where: {
        sectionId,
      },
    });

    if (
      !section ||
      !muxData ||
      !section.title ||
      !section.description ||
      !section.videoUrl
    ) {
      return new NextResponse("Missing required fields", { status: 400 }); // return bad request
    }

    const publishedSection = await db.section.update({
      where: {
        id: sectionId,
        courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedSection, { status: 200 });
  } catch (error) {
    console.log("publish_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
