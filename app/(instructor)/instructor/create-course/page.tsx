import { CreateCourseForm } from "@/components/courses";
import { db } from "@/lib/db";
import { Label } from "@radix-ui/react-label";

const CreateCoursePage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: true,
    },
  });

  const updateCategories = categories.map((category) => ({
    label: category.name,
    value: category.id,
    subCategories: category.subCategories.map((subCategory) => ({
      label: subCategory.name,
      value: subCategory.id,
    })),
  }));

  return (
    <div className="flex flex-col gap-4 p-7 w-full">
      <CreateCourseForm categories={updateCategories} />
    </div>
  );
};

export default CreateCoursePage;
