"use client";

import { Users, BookOpen, Star, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    label: "Students",
    value: "10K+",
    color: "text-blue-500",
  },
  {
    icon: BookOpen,
    label: "Courses",
    value: "500+",
    color: "text-amber-500",
  },
  {
    icon: Star,
    label: "Rating",
    value: "4.8/5",
    color: "text-yellow-500",
  },
  {
    icon: Award,
    label: "Instructors",
    value: "500+",
    color: "text-green-500",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-gray-50 py-12 border-y border-gray-200 mb-[40px]">
      <div className="px-[60px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <Icon className={`${stat.color} mx-auto mb-3`} size={32} />
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
