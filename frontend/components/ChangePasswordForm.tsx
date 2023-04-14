"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import client from "../constants/apollo-client";
import { useRouter } from "next/navigation";
import authenticatedVar from "@/store/authenticated";

const createProject = gql`
mutation($oldPassword: String!, $newPassword: String!){
  changePassword(changePasswordInput: {oldPassword: $oldPassword, newPassword: $newPassword}){
   _id
   username
 }
 }
`;

export default function ChangePasswordForm() {
  const [mutateFn] = useMutation(createProject, {
    client
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const submitFunction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(newPassword!=confirmNewPassword){
      console.log("Passwords do not match");
      return;
    }
    mutateFn({variables: {
      oldPassword,
      newPassword
    }, onCompleted: ()=>{
      console.log("Password is changed!")
    },
    onError: (error)=>{
      console.log(error.graphQLErrors[0].message);
      authenticatedVar(true);
      return;
    }
  })
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div>
      <div className="w-full bg-dwhite flex items-center justify-center p-4 py-16 my-8 rounded border-[0.05rem] border-dgrey">
        <form
          className="w-full flex flex-col gap-4 items-center justify-center"
          onSubmit={submitFunction}
        >
          <div className="w-full max-w-md relative">
            <input
              type="password"
              placeholder="Old password"
              className="input input-bordered w-full"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <div className="absolute top-0 right-2 flex items-center h-full">
              <p className="text-error text-2xl">*</p>
            </div>
          </div>
          <div className="w-full max-w-md relative">
            <input
              type="password"
              placeholder="New password"
              className="input input-bordered w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <div className="absolute top-0 right-2 flex items-center h-full">
              <p className="text-error text-2xl">*</p>
            </div>
          </div>
          <div className="w-full max-w-md relative">
            <input
              type="password"
              placeholder="Confirm new password"
              className="input input-bordered w-full"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            <div className="absolute top-0 right-2 flex items-center h-full">
              <p className="text-error text-2xl">*</p>
            </div>
          </div>
          <button className="btn btn-primary w-full max-w-md">UPDATE</button>
        </form>
      </div>
    </div>
  );
}
