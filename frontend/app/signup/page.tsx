import AuthPage from "../../components/Auth/AuthPage";
import { gql } from "@apollo/client"

export const metadata = {
  title: "Signup",
};

const signup = gql`
mutation($username: String!, $password: String!){
  signup(createUserInput: {
    username: $username,
    password: $password
  }){
    _id
    username
  }
}
`

export default function Login() {
  return (
      <AuthPage
        title="Signup"
        heading="Level up your work."
        subheading="Discover our kanban board and take your work productivity to the next level."
        cta="Already have an account?"
        mutation={signup}
      />
  );
}
