#!/usr/bin/env ts-node

import mongoose from "mongoose";
import { Wellness } from "../../../src/lib/mongodb/models/Wellness";
import { MindfulnessTip } from "@/lib/mongodb/models/Mindfulness";
import { HealthResource } from "@/lib/mongodb/models/Health";
import connectDB from "../../../src/lib/mongodb/mongodb";
import { customLog } from "../../utils/log";
import {
  mindfulnessTips,
  healthResources,
  wellnessData,
} from "../../../src/lib/graphql/resolvers/__data__/health.mocks";

export const seedMindfulnessTips = async (
  shouldConnect: boolean = true,
  shouldClose: boolean = false
): Promise<void> => {
  try {
    customLog("** Seeding Mindfulness Tips database... **\n", "magenta");

    if (shouldConnect) {
      customLog("[mindfulness] Connecting to DB...", "yellow");
      await connectDB();
      customLog("[mindfulness] Connected to DB!\n", "green");
    }

    customLog("[mindfulness] Deleting all tips...", "yellow");
    await MindfulnessTip.deleteMany({});
    customLog("[mindfulness] Deleted all tips!\n", "green");

    customLog("[mindfulness] Inserting tips...", "yellow");
    await MindfulnessTip.insertMany(mindfulnessTips);
    customLog("[mindfulness] Inserted tips!\n", "green");

    customLog("** Mindfulness Tips database successfully seeded! **\n", "cyan");
  } catch (error) {
    console.error("[mindfulness] Error seeding the mindfulness tips:", error);
  } finally {
    if (shouldClose) {
      await mongoose.connection.close();
    }
  }
};

export const seedHealthResources = async (
  shouldConnect: boolean = true,
  shouldClose: boolean = false
): Promise<void> => {
  try {
    customLog("** Seeding Health Resources database... **\n", "magenta");

    if (shouldConnect) {
      customLog("[health] Connecting to DB...", "yellow");
      await connectDB();
      customLog("[health] Connected to DB!\n", "green");
    }

    customLog("[health] Deleting all resources...", "yellow");
    await HealthResource.deleteMany({});
    customLog("[health] Deleted all resources!\n", "green");

    customLog("[health] Inserting resources...", "yellow");
    await HealthResource.insertMany(healthResources);
    customLog("[health] Inserted resources!\n", "green");

    customLog("** Health Resources database successfully seeded! **\n", "cyan");
  } catch (error) {
    console.error("[health] Error seeding the health resources:", error);
  } finally {
    if (shouldClose) {
      await mongoose.connection.close();
    }
  }
};

export const seedWellnessData = async (
  shouldConnect: boolean = true,
  shouldClose: boolean = false
): Promise<void> => {
  try {
    customLog("** Seeding Wellness Data database... **\n", "magenta");

    if (shouldConnect) {
      customLog("[wellness] Connecting to DB...", "yellow");
      await connectDB();
      customLog("[wellness] Connected to DB!\n", "green");
    }

    customLog("[wellness] Deleting all data...", "yellow");
    await Wellness.deleteMany({});
    customLog("[wellness] Deleted all data!\n", "green");

    customLog("[wellness] Inserting data...", "yellow");
    await Wellness.insertMany(wellnessData);
    customLog("[wellness] Inserted data!\n", "green");

    customLog("** Wellness Data database successfully seeded! **\n", "cyan");
  } catch (error) {
    console.error("[wellness] Error seeding the wellness data:", error);
  } finally {
    if (shouldClose) {
      await mongoose.connection.close();
    }
  }
};
