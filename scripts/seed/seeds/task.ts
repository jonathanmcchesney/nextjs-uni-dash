#!/usr/bin/env ts-node

import mongoose from "mongoose";
import { Task } from "../../../src/lib/mongodb/models/Task";
import connectDB from "../../../src/lib/mongodb/mongodb";
import { customLog } from "../../utils/log";
import { tasks } from "@/lib/graphql/resolvers/__data__/task.mocks";

export const seedTasks = async (
  shouldConnect: boolean = true,
  shouldClose: boolean = false
): Promise<void> => {
  try {
    customLog("** Seeding Task database... **\n", "magenta");

    if (shouldConnect) {
      customLog("[task] Connecting to DB...", "yellow");
      await connectDB();
      customLog("[task] Connected to DB!\n", "green");
    }

    customLog("[task] Deleting all tasks...", "yellow");
    await Task.deleteMany({});
    customLog("[task] Deleted all tasks!\n", "green");

    customLog("[task] Inserting tasks...", "yellow");
    await Task.insertMany(tasks);
    customLog("[task] Inserted tasks!\n", "green");

    customLog("** Task database successfully seeded! **\n", "cyan");
  } catch (error) {
    console.error("[task] Error seeding the task database:", error);
  } finally {
    if (shouldClose) {
      await mongoose.connection.close();
    }
  }
};
