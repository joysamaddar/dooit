"use client"

import Link from "next/link";

export default function AuthForm({title, cta}: {title: string, cta: string}) {
  return (
    <form className="w-full lg:w-3/5 flex flex-col justify-center items-center gap-6 mt-[-5vh]">
    <p className="lg:hidden w-full max-w-sm uppercase font-bold text-2xl text-dprimary">
      {title}
    </p>
    <input
      type="text"
      placeholder="Username"
      className="input input-bordered w-full max-w-sm"
      required
    />
    <input
      type="password"
      placeholder="Password"
      className="input input-bordered w-full max-w-sm"
      required
    />
    <button
      type="submit"
      className="btn btn-primary w-full max-w-sm uppercase"
    >
      {title}
    </button>
    <p className="lg:hidden w-full max-w-sm text-dblack">
      {cta}
      <Link
        className="ml-2 font-bold"
        href={title.toLowerCase() == "login" ? "/signup" : "/login"}
      >
        {title.toLowerCase() == "login" ? "Signup" : "Login"}
      </Link>
    </p>
  </form>
  )
}
