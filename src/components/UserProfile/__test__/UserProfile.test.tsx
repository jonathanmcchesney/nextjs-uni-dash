import React, { Suspense } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { GET_USER } from "../../../gql/userQueries";
import { GET_UNIVERSITY } from "../../../gql/universityQueries";
import { UserProfile } from "../UserProfile";

const mockUser = {
  request: {
    query: GET_USER,
    variables: { id: "user-123" },
  },
  result: {
    data: {
      getUser: {
        name: "John Doe",
        email: "john.doe@example.com",
        age: 22,
        major: "Computer Science",
        universityId: "university-123",
      },
    },
  },
};

const mockUniversity = {
  request: {
    query: GET_UNIVERSITY,
    variables: { id: "university-123" },
  },
  result: {
    data: {
      getUniversity: {
        name: "Springfield University",
      },
    },
  },
};

const mocks = [mockUser, mockUniversity];

describe("UserProfile Component", () => {
  it("renders loading skeleton while fetching data", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Suspense fallback={<div>Loading...</div>}>
          <UserProfile userId="user-123" />
        </Suspense>
      </MockedProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
      expect(screen.getByText("22")).toBeInTheDocument();
      expect(screen.getByText("Springfield University")).toBeInTheDocument();
      expect(screen.getByText("Computer Science")).toBeInTheDocument();
    });
  });

  it("renders user and university data correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Suspense fallback={<div>Loading...</div>}>
          <UserProfile userId="user-123" />
        </Suspense>
      </MockedProvider>
    );

    await waitFor(() => {
      // Verify user data is displayed
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
      expect(screen.getByText("22")).toBeInTheDocument();
      expect(screen.getByText("Computer Science")).toBeInTheDocument();

      // Verify university data is displayed
      expect(screen.getByText("Springfield University")).toBeInTheDocument();
    });
  });

  it("renders skeletons while data is loading", async () => {
    render(
      <MockedProvider mocks={[]}>
        <Suspense fallback={<div>Loading...</div>}>
          <UserProfile userId="user-123" />
        </Suspense>
      </MockedProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders an error if the user data is missing", async () => {
    const mockErrorUser = {
      request: {
        query: GET_USER,
        variables: { id: "user-123" },
      },
      error: new Error("User not found"),
    };

    render(
      <MockedProvider mocks={[mockErrorUser]} addTypename={false}>
        <Suspense fallback={<div>Loading...</div>}>
          <UserProfile userId="user-123" />
        </Suspense>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });

  it("renders correctly with no university data", async () => {
    const mockNoUniversityUser = {
      request: {
        query: GET_USER,
        variables: { id: "user-123" },
      },
      result: {
        data: {
          getUser: {
            name: "John Doe",
            email: "john.doe@example.com",
            age: 22,
            major: "Computer Science",
            universityId: null,
          },
        },
      },
    };

    render(
      <MockedProvider mocks={[mockNoUniversityUser]} addTypename={false}>
        <Suspense fallback={<div>Loading...</div>}>
          <UserProfile userId="user-123" />
        </Suspense>
      </MockedProvider>
    );

    await waitFor(() => {
      // Verify user data is displayed
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
      expect(screen.getByText("22")).toBeInTheDocument();

      // Verify university data is not displayed
      expect(screen.queryByText("Springfield University")).not.toBeInTheDocument();
      expect(screen.queryByText("Computer Science")).not.toBeInTheDocument();
    });
  });
});
