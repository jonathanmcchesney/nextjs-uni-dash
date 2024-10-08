import { TRoot } from "@/types/graphql.ts";
import { students } from "../__data__/student.mocks.ts";
import { v4 as uuidv4 } from "uuid";

// istanbul ignore next
export const resolvers = {
  Query: {
    getStudents: () => students,
    getStudent: (_: TRoot, { id }: { id: string }) =>
      students.find((student) => student.id === id),
  },
  Mutation: {
    createStudent: (
      _: TRoot,
      { name, age, major }: { name: string; age: number; major: string }
    ) => {
      const newStudent = { id: uuidv4(), name, age, major };
      students.push(newStudent);
      return newStudent;
    },
    updateStudent: (
      _: TRoot,
      {
        id,
        name,
        age,
        major,
      }: { id: string; name: string; age: number; major: string }
    ) => {
      const student = students.find((student) => student.id === id);
      if (!student) return null;
      if (name) student.name = name;
      if (age !== undefined) student.age = age;
      if (major) student.major = major;
      return student;
    },
    deleteStudent: (_: TRoot, { id }: { id: string }) => {
      const index = students.findIndex((student) => student.id === id);
      if (index === -1) return null;
      const deletedStudent = students.splice(index, 1)[0];
      return deletedStudent;
    },
  },
};
