import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCard = async ({ course }: { course: Course }) => {
  const instructor = await (
    await clerkClient()
  ).users.getUser(course.instructorId);

  let level;

  if (course.levelId) {
    level = await db.level.findUnique({
      where: {
        id: course.levelId,
      },
    });
  }

  return (
    <Link
      href={`/courses/${course.id}/overview`}
      className="flex flex-col gap-2 max-w-[300px] border border-gray-100 shadow-lg rounded-lg overflow-hidden"
    >
      <Image
        src={course.imageUrl ? course.imageUrl : "/image_placeholder.webp"}
        alt="image-course"
        width={200}
        height={150}
        className="w-[300px] h-[180px]"
      />
      <div className="px-4 py-2 flex flex-col gap-2">
        <p className="text-xl font-bold">{course.title}</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image
              src={
                instructor.imageUrl
                  ? instructor.imageUrl
                  : "/avatar_placeholder.jpg"
              }
              alt="avatar"
              width={30}
              height={30}
              className="rounded-full w-[30px] h-[30px]"
            />
            <p className="text-sm font-semibold">{instructor.username}</p>
          </div>
          {level && (
            <p className="font-semibold flex items-center gap-2">
              <Gem size={20} />
              {level.name}
            </p>
          )}
        </div>
        <p className="font-semibold">
          {course.price ? `$ ${course.price}` : ""}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
