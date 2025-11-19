import AlertBanner from "@/components/custom/AlertBanner";
import EditSectionForm from "@/components/sections/EditSectionForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const SectionDetailPage = async ({
  params,
}: {
  params: Promise<{ sectionId: string; courseId: string }>;
}) => {
  const { userId } = await auth();
  const { sectionId, courseId } = await params;

  if (!userId) return redirect("/sign-in");

  const course = await db.course.findUnique({
    where: {
      instructorId: userId,
      id: courseId,
    },
  });

  if (!course) return redirect("/instructor/courses");

  const section = await db.section.findUnique({
    where: {
      courseId,
      id: sectionId,
    },
    include: {
      resources: true,
      muxData: true,
    },
  });

  if (!section) return redirect(`/instructor/courses/${courseId}/sections`);

  const requiredFields = [section.title, section.description, section.videoUrl];
  const requiredFieldsCount = requiredFields.length;
  const missingFields = requiredFields.filter((field) => !Boolean(field));
  const missingFieldsCount = missingFields.length;
  // const isCompleted = requiredFields.every((field) => field !== ""); // 1 way
  const isCompleted = requiredFields.every(Boolean); // 2 way

  return (
    <div className="flex flex-col gap-4">
      <AlertBanner
        requiredFieldsCount={requiredFieldsCount}
        missingFieldsCount={missingFieldsCount}
        isCompleted={isCompleted}
      />
      <EditSectionForm
        section={section}
        courseId={courseId}
        isCompleted={isCompleted}
      />
    </div>
  );
};

export default SectionDetailPage;
