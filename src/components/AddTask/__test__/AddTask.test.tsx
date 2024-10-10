import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { ADD_TASK } from "../../../gql/taskQueries";
import AddTask from "../../AddTask/AddTask";
import { ITask } from "@/types/task";
import { v4 as uuidv4 } from "uuid";

const mocks = [
  {
    request: {
      query: ADD_TASK,
      variables: {
        id: "mocked-uuid",
        title: "New Task",
        userId: "user-123",
        completed: false,
      },
    },
    result: {
      data: {
        addTask: {
          id: "mocked-uuid",
          title: "New Task",
          completed: false,
          userId: "user-123",
        },
      },
    },
  },
];

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

const AddTaskWithState = ({ userId }: { userId: string }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  return (
    <>
      <AddTask setTasks={setTasks} userId={userId} />
      <ul data-testid="task-list">
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </>
  );
};

describe("AddTask Component with State", () => {
  beforeEach(() => {
    (uuidv4 as jest.Mock).mockReturnValue("mocked-uuid");
  });

  it("renders input and button correctly", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddTaskWithState userId="user-123" />
      </MockedProvider>
    );

    expect(screen.getByLabelText(/new task/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add task/i })
    ).toBeInTheDocument();
  });

  it("adds a new task when clicking 'Add Task'", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddTaskWithState userId="user-123" />
      </MockedProvider>
    );

    const input = screen.getByLabelText(/new task/i);
    fireEvent.change(input, { target: { value: "New Task" } });

    const addButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(addButton);

    const taskList = screen.getByTestId("task-list");
    expect(taskList).toHaveTextContent("New Task");

    expect(input).toHaveValue("");
  });

  it("submits task when pressing Enter", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddTaskWithState userId="user-123" />
      </MockedProvider>
    );

    const input = screen.getByLabelText(/new task/i);

    fireEvent.change(input, { target: { value: "New Task" } });

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const taskList = screen.getByTestId("task-list");
    expect(taskList).toHaveTextContent("New Task");

    expect(input).toHaveValue("");
  });

  it("disables 'Add Task' button when input is empty", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddTaskWithState userId="user-123" />
      </MockedProvider>
    );

    const addButton = screen.getByRole("button", { name: /add task/i });

    expect(addButton).toBeDisabled();

    const input = screen.getByLabelText(/new task/i);
    fireEvent.change(input, { target: { value: "New Task" } });

    expect(addButton).toBeEnabled();
  });
});
