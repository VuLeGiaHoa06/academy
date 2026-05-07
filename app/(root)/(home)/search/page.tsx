import CourseCard from "@/components/courses/CourseCard";
import { db } from "@/lib/db";
import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;

  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      OR: [
        {
          title: {
            contains: query,
          },
        },
        {
          category: {
            name: {
              contains: query,
            },
          },
        },
        {
          subCategory: {
            name: {
              contains: query,
            },
          },
        },
      ],
    },
    include: {
      category: true,
      subCategory: true,
      level: true,
      sections: {
        where: {
          isPublished: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-8 px-[60px] py-[40px]">
      <p className="text-xl font-bold">Recommended courses for "{query}"</p>
      <div className="flex flex-wrap">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
