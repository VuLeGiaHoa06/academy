import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

interface ProgressButtonProps {
  courseId: string;
  sectionId: string;
  isCompleted: boolean;
}

const ProgressButton = ({
  courseId,
  sectionId,
  isCompleted,
}: ProgressButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        `/api/courses/${courseId}/sections/${sectionId}/progress`,
        { isCompleted: !isCompleted }
        // iscompleted is true => when you click it will false
      );

      router.refresh();
      toast.success("Progress updated!");
    } catch (error) {
      console.log("progress-button_POST", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant={isCompleted ? "complete" : "default"} onClick={onClick}>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isCompleted ? (
        <div className="flex items-center gap-2">
          <CheckCircle />
          <p>Completed</p>
        </div>
      ) : (
        <p>Mark as Completed</p>
      )}
    </Button>
  );
};

export default ProgressButton;
