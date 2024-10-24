import { TRoot } from "../../../../types/graphql";
import { Timetable } from "../../../../lib/mongodb/models/Timetable";
import { IClass } from "../../../../types/timetable";

export const resolvers = {
  Query: {
    getTimetable: async (_: TRoot, { userId }: { userId: string }) => {
      try {
        const userTimetable = await Timetable.findOne({ userId });
        return userTimetable?.timetable || [];
      } catch {
        throw new Error("Error fetching timetable");
      }
    },
  },

  Mutation: {
    addClass: async (
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
        name: "New Class",
        startTime,
        endTime,
        day,
        category: "class",
      };

      try {
        let userTimetable = await Timetable.findOne({ userId });

        if (userTimetable) {
          userTimetable.timetable.push(newClass);
        } else {
          userTimetable = new Timetable({
            userId,
            timetable: [newClass],
          });
        }

        await userTimetable.save();
        return newClass;
      } catch {
        throw new Error("Error adding class");
      }
    },

    updateClass: async (
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
      try {
        const userTimetable = await Timetable.findOne({ userId });
        if (userTimetable) {
          const classItem = userTimetable.timetable.find(
            (_classItem: IClass) => _classItem.id === classId
          );
          if (classItem) {
            classItem.startTime = startTime;
            classItem.endTime = endTime;
            classItem.day = day;

            await userTimetable.save();
            return classItem;
          } else {
            throw new Error("Class not found");
          }
        } else {
          throw new Error("Timetable not found");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(
            `Error updating class. Original error: ${error.message}`
          );
        } else {
          throw new Error("Unknown error occurred");
        }
      }
    },
  },
};
