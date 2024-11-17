"use client";
import { logoutUser } from "@/lib/features/userSlice";
import {
  FilePlus2Icon,
  FileUserIcon,
  UserRoundIcon,
  BedDouble,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

function SideNav() {
  const pathname = usePathname();
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.push("/signin?loggingOut=true");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const sideNav = [
    {
      icon: <LayoutDashboardIcon />,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <UserRoundIcon />,
      label: "My Profile",
      link: "/dashboard/my-profile",
    },
    {
      icon: <BedDouble />,
      label: "My Skills",
      link: "/dashboard/my-skills",
    },
    {
      icon: <FileUserIcon />,
      label: "My Resume",
      link: "/dashboard/my-resumes",
    },
    {
      icon: <FilePlus2Icon />,
      label: "Create Resume",
      link: "/dashboard/create-resume",
    },
  ];

  return (
    <aside className="w-64 bg-slate-100 text-black flex flex-col gap-5">
      <h2 className="text-xl text-center font-bold p-7">CreationDev</h2>
      <nav className="flex justify-center">
        <ul className="space-y-5">
          {sideNav?.map((item, index) => (
            <li
              key={index}
              className={`transition-colors duration-300 px-8 py-2 flex items-center space-x-5 rounded-[10px] cursor-pointer shadow-sm
              ${
                pathname === item.link
                  ? "bg-blue-600 text-slate-50"
                  : "bg-slate-50 text-gray-500 hover:bg-blue-100 hover:text-gray-800"
              }`}
            >
              <Link
                href={item.link}
                className="flex items-center space-x-5 w-full"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className="cursor-pointer mt-auto ml-auto mr-auto"
        onClick={() => handleLogout()}
      >
        <LogOutIcon className="text-slate-700 hover:text-red-500 transition duration-300" />
      </div>
    </aside>
  );
}

export default SideNav;
