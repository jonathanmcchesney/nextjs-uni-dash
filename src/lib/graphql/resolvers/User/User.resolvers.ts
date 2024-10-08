import { TRoot } from "@/types/graphql.ts";
import { users } from "../__data__/user.mocks.ts";
import { v4 as uuidv4 } from "uuid";

// istanbul ignore next
export const resolvers = {
  Query: {
    getUsers: () => users,
    getUser: (_: TRoot, { id }: { id: string }) =>
      users.find((user) => user.id === id),
  },
  Mutation: {
    createUser: (
      _: TRoot,
      { name, email, age }: { name: string; email: string; age: number }
    ) => {
      const newUser = { id: uuidv4(), name, email, age };
      users.push(newUser);
      return newUser;
    },
    updateUser: (
      _: TRoot,
      {
        id,
        name,
        email,
        age,
      }: { id: string; name: string; email: string; age: number }
    ) => {
      const user = users.find((user) => user.id === id);
      if (!user) return null;
      if (name) user.name = name;
      if (email) user.email = email;
      if (age !== undefined) user.age = age;
      return user;
    },
    deleteUser: (_: TRoot, { id }: { id: string }) => {
      const index = users.findIndex((user) => user.id === id);
      if (index === -1) return null;
      const deletedUser = users.splice(index, 1)[0];
      return deletedUser;
    },
  },
};
