"use client";

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ComboBox } from "../custom";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, {
    error: "Title is required and minimum 2 characters",
  }),
  categoryId: z.string().min(1, {
    error: "Category is required",
  }),
  subCategoryId: z.string().min(1, {
    error: "Subcategory is required",
  }),
});

interface CreateCourseFormProps {
  categories: {
    label: string;
    value: string;
    subCategories: {
      label: string;
      value: string;
    }[];
  }[];
}

const CreateCourseForm = ({ categories }: CreateCourseFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      subCategoryId: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("/api/courses", values);

      router.push(`/instructor/courses/${res.data.id}/basic`);
      toast.success("Create a course successful 😁");
    } catch (error) {
      console.log("course_POST", error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold">
        Let give some basics for your course
      </h1>
      <p className="text-sm mt-2 mb-6">
        It is ok if you cannot think of a good title or correct category now.
        You can change them later.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="e.g. Web Developer for Beginners"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => {
              // console.log(field);
              return (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>
                    Catergory <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <ComboBox options={categories} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="subCategoryId"
            render={({ field }) => {
              // console.log(form.watch("title"));
              return (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>
                    Subcatergory <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <ComboBox
                      options={
                        categories.find(
                          (category) =>
                            category.value === form.watch("categoryId")
                        )?.subCategories || []
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex gap-4">
            <Link href="/instructor/courses">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <p>Create</p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourseForm;
