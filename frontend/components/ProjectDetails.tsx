"use client";

import { gql, useMutation, DocumentNode } from "@apollo/client";
import EdiText from "react-editext";
import client from "@/constants/apollo-client";
import { useState } from "react";

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
  const [toggleTagsInput, setToggleTagsInput] = useState(false);
  const [toggleUsersInput, setToggleUsersInput] = useState(false);
  const [tagsVal, setTagsVal] = useState("");
  const [usersVal, setUsersVal] = useState("");

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

  return (
    <>
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
        <p className="w-full max-w-[10rem] text-dlightblack">Tags:</p>
        <div className="flex gap-4 items-center">
          {data.getProject.tags.map((tag: string, i: number) => {
            return (
              <div key={i} className="badge badge-primary badge-lg rounded">
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
