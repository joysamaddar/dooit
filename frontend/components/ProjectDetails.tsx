"use client";

import { gql, useMutation, DocumentNode } from "@apollo/client";
import EdiText from "react-editext";
import client from "@/constants/apollo-client";
import { useState } from "react";
import { getProjectsByUser } from "./DashboardProjects";
import { useRouter } from "next/navigation";

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

const deleteProject = gql`
  mutation ($id: String!) {
    deleteProject(id: $id) {
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

type PropsType = {
  data: any;
  user: {
    _id: string | null;
    username: string | null;
  };
  projectData: {
    id: string;
    name: string;
    description: string;
    tags: string[];
  };
  getProject: DocumentNode;
  projectId: string;
};

export default function ProjectDetails({
  data,
  user,
  projectData,
  getProject,
  projectId,
}: PropsType) {
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
  const [deleteProjectFn] = useMutation(deleteProject, {
    client,
    refetchQueries: [{ query: getProjectsByUser }, "getProjects"],
  });

  const [toggleTagsInput, setToggleTagsInput] = useState(false);
  const [toggleUsersInput, setToggleUsersInput] = useState(false);
  const [tagsVal, setTagsVal] = useState("");
  const [usersVal, setUsersVal] = useState("");
  const [showModal, setShowModal] = useState(true);

  const router = useRouter();

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

  const updateProjectHandler = (data: any) => {
    updateProjectFn({
      variables: data,
      onError: () => {
        throw new Error(
          "Could not update the project details. Please try again later."
        );
      },
    });
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

  const deleteTagHandler = (t: string) => {
    const data = {
      ...projectData,
      tags: projectData.tags.filter((tag: string) => tag != t),
    };
    updateProjectHandler(data);
  };

  const addUserHandler = () => {
    addUserFn({
      variables: {
        projectId,
        username: usersVal,
      },
      onError: (e) => {
        throw new Error(e.message);
      },
    });
    setUsersVal("");
    setToggleUsersInput(false);
  };

  const removerUserHandler = (username: string) => {
    removeUserFn({
      variables: {
        projectId,
        username,
      },
      onError: (e) => {
        console.log(e);
      },
    });
  };

  const deleteProjectHandler = () => {
    deleteProjectFn({
      variables: {
        id: projectId,
      },
      onCompleted: () => {
        router.replace("/dashboard");
      },
    });
  };

  return (
    <>
    {showModal && 
    <>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
        <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-4 top-4">✕</label>
          <h3 className="font-bold text-lg">DELETE THE PROJECT?</h3>
          <p className="py-4">Please note this will remove all the project data. Once deleted, data will NOT be recoverable.</p>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn btn-error" onClick={deleteProjectHandler}>DELETE</label>
          </div>
        </div>
      </div>
      </>}
      <div className="flex items-center justify-between mt-4 mb-8 text-2xl font-bold text-dblack">
        {user.username == data.getProject.manager ? (
          <>
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
            <label htmlFor="my-modal-6" className="btn btn-error"> <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>DELETE</label>
          </>
        ) : (
          <p>{projectData.name}</p>
        )}
      </div>

      <div className="flex mb-6 sm:mb-2 h-auto flex-col sm:flex-row gap-2 sm:gap-0">
        <p className="w-full max-w-[10rem] text-dlightblack font-semibold">Description:</p>
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
            viewContainerClassName="max-w-[15rem] lg:max-w-[25rem] break-words whitespace-normal"
            value={projectData.description}
            onSave={updateDescriptionHandler}
          />
        ) : (
          <p className="max-w-[15rem] lg:max-w-[25rem] break-words whitespace-normal">{data.getProject.description}</p>
        )}
      </div>

      <div className="w-full flex mb-2">
        <p className="w-full max-w-[10rem] text-dlightblack font-semibold">
          Project manager:
        </p>
        <p>{data.getProject.manager}</p>
      </div>

      <div className="w-full flex mb-2">
        <p className="w-full max-w-[10rem] text-dlightblack font-semibold">Assignees:</p>
        <div className="flex gap-4 items-center overflow-x-auto">
          {data.getProject.users.map((u: string, i: number) => {
            return (
              <div key={i} className="badge badge-lg rounded min-w-fit">
                {u}
                {user.username == data.getProject.manager &&
                  u != data.getProject.manager && (
                    <p
                      className="ml-2 cursor-pointer"
                      onClick={() => removerUserHandler(u)}
                    >
                      ✗
                    </p>
                  )}
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
        </div>
      </div>

      <div className="w-full flex mb-2">
        <p className="w-full max-w-[10rem] text-dlightblack font-semibold">Tags:</p>
        <div className="flex gap-4 items-center overflow-x-auto">
          {data.getProject.tags.map((tag: string, i: number) => {
            return (
              <div key={i} className="badge badge-primary badge-lg rounded min-w-fit">
                {tag}
                {user.username == data.getProject.manager && (
                  <p
                    className="ml-2 cursor-pointer"
                    onClick={() => deleteTagHandler(tag)}
                  >
                    ✗
                  </p>
                )}
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
    </>
  );
}
