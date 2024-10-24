import { gql } from "@apollo/client";

export const GET_PROGRAMS_BY_STUDENT = gql`
  query GetProgramsByStudent($userId: ID!) {
    getProgramsByStudent(userId: $userId) {
      id
      name
      courses {
        id
        title
        description
        credits
      }
    }
  }
`;

export const ADD_PROGRAM_TO_STUDENT = gql`
  mutation AddProgramToStudent(
    $userId: ID!
    $name: String!
    $courses: [CourseInput!]!
  ) {
    addProgramToStudent(userId: $userId, name: $name, courses: $courses) {
      id
      name
      courses {
        id
        title
        description
        credits
      }
    }
  }
`;
