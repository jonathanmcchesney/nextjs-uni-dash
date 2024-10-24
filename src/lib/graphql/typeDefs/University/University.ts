import { gql } from "graphql-tag";

export const typeDefs = gql`
  type University {
    id: ID!
    name: String!
    description: String
    address: String
    faculty: [Faculty!]!
    contact: ContactInfo!
    programs: [Program!]!
    resourceLinks: [ResourceLink!]!
  }

  type Faculty {
    id: ID!
    name: String!
    department: String!
    contact: ContactInfo
  }

  type ContactInfo {
    email: String!
    phone: String!
  }

  type Program {
    id: ID!
    name: String!
    courses: [Course!]!
  }

  type Course {
    id: ID!
    title: String!
    description: String!
    credits: Int!
  }

  type ResourceLink {
    name: String!
    url: String!
  }

  type Query {
    getUniversity(id: ID!): University

    getAllUniversities: [University!]!
  }
`;
