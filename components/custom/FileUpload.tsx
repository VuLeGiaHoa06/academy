"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface FileUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove?: (value: string) => void;
  endpoint: keyof typeof ourFileRouter;
  page: string;
}

export default function FileUpload({
  value,
  onChange,
  onRemove,
  endpoint,
  page,
}: FileUploadProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <div
      className={`flex h-[200px] ${
        page === "Edit Course" ? "gap-8" : "flex-col gap-4"
      }`}
    >
      {page === "Edit Course" && value !== "" ? (
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src={value}
            alt="image"
            height={500}
            width={500}
            className="w-[280px] h-[200px] object-cover "
          />
          <button
            onClick={() => onRemove && onRemove(value)}
            type="button"
            className="absolute top-0 right-0 bg-red-500 p-2 text-white"
          >
            <Trash />
          </button>
        </div>
      ) : (
        <p>{value}</p>
      )}

      {isLoading && (
        <UploadDropzone
          className="w-[280px] h-[200px] px-4 py-2"
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            onChange(res[0].ufsUrl);
            toast.success("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            toast.error(error.message);
          }}
        />
      )}
    </div>
  );
}
