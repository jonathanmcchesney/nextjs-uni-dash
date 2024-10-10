import { TRoot } from "@/types/graphql";
import { timetables } from "../__data__/timetable.mocks";

const getTimetableForUserId = (userId: string) => {
  return (
    timetables?.find((timetable) => timetable.userId === userId)?.timetable ||
    []
  );
};

const findTimetableByUserId = (userId: string) => {
  return timetables.find((timetable) => timetable.userId === userId);
};

export const resolvers = {
  Query: {
    getTimetable: (_: TRoot, { userId }: { userId: string }) => {
      return getTimetableForUserId(userId);
    },
  },

  Mutation: {
    addClass: (
      _: TRoot,
      {
        userId,
        classId,
        startTime,
        endTime,
        day,
      }: {
        userId: string;
        classId: string;
        startTime: string;
        endTime: string;
        day: string;
      }
    ) => {
      const newClass = {
        id: classId,
        startTime,
        endTime,
        day,
        name: "New Class",
        category: "class",
      };

      const userTimetable = findTimetableByUserId(userId);

      if (userTimetable) {
        userTimetable.timetable.push(newClass);
      } else {
        timetables.push({
          userId,
          timetable: [newClass],
        });
      }
      return newClass;
    },

    updateClass: (
      _: TRoot,
      {
        userId,
        classId,
        startTime,
        endTime,
        day,
      }: {
        userId: string;
        classId: string;
        startTime: string;
        endTime: string;
        day: string;
      }
    ) => {
      const userTimetable = findTimetableByUserId(userId);

      if (userTimetable) {
        const classItem = userTimetable.timetable.find(
          (classItem) => classItem.id === classId
        );
        if (classItem) {
          classItem.startTime = startTime;
          classItem.endTime = endTime;
          classItem.day = day;
        }
        return classItem || null;
      }
      return null;
    },
  },
};
