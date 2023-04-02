"use client";

import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";

import client from "@/constants/apollo-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import EdiText from "react-editext";
import userVar from "@/store/user";

type ParamType = {
  params: { projectId: string };
};

const getProject = gql`
  query getProject($id: String!) {
    getProject(id: $id) {
      _id
      name
      description
      tags
      manager
      users
      tasks {
        id
        name
        type
        status
      }
    }
  }
`;

const updateProject = gql`
  mutation ($id: ID!, $name: String, $description: String, $tags: [String!]) {
    updateProject(
      UpdateProjectInput: {
        id: $id
        name: $name
        description: $description
        tags: $tags
      }
    ) {
      _id
    }
  }
`;


const addUserToProject = gql`
  mutation ($projectId: String!, $username: String!) {
    addUserToProject(projectId: $projectId, username: $username) {
      _id
    }
  }
`;

const removeUserFromProject = gql`
  mutation ($projectId: String!, $username: String!) {
    removeUserFromProject(projectId: $projectId, username: $username) {
      _id
    }
  }
`;


export default function ProjectPage({ params: { projectId } }: ParamType) {
  const { loading, error, data } = useQuery(getProject, {
    client,
    variables: {
      id: projectId,
    },
  });
  const [updateProjectFn] = useMutation(updateProject, {
    client,
    refetchQueries: [{ query: getProject }, "getProject"],
  });
  const [addUserFn] = useMutation(addUserToProject, {
    client,
    refetchQueries: [{ query: getProject }, "getProject"],
  });
  const [removeUserFn] = useMutation(removeUserFromProject, {
    client,
    refetchQueries: [{ query: getProject }, "getProject"],
  });
  const user = useReactiveVar(userVar);
  const [projectData, setProjectData] = useState({
    id: "",
    name: "",
    description: "",
    tags: [] as string[],
  });

  const [toggleTagsInput, setToggleTagsInput] = useState(false);
  const [toggleUsersInput, setToggleUsersInput] = useState(false);
  const [tagsVal, setTagsVal] = useState("");
  const [usersVal, setUsersVal] = useState("");

  useEffect(() => {
    if (data) {
      setProjectData({
        id: data.getProject._id,
        name: data.getProject.name,
        description: data.getProject.description,
        tags: data.getProject.tags,
      });
    }
  }, [data]);

  const updateNameHandler = (val: string) => {
    const data = {
      ...projectData,
      name: val,
    };
    updateProjectHandler(data);
  };

  const updateDescriptionHandler = (val: string) => {
    const data = {
      ...projectData,
      description: val,
    };
    updateProjectHandler(data);
  };

  const submitTagHandler = () => {
    const data = {
      ...projectData,
      tags: [...projectData.tags, tagsVal],
    };
    setTagsVal("");
    setToggleTagsInput(false);
    updateProjectHandler(data);
  };

  const deleteTagHandler = (t: string)=> {
    const data = {
      ...projectData,
      tags: projectData.tags.filter((tag)=>tag!=t)
    }
    updateProjectHandler(data);
  }

  const updateProjectHandler = (data: any) => {
    updateProjectFn({
      variables: data,
      onError: () => {
        throw new Error("Could not update the project details. Please try again later.");
      },
    });
  };

  const addUserHandler = () => {
    addUserFn({
      variables: {
        projectId,
        username: usersVal
      },
      onError: (e)=>{throw new Error(e.message)}
    })
    setUsersVal("");
    setToggleUsersInput(false);
  }

  const removerUserHandler = (username: string) => {
    removeUserFn({
      variables: {
        projectId,
        username
      },
      onError: (e)=>{console.log(e)}
    })
  }

  if (error) {
    throw new Error("Error connecting to the server. Please try again later.");
  }

  if (data) {
    return (
      <div className="mx-4">
        <div className="text-sm breadcrumbs text-dlightblack">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/dashboard">Projects</Link>
            </li>
            <li>
              <Link href={`/project/${projectId}`}>{projectData.name}</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-between mt-4 mb-8 text-2xl font-bold text-dblack">
          {user.username == data.getProject.manager ? (
            <EdiText
              submitOnEnter
              editOnViewClick={true}
              cancelOnEscape
              cancelOnUnfocus
              showButtonsOnHover
              saveButtonContent="Save"
              saveButtonClassName="btn btn-success mx-2"
              cancelButtonContent="Cancel"
              cancelButtonClassName="btn btn-error"
              editButtonContent="Edit"
              editButtonClassName="ml-4 btn btn-xs"
              hideIcons
              inputProps={{
                className: "input input-bordered input-md rounded-none",
              }}
              validationMessage="Project name needs to be atleast 3 characters."
              validation={(val) => val.length >= 3}
              type="text"
              value={projectData.name}
              onSave={updateNameHandler}
            />
          ) : (
            <p>{projectData.name}</p>
          )}
        </div>

        <div className="w-full flex mb-2">
          <p className="w-full max-w-[10rem] text-dlightblack">Description:</p>
          {user.username == data.getProject.manager ? (
            <EdiText
              submitOnEnter
              editOnViewClick={true}
              cancelOnEscape
              cancelOnUnfocus
              showButtonsOnHover
              saveButtonContent="Save"
              saveButtonClassName="btn btn-success mx-2 btn-sm"
              cancelButtonContent="Cancel"
              cancelButtonClassName="btn btn-error btn-sm"
              editButtonContent="Edit"
              editButtonClassName="ml-4 btn btn-xs"
              hideIcons
              inputProps={{
                className: "input input-bordered input-sm rounded-none",
              }}
              validationMessage="Project description needs to be atleast 3 characters."
              validation={(val) => val.length >= 3}
              type="text"
              value={projectData.description}
              onSave={updateDescriptionHandler}
            />
          ) : (
            <p>{data.getProject.description}</p>
          )}
        </div>
        <div className="w-full flex mb-2">
          <p className="w-full max-w-[10rem] text-dlightblack">
            Project manager:
          </p>
          <p>{data.getProject.manager}</p>
        </div>
        <div className="w-full flex mb-2">
          <p className="w-full max-w-[10rem] text-dlightblack">Assignees:</p>
          <div className="flex gap-4 items-center">

          {data.getProject.users.map((u: string, i: number) => {
              return (
                <div key={i} className="badge badge-lg rounded">
                  {u}{user.username == data.getProject.manager && u!=data.getProject.manager && <p className="ml-2 cursor-pointer" onClick={()=>removerUserHandler(u)}>✗</p>}
                </div>
              );
            })}
            {user.username == data.getProject.manager && (
              <div>
                {toggleUsersInput && (
                  <input
                    type="text"
                    className="input input-bordered input-xs rounded-none"
                    value={usersVal}
                    onChange={(e) => setUsersVal(e.target.value)}
                  ></input>
                )}
                {!toggleUsersInput && (
                  <button
                    className="btn btn-xs"
                    onClick={() => setToggleUsersInput(true)}
                  >
                    ＋
                  </button>
                )}
                {toggleUsersInput && (
                  <button
                    className="btn btn-xs btn-success mx-2"
                    onClick={addUserHandler}
                  >
                    SAVE
                  </button>
                )}
                {toggleUsersInput && (
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => {
                      setUsersVal("");
                      setToggleUsersInput(false);
                    }}
                  >
                    CANCEL
                  </button>
                )}
              </div>
            )}


            {/* {data.getProject.users.map((user: string, i: number) => {
              return (
                <div key={i} className="badge badge-lg rounded">
                  {user}
                </div>
              );
            })} */}
          </div>
        </div>
        <div className="w-full flex mb-2">
          <p className="w-full max-w-[10rem] text-dlightblack">Tags:</p>
          <div className="flex gap-4 items-center">
            {data.getProject.tags.map((tag: string, i: number) => {
              return (
                <div key={i} className="badge badge-primary badge-lg rounded">
                  {tag}{user.username == data.getProject.manager && <p className="ml-2 cursor-pointer" onClick={()=>deleteTagHandler(tag)}>✗</p>}
                </div>
              );
            })}
            {user.username == data.getProject.manager && (
              <div>
                {toggleTagsInput && (
                  <input
                    type="text"
                    className="input input-bordered input-xs rounded-none"
                    value={tagsVal}
                    onChange={(e) => setTagsVal(e.target.value)}
                  ></input>
                )}
                {!toggleTagsInput && (
                  <button
                    className="btn btn-xs"
                    onClick={() => setToggleTagsInput(true)}
                  >
                    ＋
                  </button>
                )}
                {toggleTagsInput && (
                  <button
                    className="btn btn-xs btn-success mx-2"
                    onClick={submitTagHandler}
                  >
                    SAVE
                  </button>
                )}
                {toggleTagsInput && (
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => {
                      setTagsVal("");
                      setToggleTagsInput(false);
                    }}
                  >
                    CANCEL
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* <div className="w-full bg-dwhite flex items-center justify-evenly p-4 my-8 rounded border-[0.05rem] border-dgrey">
            
          </div> */}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <button className="btn loading btn-ghost btn-lg">loading</button>
    </div>
  );
}
