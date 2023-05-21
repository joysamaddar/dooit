import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import authenticatedVar from "@/store/authenticated";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors }) => {
  if (
    graphQLErrors?.length &&
    (graphQLErrors[0].extensions?.originalError as any)?.statusCode === 401
  ) {
    authenticatedVar(false);
  }
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Task: {
        keyFields: false,
      },
    },
  }),
});

export default client;
