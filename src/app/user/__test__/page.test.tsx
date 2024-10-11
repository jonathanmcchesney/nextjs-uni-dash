import { render, screen, waitFor } from "@testing-library/react";
import UserPage from "../page";
import { MockedProvider } from "@apollo/client/testing";
import { GET_USER } from "../../../gql/userQueries";
import "@testing-library/jest-dom";
import { currentlyLoggedInUserId } from "../../../utils/constants";
import { GET_UNIVERSITY } from "../../../gql/universityQueries";

const mocks = [
  {
    request: {
      query: GET_USER,
      variables: { id: currentlyLoggedInUserId },
    },
    result: {
      data: {
        getUser: {
          id: currentlyLoggedInUserId,
          name: "John Doe",
          email: "john@example.com",
          age: 25,
          major: "Computer Science",
          universityId: "univ-123",
        },
      },
    },
  },
  {
    request: {
      query: GET_UNIVERSITY,
      variables: { id: "univ-123" },
    },
    result: {
      data: {
        getUniversity: {
          name: "Springfield University",
        },
      },
    },
  },
];

describe("UserPage", () => {
  it("renders the loading state and then the user profile", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserPage />
      </MockedProvider>
    );

    expect(screen.getByText("Loading user details...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });
});
