import { gql } from "@apollo/client";

export const GET_QUERY_WITHDRAWALS_BY_USER = gql`
  query GetUserWithdrawals($userId: ID!) {
    etherWithdrawns(where: { owner: $userId }) {
      id
      amount
      timestamp
    }
  }
`;

export const GET_USER_CONNECTIONS = gql`
  query GetUserConnections($userId: ID!) {
    user(id: $userId) {
      followers {
        id
        follower {
          id
          username
        }
      }
      following {
        id
        followee {
          id
          username
        }
      }
    }
  }
`;
