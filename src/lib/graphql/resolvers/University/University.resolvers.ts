import { TRoot } from "@/types/graphql";
import { University, IUniversity } from "../../../../lib/mongodb/models/University";

export const resolvers = {
  Query: {
    getUniversity: async (
      _: TRoot,
      { id }: { id: string }
    ): Promise<IUniversity | null> => {
      const university = await University.findOne({ id });
      if (!university) {
        throw new Error("University not found");
      }

      return university;
    },

    getAllUniversities: async (): Promise<IUniversity[]> => {
      return University.find();
    },
  },
};
