import CourseCard from "@/components/courses/CourseCard";
import Categories from "@/components/custom/Categories";
import { db } from "@/lib/db";
import getCoursesByCategory from "@/app/actions/getCourses";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeatureSection";

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
    <div className="mb-[40px]">
      <HeroSection />
      <StatsSection />
      <Categories categories={categories} selectedCategory={null} />
      <div className="my-[60px] flex flex-wrap gap-6 max-md:justify-center px-[60px]">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <FeaturesSection />
    </div>
  );
};

export default HomePage;
