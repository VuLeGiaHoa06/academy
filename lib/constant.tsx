import { ChartBarBig, MonitorPlay } from "lucide-react";

export const topRoutes = [
  {
    path: "/instructor/courses",
    label: "Instructor",
  },
  {
    path: "/instructor/learning",
    label: "Learning",
  },
];

export const sidebarRoutes = [
  {
    path: "/instructor/courses",
    label: "Courses",
    icon: <MonitorPlay />,
  },
  {
    path: "/instructor/performance",
    label: "Performance",
    icon: <ChartBarBig />,
  },
];
