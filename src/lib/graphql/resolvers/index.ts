import { mergeResolvers } from "@graphql-tools/merge";

import { resolvers as programResolvers } from "./Program/Program.resolvers";
import { resolvers as userResolvers } from "./User/User.resolvers";
import { resolvers as taskResolvers } from "./Task/Task.resolvers";
import { resolvers as healthResolvers } from "./Health/Health.resolvers";
import { resolvers as universityResolvers } from "./University/University.resolvers";
import { resolvers as timetableResolvers } from "./Timetable/Timetable.resolvers";

export const resolvers = mergeResolvers([
  userResolvers,
  programResolvers,
  taskResolvers,
  healthResolvers,
  universityResolvers,
  timetableResolvers,
]);

export default resolvers;
