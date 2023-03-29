import AuthPage from "../../components/Auth/AuthPage";
import { gql } from "@apollo/client"

export const metadata = {
  title: "Login",
};

const login = gql`
mutation($username: String!, $password: String!){
  login(username: $username, password: $password){
    access_token
    user{
      _id
      username
    }
  }
}
`

export default function Login() {
  return (
    <main>
      <AuthPage
        title="Login"
        heading="Welcome back!"
        subheading="Login to enjoy our full suite of tools."
        cta="Do not have an account?"
        mutation={login}
      />
    </main>
  );
}
