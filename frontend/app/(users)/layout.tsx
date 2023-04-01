"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children } : { children: React.ReactNode}) {
  const path = usePathname();
  
  return (
      <div className="drawer drawer-mobile h-full min-h-[90vh]">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-center">
          <div className="w-12 flex items-start justify-center lg:hidden">
            <label
              htmlFor="my-drawer-2"
              className=" drawer-button lg:hidden p-4"
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
          <div className="flex-1 bg-dlightblue rounded-tl-3xl p-4">
            {children}
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li className="hover-bordered">
              <Link href="/dashboard" className={path=="/dashboard"?"active":""}>Projects</Link>
            </li>
            <li className={`hover-bordered`}>
              <Link href="/project/create-project" className={path=="/project/create-project"?"active":""}>Create Project</Link>
            </li>
          </ul>
        </div>
      </div>
  );
}
