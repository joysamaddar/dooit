import AuthPage from "../../components/Auth/AuthPage";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <main>
      <AuthPage
        title="Login"
        heading="Welcome back!"
        subheading="Login to enjoy our full suite of tools."
        cta="Do not have an account?"
      />
    </main>
  );
}
