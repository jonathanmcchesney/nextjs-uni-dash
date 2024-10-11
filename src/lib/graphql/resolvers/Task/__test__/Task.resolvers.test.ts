import { resolvers } from "../Task.resolvers";
import { tasks } from "../../__data__/student.mocks";
import { TRoot } from "@/types/graphql";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

describe("Task Resolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    tasks.length = 0;
    tasks.push(
      {
        id: "task-1",
        title: "Task 1",
        completed: false,
        userId: "user-1",
      },
      {
        id: "task-2",
        title: "Task 2",
        completed: true,
        userId: "user-2",
      }
    );
  });

  it("getTasks should return tasks filtered by userId", () => {
    const result = resolvers.Query.getTasks(null as TRoot, {
      userId: "user-1",
    });
    expect(result).toEqual([
      {
        id: "task-1",
        title: "Task 1",
        completed: false,
        userId: "user-1",
      },
    ]);
  });

  it("getTasks should return an empty array if userId has no tasks", () => {
    const result = resolvers.Query.getTasks(null as TRoot, {
      userId: "non-existent-user",
    });
    expect(result).toEqual([]);
  });

  it("addTask should create a new task with generated id", () => {
    const result = resolvers.Mutation.addTask(null as TRoot, {
      id: "",
      title: "New Task",
      userId: "user-3",
    });

    expect(result).toEqual({
      id: "mocked-uuid",
      title: "New Task",
      completed: false,
      userId: "user-3",
    });

    expect(tasks.length).toBe(3);
    expect(tasks[2]).toEqual({
      id: "mocked-uuid",
      title: "New Task",
      completed: false,
      userId: "user-3",
    });
  });

  it("addTask should use provided id if given", () => {
    const result = resolvers.Mutation.addTask(null as TRoot, {
      id: "custom-id",
      title: "New Task with Custom ID",
      userId: "user-3",
    });

    expect(result).toEqual({
      id: "custom-id",
      title: "New Task with Custom ID",
      completed: false,
      userId: "user-3",
    });

    expect(tasks.length).toBe(3);
    expect(tasks[2]).toEqual({
      id: "custom-id",
      title: "New Task with Custom ID",
      completed: false,
      userId: "user-3",
    });
  });

  it("toggleTaskCompletion should toggle the completed status of a task", () => {
    const result = resolvers.Mutation.toggleTaskCompletion(null as TRoot, {
      id: "task-1",
    });
    expect(result).toEqual({
      id: "task-1",
      title: "Task 1",
      completed: true,
      userId: "user-1",
    });

    expect(tasks[0].completed).toBe(true);
  });

  it("toggleTaskCompletion should return an empty object if task is not found", () => {
    const result = resolvers.Mutation.toggleTaskCompletion(null as TRoot, {
      id: "non-existent-task",
    });
    expect(result).toEqual({});
  });
});
