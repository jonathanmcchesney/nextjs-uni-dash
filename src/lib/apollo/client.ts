import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { NormalizedCacheObject } from "@apollo/client";
import { useMemo } from "react";

export let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://localhost:3000/api/graphql",
      credentials: "same-origin",
    }),
    cache: new InMemoryCache(),
  });
};

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient; // For SSR
  if (!apolloClient) apolloClient = _apolloClient; // For CSR

  return _apolloClient;
}

export function useApollo(initialState?: NormalizedCacheObject | null) {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
