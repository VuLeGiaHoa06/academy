import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const { userId } = await auth();
    const { courseId } = await params;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const course = await db.course.findUnique({
      where: {
        instructorId: userId,
        id: courseId,
      },
    });

    if (!course) return new NextResponse("Course not found", { status: 404 });

    const lastSection = await db.section.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: "desc", // 5->1
      },
    });

    const newPosition = lastSection ? lastSection.position + 1 : 0;
    // if section dont have
    // initial - position will be 0

    // if section has already
    // position will plus 1

    const { title } = await req.json();

    if (!title) return new NextResponse("Title is required", { status: 404 });

    const newSection = await db.section.create({
      data: {
        position: newPosition,
        title,
        courseId,
      },
    });

    return NextResponse.json(newSection, { status: 200 });
  } catch (error) {
    console.log("sections_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
