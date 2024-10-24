import { mergeTypeDefs } from "@graphql-tools/merge";

import { typeDefs as programTypeDefs } from "./Program/Program";
import { typeDefs as userTypeDefs } from "./User/User";
import { typeDefs as taskTypeDefs } from "./Task/Task";
import { typeDefs as sharedTypeDefs } from "./shared/Types";
import { typeDefs as healthTypeDefs } from "./Health/Health";
import { typeDefs as universityTypeDefs } from "./University/University";
import { typeDefs as timetableTypeDefs } from "./Timetable/Timetable";

const typeDefs = mergeTypeDefs([
  sharedTypeDefs,
  programTypeDefs,
  userTypeDefs,
  taskTypeDefs,
  healthTypeDefs,
  universityTypeDefs,
  timetableTypeDefs,
]);

export default typeDefs;
