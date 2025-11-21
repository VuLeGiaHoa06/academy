import CourseSidebar from "@/components/courses/CourseSidebar";
import { Topbar } from "@/components/layout";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const CourseDetailsLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) => {
  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const { courseId } = await params;

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      instructorId: userId,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) return redirect("/");

  return (
    <div>
      <div className="flex">
        <CourseSidebar course={course} studentId={userId} />
        <div className="flex-1 p-7">{children}</div>
      </div>
    </div>
  );
};

export default CourseDetailsLayout;
