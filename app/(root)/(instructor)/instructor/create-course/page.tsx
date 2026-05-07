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

  return <CreateCourseForm categories={updateCategories} />;
};

export default CreateCoursePage;
