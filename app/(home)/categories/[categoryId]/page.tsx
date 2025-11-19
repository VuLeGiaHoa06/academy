import getCoursesByCategory from "@/app/actions/getCourses";
import CourseCard from "@/components/courses/CourseCard";
import Categories from "@/components/custom/Categories";
import { db } from "@/lib/db";
import React from "react";

const CategoryDetails = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  const courses = await getCoursesByCategory(categoryId);

  return (
    <div className="px-[60px] py-[40px]">
      <Categories categories={categories} selectedCategory={categoryId} />
      <div className="mt-[40px] flex flex-wrap gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;
