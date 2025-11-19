import { Section } from "@prisma/client";
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

    const { isCompleted } = await req.json();

    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
    });

    // check if course return null
    if (!course)
      return new NextResponse("Course is not found", { status: 404 });

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
        courseId,
      },
    });

    // check if section return null
    if (!section)
      return new NextResponse("Section is not found", { status: 404 });

    const progress = await db.progress.upsert({
      where: {
        studentId_sectionId: {
          studentId: userId,
          sectionId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        studentId: userId,
        sectionId,
        isCompleted,
      },
    });

    return NextResponse.json(progress, { status: 200 });
  } catch (error) {
    console.log("sectionId_progress_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
