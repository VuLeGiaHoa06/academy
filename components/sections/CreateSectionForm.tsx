"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Link from "next/link";
import { Course, Section } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import SectionList from "./SectionList";

const formSchema = z.object({
  title: z.string().min(2, {
    error: "Title is required and must be at least 2 characters long",
  }),
});

interface CreateSectionFormProps {
  course: Course & { sections: Section[] };
}

const CreateSectionForm = ({ course }: CreateSectionFormProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  // 2. Define a submit handler.
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post(`/api/courses/${course.id}/sections`, value);
      toast.success("Section is created 😁");
      console.log(res);
      router.push(`/instructor/courses/${course.id}/sections/${res.data.id}`);
    } catch (error) {
      console.log("Something went wrong. Please try again!", error);
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      const res = await axios.put(
        `/api/courses/${course.id}/sections/reorder`,
        { list: updateData }
      );
      toast.success("Sections reordered successfully");
    } catch (error) {
      console.log("Something went wrong. Please try again!", error);
    }
  };

  const createSectionRoutes = [
    {
      path: `/instructor/courses/${course.id}/basic`,
      label: "Basic Information",
    },
    {
      path: `/instructor/courses/${course.id}/sections`,
      label: "Curriculum",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          {createSectionRoutes.map((route) => (
            <Link key={route.path} href={route.path}>
              <Button variant={route.path === pathname ? "default" : "outline"}>
                {route.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {course.sections.length === 0 ? (
        <p>Dont have any section</p>
      ) : (
        <SectionList
          items={course.sections}
          onReorder={onReorder}
          onEdit={(id: string) => {
            router.push(`/instructor/courses/${course.id}/sections/${id}`);
          }}
        />
      )}

      <h1 className="text-xl font-bold">Add New Section</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Introduction" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Link href={`/instructor/courses/${course.id}/basic`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button disabled={!isValid || isSubmitting} type="submit">
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateSectionForm;
