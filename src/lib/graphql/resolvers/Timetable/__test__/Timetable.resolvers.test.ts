import { resolvers } from "../Timetable.resolvers";
import { timetables } from "../../__data__/timetable.mocks";
import { TRoot } from "@/types/graphql";

describe("Timetable Resolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    timetables.length = 0;
    timetables.push({
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
    });
  });

  describe("Query: getTimetable", () => {
    it("should return the correct timetable for a user", () => {
      const result = resolvers.Query.getTimetable(null as TRoot, {
        userId: "user-1",
      });

      expect(result).toEqual([
        {
          id: "class-1",
          startTime: "9:00 AM",
          endTime: "10:00 AM",
          day: "Monday",
          name: "Math 101",
          category: "class",
        },
      ]);
    });

    it("should return an empty array if the user has no timetable", () => {
      const result = resolvers.Query.getTimetable(null as TRoot, {
        userId: "user-2",
      });

      expect(result).toEqual([]);
    });
  });

  describe("Mutation: addClass", () => {
    it("should add a class to an existing user's timetable", () => {
      const newClass = resolvers.Mutation.addClass(null as TRoot, {
        userId: "user-1",
        classId: "class-2",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        day: "Monday",
      });

      expect(newClass).toEqual({
        id: "class-2",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        day: "Monday",
        name: "New Class",
        category: "class",
      });

      const userTimetable = timetables.find(
        (timetable) => timetable.userId === "user-1"
      );
      expect(userTimetable?.timetable.length).toBe(2);
      expect(userTimetable?.timetable[1]).toEqual(newClass);
    });

    it("should create a new timetable for a new user and add the class", () => {
      const newClass = resolvers.Mutation.addClass(null as TRoot, {
        userId: "user-2",
        classId: "class-3",
        startTime: "2:00 PM",
        endTime: "3:00 PM",
        day: "Tuesday",
      });

      expect(newClass).toEqual({
        id: "class-3",
        startTime: "2:00 PM",
        endTime: "3:00 PM",
        day: "Tuesday",
        name: "New Class",
        category: "class",
      });

      const userTimetable = timetables.find(
        (timetable) => timetable.userId === "user-2"
      );
      expect(userTimetable?.timetable.length).toBe(1);
      expect(userTimetable?.timetable[0]).toEqual(newClass);
    });
  });

  describe("Mutation: updateClass", () => {
    it("should update the class details if the class exists", () => {
      const updatedClass = resolvers.Mutation.updateClass(null as TRoot, {
        userId: "user-1",
        classId: "class-1",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        day: "Tuesday",
      });

      expect(updatedClass).toEqual({
        id: "class-1",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        day: "Tuesday",
        name: "Math 101",
        category: "class",
      });

      const userTimetable = timetables.find(
        (timetable) => timetable.userId === "user-1"
      );
      const updatedClassItem = userTimetable?.timetable.find(
        (classItem) => classItem.id === "class-1"
      );
      expect(updatedClassItem).toEqual(updatedClass);
    });

    it("should return null if the class does not exist", () => {
      const result = resolvers.Mutation.updateClass(null as TRoot, {
        userId: "user-1",
        classId: "non-existent-class",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        day: "Tuesday",
      });

      expect(result).toBeNull();
    });

    it("should return null if the user does not have a timetable", () => {
      const result = resolvers.Mutation.updateClass(null as TRoot, {
        userId: "user-3",
        classId: "class-1",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        day: "Tuesday",
      });

      expect(result).toBeNull();
    });
  });
});
