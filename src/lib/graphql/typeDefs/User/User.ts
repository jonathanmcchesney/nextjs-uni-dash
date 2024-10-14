import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    major: String
    universityId: String
  }

  type UserForAuth {
    id: ID!
    email: String!
  }

  type Query {
    getUsers: [User]
    getUsersForAuth: [UserForAuth]

    getUser(id: ID!): User
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      age: Int
      major: String
      universityId: String
    ): User

    updateUser(
      id: ID!
      name: String
      email: String
      age: Int
      major: String
      universityId: String
    ): User

    deleteUser(id: ID!): User
  }
`;
