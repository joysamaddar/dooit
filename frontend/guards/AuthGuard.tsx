"use client";

import client from "../constants/apollo-client";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface GuardProps {
  children: JSX.Element;
  publicRoutes?: string[];
  unprotectedRoutes?: string[];
}

export const getUser = gql`
  query {
    validateUser {
      _id
      username
    }
  }
`;

const AuthGuard = ({
  children,
  publicRoutes,
  unprotectedRoutes,
}: GuardProps) => {
  const { data: user, refetch } = useQuery(getUser, { client });
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!unprotectedRoutes?.includes(path)) {
      refetch();
    }
  }, [path, refetch, publicRoutes, unprotectedRoutes]);

  return (
    <>
      {publicRoutes?.includes(path) || unprotectedRoutes?.includes(path) ? (
        publicRoutes?.includes(path) ? (
          <>{children}</>
        ) : (
          <>{!user ? children : router.push("/")}</>
        )
      ) : (
        <>{user ? children : router.push("/login")}</>
      )}
    </>
  );
};

export default AuthGuard;
