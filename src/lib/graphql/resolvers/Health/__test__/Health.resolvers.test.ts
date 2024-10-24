import { resolvers } from "../Health.resolvers";
import { Wellness } from "../../../../../lib/mongodb/models/Wellness";
import { MindfulnessTip } from "../../../../../lib/mongodb/models/Mindfulness";
import { HealthResource } from "../../../../../lib/mongodb/models/Health";
import { TRoot } from "../../../../../types/graphql";
import { IWellness } from "../../../../../types/health";

jest.mock("../../../../../lib/mongodb/models/Wellness");
jest.mock("../../../../../lib/mongodb/models/Mindfulness");
jest.mock("../../../../../lib/mongodb/models/Health");

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

describe("Health Resolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getMindfulnessTips", () => {
    it("should return all mindfulness tips", async () => {
      const mockTips = [
        { id: "1", title: "Deep Breathing", description: "Take deep breaths." },
        { id: "2", title: "Body Scan", description: "Relax your body parts." },
      ];

      (MindfulnessTip.find as jest.Mock).mockResolvedValue(mockTips);

      const result = await resolvers.Query.getMindfulnessTips();
      expect(MindfulnessTip.find).toHaveBeenCalled();
      expect(result).toEqual(mockTips);
    });
  });

  describe("getHealthResources", () => {
    it("should return all health resources", async () => {
      const mockResources = [
        {
          id: "1",
          name: "Counseling",
          description: "Free services",
          contact: "123-456",
        },
        {
          id: "2",
          name: "Health Hotline",
          description: "24/7 support",
          contact: "987-654",
        },
      ];

      (HealthResource.find as jest.Mock).mockResolvedValue(mockResources);

      const result = await resolvers.Query.getHealthResources();
      expect(HealthResource.find).toHaveBeenCalled();
      expect(result).toEqual(mockResources);
    });
  });

  describe("getWellnessData", () => {
    it("should return wellness data filtered by userId", async () => {
      const mockWellnessData = [
        {
          id: "1",
          userId: "user-1",
          mood: 7,
          sleep: 8,
          stress: 5,
          date: "2024-01-01T12:00:00Z",
        },
      ];

      (Wellness.find as jest.Mock).mockResolvedValue(mockWellnessData);

      const result = await resolvers.Query.getWellnessData(null as TRoot, {
        userId: "user-1",
      });

      expect(Wellness.find).toHaveBeenCalledWith({ userId: "user-1" });
      expect(result).toEqual(mockWellnessData);
    });

    it("should return an empty array if no wellness data for userId", async () => {
      (Wellness.find as jest.Mock).mockResolvedValue([]);

      const result = await resolvers.Query.getWellnessData(null as TRoot, {
        userId: "user-999",
      });

      expect(Wellness.find).toHaveBeenCalledWith({ userId: "user-999" });
      expect(result).toEqual([]);
    });
  });

  describe("saveWellnessData", () => {
    it("should create a new wellness entry", async () => {
      const input: IWellness = {
        userId: "user-3",
        mood: 8,
        sleep: 7,
        stress: 6,
        date: "2024-01-03T12:00:00Z",
      };

      const mockWellnessEntry = {
        ...input,
        id: "mocked-uuid",
        save: jest.fn().mockResolvedValue({
          ...input,
          id: "mocked-uuid",
        }),
      };

      (Wellness as jest.MockedFunction<any>).mockImplementation(
        () => mockWellnessEntry
      );

      const result = await resolvers.Mutation.saveWellnessData(null as TRoot, {
        input,
      });

      expect(result).toEqual({
        ...input,
        id: "mocked-uuid",
      });

      expect(mockWellnessEntry.save).toHaveBeenCalled();
    });
  });
});
