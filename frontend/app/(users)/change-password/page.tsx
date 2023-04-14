import ChangePasswordForm from "@/components/ChangePasswordForm";
import Link from "next/link";

export default function changePasswordPage(){
  return (
    <div className="mx-4">
    <div className="text-sm breadcrumbs text-dlightblack">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
            <Link href="/change-password">Change Password</Link>
          </li>
      </ul>
    </div>
    <div className="flex items-center justify-between mt-4 mb-8">
    <p className="text-2xl font-bold text-dblack">CHANGE PASSWORD</p>
    </div>
    <ChangePasswordForm/>
  </div>
  )
}