import Image from "next/image"
import logo from "../public/logo.svg"

export default function Footer() {
  return (
  <footer className="footer items-center h-[6vh] bg-dblack text-dwhite">
  <div className="w-full flex items-center justify-center">
    <Image src={logo} alt="logo"/> 
    <p>Dooit - Copyright © 2023</p>
  </div>
</footer>
  );
}
