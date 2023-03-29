import Link from "next/link";

export default function Nav() {
  return (
    <div className="navbar  p-0 h-[10vh] px-16">
  <div className="navbar-start">
    <div className="flex-1 font-bold text-dprimary"><Link href="/">DOOIT.</Link></div>
  </div>
  {/* <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li tabIndex={0}>
        <a>
          Parent
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2">
          <li><a>Submenu 1</a></li>
          <li><a>Submenu 2</a></li>
        </ul>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </div> */}
  <div className="navbar-end">
    <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#101010"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact absolute right-0 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="login" >Login</Link></li>
            <li><Link href="signup" >Signup</Link></li>
          </ul>
      </div>
        <div className="hidden lg:flex items-center gap-4">
          <Link href="login"  className="hover:bg-transparent focus:bg-transparent text-dlightblack">Login</Link>
          <Link href="signup"><button className="btn">Signup</button></Link>
      </div>
  </div>
</div>
  );
}
