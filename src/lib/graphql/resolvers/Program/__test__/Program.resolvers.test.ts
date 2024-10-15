import { resolvers } from "../Program.resolvers";
import { Program } from "../../../../../lib/mongodb/models/Program";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

jest.mock("../../../../../lib/mongodb/models/Program");

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

jest.setTimeout(10000);

describe("Program Resolvers", () => {
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getProgramsByStudent", () => {
    it("should return programs for the given student", async () => {
      const mockPrograms = [
        {
          id: "program-1",
          name: "Physics",
          courses: [],
          userId: "user-1",
        },
      ];

      (Program.find as jest.Mock).mockResolvedValue(mockPrograms);

      const result = await resolvers.Query.getProgramsByStudent(null, {
        userId: "user-1",
      });

      expect(Program.find).toHaveBeenCalledWith({ userId: "user-1" });
      expect(result).toEqual(mockPrograms);
    });

    it("should throw an error if no programs are found", async () => {
      (Program.find as jest.Mock).mockResolvedValue([]);

      await expect(
        resolvers.Query.getProgramsByStudent(null, { userId: "user-2" })
      ).rejects.toThrow("No programs found for the student");
    });
  });

  describe("addProgramToStudent", () => {
    it("should add a program to a student", async () => {
      const mockProgramInput = {
        id: "mocked-uuid",
        name: "Chemistry",
        courses: [],
      };

      const mockProgramOutput = {
        id: "mocked-uuid",
        name: "Chemistry",
        courses: [],
        userId: "user-1",
      };

      (Program.prototype.save as jest.Mock).mockResolvedValue(
        mockProgramOutput
      );

      await resolvers.Mutation.addProgramToStudent(null, {
        userId: "user-1",
        program: mockProgramInput,
      });

      expect(Program).toHaveBeenCalledWith({
        ...mockProgramInput,
        id: "mocked-uuid",
        userId: "user-1",
      });
    });
  });
});
