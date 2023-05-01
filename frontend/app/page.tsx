"use client";

import styles from "./page.module.scss";
import TrustedByFragment from "../components/TrustedByFragment";
import Link from "next/link";
import Image from "next/image";
import mockup from "../public/mockup.png";

export default function Home() {
  return (
    <>
      <div className="hero flex flex-col md:flex-row items-center py-24 px-8 lg:px-28 relative">
        <div className={styles.gradient}></div>
        <h1 className="w-full md:w-2/5 text-3xl md:text-4xl lg:text-6xl font-bold">
          Level up your productivity and get your tasks done!
        </h1>
        <div className="hero-right flex-col items-start justify-start w-full md:w-3/5  mt-4 md:mt-0">
          <p className="w-full md:w-3/5 m-auto flex justify-center text-dlightblack text-sm md:text-base">
            Speed up your teams work with our state of the art kanban board.
            Grow your teams productivity and push work faster.
          </p>
          <div className="md:w-3/5 m-auto flex justify-start mt-4 md:mt-8">
            <Link href="/dashboard">
              <button className="btn btn-shadow flex items-center">
                Try it out ↗
              </button>
            </Link>
          </div>
        </div>
      </div>
      <TrustedByFragment />
      <div  className="px-8 lg:px-28 py-24 bg-gradient-to-r from-dblue to-dprimary text-dwhite">
        <div className="mb-16 flex flex-col md:flex-row gap-8 items-center ">
          <h2 className="text-4xl md:text-6xl md:w-1/2 font-bold">Setup is as easy as 3..2..1...</h2>
          <p className="md:w-1/2 text-dgrey font-thin text-sm md:text-base">Just make an account, login, and start managing your tasks. It's as easy as that. No fussy payment method prompts. No fussy ads. Get straight to business and make yourself dirty.</p>
        </div>
        <div className="relative bg-[#1552ce] h-[500px] overflow-clip">
            <Image src={mockup} alt="Dashboard Macbook Mockup" className="left-[-25%] top-[-50px] relative min-w-[800px]" priority></Image>
            <h2 className="absolute right-0 lg:right-4 xl:right-12 top-[84%] md:top-[50%] text-xl md:text-2xl font-semibold md:w-1/2 text-center">Our state of the art dashboard</h2>
            <h2 className="absolute right-0 lg:right-4 xl:right-12 top-[92%] md:top-[58%] text-sm md:text-xl md:w-1/2 text-center">...speechless?</h2>
        </div>
      </div>
      <div className="px-8 lg:px-28 py-24 bg-dwhite text-dblack">
        <h2 className="z-[999] text-3xl md:text-6xl font-semibold m-auto w-full md:w-2/3">
          FAQs
        </h2>
        <div className="w-full md:w-2/3 m-auto mt-8 flex flex-col gap-8">
          <div
            tabIndex={0}
            className="collapse collapse-plus bg-dgrey rounded-box"
          >
            <div className="collapse-title text-lg md:text-xl font-medium">
              What is Dooit?
            </div>
            <div className="collapse-content text-dlightblack text-sm md:text-base">
              <p>
                Dooit is a state of the art kanban board with a sleek design
                and intuitive user experience. Make your team more productive by 
                managing your tasks status using our drag and drop kanban board. Group up tasks according to projects.
                Add and remove users from a project who have access to add in tasks and update tasks status.
              </p>
            </div>
          </div>
          <div
            tabIndex={0}
            className="collapse collapse-plus bg-dgrey rounded-box"
          >
            <div className="collapse-title text-lg md:text-xl font-medium">
              What is a kanban board?
            </div>
            <div className="collapse-content text-dlightblack text-sm md:text-base">
              <p>
              A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow).
              </p>
            </div>
          </div>
          <div
            tabIndex={0}
            className="collapse collapse-plus bg-dgrey rounded-box"
          >
            <div className="collapse-title text-lg md:text-xl font-medium">
              But wait... is this really free?
            </div>
            <div className="collapse-content text-dlightblack text-sm md:text-base">
              <p>
               Yup, you heard it right. Dooit is a free to use open-source software. No credit card needed. No fees. There's literally no catch.
              </p>
            </div>
          </div>
          
          <div
            tabIndex={0}
            className="collapse collapse-plus bg-dgrey rounded-box"
          >
            <div className="collapse-title text-lg md:text-xl font-medium">
              Site broken?
            </div>
            <div className="collapse-content text-dlightblack text-sm md:text-base">
              <p>
                Not again... the intern probably pushed in prod. Don't worry, our devs are already working on it. However, feel free to report the issue at - joysamaddar123@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-clip px-8 lg:px-28 py-24 bg-gradient-to-r from-dblue to-dprimary flex flex-col gap-12 item-center justify-center text-dwhite">
        <div className={styles.gradient2}></div>
        <h2 className="font-bold z-[999] text-3xl md:text-6xl w-full md:w-[75%] m-auto text-center">
          The easiest way to manage your team's task
        </h2>
        <ul className="z-[999] flex flex-col md:flex-row gap-2 md:gap-8 items-center justify-center text-dwhite">
          <li>Organized</li>
          <span className="hidden md:block">|</span>
          <li>Keep Track</li>
          <span className="hidden md:block">|</span>
          <li>Get analytics</li>
          <span className="hidden md:block">|</span>
          <li>Increased productivity</li>
        </ul>
        <div className="w-full flex items-center justify-center z-[999]">
          <Link href="/dashboard">
            <button className="btn w-max">Get Started</button>
          </Link>
        </div>
      </div>
    </>
  );
}
