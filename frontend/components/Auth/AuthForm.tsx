"use client";

import Link from "next/link";
import { useMutation } from "@apollo/client";
import client from "../../constants/apollo-client";
import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import authenticatedVar from "@/store/authenticated";
import userVar from "@/store/user";
import { motion } from "framer-motion";

export default function AuthForm({
  title,
  cta,
  mutation,
}: {
  title: string;
  cta: string;
  mutation: any;
}) {
  const [mutateFn, { data, loading, error }] = useMutation(mutation, {
    client,
  });
  const [genError, setGenError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (error) {
      setGenError(
        (error.graphQLErrors[0].extensions.originalError as any).message
      );
    }
  }, [error]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (path == "/signup" && password != rePassword) {
      setGenError("Passwords do not match. Please try again.");
      return;
    }
    setGenError("");
    mutateFn({
      variables: {
        username,
        password,
      },
      onCompleted: (data) => {
        if (data.login) {
          localStorage.setItem("token", data.login.access_token);
          const { _id, username } = data.login.user;
          authenticatedVar(true);
          userVar({
            _id,
            username,
          });
          router.push("/dashboard");
        }
      },
    });
    setUsername("");
    setPassword("");
    setRePassword("");
  };

  return (
    <form
      onSubmit={(e) => submitHandler(e)}
      className="relative w-full lg:w-3/5 flex flex-col justify-center items-center gap-6 mt-[-5vh]"
    >
      {path == "/signup" && data && (
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="absolute top-[15%] alert alert-success flex justify-center w-full max-w-sm"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Account created. Please login to continue!</span>
          </div>
        </motion.div>
      )}
      {genError ? (
        <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }} className="absolute top-[15%] alert alert-error flex justify-center w-full max-w-sm">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{genError}</span>
          </div>
        </motion.div>
      ) : (
        ""
      )}
      <p className="lg:hidden w-full max-w-sm uppercase font-bold text-2xl text-dprimary">
        {title}
      </p>
      <input
        type="text"
        placeholder="Username"
        className="input input-bordered w-full max-w-sm"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full max-w-sm"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {path == "/signup" && (
        <input
          type="password"
          placeholder="Re-enter password"
          className="input input-bordered w-full max-w-sm"
          required
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
      )}
      <button
        type="submit"
        className={`btn btn-primary w-full max-w-sm uppercase ${
          loading ? "loading" : ""
        }`}
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
  );
}
