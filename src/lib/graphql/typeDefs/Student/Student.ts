import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Student {
    id: ID!
    name: String!
    age: Int!
    major: String!
  }

  type Query {
    getStudents: [Student]
    getStudent(id: ID!): Student
  }

  type Mutation {
    createStudent(name: String!, age: Int!, major: String!): Student
    updateStudent(id: ID!, name: String, age: Int, major: String): Student
    deleteStudent(id: ID!): Student
  }
`;
