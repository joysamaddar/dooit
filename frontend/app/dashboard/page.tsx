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
            <Link href="/dashboard">Projects</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-baseline justify-between ">
      <p className="text-2xl font-bold mt-4 mb-8 text-dblack">PROJECTS</p>
      <Link href="/dashboard/create-project"><button className="btn">＋ CREATE NEW</button></Link>
      </div>
      <DashboardProjects/>
    </div>
  );
}

