import { resolvers } from "../Timetable.resolvers";
import { Timetable } from "../../../../../lib/mongodb/models/Timetable";
import { TRoot } from "../../../../../types/graphql";

jest.mock("../../../../../lib/mongodb/models/Timetable");

describe("Timetable Resolvers", () => {
  const mockTimetable = {
    userId: "user-1",
    timetable: [
      {
        id: "class-1",
        startTime: "9:00 AM",
        endTime: "10:00 AM",
        day: "Monday",
        name: "Math 101",
        category: "class",
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getTimetable", () => {
    it("should return the correct timetable for a user", async () => {
      (Timetable.findOne as jest.Mock).mockResolvedValue(mockTimetable);

      const result = await resolvers.Query.getTimetable(null as TRoot, {
        userId: "user-1",
      });

      expect(Timetable.findOne).toHaveBeenCalledWith({ userId: "user-1" });
      expect(result).toEqual(mockTimetable.timetable);
    });

    it("should return an empty array if the user has no timetable", async () => {
      (Timetable.findOne as jest.Mock).mockResolvedValue(null);

      const result = await resolvers.Query.getTimetable(null as TRoot, {
        userId: "user-2",
      });

      expect(Timetable.findOne).toHaveBeenCalledWith({ userId: "user-2" });
      expect(result).toEqual([]);
    });

    it("should throw an error if there is an issue fetching the timetable", async () => {
      (Timetable.findOne as jest.Mock).mockRejectedValue(new Error("Error"));

      await expect(
        resolvers.Query.getTimetable(null as TRoot, { userId: "user-1" })
      ).rejects.toThrow("Error fetching timetable");
    });
  });

  describe("addClass", () => {
    it("should add a class to an existing user's timetable", async () => {
      const newClass = {
        id: "class-2",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        day: "Monday",
        name: "New Class",
        category: "class",
      };

      const mockSave = jest.fn().mockResolvedValue(mockTimetable);
      (Timetable.findOne as jest.Mock).mockResolvedValue({
        ...mockTimetable,
        save: mockSave,
      });

      const result = await resolvers.Mutation.addClass(null as TRoot, {
        userId: "user-1",
        classId: "class-2",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        day: "Monday",
      });

      expect(Timetable.findOne).toHaveBeenCalledWith({ userId: "user-1" });
      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual(newClass);
    });

    it("should create a new timetable for a new user and add the class", async () => {
      const newClass = {
        id: "class-3",
        startTime: "2:00 PM",
        endTime: "3:00 PM",
        day: "Tuesday",
        name: "New Class",
        category: "class",
      };

      const mockSave = jest.fn().mockResolvedValue({
        userId: "user-2",
        timetable: [newClass],
      });
      (Timetable.findOne as jest.Mock).mockResolvedValue(null);
      (Timetable as jest.MockedFunction<any>).mockImplementationOnce(() => ({
        userId: "user-2",
        timetable: [newClass],
        save: mockSave,
      }));

      const result = await resolvers.Mutation.addClass(null as TRoot, {
        userId: "user-2",
        classId: "class-3",
        startTime: "2:00 PM",
        endTime: "3:00 PM",
        day: "Tuesday",
      });

      expect(Timetable.findOne).toHaveBeenCalledWith({ userId: "user-2" });
      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual(newClass);
    });

    it("should throw an error if there is an issue adding the class", async () => {
      (Timetable.findOne as jest.Mock).mockRejectedValue(new Error("Error"));

      await expect(
        resolvers.Mutation.addClass(null as TRoot, {
          userId: "user-1",
          classId: "class-2",
          startTime: "11:00 AM",
          endTime: "12:00 PM",
          day: "Monday",
        })
      ).rejects.toThrow("Error adding class");
    });
  });

  describe("updateClass", () => {
    it("should update the class details if the class exists", async () => {
      const updatedClass = {
        id: "class-1",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        day: "Tuesday",
        name: "Math 101",
        category: "class",
      };

      const mockSave = jest.fn().mockResolvedValue(mockTimetable);
      (Timetable.findOne as jest.Mock).mockResolvedValue({
        ...mockTimetable,
        save: mockSave,
      });

      const result = await resolvers.Mutation.updateClass(null as TRoot, {
        userId: "user-1",
        classId: "class-1",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        day: "Tuesday",
      });

      expect(Timetable.findOne).toHaveBeenCalledWith({ userId: "user-1" });
      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual(updatedClass);
    });

    it("should throw an error if the class does not exist", async () => {
      (Timetable.findOne as jest.Mock).mockResolvedValue(mockTimetable);

      await expect(
        resolvers.Mutation.updateClass(null as TRoot, {
          userId: "user-1",
          classId: "non-existent-class",
          startTime: "10:00 AM",
          endTime: "11:00 AM",
          day: "Tuesday",
        })
      ).rejects.toThrow("Class not found");
    });

    it("should throw an error if the user does not have a timetable", async () => {
      (Timetable.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        resolvers.Mutation.updateClass(null as TRoot, {
          userId: "user-3",
          classId: "class-1",
          startTime: "10:00 AM",
          endTime: "11:00 AM",
          day: "Tuesday",
        })
      ).rejects.toThrow("Timetable not found");
    });

    it("should throw an error if there is an issue updating the class", async () => {
      (Timetable.findOne as jest.Mock).mockRejectedValue(new Error("Error"));

      await expect(
        resolvers.Mutation.updateClass(null as TRoot, {
          userId: "user-1",
          classId: "class-1",
          startTime: "10:00 AM",
          endTime: "11:00 AM",
          day: "Tuesday",
        })
      ).rejects.toThrow("Error updating class");
    });
  });
});
