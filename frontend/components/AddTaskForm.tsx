"use client";

import { FormEvent, useState } from "react";
import { gql, useMutation, DocumentNode } from "@apollo/client";
import client from "@/constants/apollo-client";
import Project from "@/constants/project.interface";

const createTask = gql`
  mutation ($projectId: ID!, $name: String!, $type: String!) {
    createTask(
      CreateTaskInput: { projectId: $projectId, name: $name, type: $type }
    ) {
      _id
      tasks {
        id
        name
        type
        status
      }
    }
  }
`;

type PropsType = {
  projectId: string;
  getProject: DocumentNode;
};

export default function AddTaskForm({ projectId, getProject }: PropsType) {
  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState("");
  const [error, setError] = useState("");
  const [addTaskFn] = useMutation(createTask, {
    client,
    refetchQueries: [
      { query: getProject, variables: { id: projectId } },
      "getProject",
    ],
  });

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTaskFn({
      variables: {
        projectId,
        name: taskName,
        type: taskType,
      },
      onError: (error) => {
        setError(
          (
            error.graphQLErrors[0].extensions.originalError as {
              error: string;
              message: string[];
              statusCode: number;
            }
          ).message[0]
        );
      },
    });
    setTaskName("");
    setTaskType("");
  };

  return (
    <>
      <form
        className="flex items-center justify-center"
        onSubmit={addTaskHandler}
      >
        <input
          type="text"
          placeholder="Task name"
          className="input input-bordered w-full max-w-xs rounded-none"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task type"
          className="input input-bordered w-full max-w-xs rounded-none"
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
        />
        <button className="btn">＋ Add Task</button>
      </form>
      {error && (
        <div className="w-full text-center mt-2 text-error">{error}</div>
      )}
    </>
  );
}
