import getPerformance from "@/app/actions/getPerformance";
import Chart from "@/components/performance/Chart";
import DataCard from "@/components/performance/DataCard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const PerformancePage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const { data, totalRevenue, totalSales } = await getPerformance(userId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DataCard value={totalRevenue} label="Total Revenue" shouldFormat />

      <DataCard value={totalSales} label="Total Revenue" />

      <div className="col-span-2">
        <Chart data={data} />
      </div>
    </div>
  );
};

export default PerformancePage;

// default shouldFormat = true - if you dont pass anything value
