import Link from "next/link";
import styles from "./Auth.module.scss";
import AuthForm from "./AuthForm";

export default function AuthPage({
  title,
  heading,
  subheading,
  cta,
  mutation
}: {
  title: string;
  heading: string;
  subheading: string;
  cta: string;
  mutation: any;
}) {

  

  return (
    <main>
      <div className="flex p-4 min-h-[90vh] w-full">
        <div className="hidden lg:flex lg:flex-col md:w-2/5 bg-dprimary rounded-xl p-16 relative overflow-clip">
          <div className="font-bold text-xl text-dlightblue mt-4 z-10 uppercase">
            <Link href="/">{title}</Link>
          </div>
          <div className="font-bold text-5xl text-dlightblue mt-24 z-10">
            <h2>{heading}</h2>
          </div>
          <p className="w-3/5 text-dlightblue font-thin mt-8 z-10">
            {subheading}
          </p>
          <div className={styles.gradient}></div>
          <p className="flex flex-1 items-end text-dlightblue z-10 mb-4">
            {cta}
            <Link
              className="ml-2 font-bold"
              href={title.toLowerCase() == "login" ? "/signup" : "/login"}
            >
              {title.toLowerCase() == "login" ? "Signup" : "Login"}
            </Link>
          </p>
        </div>
        <AuthForm title={title} cta={cta} mutation={mutation}/>
      </div>
    </main>
  );
}
