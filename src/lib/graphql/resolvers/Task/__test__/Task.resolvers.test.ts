import { resolvers } from "../Task.resolvers";
import { Task } from "../../../../../lib/mongodb/models/Task";
import { TRoot } from "../../../../../types/graphql";

jest.mock("../../../../../lib/mongodb/models/Task");

describe("Task Resolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getTasks", () => {
    it("should return tasks filtered by userId", async () => {
      const mockTasks = [
        {
          id: "task-1",
          title: "Task 1",
          completed: false,
          userId: "user-1",
        },
      ];

      (Task.find as jest.Mock).mockResolvedValue(mockTasks);

      const result = await resolvers.Query.getTasks(null as TRoot, {
        userId: "user-1",
      });

      expect(Task.find).toHaveBeenCalledWith({ userId: "user-1" });
      expect(result).toEqual(mockTasks);
    });

    it("should return an empty array if userId has no tasks", async () => {
      (Task.find as jest.Mock).mockResolvedValue([]);

      const result = await resolvers.Query.getTasks(null as TRoot, {
        userId: "non-existent-user",
      });

      expect(Task.find).toHaveBeenCalledWith({ userId: "non-existent-user" });
      expect(result).toEqual([]);
    });
  });

  describe("addTask", () => {
    it("should create a new task with generated id", async () => {
      const mockTask = {
        id: "mocked-uuid",
        title: "New Task",
        completed: false,
        userId: "user-3",
        save: jest.fn().mockResolvedValue({
          id: "mocked-uuid",
          title: "New Task",
          completed: false,
          userId: "user-3",
        }),
      };

      (Task as jest.MockedFunction<any>).mockImplementation(() => mockTask);

      const result = await resolvers.Mutation.addTask(null as TRoot, {
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

      expect(mockTask.save).toHaveBeenCalled();
    });

    it("should use provided id if given", async () => {
      const mockTask = {
        id: "custom-id",
        title: "New Task with Custom ID",
        completed: false,
        userId: "user-3",
        save: jest.fn().mockResolvedValue({
          id: "custom-id",
          title: "New Task with Custom ID",
          completed: false,
          userId: "user-3",
        }),
      };

      (Task as jest.MockedFunction<any>).mockImplementation(() => mockTask);

      const result = await resolvers.Mutation.addTask(null as TRoot, {
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

      expect(mockTask.save).toHaveBeenCalled();
    });
  });

  describe("toggleTaskCompletion", () => {
    it("should toggle the completed status of a task", async () => {
      const mockTask = {
        id: "task-1",
        title: "Task 1",
        completed: false,
        userId: "user-1",
        save: jest.fn().mockResolvedValue({
          id: "task-1",
          title: "Task 1",
          completed: true,
          userId: "user-1",
        }),
      };

      (Task.findById as jest.Mock).mockResolvedValue(mockTask);

      const result = await resolvers.Mutation.toggleTaskCompletion(
        null as TRoot,
        {
          id: "task-1",
        }
      );

      expect(Task.findById).toHaveBeenCalledWith("task-1");
      expect(result).toEqual({
        id: "task-1",
        title: "Task 1",
        completed: true,
        userId: "user-1",
      });

      expect(mockTask.save).toHaveBeenCalled();
    });

    it("should return null if the task is not found", async () => {
      (Task.findById as jest.Mock).mockResolvedValue(null);

      const result = await resolvers.Mutation.toggleTaskCompletion(
        null as TRoot,
        {
          id: "non-existent-task",
        }
      );

      expect(Task.findById).toHaveBeenCalledWith("non-existent-task");
      expect(result).toBeNull();
    });
  });
});
