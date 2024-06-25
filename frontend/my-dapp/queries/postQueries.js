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

export const GET_POSTS_INTERACTIONS_OVER_TIME = gql`
  query GetPostInteractions($postId: ID!) {
    post(id: $postId) {
      likesCount
      comments {
        id
      }
      likes {
        id
      }
    }
  }
`;
