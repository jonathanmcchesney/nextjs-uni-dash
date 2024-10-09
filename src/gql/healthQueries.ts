import { gql } from "@apollo/client";

export const GET_WELLNESS_DATA = gql`
  query GetWellnessData($userId: ID!) {
    getWellnessData(userId: $userId) {
      id
      mood
      sleep
      stress
      date
    }
  }
`;

export const SAVE_WELLNESS_DATA = gql`
  mutation SaveWellnessData($input: WellnessInput!) {
    saveWellnessData(input: $input) {
      id
      userId
      mood
      sleep
      stress
      date
    }
  }
`;

export const GET_HEALTH_RESOURCES = gql`
  query GetHealthResources {
    getHealthResources {
      id
      name
      description
      contact
    }
  }
`;

export const GET_MINDFULNESS_TIPS = gql`
  query GetMindfulnessTips {
    getMindfulnessTips {
      id
      title
      description
    }
  }
`;
