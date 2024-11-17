/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuItems = [
    // { path: "/", label: "Home", show: true },
    {
      path: "/signin",
      label: "Login",
      show: pathname !== "/signin",
    },
    {
      path: "/signup",
      label: "Register",
      show: pathname !== "/signup",
    },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  return (
    <header className="h-16 shrink-0  w-full flex items-center  rounded-lg px-6 shadow-slate-200 shadow-sm">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="lg:hidden" onClick={() => setIsOpen(true)}>
            <AlignJustify className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-white lg:hidden" side={"left"}>
          <SheetTitle>
            <div
              onClick={handleLinkClick}
              className="flex flex-col gap-3 lg:hidden"
            >
              <Link href={"/"}>Creation.Dev</Link>
            </div>
          </SheetTitle>

          <div className="grid gap-2 py-6">
            <div className="grid gap-2 py-6">
              {menuItems.map((menu) =>
                menu.show ? (
                  <Link
                    key={menu.path}
                    className="w-full  flex text-lg py-2"
                    href={menu.path}
                    onClick={handleLinkClick}
                  >
                    {menu.label}
                  </Link>
                ) : null
              )}
            </div>

            {/* {isAuthenticated && (
              <Button
                onClick={() => {
                  handleLinkClick();
                  logout();
                }}
                className="w-[60px] flex text-lg py-2 rounded-full bg-gray-200  text-slate-950 hover:text-white lg:hidden"
              >
                <LogOutIcon className="h-4 w-4" />
              </Button>
            )} */}
          </div>
        </SheetContent>
      </Sheet>
      <Link className="hidden lg:flex mr-6 text-2xl font-bold" href={"#"}>
        Creation.Dev
      </Link>
      <nav className="ml-auto lg:flex items-center gap-5">
        {menuItems.map((menu) =>
          menu.show ? (
            <Link
              key={menu.path}
              className="transition-colors w-full flex text-md px-4 py-2 rounded-full border text-slate-700 font-semibold hover:bg-blue-700 hover:text-white"
              href={menu.path}
              onClick={handleLinkClick}
            >
              {menu.label}
            </Link>
          ) : null
        )}
        {/* {isAuthenticated && (
          <div className="flex items-center justify-center gap-5">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="h-8 w-8 rounded-full"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button
              onClick={logout}
              className="hidden lg:flex rounded-full bg-gray-200  text-slate-950 hover:text-white"
            >
              <LogOutIcon className="h-4 w-4" />
            </Button>
          </div>
        )} */}
      </nav>
    </header>
  );
}

export default Header;
