import React from "react";
import { render, screen } from "@testing-library/react";
import ApolloProviderWrapper from "../ApolloProviderWrapper";
import { useApollo } from "../../../lib/apollo/client";
import "@testing-library/jest-dom";

jest.mock("../../../lib/apollo/client", () => ({
  useApollo: jest.fn(),
}));

describe("ApolloProviderWrapper", () => {
  it("renders the ApolloProvider and children correctly", () => {
    const mockApolloClient = {};

    (useApollo as jest.Mock).mockReturnValue(mockApolloClient);

    render(
      <ApolloProviderWrapper pageProps={{}}>
        <div>Test Component</div>
      </ApolloProviderWrapper>
    );

    expect(useApollo).toHaveBeenCalledWith({});
    expect(screen.getByText("Test Component")).toBeInTheDocument();
  });
});
