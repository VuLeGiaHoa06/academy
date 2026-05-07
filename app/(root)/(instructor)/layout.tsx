import { Sidebar, Topbar } from "@/components/layout";
import React from "react";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-7 flex flex-col gap-8 min-h-96">{children}</div>
    </div>
  );
};

export default InstructorLayout;
