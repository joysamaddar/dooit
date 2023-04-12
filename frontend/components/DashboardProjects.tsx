"use client";

import client from "../constants/apollo-client";
import { gql, useQuery } from "@apollo/client";
import Project from "../constants/project.interface";
import Link from "next/link";
import Task from "@/constants/task.interface";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { StatusEnum } from "@/constants/status.enum";
ChartJS.register(ArcElement, Tooltip, Legend);

export const getProjectsByUser = gql`
  query getProjects {
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
    pending: 0,
    in_progress: 0,
    testing: 0,
    completed: 0,
    total: 0,
  });

  const chartData = {
    labels: [
      StatusEnum.PENDING,
      StatusEnum.IN_PROGRESS,
      StatusEnum.TESTING,
      StatusEnum.COMPLETED,
    ],
    datasets: [
      {
        label: "# of Tasks",
        data: [progress.pending, progress.in_progress, progress.testing, progress.completed],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "#36D399",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "#049A5B",
        ],
        borderWidth: 1.5,
      },
    ],
  };

  useEffect(() => {
    if (data) {
      let total = 0;
      let pending = 0;
      let in_progress = 0;
      let testing = 0;
      let completed = 0;
      data.getProjects.forEach((project: Project) => {
        project.tasks.forEach((task)=>{
          if(task.status == StatusEnum.PENDING){
            pending++;
          }
          if(task.status == StatusEnum.IN_PROGRESS){
            in_progress++;
          }
          if(task.status == StatusEnum.TESTING){
            testing++;
          }
          if(task.status == StatusEnum.COMPLETED){
            completed++;
          }
        })
        total = total + project.tasks.length;
      });
      setProgress({
        pending,
        in_progress,
        testing,
        completed,
        total
      });
    }
  }, [data]);

  // useEffect(()=>{
  //   client.refetchQueries({ include: ["getProjects"]})
  // }, [])

  const getProgress = (tasks: Task[]) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.status === StatusEnum.COMPLETED
    ).length;
    if (totalTasks == 0) {
      return (
        <div className="flex items-center justify-center gap-4 w-full">
          <progress className="progress"></progress>
          <p className="w-4">N/A</p>
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
      <div className="w-full bg-dwhite flex items-center justify-evenly p-4 my-8 rounded border-[0.05rem] border-dgrey">
        <div className="w-[25rem] h-auto bg-dwhite relative">
          <Doughnut
            data={chartData}
            options={{
              plugins: {
                legend: {
                  position: "right",
                  title: {
                    display: true,
                    text: "Tasks Status",
                    position: "center",
                    font: {
                      weight: "bold",
                      size: 16,
                    },
                  },
                },
              },
              layout: {
                padding: 0,
              },
              aspectRatio: 1.5,
            }}
          />
        </div>
        <div className="w-[25rem] flex flex-col h-auto rounded border-[0.05rem] border-dgrey">
          <div className="border-b-[0.05rem] border-dgrey p-4 flex items-center justify-between text-dlightblack">
            <h3>Total projects</h3>
            <p className="font-extrabold">{data && data.getProjects.length}</p>
          </div>
          <div className="border-b-[0.05rem] border-dgrey p-4 flex items-center justify-between text-dlightblack">
            <h3>Total tasks</h3>
            <p className="font-extrabold">{progress.total}</p>
          </div>
          <div className="border-b-[0.05rem] border-dgrey p-4 flex items-center justify-between text-dlightblack">
            <h3>Progress</h3>
            <p className="font-extrabold">
              {((progress.completed / progress.total) * 100).toFixed(2)}%
            </p>
          </div>
          <div className="border-b-[0.05rem] border-dgrey p-4">
            <progress
              className="progress progress-success"
              value={
                progress.total == 0
                  ? 0
                  : (progress.completed / progress.total) * 100
              }
              max="100"
            ></progress>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 mb-8">
      <p className="text-2xl font-bold text-dblack">PROJECTS</p>
      <Link href="/project/create-project"><button className="btn">＋ CREATE NEW</button></Link>
      </div>
      <div className="overflow-x-auto w-full border-[0.05rem] border-dgrey rounded">
        <table className="table w-full rounded">
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
                    <Link href={`/project/${project._id}`}>
                      <button className="btn btn-xs">DETAILS</button>
                    </Link>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {data && data.getProjects.length == 0 && (
          <p className="w-full text-center my-4 font-semibold">
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
