"use client";

import { useEffect, useState } from "react";
import { DocumentNode, gql, useMutation } from "@apollo/client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { StatusEnum } from "../constants/status.enum";
import AddTaskForm from "./AddTaskForm";
import TaskCard from "./TaskCard";
import client from "@/constants/apollo-client";
import Task from "@/constants/task.interface";
import Project from "@/constants/project.interface";

const changeTaskStatus = gql`
  mutation ($projectId: ID!, $id: ID!, $status: String) {
    updateTask(TaskInput: { projectId: $projectId, id: $id, status: $status }) {
      _id
    }
  }
`;

type PropsType = {
  projectData: {getProject: Project};
  projectId: string;
  getProject: DocumentNode;
};


type ColumnType = {
  title: string;
  items: Task[]
}

export default function KanbanBoard({
  projectData,
  projectId,
  getProject,
}: PropsType) {
  const [columns, setColumns] = useState({});
  const [changeTaskStatusFn] = useMutation(changeTaskStatus, {
    client,
    refetchQueries: [
      { query: getProject, variables: { id: projectId } },
      "getProject",
    ],
  });

  useEffect(() => {
    setColumns({
      [StatusEnum.PENDING]: {
        title: StatusEnum.PENDING,
        items: projectData.getProject.tasks.filter(
          (task: Task) => task.status == StatusEnum.PENDING
        ),
      },
      [StatusEnum.IN_PROGRESS]: {
        title: "IN PROGRESS",
        items: projectData.getProject.tasks.filter(
          (task: Task) => task.status == StatusEnum.IN_PROGRESS
        ),
      },
      [StatusEnum.TESTING]: {
        title: StatusEnum.TESTING,
        items: projectData.getProject.tasks.filter(
          (task: Task) => task.status == StatusEnum.TESTING
        ),
      },
      [StatusEnum.COMPLETED]: {
        title: StatusEnum.COMPLETED,
        items: projectData.getProject.tasks.filter(
          (task: Task) => task.status == StatusEnum.COMPLETED
        ),
      },
    });
  }, [projectData]);


  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      changeTaskStatusFn({variables: {
        projectId, 
        id: draggableId,
        status: destination.droppableId
      }})
    }
  };

  return (
    <div className="w-full bg-dwhite flex items-center justify-evenly px-4 py-8 my-8 rounded border-[0.05rem] border-dgrey">
      <div className="w-full">
        <AddTaskForm projectId={projectId} getProject={getProject} />
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <div className="flex mt-8">
            <div className="flex w-full min-h-[50vh] p-5 bg-dlightblue rounded">
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <Droppable key={index} droppableId={columnId}>
                    {(provided, _snapshot) => (
                      <div
                        className="min-h-[100px] flex flex-col w-full max-w-1/4"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div className="bg-dwhite font-semibold text-dprimary p-2 flex items-center justify-center">
                          {(column as ColumnType).title}
                        </div>
                        {(column as ColumnType).items.map(
                          (item: Task, index: number) => (
                            <TaskCard
                              key={index}
                              item={item}
                              index={index}
                              projectId={projectId}
                              getProject={getProject}
                            />
                          )
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
