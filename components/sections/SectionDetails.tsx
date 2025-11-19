"use client";

import {
  Course,
  MuxData,
  Progress,
  Purchase,
  Resource,
  Section,
} from "@prisma/client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { File, Loader2, Lock } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import ReadText from "../custom/ReadText";
import MuxPlayer from "@mux/mux-player-react";
import Link from "next/link";
import ProgressButton from "../custom/ProgressButton";
import SectionMenu from "./SectionMenu";

interface SectionDetailsProps {
  course: Course & { sections: Section[] };
  section: Section;
  muxData: MuxData | null;
  resources: Resource[];
  purchase: Purchase | null;
  progress: Progress | null;
}

const SectionDetails = ({
  course,
  section,
  muxData,
  resources,
  purchase,
  progress,
}: SectionDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isLocked = !purchase && !section.isFree;
  // locked = true, when user dont buy course and it not free

  const buyCourse = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/api/courses/${course.id}/checkout`);

      window.location.assign(res.data.url);

      toast.success("Buy this course successfully 😁");
    } catch (error) {
      console.log("Something went wrong. Please try again!", error);
      toast.error("Failed to buy this course 😭");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <h1>{section.title}</h1>
        <div className="flex gap-4">
          <SectionMenu course={course} />
          {!purchase ? (
            <Button onClick={buyCourse}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <p>Buy this course</p>
              )}
            </Button>
          ) : (
            <ProgressButton
              courseId={course.id}
              sectionId={section.id}
              isCompleted={!!progress?.isCompleted}
            />
          )}
        </div>
      </div>

      <ReadText value={section.description || ""} />

      {isLocked ? (
        <div className="w-full bg-[#FFF8EB] flex items-center flex-col gap-4 p-10 rounded-lg">
          <Lock className="h-10 w-10" />
          <p className="text-sm font-bold">
            Video for this section is locked !. Please buy the course to access
          </p>
        </div>
      ) : (
        <MuxPlayer
          playbackId={muxData?.playbackId || ""}
          className="md:max-w-[600px]"
        />
      )}

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Resources</h1>
        <div className="flex flex-col gap-2">
          {resources.map((resource) => (
            <Link
              href={resource.fileUrl}
              key={resource.id}
              target="_blank"
              className="flex gap-2 bg-[#FFF8EB] rounded-lg text-sm p-3 items-center hover:text-[#FDAB04]/90"
            >
              <File className="h-4 w-4" />
              <p>{resource.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionDetails;
