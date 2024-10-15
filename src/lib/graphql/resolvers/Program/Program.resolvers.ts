import { Program } from "../../../../lib/mongodb/models/Program";
import { TRoot } from "../../../../types/graphql";
import { IProgram } from "../../../../types/university";
import { v4 as uuidv4 } from "uuid";

export const resolvers = {
  Query: {
    getProgramsByStudent: async (
      _: TRoot,
      { userId }: { userId: string }
    ): Promise<IProgram[]> => {
      const programs = await Program.find({ userId });
      if (!programs.length) {
        throw new Error("No programs found for the student");
      }

      return programs;
    },
  },

  Mutation: {
    addProgramToStudent: async (
      _: TRoot,
      { userId, program }: { userId: string; program: IProgram }
    ): Promise<IProgram> => {
      const newProgram = new Program({
        ...program,
        id: program.id || uuidv4(),
        userId,
      });
      await newProgram.save();

      return newProgram;
    },
  },
};
