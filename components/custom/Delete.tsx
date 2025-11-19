"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DeleteProps {
  item: string;
  courseId: string;
  sectionId?: string;
}

const Delete = ({ item, courseId, sectionId }: DeleteProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const onDelete = async () => {
    try {
      setIsLoading(true);
      const url =
        item === "course"
          ? `/api/courses/${courseId}`
          : `/api/courses/${courseId}/sections/${sectionId}`;
      await axios.delete(url);
      setIsLoading(false);

      const pushedUrl =
        item === "course"
          ? "/instructor/courses"
          : `/instructor/courses/${courseId}/sections`;

      toast.success(`${item} is Deleted`);
      router.push(pushedUrl);
      router.refresh();
    } catch (error) {
      console.log(`${item}_DELETE`, error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="default" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash size={18} />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {item}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
