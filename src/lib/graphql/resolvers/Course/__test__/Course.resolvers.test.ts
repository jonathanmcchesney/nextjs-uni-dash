import { resolvers } from "../Course.resolvers";
import { courses } from "../../__data__/course.mocks";
import { TRoot } from "../../../../../types/graphql";

jest.mock("../../__data__/course.mocks", () => ({
  courses: [],
}));

describe("Course Resolvers", () => {
  beforeEach(() => {
    courses.length = 0;
    courses.push(
      {
        id: "1",
        title: "GraphQL 101",
        description: "Introduction to GraphQL",
        credits: 3,
      },
      {
        id: "2",
        title: "Node.js Basics",
        description: "Learn the basics of Node.js",
        credits: 4,
      }
    );
  });

  it("should fetch all courses", () => {
    const result = resolvers.Query.getCourses();
    expect(result).toEqual(courses);
  });

  it("should fetch a single course by id", () => {
    const result = resolvers.Query.getCourse(null as TRoot, { id: "1" });
    expect(result).toEqual(courses[0]);
  });

  it("should return null if course does not exist", () => {
    const result = resolvers.Query.getCourse(null as TRoot, { id: "999" });
    expect(result).toBeNull();
  });

  it("should create a new course", () => {
    const newCourse = {
      title: "React 101",
      description: "Introduction to React",
      credits: 3,
    };

    const result = resolvers.Mutation.createCourse(null as TRoot, newCourse);

    expect(result).toEqual({
      id: "3",
      ...newCourse,
    });

    expect(courses.length).toBe(3);
    expect(courses[2]).toEqual(result);
  });

  it("should update an existing course", () => {
    const updatedCourse = {
      id: "1",
      title: "Advanced GraphQL",
      description: "Deep dive into GraphQL",
      credits: 4,
    };

    const result = resolvers.Mutation.updateCourse(
      null as TRoot,
      updatedCourse
    );
    expect(result).toEqual(updatedCourse);
    expect(courses[0]).toEqual(updatedCourse);
  });

  it("should return null if trying to update a non-existent course", () => {
    const nonExistentCourse = {
      id: "999",
      title: "Non-existent course",
      description: "This course does not exist",
      credits: 3,
    };

    const result = resolvers.Mutation.updateCourse(
      null as TRoot,
      nonExistentCourse
    );
    expect(result).toBeNull();
  });

  it("should delete an existing course", () => {
    const result = resolvers.Mutation.deleteCourse(null as TRoot, { id: "1" });

    expect(result).toEqual({
      id: "1",
      title: "GraphQL 101",
      description: "Introduction to GraphQL",
      credits: 3,
    });

    expect(courses.length).toBe(1);
    expect(courses[0].id).toBe("2");
  });

  it("should return null when trying to delete a non-existent course", () => {
    const result = resolvers.Mutation.deleteCourse(null as TRoot, {
      id: "999",
    });
    expect(result).toBeNull();
  });
});
