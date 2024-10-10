import { gql } from "@apollo/client";

export const GET_SCHEDULE = gql`
  query getTimetable($userId: ID!) {
    getTimetable(userId: $userId) {
      id
      name
      startTime
      endTime
      day
      category
    }
  }
`;

export const UPDATE_CLASS = gql`
  mutation UpdateClass(
    $userId: ID!
    $classId: ID!
    $startTime: String!
    $endTime: String!
    $day: String!
  ) {
    updateClass(
      userId: $userId
      classId: $classId
      startTime: $startTime
      endTime: $endTime
      day: $day
    ) {
      id
      name
      startTime
      endTime
      day
      category
    }
  }
`;

export const ADD_CLASS = gql`
  mutation AddClass(
    $userId: ID!
    $classId: ID!
    $startTime: String!
    $endTime: String!
    $day: String!
  ) {
    addClass(
      userId: $userId
      classId: $classId
      startTime: $startTime
      endTime: $endTime
      day: $day
    ) {
      id
      name
      startTime
      endTime
      day
      category
    }
  }
`;
