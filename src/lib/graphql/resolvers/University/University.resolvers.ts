import { TRoot } from "@/types/graphql";
import { studentPrograms, universities } from "../__data__/university.mocks";

// istanbul ignore next
export const resolvers = {
  Query: {
    getUniversity: (_: TRoot, { id }: { id: string }) =>
      universities.find((uni) => uni.id === id),

    getProgramsByStudent: (_: TRoot, { studentId }: { studentId: string }) => {
      return (
        studentPrograms?.find(
          (studentProgram) => studentProgram?.studentId === studentId
        )?.programs || []
      );
    },

    getAllUniversities: () => universities,
  },
};
