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
        </ul>
      </div>
      <div className="flex items-center mt-4 mb-8">
      <p className="text-2xl font-bold text-dblack">STATS</p>
      </div>
      <DashboardProjects/>
    </div>
  );
}

