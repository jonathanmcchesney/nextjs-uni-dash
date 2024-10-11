import { TRoot } from "../../../../types/graphql.ts";
import { courses } from "../__data__/course.mocks.ts";

// istanbul ignore next
export const resolvers = {
  Query: {
    getCourses: () => courses,
    getCourse: (_: TRoot, { id }: { id: string }) =>
      courses.find((course) => course.id === id) || null,
  },
  Mutation: {
    createCourse: (
      _: TRoot,
      {
        title,
        description,
        credits,
      }: { title: string; description: string; credits: number }
    ) => {
      const newCourse = {
        id: String(courses.length + 1),
        title,
        description,
        credits,
      };
      courses.push(newCourse);
      return newCourse;
    },
    updateCourse: (
      _: TRoot,
      {
        id,
        title,
        description,
        credits,
      }: { id: string; title: string; description: string; credits: number }
    ) => {
      const course = courses.find((course) => course.id === id);
      if (!course) return null;
      if (title) course.title = title;
      if (description) course.description = description;
      if (credits !== undefined) course.credits = credits;
      return course;
    },
    deleteCourse: (_: TRoot, { id }: { id: string }) => {
      const index = courses.findIndex((course) => course.id === id);
      if (index === -1) return null;
      const deletedCourse = courses.splice(index, 1)[0];
      return deletedCourse;
    },
  },
};
