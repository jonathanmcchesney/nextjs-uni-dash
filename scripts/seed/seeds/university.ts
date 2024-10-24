import mongoose from "mongoose";
import { University } from "@/lib/mongodb/models/University";
import connectDB from "@/lib/mongodb/mongodb";
import { customLog } from "../../utils/log";
import { universities } from "@/lib/graphql/resolvers/__data__/university.mocks";

export const seedUniversities = async (
  shouldConnect: boolean = true,
  shouldClose: boolean = false
) => {
  try {
    customLog("** Seeding University database... **\n", "magenta");

    if (shouldConnect) {
      customLog("[university] Connecting to DB...", "yellow");
      await connectDB();
      customLog("[university] Connected to DB!\n", "green");
    }

    customLog("[university] Deleting all university data...", "yellow");
    await University.deleteMany({});
    customLog("[university] Deleted all university data!\n", "green");

    customLog("[university] Inserting university data...", "yellow");
    await University.insertMany(universities);
    customLog("[university] Inserted university data!\n", "green");

    customLog("** University database successfully seeded! **\n", "cyan");
  } catch (error) {
    console.error("Error seeding the university database:", error);
  } finally {
    if (shouldClose) {
      await mongoose.connection.close();
    }
  }
};
