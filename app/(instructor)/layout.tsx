import { Sidebar, Topbar } from "@/components/layout";
import React from "react";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <Topbar />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1 p-7 flex flex-col gap-8">{children}</div>
      </div>
    </div>
  );
};

export default InstructorLayout;
