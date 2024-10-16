#!/usr/bin/env ts-node

import mongoose from "mongoose";
import { User } from "../../../src/lib/mongodb/models/User";
import connectDB from "../../../src/lib/mongodb/mongodb";
import { customLog } from "../../utils/log";
import { users } from "../../../src/lib/graphql/resolvers/__data__/user.mocks";

export const seedUsers = async (
  shouldConnect: boolean = true,
  shouldClose: boolean = false
): Promise<void> => {
  try {
    customLog("** Seeding User database... **\n", "magenta");

    if (shouldConnect) {
      customLog("[user] Connecting to DB...", "yellow");
      await connectDB();
      customLog("[user] Connected to DB!\n", "green");
    }

    customLog("[user] Deleting all users...", "yellow");
    await User.deleteMany({});
    customLog("[user] Deleted all users!\n", "green");

    customLog("[user] Inserting users...", "yellow");
    await User.insertMany(users);
    customLog("[user] Inserted users!\n", "green");

    customLog("** User database successfully seeded! **\n", "cyan");
  } catch (error) {
    console.error("[user] Error seeding the user database:", error);
  } finally {
    if (shouldClose) {
      await mongoose.connection.close();
    }
  }
};
