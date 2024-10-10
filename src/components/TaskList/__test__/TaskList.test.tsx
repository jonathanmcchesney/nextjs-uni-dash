import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { TOGGLE_TASK_COMPLETION } from "../../../gql/taskQueries";
import TaskList from "../TaskList";
import { ITask } from "@/types/task";

const mockTasks: ITask[] = [
  {
    id: "task-1",
    userId: "1",
    title: "Task 1",
    completed: false,
  },
  {
    id: "task-2",
    userId: "1",
    title: "Task 2",
    completed: true,
  },
];

const mocks = [
  {
    request: {
      query: TOGGLE_TASK_COMPLETION,
      variables: { id: "task-1" },
    },
    result: {
      data: {
        toggleTaskCompletion: {
          id: "task-1",
          completed: true,
        },
      },
    },
  },
];

describe("TaskList", () => {
  const TaskListWithState = () => {
    const [tasks, setTasks] = useState(mockTasks);
    return <TaskList tasks={tasks} setTasks={setTasks} />;
  };

  it("renders the task list correctly", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TaskListWithState />
      </MockedProvider>
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();

    const task1Checkbox = screen.getByTestId("checkbox-task-1");
    const task2Checkbox = screen.getByTestId("checkbox-task-2");

    expect(task1Checkbox).not.toHaveClass("Mui-checked");
    expect(task2Checkbox).toHaveClass("Mui-checked");
  });

  it("toggles task completion when checkbox is clicked", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TaskListWithState />
      </MockedProvider>
    );

    const task1Checkbox = screen.getByTestId("checkbox-task-1");
    expect(task1Checkbox).not.toHaveClass("Mui-checked");

    fireEvent.click(task1Checkbox);

    expect(task1Checkbox).toHaveClass("Mui-checked");

    fireEvent.click(task1Checkbox);

    expect(task1Checkbox).not.toHaveClass("Mui-checked");
  });
});
