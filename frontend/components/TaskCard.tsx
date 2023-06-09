"use client";

import { DocumentNode, gql, useMutation } from "@apollo/client";
import { Draggable } from "react-beautiful-dnd";
import client from "../constants/apollo-client";
import Task from "@/constants/task.interface";
import { motion } from "framer-motion";

const removeTask = gql`
  mutation deleteTask($projectId: ID!, $id: ID!) {
    deleteTask(TaskInput: { projectId: $projectId, id: $id }) {
      _id
      name
      tasks {
        id
      }
    }
  }
`;

type PropsType = {
  item: Task;
  index: number;
  projectId: string;
  getProject: DocumentNode;
};

export default function TaskCard({
  item,
  index,
  projectId,
  getProject,
}: PropsType) {
  const [removeTaskFn] = useMutation(removeTask, {
    client,
    refetchQueries: [
      { query: getProject, variables: { id: projectId } },
      "getProject",
    ],
  });

  const deleteTaskHandler = () => {
    removeTaskFn({
      variables: {
        projectId,
        id: item.id,
      },
    });
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          key={item.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col justify-center items-start p-4 min-h-[90px] bg-dwhite mt-5 mx-2 border-2 border-dgrey rounded"
            >
              <div className="flex w-full items-center justify-between">
                <p>{item.name}</p>
                <button
                  className="btn btn-square btn-xs"
                  onClick={deleteTaskHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex justify-between items-center w-full text-xs font-light text-dlightblack">
                <p>
                  <span>{item.type}</span>
                </p>
              </div>
            </motion.div>
        </div>
      )}
    </Draggable>
  );
}
