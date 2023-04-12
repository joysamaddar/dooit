import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
  defaultDataIdFromObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import authenticatedVar from "@/store/authenticated";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
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
