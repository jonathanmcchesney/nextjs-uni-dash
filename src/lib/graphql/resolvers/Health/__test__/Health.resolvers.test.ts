import { resolvers } from "../Health.resolvers";
import {
  wellnessData,
  mindfulnessTips,
  healthResources,
} from "../../__data__/health.mocks";
import { TRoot } from "@/types/graphql";
import { IWellness } from "@/types/health";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

describe("Health Resolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    wellnessData.length = 0;
    wellnessData.push(
      {
        id: "1",
        userId: "user-1",
        mood: 7,
        sleep: 8,
        stress: 5,
        date: "2024-01-01T12:00:00Z",
      },
      {
        id: "2",
        userId: "user-2",
        mood: 6,
        sleep: 7,
        stress: 4,
        date: "2024-01-02T12:00:00Z",
      }
    );
  });

  it("getMindfulnessTips should return all mindfulness tips", async () => {
    const result = await resolvers.Query.getMindfulnessTips();
    expect(result).toEqual(mindfulnessTips);
  });

  it("getHealthResources should return all health resources", async () => {
    const result = await resolvers.Query.getHealthResources();
    expect(result).toEqual(healthResources);
  });

  it("getWellnessData should return wellness data filtered by userId", async () => {
    const result = await resolvers.Query.getWellnessData(null as TRoot, {
      userId: "user-1",
    });
    expect(result).toEqual([
      {
        id: "1",
        userId: "user-1",
        mood: 7,
        sleep: 8,
        stress: 5,
        date: "2024-01-01T12:00:00Z",
      },
    ]);
  });

  it("getWellnessData should return an empty array if no data for userId", async () => {
    const result = await resolvers.Query.getWellnessData(null as TRoot, {
      userId: "user-999",
    });
    expect(result).toEqual([]);
  });

  it("saveWellnessData should create a new wellness entry", async () => {
    const input: IWellness = {
      userId: "user-3",
      mood: 8,
      sleep: 7,
      stress: 6,
      date: "2024-01-03T12:00:00Z",
    };

    const result = await resolvers.Mutation.saveWellnessData(null as TRoot, {
      input,
    });

    expect(result).toEqual({
      ...input,
      id: "mocked-uuid",
    });

    expect(wellnessData.length).toBe(3);
    expect(wellnessData[2]).toEqual({
      ...input,
      id: "mocked-uuid",
    });
  });
});
