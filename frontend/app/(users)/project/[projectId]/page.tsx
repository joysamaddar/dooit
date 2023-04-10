"use client";

import { gql, useQuery, useReactiveVar } from "@apollo/client";

import client from "@/constants/apollo-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import userVar from "@/store/user";
import KanbanBoard from "@/components/KanbanBoard";
import ProjectDetails from "@/components/ProjectDetails";

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

export default function ProjectPage({ params: { projectId } }: ParamType) {
  const { error, data } = useQuery(getProject, {
    client,
    variables: {
      id: projectId,
    },
  });

  const user = useReactiveVar(userVar);
  const [projectData, setProjectData] = useState({
    id: "",
    name: "",
    description: "",
    tags: [] as string[],
  });

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
        <ProjectDetails data={data} user={user} projectData={projectData} getProject={getProject} projectId={projectId}/>
        <KanbanBoard projectData={data} projectId={projectId} getProject={getProject}/>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <button className="btn loading btn-ghost btn-lg">loading</button>
    </div>
  );
}
