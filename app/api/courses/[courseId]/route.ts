import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
import { Course } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const { userId } = await auth();
    const { courseId } = await params;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const values = await req.json();

    const courseUpdated = await db.course.update({
      where: {
        id: courseId,
        instructorId: userId,
      },
      data: {
        ...values,
        price: +values.price,
      },
    });

    return NextResponse.json(courseUpdated, { status: 200 });
  } catch (error) {
    console.log("courseId_PATCH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const { userId } = await auth();

    const { courseId } = await params;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    // why need to check userid
    // becasuse userid return 2 value: id, null
    // i set condition to check, if userid = null thi return, and dont run code below
    // if dont have condition to check, i will get error
    // any variable get value like instructorid will get error, if check data type
    // because instructor just get one datatype is a string, not null

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

    for (const section of course.sections) {
      if (section.muxData?.assetId) {
        await video.assets.delete(section.muxData.assetId);
      }
    }

    await db.course.delete({
      where: {
        id: courseId,
        instructorId: userId,
      },
    });

    return new NextResponse("Deleted Successfully", { status: 200 });
  } catch (error) {
    console.log("courseId_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
