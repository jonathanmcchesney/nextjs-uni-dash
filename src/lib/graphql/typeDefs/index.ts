import { mergeTypeDefs } from "@graphql-tools/merge";

import { typeDefs as courseTypeDefs } from "./Course/Course";
import { typeDefs as userTypeDefs } from "./User/User";
import { typeDefs as studentTypeDefs } from "./Student/Student";
import { typeDefs as taskTypeDefs } from "./Student/Task";
import { typeDefs as sharedTypeDefs } from "./shared/Types";
import { typeDefs as healthTypeDefs } from "./Health/Health";
import { typeDefs as universityTypeDefs } from "./University/University";

const typeDefs = mergeTypeDefs([
  studentTypeDefs,
  sharedTypeDefs,
  courseTypeDefs,
  userTypeDefs,
  taskTypeDefs,
  healthTypeDefs,
  universityTypeDefs
]);


export default typeDefs;
