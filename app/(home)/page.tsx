import CourseCard from "@/components/courses/CourseCard";
import Categories from "@/components/custom/Categories";
import { db } from "@/lib/db";
import getCoursesByCategory from "@/app/actions/getCourses";

const HomePage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  const courses = await getCoursesByCategory(null);

  return (
    <div className="px-[60px] py-[40px]">
      <Categories categories={categories} selectedCategory={null} />
      <div className="mt-[40px] flex flex-wrap gap-6 max-md:justify-center">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
