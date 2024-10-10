import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProgressTracker from "../ProgressTracker";

describe("ProgressTracker", () => {
  it("renders when there are no tasks", () => {
    render(<ProgressTracker tasks={[]} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
    expect(screen.getByText("0 of 0 tasks completed")).toBeInTheDocument();
  });

  it("renders the progress tracker with a percentage complete when some tasks are completed", () => {
    const tasks = [
      { completed: true },
      { completed: false },
      { completed: true },
    ];
    render(<ProgressTracker tasks={tasks} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "67"
    );
    expect(screen.getByText("2 of 3 tasks completed")).toBeInTheDocument();
  });

  it("renders 100% progress when all tasks are completed", () => {
    const tasks = [
      { completed: true },
      { completed: true },
      { completed: true },
    ];
    render(<ProgressTracker tasks={tasks} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100"
    );
    expect(screen.getByText("3 of 3 tasks completed")).toBeInTheDocument();
  });

  it("renders 0% progress when no tasks are completed", () => {
    const tasks = [{ completed: false }, { completed: false }];
    render(<ProgressTracker tasks={tasks} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
    expect(screen.getByText("0 of 2 tasks completed")).toBeInTheDocument();
  });
});
