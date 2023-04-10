"use client";

import { FormEvent, useState } from "react";
import { gql, useMutation, DocumentNode } from "@apollo/client";
import client from "@/constants/apollo-client";

const createTask = gql`
  mutation ($projectId: ID!, $name: String!, $type: String!) {
    createTask(
      CreateTaskInput: { projectId: $projectId, name: $name, type: $type }
    ) {
      _id
    }
  }
`;

type PropsType = {
  projectId: string;
  getProject: DocumentNode;
};

export default function AddTaskForm({
  projectId,
  getProject,
}: PropsType) {
  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState("");
  const [addTaskFn] = useMutation(createTask, {
    client,
  });

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTaskFn({
      variables: {
        projectId,
        name: taskName,
        type: taskType,
      },
      refetchQueries: [
        { query: getProject, variables: { id: projectId } },
        "getProject",
      ],
    });
    setTaskName("");
    setTaskType("");
  };

  return (
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
  );
}
