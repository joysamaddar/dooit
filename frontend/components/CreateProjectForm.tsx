"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import client from "../constants/apollo-client";
import { useRouter } from "next/navigation";
import { getProjectsByUser } from "./DashboardProjects";

const createProject = gql`
  mutation ($name: String!, $description: String!, $tags: [String!]) {
    createProject(
      CreateProjectInput: {
        name: $name
        description: $description
        tags: $tags
      }
    ) {
      _id
      name
      description
      manager
      users
    }
  }
`;

export default function CreateProject() {
  const [mutateFn] = useMutation(createProject, {
    client,
    refetchQueries: [
      {query: getProjectsByUser},
      'getProjects'
    ]
  });
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [tags, setTags] = useState("");

  const submitFunction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let projectTags: string[] = [];
    if(tags!=""){
      projectTags = (tags as string).split(",");
    }
    mutateFn({
      variables: {
        name: projectName,
        description: projectDescription,
        tags: projectTags
      },
      onCompleted: (data) => {
        if (data.createProject) {
          router.push("/dashboard");
        }
      },
    });
    setProjectName("");
    setProjectDescription("");
    setTags("");
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
              type="text"
              placeholder="Project name"
              className="input input-bordered w-full"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
            <div className="absolute top-0 right-2 flex items-center h-full">
              <p className="text-error text-2xl">*</p>
            </div>
          </div>
          <div className="w-full max-w-md relative">
            <input
              type="text"
              placeholder="Project description"
              className="input input-bordered w-full"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
            />
            <div className="absolute top-0 right-2 flex items-center h-full">
              <p className="text-error text-2xl">*</p>
            </div>
          </div>
          <div className="form-control w-full max-w-md">
            <input
              type="text"
              placeholder="Tags"
              className="input input-bordered w-full max-w-md"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <label className="label">
              <span className="label-text-alt">
                (Separate multiple tags by comma)
              </span>
            </label>
          </div>
          <button className="btn btn-primary w-full max-w-md">CREATE</button>
        </form>
      </div>
    </div>
  );
}
