"use client";

import { Category } from "@prisma/client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
}

const Categories = ({ categories, selectedCategory }: CategoriesProps) => {
  const router = useRouter();

  const onClick = (categoryId: string | null) => {
    // null for homepage
    // id for categoryId
    router.push(categoryId ? `/categories/${categoryId}` : "/");
  };

  return (
    <div className="flex gap-4 justify-center">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onClick(null)}
      >
        All Categories
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onClick(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
