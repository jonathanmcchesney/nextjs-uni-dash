import { TRoot } from "../../../../types/graphql";
import { IUser } from "../../../../types/user";
import { IUserDocument, User } from "../../../../lib/mongodb/models/User";

export const resolvers = {
  Query: {
    getUsersForAuth: async (): Promise<IUserDocument[]> => {
      return await User.find({}, "id email");
    },
    getUsers: async (
      _: TRoot,
      _args: any,
      context: any
    ): Promise<IUserDocument[]> => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return await User.find();
    },
    getUser: async (
      _: TRoot,
      { id }: { id: string },
      context: any
    ): Promise<IUserDocument | null> => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      const user = await User.findOne({ id });

      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
  },

  Mutation: {
    createUser: async (
      _: TRoot,
      { name, email, age, major, universityId }: IUser,
      context: any
    ): Promise<IUserDocument> => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const newUser = new User({
        name,
        email,
        age,
        major,
        universityId,
      });

      return await newUser.save();
    },

    updateUser: async (
      _: TRoot,
      { id, name, email, age, major, universityId }: IUser,
      context: any
    ): Promise<IUserDocument | null> => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const updatedUser = await User.findOneAndUpdate(
        { id },
        {
          name,
          email,
          age,
          major,
          universityId,
        },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser;
    },

    deleteUser: async (
      _: TRoot,
      { id }: { id: string },
      context: any
    ): Promise<IUserDocument | null> => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const deletedUser = await User.findOneAndDelete({ id });
      if (!deletedUser) {
        throw new Error("User not found");
      }

      return deletedUser;
    },
  },
};
