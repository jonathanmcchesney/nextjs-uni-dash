import { TRoot } from "@/types/graphql";
import { users } from "../__data__/user.mocks";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "@/types/user";

// istanbul ignore next
export const resolvers = {
  Query: {
    getUsersForAuth: () => {
      return users;
    },
    getUsers: (_: TRoot, _args: any, context: any) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return users;
    },
    getUser: (_: TRoot, { id }: { id: string }, context: any) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      const user = users.find((user) => user.id === id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
  },

  Mutation: {
    createUser: (
      _: TRoot,
      { name, email, age, major, universityId }: IUser,
      context: any
    ) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const newUser: IUser = {
        id: uuidv4(),
        name,
        email,
        age,
        major,
        universityId,
      };
      users.push(newUser);
      return newUser;
    },

    updateUser: (
      _: TRoot,
      { id, name, email, age, major, universityId }: IUser,
      context: any
    ) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const user = users.find((user) => user.id === id);
      if (!user) {
        throw new Error("User not found");
      }

      const updatedUser = {
        ...user,
        name: name ?? user.name,
        email: email ?? user.email,
        age: age ?? user.age,
        major: major ?? user.major,
        universityId: universityId ?? user.universityId,
      };

      Object.assign(user, updatedUser);
      return user;
    },

    deleteUser: (_: TRoot, { id }: { id: string }, context: any) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const index = users.findIndex((user) => user.id === id);
      if (index === -1) return null;
      const deletedUser = users.splice(index, 1)[0];
      return deletedUser;
    },
  },
};
