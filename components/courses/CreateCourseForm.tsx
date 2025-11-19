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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required and minimum 2 characters",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
  subCategoryId: z.string().min(1, {
    message: "Subcategory is required",
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

  // console.log(form);

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
    <div className="w-full">
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
                <FormLabel>Title</FormLabel>
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
                  <FormLabel>Catergory</FormLabel>
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
                  <FormLabel>Subcatergory</FormLabel>
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
            <Button
              type="button"
              onClick={() => router.push("/instructor/courses")}
              className="bg-white border-2 border-[#FDAB04]"
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourseForm;
