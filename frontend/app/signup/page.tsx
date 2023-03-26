import AuthPage from "../../components/Auth/AuthPage";

export const metadata = {
  title: "Signup",
};

export default function Login() {
  return (
    <main>
      <AuthPage
        title="Signup"
        heading="Level up your work."
        subheading="Discover our kanban board and take your work productivity to the next level."
        cta="Already have an account?"
      />
    </main>
  );
}
