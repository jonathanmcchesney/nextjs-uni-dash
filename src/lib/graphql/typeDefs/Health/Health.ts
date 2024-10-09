import { gql } from "graphql-tag";

export const typeDefs = gql`
  type MindfulnessTip {
    id: ID
    title: String
    description: String
  }

  type HealthResource {
    id: ID
    name: String
    description: String
    contact: String
  }

  type Wellness {
    id: ID
    userId: ID
    mood: Int
    sleep: Int
    stress: Int
    date: String
  }

  input WellnessInput {
    userId: ID!
    mood: Int!
    sleep: Int!
    stress: Int!
    date: String!
  }

  type Query {
    getMindfulnessTips: [MindfulnessTip!]!

    getHealthResources: [HealthResource!]!

    getWellnessData(userId: ID!): [Wellness!]!
  }

  type Mutation {
    saveWellnessData(input: WellnessInput!): Wellness!
  }
`;
