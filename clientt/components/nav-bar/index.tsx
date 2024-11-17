"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { BellIcon, LogOutIcon } from "lucide-react";
import Loading from "@/components/loading";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/lib/features/userSlice";
import axios from "axios";
import { RootState } from "@/lib/store";

function NavBar() {
  // const {logout} = useAuth();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);
  console.log(userData);
  const pathname: string = usePathname();
  const sideNav = [
    {
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      label: "My Profile",
      link: "/dashboard/my-profile",
    },
    {
      label: "My Skills",
      link: "/dashboard/my-skills",
    },
    {
      label: "My Resume",
      link: "/dashboard/my-resumes",
    },
    {
      label: "Create Resume",
      link: "/dashboard/create-resume",
    },
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/user/getUserDetails",
          { withCredentials: true }
        );
        dispatch(setUser(response.data.data));
      } catch (error) {
        console.log("Failed to fetch user details:", error);
      }
    };
    fetchUserDetails();
  }, [dispatch]);

  return (
    <header className="p-6 flex justify-between items-center bg-gray-100">
      <h1 className="text-lg font-bold text-center text-blue-700 capitalize">
        {sideNav.filter((url) => url.link === pathname)[0]?.label ||
          "Dashboard"}
      </h1>

      <div className="flex items-center justify-center gap-5">
        <BellIcon className="text-slate-700" />

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={userData.avatarUrl || "https://github.com/shadcn.png"}
              className="h-10 w-10 rounded-full object-cover"
              alt="@shadcn"
            />
            <AvatarFallback>
              <Loading />
            </AvatarFallback>
          </Avatar>

          <div className="text-left">
            <div className="font-semibold text-sm text-slate-800">
              {userData.username}
            </div>
            <div className="text-xs text-slate-600">{userData.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
