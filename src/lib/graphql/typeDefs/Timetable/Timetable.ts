import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Class {
    id: ID!
    name: String!
    startTime: String!
    endTime: String!
    day: String!
    category: String!
  }

  type Query {
    getTimetable(userId: ID!): [Class!]!
  }

  type Mutation {
    addClass(
      userId: ID!
      classId: ID!
      startTime: String!
      endTime: String!
      day: String!
    ): Class!
    updateClass(
      userId: ID!
      classId: ID!
      startTime: String!
      endTime: String!
      day: String!
    ): Class!
  }
`;
