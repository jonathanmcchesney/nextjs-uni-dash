import { TRoot } from "../../../../types/graphql";
import { Wellness } from "../../../../lib/mongodb/models/Wellness";
import { IWellness } from "../../../../types/health";
import { v4 as uuidv4 } from "uuid";
import { MindfulnessTip } from "../../../../lib/mongodb/models/Mindfulness";
import { HealthResource } from "../../../../lib/mongodb/models/Health";

export const resolvers = {
  Query: {
    getMindfulnessTips: async () => {
      return await MindfulnessTip.find();
    },

    getHealthResources: async () => {
      return await HealthResource.find();
    },

    getWellnessData: async (_: TRoot, { userId }: { userId: string }) => {
      return await Wellness.find({ userId });
    },
  },

  Mutation: {
    saveWellnessData: async (_: TRoot, { input }: { input: IWellness }) => {
      const { userId, mood, sleep, stress, date } = input;

      const newWellnessEntry = new Wellness({
        id: uuidv4(),
        userId,
        mood,
        sleep,
        stress,
        date,
      });

      return await newWellnessEntry.save();
    },
  },
};
