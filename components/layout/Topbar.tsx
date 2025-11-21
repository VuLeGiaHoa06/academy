"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import logo from "@/public/logo.png";
import { CircleUserRound, Menu, Search } from "lucide-react";
import Link from "next/link";
import { topRoutes } from "@/lib/constant";
import { Button } from "../ui/button";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Topbar = () => {
  const router = useRouter();
  const pathName = usePathname();

  const { isSignedIn } = useAuth();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      router.push(`/search?query=${searchInput}`);
    }

    setSearchInput("");
  };

  return (
    <div className=" w-full flex items-center justify-between px-[60px] py-4 shadow-sm">
      <Link href={"/"}>
        <p className="text-[28px] font-bold">BinVu's Academy</p>
      </Link>
      <div className="flex items-center w-[400px] max-md:w-[250px] rounded-full overflow-hidden">
        <input
          type="text"
          className="pl-4 outline-none bg-[#FFF8EB] flex-grow py-3"
          placeholder="Search for courses"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          type="button"
          className="bg-[#FDAB04] p-3.5 hover:bg-[#FDAB04]/80"
          onClick={handleSearch}
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      <div className="flex gap-4 max-sm:hidden">
        {topRoutes.map((route) => (
          <Link key={route.label} href={route.path}>
            <p>{route.label}</p>
          </Link>
        ))}
      </div>

      {pathName.startsWith("/instructor") && (
        <div className="z-20 sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              {topRoutes.map((route) => (
                <Link key={route.label} href={route.path}>
                  <p>{route.label}</p>
                </Link>
              ))}
            </SheetContent>
          </Sheet>
        </div>
      )}

      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={"/sign-in"}>
          <Button>
            <CircleUserRound size={24} />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Topbar;
