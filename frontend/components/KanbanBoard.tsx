"use client";

import { useEffect, useState } from "react";
import { DocumentNode } from "@apollo/client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { StatusEnum } from "../constants/status.enum";
import AddTaskForm from "./AddTaskForm";
import TaskCard from "./TaskCard";

type PropsType = {
  projectData: any;
  projectId: string;
  getProject: DocumentNode;
};

type TaskType = {
  id: string;
  name: string;
  type: string;
  status: StatusEnum;
};

export default function KanbanBoard({
  projectData,
  projectId,
  getProject,
}: PropsType) {
  const [tasks, setTasks] = useState(projectData.getProject.tasks);
  const [columns, setColumns] = useState({});

  useEffect(() => {
    setTasks(projectData.getProject.tasks);
    setColumns({
      [StatusEnum.PENDING]: {
        title: StatusEnum.PENDING,
        items: tasks.filter(
          (task: TaskType) => task.status == StatusEnum.PENDING
        ),
      },
      [StatusEnum.IN_PROGRESS]: {
        title: "IN PROGRESS",
        items: tasks.filter(
          (task: TaskType) => task.status == StatusEnum.IN_PROGRESS
        ),
      },
      [StatusEnum.TESTING]: {
        title: StatusEnum.TESTING,
        items: tasks.filter(
          (task: TaskType) => task.status == StatusEnum.TESTING
        ),
      },
      [StatusEnum.COMPLETED]: {
        title: StatusEnum.COMPLETED,
        items: tasks.filter(
          (task: TaskType) => task.status == StatusEnum.COMPLETED
        ),
      },
    });
  }, [projectData]);

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(source);
    console.log(destination)
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
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
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
                {Object.entries(columns).map(([columnId, column], _index) => {
                  return (
                    <Droppable key={columnId} droppableId={columnId}>
                      {(provided, _snapshot) => (
                        <div className="min-h-[100px] flex flex-col w-full max-w-1/4"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <div className="bg-dwhite font-semibold text-dprimary p-2 flex items-center justify-center">{(column as any).title}</div>
                          {(column as any).items.map((item: any, index: number) => (
                            <TaskCard key={item} item={item} index={index}/>
                          ))}
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
