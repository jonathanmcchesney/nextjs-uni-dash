import { Command } from "commander";
import { seedUsers } from "./seeds/user";
import { seedUniversities } from "./seeds/university";
import { seedTimetables } from "./seeds/timetable";
import { seedTasks } from "./seeds/task";
import {
  seedHealthResources,
  seedMindfulnessTips,
  seedWellnessData,
} from "./seeds/health";
import { seedPrograms } from "./seeds/program";

const program = new Command();

program
  .command("all")
  .description("Seed all databases")
  .action(async () => {
    try {
      await seedUsers(true, false);
      await seedUniversities(false, false);
      await seedPrograms(false, false);
      await seedTasks(false, false);
      await seedMindfulnessTips(false, false);
      await seedHealthResources(false, false);
      await seedWellnessData(false, false);
      await seedTimetables(false, true);
    } catch (error) {
      console.error("Error seeding all databases:", error);
    }
  });

program
  .command("health")
  .description("Seed the health, wellness and mindfulness databases")
  .action(async () => {
    try {
      await seedMindfulnessTips(true, false);
      await seedHealthResources(false, false);
      await seedWellnessData(false, true);
    } catch (error) {
      console.error("Error seeding task database:", error);
    }
  });

program
  .command("program")
  .description("Seed the program database")
  .action(async () => {
    try {
      await seedPrograms();
    } catch (error) {
      console.error("Error seeding program database:", error);
    }
  });

program
  .command("task")
  .description("Seed the task database")
  .action(async () => {
    try {
      await seedTasks();
    } catch (error) {
      console.error("Error seeding task database:", error);
    }
  });

program
  .command("timetable")
  .description("Seed the timetable database")
  .action(async () => {
    try {
      await seedUsers();
    } catch (error) {
      console.error("Error seeding timetable database:", error);
    }
  });

program
  .command("user")
  .description("Seed the user database")
  .action(async () => {
    try {
      await seedUsers();
    } catch (error) {
      console.error("Error seeding user database:", error);
    }
  });

program
  .command("university")
  .description("Seed the university database")
  .action(async () => {
    try {
      await seedUniversities();
    } catch (error) {
      console.error("Error seeding university database:", error);
    }
  });

program.parse(process.argv);
