"use client";

import { sidebarRoutes } from "@/lib/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="shadow-lg h-screen p-6 group">
      {sidebarRoutes.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className={`flex w-64 max-md:w-16 gap-2 text-[18px] items-center max-md:justify-center rounded-lg p-4 hover:bg-[#FFF8EB] mb-[10px] ${
            pathname.includes(route.path)
              ? "bg-[#FDAB04] group-hover:bg-[#FDAB04]/80"
              : ""
          }`}
        >
          <span>{route.icon}</span>
          <p className="max-md:hidden">{route.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
