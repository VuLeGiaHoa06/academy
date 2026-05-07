import DataTable from "@/components/custom/DataTable";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { columns } from "@/components/courses/CourseColumn";

const CoursesPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const courses = await db.course.findMany({
    where: {
      instructorId: userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  console.log(courses);

  return (
    <>
      <Link href={"/instructor/create-course"}>
        <Button>Create New Course</Button>
      </Link>

      {/* <div className="flex gap-6">
        {courses.map((course) => (
          <Link
            className="p-6 border border-red-500"
            key={course.id}
            href={`/instructor/courses/${course.id}/basic`}
          >
            {course.title}
          </Link>
        ))}
      </div> */}
      <DataTable columns={columns} data={courses} />
    </>
  );
};

export default CoursesPage;
