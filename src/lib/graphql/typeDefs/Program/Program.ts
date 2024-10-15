import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Course {
    id: ID!
    title: String!
    description: String!
    credits: Int!
  }

  type Program {
    id: ID!
    name: String!
    courses: [Course!]!
    userId: ID!
  }

  type Query {
    getProgramsByStudent(userId: ID!): [Program!]!
  }

  type Mutation {
    addProgramToStudent(
      userId: ID!
      name: String!
      courses: [CourseInput!]!
    ): Program!
  }

  input CourseInput {
    title: String!
    description: String!
    credits: Int!
  }
`;
