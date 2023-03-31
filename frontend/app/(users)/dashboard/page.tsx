import DashboardProjects from "@/components/DashboardProjects";
import Link from "next/link";

export default function Dashboard() {
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
        </ul>
      </div>
      <div className="flex items-center justify-between mt-4 mb-8">
      <p className="text-2xl font-bold text-dblack">PROJECTS</p>
      <Link href="/project/create-project"><button className="btn">＋ CREATE NEW</button></Link>
      </div>
      <DashboardProjects/>
    </div>
  );
}

