import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      age
      major
      universityId
    }
  }
`;

export const GET_USERS_FOR_AUTH = gql`
  query GetUsersForAuth {
    getUsersForAuth {
      id
      email
    }
  }
`;
