import NavBar from "@/components/nav-bar";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "../loading";
import SideNav from "@/components/side-nav";
import StoreProvider from "../storeProvider";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Student.dev",
};

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <div className="flex h-screen bg-gray-100">
        <SideNav />
        <div className="flex-1 flex flex-col">
          <NavBar />
          <Suspense fallback={<Loading />}>
            <main className="flex-1 overflow-auto p-6 rounded-tl-2xl bg-slate-50">
              {children}
            </main>
          </Suspense>
        </div>
      </div>
    </StoreProvider>
  );
}

export default DashboardLayout;
