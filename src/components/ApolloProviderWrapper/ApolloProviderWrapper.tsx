"use client";

import { ReactNode, Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/lib/apollo/client";

interface ApolloProviderWrapperProps {
  children: ReactNode;
  pageProps: any;
}

const ApolloProviderWrapper = ({
  children,
  pageProps,
}: ApolloProviderWrapperProps) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </ApolloProvider>
  );
};

export default ApolloProviderWrapper;
