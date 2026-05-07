import { CreateSectionForm } from "@/components/sections";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const SectionPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { userId } = await auth();

  const { courseId } = await params;

  if (!userId) return redirect("/sign-in");

  const course = await db.course.findUnique({
    where: {
      instructorId: userId,
      id: courseId,
    },
    include: {
      sections: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) return redirect("/instructor/courses");

  return <CreateSectionForm course={course} />;
};

export default SectionPage;
