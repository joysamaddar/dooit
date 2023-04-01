import CreateProjectForm from "../../../../components/CreateProjectForm";
import Link from "next/link";

export default function CreateProject(){
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
          <Link href="/project/create-project">Create Project</Link>
        </li>
      </ul>
    </div>
    <div className="flex items-center justify-between mt-4 mb-8">
    <p className="text-2xl font-bold text-dblack">CREATE PROJECT</p>
    </div>
    <CreateProjectForm/>
  </div>
  )
}