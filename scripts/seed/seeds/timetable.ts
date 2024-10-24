#!/usr/bin/env ts-node

import mongoose from "mongoose";
import { Timetable } from "../../../src/lib/mongodb/models/Timetable"; // Ensure correct path to your Timetable model
import connectDB from "../../../src/lib/mongodb/mongodb";
import { customLog } from "../../utils/log";
import { timetables } from "../../../src/lib/graphql/resolvers/__data__/timetable.mocks"; // Update with the correct path to your mock data

export const seedTimetables = async (
  shouldConnect: boolean = true,
  shouldClose: boolean = false
): Promise<void> => {
  try {
    customLog("** Seeding Timetable database... **\n", "magenta");

    if (shouldConnect) {
      customLog("[timetable] Connecting to DB...", "yellow");
      await connectDB();
      customLog("[timetable] Connected to DB!\n", "green");
    }

    customLog("[timetable] Deleting all timetables...", "yellow");
    await Timetable.deleteMany({});
    customLog("[timetable] Deleted all timetables!\n", "green");

    customLog("[timetable] Inserting timetables...", "yellow");
    await Timetable.insertMany(timetables);
    customLog("[timetable] Inserted timetables!\n", "green");

    customLog("** Timetable database successfully seeded! **\n", "cyan");
  } catch (error) {
    console.error("[timetable] Error seeding the timetable database:", error);
  } finally {
    if (shouldClose) {
      await mongoose.connection.close();
    }
  }
};
