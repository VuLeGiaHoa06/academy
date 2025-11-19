"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import logo from "@/public/logo.png";
import { CircleUserRound, Search } from "lucide-react";
import Link from "next/link";
import { topRoutes } from "@/lib/constant";
import { Button } from "../ui/button";

const Topbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className=" w-full flex items-center justify-between px-8 py-4">
      <Link href={"/"}>
        <Image src={logo} alt="logo" height={100} width={200} />
      </Link>
      <div className="flex items-center w-[400px] max-md:w-[250px] rounded-full overflow-hidden">
        <input
          type="text"
          className="pl-4 outline-none bg-[#FFF8EB] flex-grow py-3"
          placeholder="Search for courses"
        />
        <button
          type="button"
          className="bg-[#FDAB04] p-3.5 hover:bg-[#FDAB04]/80"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      <div className="flex gap-4">
        {topRoutes.map((route) => (
          <Link key={route.label} href={route.path}>
            <p>{route.label}</p>
          </Link>
        ))}
      </div>
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
