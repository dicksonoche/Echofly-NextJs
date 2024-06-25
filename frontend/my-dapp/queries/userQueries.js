import { gql } from "@apollo/client";

export const GET_USER_POSTS_OVER_TIME = gql`
  query GetUserPostsOverTime(
    $userId: ID!
    $startDate: BigInt!
    $endDate: BigInt!
  ) {
    userPostsCreateds(
      where: {
        user: $userId
        timestamp_gte: $startDate
        timestamp_lt: $endDate
      }
    ) {
      id
      timestamp
      content
    }
  }
`;

export const GET_QUERY_WITHDRAWALS_BY_USER = gql`
  query GetUserWithdrawals($userId: ID!) {
    etherWithdrawns(where: { owner: $userId }) {
      id
      amount
      timestamp
    }
  }
`;
