"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../../lib/apollo/client";

interface ApolloProviderWrapperProps {
  children: ReactNode;
  pageProps: any;
}

const ApolloProviderWrapper = ({
  children,
  pageProps,
}: ApolloProviderWrapperProps) => {
  const apolloClient = useApollo(pageProps);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
