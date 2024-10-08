import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Course {
    id: ID!
    title: String!
    description: String!
    credits: Int!
  }

  type Query {
    getCourses: [Course]
    getCourse(id: ID!): Course
  }

  type Mutation {
    createCourse(title: String!, description: String!, credits: Int!): Course
    updateCourse(id: ID!, title: String, description: String, credits: Int): Course
    deleteCourse(id: ID!): Course
  }
`;