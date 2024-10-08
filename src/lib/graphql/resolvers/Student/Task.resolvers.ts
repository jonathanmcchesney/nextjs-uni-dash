import { TRoot } from "@/types/graphql.ts";
import { tasks } from "../__data__/student.mocks.ts";
import { v4 as uuidv4 } from "uuid";

// istanbul ignore next
export const resolvers = {
  Query: {
    getTasks: (_: TRoot, { userId }: { userId: string }) =>
      tasks.filter((task) => task.userId === userId),
  },
  Mutation: {
    addTask: (
      _: TRoot,
      { id, title, userId }: { id: string; userId: string; title: string }
    ) => {
      const newTask = {
        id: id || uuidv4(),
        title,
        completed: false,
        userId,
      };
      tasks.push(newTask);
      return newTask;
    },
    toggleTaskCompletion: (_: TRoot, { id }: { id: string }) => {
      const task = tasks.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
        return task;
      }
      return {};
    },
  },
};
