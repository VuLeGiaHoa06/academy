"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import FileUpload from "../custom/FileUpload";
import { Resource, Section } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required and must be at least 2 characters long",
  }),
  fileUrl: z.string().min(1, {
    message: "File is required",
  }),
});

interface ResourceFormProps {
  section: Section & { resources: Resource[] };
  courseId: string;
}

const ResourceForm = ({ section, courseId }: ResourceFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fileUrl: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/sections/${section.id}/resources`,
        values
      );
      router.refresh();
      form.reset();
      toast.success("Resource is uploaded");
    } catch (error) {
      console.log("Something went wrong. Please try again!", error);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await axios.delete(
        `/api/courses/${courseId}/sections/${section.id}/resources/${id}`
      );
      toast.success("Resource is deleted");
      router.refresh();
    } catch (error) {
      console.log("resource_DELETE", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-8">
      <h1 className="text-xl font-bold flex gap-2 items-center">
        <PlusCircle />
        Add Resources (optional)
      </h1>
      <p className="text-sm font-semibold">
        Add resources to this section to help students learn better.
      </p>

      <div className="flex flex-col gap-4">
        {section.resources.map((resource: Resource) => (
          <div
            key={resource.id}
            className="flex justify-between bg-[#FFF8EB] rounded-lg text-sm p-3 items-center"
          >
            <div className="flex items-center gap-3">
              <File className="h-4 w-4" />
              <p>{resource.name}</p>
            </div>
            <button
              className="text-[#FDAB04]"
              type="button"
              disabled={isSubmitting}
              onClick={() => onDelete(resource.id)}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File name</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Textbook" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fileUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload File</FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value || ""}
                    onChange={(url) => field.onChange(url)}
                    endpoint="sectionResource"
                    page="Edit Resource"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Upload"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResourceForm;
