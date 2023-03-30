"use client";

import client from "../constants/apollo-client";
import { gql, useQuery } from "@apollo/client";
import Project from "../constants/project.interface";
import Link from "next/link";
import Task from "@/constants/task.interface";
import { useEffect, useState } from "react";

const getProjectsByUser = gql`
  query {
    getProjects {
      _id
      name
      description
      manager
      tasks {
        status
      }
    }
  }
`;

export default function DashboardProjects() {
  const { loading, error, data } = useQuery(getProjectsByUser, { client });
  const [progress, setProgress] = useState({
    completed: 0,
    total: 0,
  });
  useEffect(() => {
    if (data) {
      let total = 0;
      let completed = 0;
      const allTasks = data.getProjects.forEach((project: Project) => {
        total = total + project.tasks.length;
        completed =
          completed +
          project.tasks.filter((task) => task.status == "COMPLETED").length;
      });
      setProgress({
        completed,
        total,
      });
    }
  }, [data]);

  const getProgress = (tasks: Task[]) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.status === "COMPLETED"
    ).length;
    if (totalTasks == 0) {
      return (
        <div className="flex items-center justify-center gap-4 w-full">
          <progress className="progress"></progress>
          <p className="w-4">
            N/A
          </p>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center gap-4 w-full">
        <progress
          className="progress progress-success"
          value={(completedTasks / totalTasks) * 100}
          max="100"
        ></progress>
        <p className="w-4">
          {completedTasks}/{totalTasks}
        </p>
      </div>
    );
  };
  return (
    <div>
      {/* <progress
        className="progress progress-success"
        value={progress.total==0?0:(progress.completed/progress.total)*100}
        max="100"
      ></progress>
      <p>{progress.completed}/{progress.total}</p> */}
      <div className="stats w-full mb-8">
      <div className="stat place-items-center">
          <div className="stat-title">Total projects</div>
          <div className="stat-value">{data && data.getProjects.length}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Total tasks</div>
          <div className="stat-value">{progress.total}</div>
        </div>
        
        <div className="stat place-items-center">
          <div className="stat-title">Tasks completed</div>
          <div className="stat-value">{progress.completed}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Progress</div>
          <progress
            className="progress progress-success w-3/4"
            value={
              progress.total == 0
                ? 0
                : (progress.completed / progress.total) * 100
            }
            max="100"
          ></progress>
          <div className="stat-desc">({(progress.completed / progress.total) * 100}%)</div>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-dprimary text-dlightblue">Name</th>
              <th className="bg-dprimary text-dlightblue">Description</th>
              <th className="bg-dprimary text-dlightblue">Progress</th>
              <th className="bg-dprimary text-dlightblue"></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.getProjects.map((project: Project) => (
                <tr key={project._id}>
                  <td className="font-bold">{project.name}</td>
                  <td>{project.description}</td>
                  <td>{getProgress(project.tasks)}</td>
                  <th className="flex items-center justify-center">
                    <Link href={`/dashboard/project/${project._id}`}>
                      <button className="btn btn-xs">DETAILS</button>
                    </Link>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {data && data.getProjects.length == 0 && (
          <p className="w-full text-center mt-4 font-semibold">
            No projects available!
          </p>
        )}
        {loading && (
          <button className="mt-4 btn bg-transparent text-dblack border-0 loading w-full">
            Loading
          </button>
        )}
      </div>
    </div>
  );
}
