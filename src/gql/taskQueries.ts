import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks($userId: ID!) {
    getTasks(userId: $userId) {
      id
      title
      completed
    }
  }
`;

export const ADD_TASK = gql`
  mutation AddTask($id: ID, $title: String!, $userId: ID!) {
    addTask(id: $id, title: $title, userId: $userId) {
      id
      title
      completed
    }
  }
`;

export const TOGGLE_TASK_COMPLETION = gql`
  mutation ToggleTaskCompletion($id: ID!) {
    toggleTaskCompletion(id: $id) {
      id
      completed
    }
  }
`;
