import { TRoot } from "../../../../types/graphql.ts";
import { v4 as uuidv4 } from "uuid";
import { Task, ITask } from "../../../../lib/mongodb/models/Task";

export const resolvers = {
  Query: {
    getTasks: async (
      _: TRoot,
      { userId }: { userId: string }
    ): Promise<ITask[]> => {
      return Task.find({ userId });
    },
  },

  Mutation: {
    addTask: async (
      _: TRoot,
      { id, title, userId }: { id: string; userId: string; title: string }
    ): Promise<ITask> => {
      const newTask = new Task({
        id: id || uuidv4(),
        title,
        completed: false,
        userId,
      });

      return newTask.save();
    },

    toggleTaskCompletion: async (
      _: TRoot,
      { id }: { id: string }
    ): Promise<ITask | null> => {
      const task = await Task.findById(id);
      if (task) {
        task.completed = !task.completed;
        return task.save();
      }
      return null;
    },
  },
};
