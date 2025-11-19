import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & { course: Course };

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: { total: number; count: number } } =
    {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title; // get title
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = { total: 0, count: 0 }; // create new
    }

    grouped[courseTitle].total += purchase.course.price!; // update
    grouped[courseTitle].count += 1; // update
  });

  return grouped;
};

const getPerformance = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: { course: { instructorId: userId } }, // id of instructor
      include: { course: true }, // select record course
    });

    const groupedEarnings = groupByCourse(purchases); // arg is an array, return a object

    const data = Object.entries(groupedEarnings).map( // covert object into array to map
      ([courseTitle, { total, count }]) => ({
        name: courseTitle,
        total,
        count,
      })
    );

    const totalRevenue = data.reduce((acc, current) => acc + current.total, 0); // use reduce to calculate
    const totalSales = purchases.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log("[getperformance]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};

export default getPerformance;
