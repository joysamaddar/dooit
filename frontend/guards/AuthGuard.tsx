"use client";

import client from "../constants/apollo-client";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import authenticatedVar from "@/store/authenticated";
import userVar from "@/store/user";

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
  const authenticated = useReactiveVar(authenticatedVar);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      userVar({
        _id: user.validateUser._id,
        username: user.validateUser.username,
      });
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    // If path is a protected route.
    if (!unprotectedRoutes?.includes(path)) {
      refetch();
    }
  }, [path, refetch, publicRoutes, unprotectedRoutes]);

  useEffect(() => {
    // If not authenticated and path is a protected route
    if (
      !authenticated &&
      !publicRoutes?.includes(path) &&
      !unprotectedRoutes?.includes(path)
    ) {
      router.push("/login");
      client.resetStore();
    }

    // If authenticated and accessing login or signup route
    if (authenticated && unprotectedRoutes?.includes(path)) {
      router.push("/dashboard");
    }
  }, [authenticated, path, publicRoutes, unprotectedRoutes]);

  return (
    <>
      {publicRoutes?.includes(path) || unprotectedRoutes?.includes(path) ? (
        <>{children}</>
      ) : (
        <>
          {!user ? (
            <div className="relative h-full flex-1 w-full flex items-center justify-center">
              <div className="btn btn-ghost loading text-dblack"></div>
            </div>
          ) : (
            children
          )}
        </>
      )}
    </>
  );
};

export default AuthGuard;
