"use client";

import { FormEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import client from "../constants/apollo-client";
import { motion } from "framer-motion";
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
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const submitFunction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(newPassword!=confirmNewPassword){
      setAlert({
        type: "error",
        message: "Passwords do not match."
      });
      return;
    }
    mutateFn({variables: {
      oldPassword,
      newPassword
    }, onCompleted: ()=>{
      setAlert({
        type: "success",
        message: "Password is changed!"
      });
    },
    onError: (error)=>{
      setAlert({
        type: "error",
        message: error.graphQLErrors[0].message
      });
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
      <div className="w-full bg-dwhite flex items-center justify-center p-4 py-16 my-8 rounded border-[0.05rem] border-dgrey flex-col gap-8">
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
        {alert.type && (
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className={`alert ${alert.type=='success'?'alert-success':'alert-error'} flex justify-center w-full max-w-md`}
        >
          <div>
            {alert.type=="success"? <svg
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
            </svg>:<svg
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
            </svg>}
            <span>{alert.message}</span>
          </div>
        </motion.div>
      )}
      </div>
    </div>
  );
}
