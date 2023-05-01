"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children } : { children: React.ReactNode}) {
  const path = usePathname();
  
  return (
      <div className="drawer drawer-mobile h-full min-h-[84vh]">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-center">
          <div className="w-[10vw] flex flex-1 items-start justify-center lg:hidden">
            <label
              htmlFor="my-drawer-2"
              className="drawer-button lg:hidden p-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#101010"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6 h16 M4 12 h16 M4 18 h16"
                />
              </svg>
            </label>
          </div>
          <div className="w-[90vw] bg-dlightblue rounded-tl-3xl p-4">
            {children}
          </div>
        </div>
        <div className="drawer-side !max-h-full !min-w-full">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content bg-dwhite">
            <li className="hover-bordered">
              <Link href="/dashboard" className={path=="/dashboard"?"active":""}>Dashboard</Link>
            </li>
            <li className={`hover-bordered`}>
              <Link href="/project/create-project" className={path=="/project/create-project"?"active":""}>Create Project</Link>
            </li>
            <li className={`hover-bordered`}>
              <Link href="/change-password" className={path=="/change-password"?"active":""}>Change Password</Link>
            </li>
          </ul>
        </div>
      </div>
  );
}
