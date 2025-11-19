import { EditCourseForm } from "@/components/courses";
import AlertBanner from "@/components/custom/AlertBanner";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { ca } from "zod/v4/locales";

const CourseBasics = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;

  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      instructorId: userId,
    },
    include: {
      sections: true,
    },
  });

  if (!course) return redirect("/instructor/courses");

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: true,
    },
  });

  const updateCategories = categories.map((category) => ({
    label: category.name,
    value: category.id,
    subCategories: category.subCategories.map((subcategory) => ({
      label: subcategory.name,
      value: subcategory.id,
    })),
  }));

  const levels = await db.level.findMany();

  const requiredFields = [
    course.title,
    course.description,
    course.categoryId,
    course.subCategoryId,
    course.levelId,
    course.imageUrl,
    course.price,
    course.sections.some((section) => section.isPublished),
  ];

  const requiredFieldsCount = requiredFields.length;
  const missingFields = requiredFields.filter((field) => !Boolean(field));
  const missingFiledsCount = missingFields.length;
  const isCompleted = requiredFields.every(Boolean); // all element must be true

  return (
    <div className="flex flex-col gap-4">
      <AlertBanner
        requiredFieldsCount={requiredFieldsCount}
        missingFieldsCount={missingFiledsCount}
        isCompleted={isCompleted}
      />
      <EditCourseForm
        course={course}
        categories={updateCategories}
        levels={levels.map((level) => ({
          label: level.name,
          value: level.id,
        }))}
        isCompleted={isCompleted}
      />
    </div>
  );
};

export default CourseBasics;
