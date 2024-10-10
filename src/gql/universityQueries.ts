import { gql } from "@apollo/client";

export const GET_ALL_UNIVERSITIES = gql`
  query GetAllUniversities {
    getAllUniversities {
      id
      name
      description
      address
    }
  }
`;

export const GET_UNIVERSITY = gql`
  query GetUniversity($id: ID!) {
    getUniversity(id: $id) {
      id
      name
      description
      address
      faculty {
        id
        name
        department
        contact {
          email
          phone
        }
      }
      contact {
        email
        phone
      }
      programs {
        id
        name
        courses {
          id
          title
          description
          credits
        }
      }
      resourceLinks {
        name
        url
      }
    }
  }
`;

export const GET_PROGRAMS_BY_STUDENT = gql`
  query GetProgramsByStudent($userId: ID!) {
    getProgramsByStudent(userId: $userId) {
      id
      name
      courses {
        id
        title
        description
        credits
      }
    }
  }
`;
