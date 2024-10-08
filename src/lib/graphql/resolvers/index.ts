import { mergeResolvers } from "@graphql-tools/merge";

import { resolvers as courseResolvers } from "./Course/Course.resolvers";
import { resolvers as userResolvers } from "./User/User.resolvers";
import { resolvers as studentResolvers } from "./Student/Student.resolvers";
import { resolvers as taskResolvers } from "./Student/Task.resolvers";

// Merge all resolvers
export const resolvers = mergeResolvers([
  studentResolvers,
  userResolvers,
  courseResolvers,
  taskResolvers,
]);

export default resolvers;
