import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri:
      "https://api.studio.thegraph.com/query/10965/social-app/version/latest", // URL to the GraphQL endpoint of your subgraph
  }),
  cache: new InMemoryCache(),
});

export default client;
