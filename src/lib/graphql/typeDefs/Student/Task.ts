import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    id: ID
    title: String
    completed: Boolean
    userId: ID
  }

  type Query {
    getTasks(userId: ID!): [Task!]!
  }

  type Mutation {
    addTask(id: ID, title: String!, userId: ID!): Task!
    toggleTaskCompletion(id: ID!): Task!
  }
`;
