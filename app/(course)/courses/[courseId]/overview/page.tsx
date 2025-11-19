import ReadText from "@/components/custom/ReadText";
import SectionMenu from "@/components/sections/SectionMenu";
import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const OverviewPage = async ({
  params,
}: {
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
      },
    },
  });

  if (!course) return redirect("/");

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
    <div className="px-6 py-4 flex flex-col gap-5 text-sm">
      <div className="flex justify-between items-center">
        <h1>{course.title}</h1>
        <SectionMenu course={course} />
      </div>
      <p>{course.subtitle}</p>
      <div className="flex items-center gap-2">
        <Image
          src={
            instructor.imageUrl
              ? instructor.imageUrl
              : "/avatar_placeholder.jpg"
          }
          alt="avatar"
          width={50}
          height={50}
          className="w-[35px] h-[35px] rounded-full"
        />
        <p className="flex gap-2">
          <span className="font-bold">Instructor:</span>
          {instructor.username}
        </p>
      </div>
      <p>
        <span className="font-bold">Price: </span>${course.price}
      </p>

      <p>
        <span className="font-bold">Level: </span>
        {level && level.name}
      </p>
      <div className="flex flex-col">
        <span className="font-bold">Description: </span>
        <p className="px-4">
          <ReadText value={course.description || ""} />
        </p>
      </div>
    </div>
  );
};

export default OverviewPage;
