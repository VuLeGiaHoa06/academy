import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";

// catergoryId === null => '/' - homepage
// catergoryId === id => '/:id' - subcaterogy
const getCoursesByCategory = async (
  categoryId: string | null
): Promise<Course[]> => {
  const whereClause = {
    ...(categoryId ? { categoryId, isPublished: true } : { isPublished: true }),
  };

  const courses = db.course.findMany({
    where: whereClause,
    include: {
      category: true,
      subCategory: true,
      level: true,
      sections: {
        where: {
          isPublished: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return courses;
};

export default getCoursesByCategory;
