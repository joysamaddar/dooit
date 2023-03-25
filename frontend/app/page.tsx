import styles from "./page.module.scss";

export default function Home() {
  return (
    <main>
      <div className="hero flex flex-col md:flex-row items-start my-24 px-16 relative">
        <div className="pattern"></div>
        <h1 className="w-full md:w-2/5 text-3xl md:text-4xl lg:text-6xl font-bold">
          Level up your productivity and get your tasks done!
        </h1>
        <div className="hero-right flex-col items-start justify-start w-full md:w-3/5  mt-4 md:mt-0">
          <p className="w-full md:w-3/5 m-auto flex justify-center text-dlightblack">
            Speed up your teams work with our state of the art kanban board.
            Grow your teams productivity and push work faster.
          </p>
          <div className="md:w-3/5 m-auto flex justify-start mt-4 md:mt-8">
            <button className="btn btn-shadow flex items-center">Try it out ↗</button>
          </div>
        </div>
      </div>
      <div className="w-full bg-dsecondary text-dlightblue text-md p-2 flex items-center justify-center">Trusted by over 10+ people!</div>
    </main>
  );
}
