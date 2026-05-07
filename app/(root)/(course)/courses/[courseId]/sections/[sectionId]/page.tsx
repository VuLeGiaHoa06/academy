import SectionDetails from "@/components/sections/SectionDetails";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Resource } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const SectionDetailsPage = async ({
  params,
}: {
  params: Promise<{ courseId: string; sectionId: string }>;
}) => {
  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const { courseId, sectionId } = await params;

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      // instructorId: userId, // student get course, cannot use instructor to check
      isPublished: true,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
      },
    },
  });

  if (!course) return redirect("/");

  const section = await db.section.findUnique({
    where: {
      id: sectionId,
      courseId,
      isPublished: true,
    },
  });

  if (!section) return redirect(`/courses${courseId}/overview`);

  const purchase = await db.purchase.findUnique({
    where: {
      customerId_courseId: {
        customerId: userId,
        courseId,
      },
    },
  });

  let muxData = null;
  let resources: Resource[] = [];

  if (section.isFree || purchase) {
    muxData = await db.muxData.findUnique({
      where: {
        sectionId,
      },
    });
  }

  if (purchase) {
    resources = await db.resource.findMany({
      where: {
        sectionId,
      },
    });
  }

  const progress = await db.progress.findUnique({
    where: {
      studentId_sectionId: {
        studentId: userId,
        sectionId,
      },
    },
  });

  return (
    <SectionDetails
      course={course}
      purchase={purchase}
      section={section}
      muxData={muxData}
      resources={resources}
      progress={progress}
    />
  );
};

export default SectionDetailsPage;
