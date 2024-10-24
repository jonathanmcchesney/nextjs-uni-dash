#!/usr/bin/env ts-node

import mongoose from "mongoose";
import connectDB from "../../../src/lib/mongodb/mongodb";
import { customLog } from "../../utils/log";
import { Program } from "../../../src/lib/mongodb/models/Program";
import { studentPrograms } from "@/lib/graphql/resolvers/__data__/university.mocks";

export const seedPrograms = async (
  shouldConnect: boolean = true,
  shouldClose: boolean = false
): Promise<void> => {
  try {
    customLog("** Seeding Programs database... **\n", "magenta");

    if (shouldConnect) {
      customLog("[program] Connecting to DB...", "yellow");
      await connectDB();
      customLog("[program] Connected to DB!\n", "green");
    }

    customLog("[program] Deleting all programs...", "yellow");
    await Program.deleteMany({});
    customLog("[program] Deleted all programs!\n", "green");

    customLog("[program] Inserting programs...", "yellow");
    for (const student of studentPrograms) {
      for (const program of student.programs) {
        await Program.create({
          userId: student.userId,
          ...program,
        });
      }
    }
    customLog("[program] Inserted programs!\n", "green");

    customLog("** Programs database successfully seeded! **\n", "cyan");
  } catch (error) {
    console.error("[program] Error seeding the program database:", error);
  } finally {
    if (shouldClose) {
      await mongoose.connection.close();
    }
  }
};
