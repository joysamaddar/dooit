"use client";

import Link from "next/link";
import { useReactiveVar } from "@apollo/client";
import userVar from "@/store/user";
import client from "@/constants/apollo-client";
import authenticatedVar from "@/store/authenticated";
import { useRouter } from "next/navigation";

export default function Nav() {
  const user = useReactiveVar(userVar);
  const router = useRouter();

  const logoutHandler = () => {
    client.clearStore();
    localStorage.removeItem("token");
    authenticatedVar(false);
    userVar({
      _id: null,
      username: null,
    });
  };

  return (
    <div className="navbar  p-0 h-[10vh] px-8 lg:px-28 z-[999]">
      <div className="navbar-start">
        <div className="flex-1 font-bold text-dprimary">
          <Link href="/">DOOIT.</Link>
        </div>
      </div>
      <div className="navbar-end">
        {user.username == null ? (
          <>
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#101010"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact absolute right-0 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/signup">Signup</Link>
                </li>
              </ul>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="login"
                className="hover:bg-transparent focus:bg-transparent text-dlightblack"
              >
                Login
              </Link>
              <Link href="/signup">
                <button className="btn">Signup</button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#101010"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact absolute right-0 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li onClick={logoutHandler}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
            <ul className="hidden lg:inline-flex menu menu-horizontal">
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li tabIndex={0}>
                <a>
                  Welcome {user.username}
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="w-full z-[999]  dropdown-content shadow bg-base-100 rounded-box">
                  <li onClick={logoutHandler}>
                    <a>Logout</a>
                  </li>
                </ul>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
