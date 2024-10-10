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
