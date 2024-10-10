import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { GET_TASKS } from "../../../gql/taskQueries";
import OnboardingChecklist from "../../OnboardingChecklist/OnboardingChecklist";
import { ITask } from "../../../types/task";

const mockTasks: ITask[] = [
  { id: "1", title: "Task 1", completed: false, userId: "user-123" },
  { id: "2", title: "Task 2", completed: true, userId: "user-123" },
];

const mocks = [
  {
    request: {
      query: GET_TASKS,
      variables: { userId: "user-123" },
    },
    result: {
      data: {
        getTasks: mockTasks,
      },
    },
  },
];

const renderOnboardingChecklist = (mocks: any, userId = "user-123") => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <OnboardingChecklist userId={userId} />
    </MockedProvider>
  );
};

describe("OnboardingChecklist Component", () => {
  it("renders loading skeleton while fetching data", async () => {
    renderOnboardingChecklist([]);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders tasks when data is fetched", async () => {
    renderOnboardingChecklist(mocks);

    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });

    expect(screen.getByText("1 of 2 tasks completed")).toBeInTheDocument();
  });

  it("adds a new task when a new task title is submitted", async () => {
    renderOnboardingChecklist(mocks);

    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });

    const input = screen.getByLabelText(/new task/i);
    fireEvent.change(input, { target: { value: "New Task" } });

    const addButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(addButton);

    expect(
      screen.getByTestId("task-title-1").firstChild?.firstChild
    ).toMatchInlineSnapshot(`Task 1`);
  });

  it("renders when no tasks are returned", async () => {
    const emptyMocks = [
      {
        request: {
          query: GET_TASKS,
          variables: { userId: "user-123" },
        },
        result: {
          data: {
            getTasks: [],
          },
        },
      },
    ];

    renderOnboardingChecklist(emptyMocks);

    expect(screen.getByText("0 of 0 tasks completed"));
  });
});
