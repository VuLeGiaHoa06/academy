"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import banner from "@/public/banner.jpg";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-white py-20">
      <div className="px-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block bg-amber-50 px-4 py-2 rounded-full text-sm font-medium text-amber-700">
              ✨ Welcome to Tech Vision Academy
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance">
              Unlock Your Potential with Tech Vision
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Learn cutting-edge technologies from expert instructors. Master
              skills, earn certifications, and launch your career in tech.
            </p>
            <div className="flex gap-4 pt-4">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg rounded-full">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="px-8 py-6 text-lg rounded-full border-2 border-gray-300 hover:border-amber-500 hover:text-amber-500 bg-transparent"
              >
                View Courses <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative border border-red-500">
            <h1>Image</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
