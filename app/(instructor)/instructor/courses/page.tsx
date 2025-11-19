import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const CoursesPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex flex-col gap-4 p-7">
      <Link href={"/instructor/create-course"}>
        <Button>Create New Course</Button>
      </Link>
      <div>data table</div>
    </div>
  );
};

export default CoursesPage;
