import { TRoot } from "@/types/graphql";
import {
  healthResources,
  mindfulnessTips,
  wellnessData,
} from "../__data__/health.mocks";
import { v4 as uuidv4 } from "uuid";
import { IWellness } from "@/types/health";

// istanbul ignore next
export const resolvers = {
  Query: {
    getMindfulnessTips: async () => {
      return mindfulnessTips;
    },

    getHealthResources: async () => {
      return healthResources;
    },

    getWellnessData: async (_: TRoot, { userId }: { userId: string }) => {
      return wellnessData.filter((entry) => entry.userId === userId);
    },
  },

  Mutation: {
    saveWellnessData: async (_: TRoot, { input }: { input: IWellness }) => {
      const { userId, mood, sleep, stress, date } = input;

      const newWellnessEntry = {
        id: uuidv4(),
        userId,
        mood,
        sleep,
        stress,
        date,
      };

      wellnessData.push(newWellnessEntry);

      return newWellnessEntry;
    },
  },
};
