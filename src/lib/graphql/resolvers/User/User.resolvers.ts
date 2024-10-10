import { TRoot } from "@/types/graphql";
import { users } from "../__data__/user.mocks";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "@/types/user";

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
      { name, email, age, major, universityId }: IUser
    ) => {
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
      { id, name, email, age, major, universityId }: IUser
    ) => {
      const user = users.find((user) => user.id === id);
      if (!user) return null;

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
    deleteUser: (_: TRoot, { id }: { id: string }) => {
      const index = users.findIndex((user) => user.id === id);
      if (index === -1) return null;
      const deletedUser = users.splice(index, 1)[0];
      return deletedUser;
    },
  },
};
