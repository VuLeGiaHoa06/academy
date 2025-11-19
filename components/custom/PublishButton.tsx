"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PublishButtonProps {
  disable: boolean;
  courseId: string;
  sectionId?: string;
  isPublished: boolean;
  page: string;
}

const PublishButton = ({
  disable,
  courseId,
  sectionId,
  isPublished,
  page,
}: PublishButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    // 1 way

    //   const url =
    //     page === "Course"
    //       ? `/api/courses/${courseId}`
    //       : `/api/courses/${courseId}/sections/${sectionId}`;
    let url = `/api/courses/${courseId}`;

    if (page === "Section") {
      url += `/sections/${sectionId}`;
    }

    const urlIsPublish = isPublished ? `${url}/unpublish` : `${url}/publish`;

    try {
      setIsLoading(true);
      await axios.post(urlIsPublish);
      setIsLoading(false);

      toast.success(
        `${page === "Course" ? "Course" : "Section"} is ${
          isPublished ? "Unpublished" : "Published"
        }`
      );

      router.refresh();
    } catch (error) {
      console.log("Something went wrong. Please try again!", error);
    }
  };
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={disable || isLoading}
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : isPublished ? (
        "Unpublish"
      ) : (
        "Publish"
      )}
    </Button>
  );
};

export default PublishButton;
