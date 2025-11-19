import { Sidebar, Topbar } from "@/components/layout";
import React from "react";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Topbar />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default InstructorLayout;
