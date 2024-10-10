import { mergeTypeDefs } from "@graphql-tools/merge";

import { typeDefs as courseTypeDefs } from "./Course/Course";
import { typeDefs as userTypeDefs } from "./User/User";
import { typeDefs as taskTypeDefs } from "./Task/Task";
import { typeDefs as sharedTypeDefs } from "./shared/Types";
import { typeDefs as healthTypeDefs } from "./Health/Health";
import { typeDefs as universityTypeDefs } from "./University/University";
import { typeDefs as timetableTypeDefs } from "./Timetable/Timetable";

const typeDefs = mergeTypeDefs([
  sharedTypeDefs,
  courseTypeDefs,
  userTypeDefs,
  taskTypeDefs,
  healthTypeDefs,
  universityTypeDefs,
  timetableTypeDefs,
]);

export default typeDefs;
