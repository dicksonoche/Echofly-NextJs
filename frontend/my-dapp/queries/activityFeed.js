import { gql } from "@apollo/client";

export const GET_RECENT_ACTIVITIES_OVER_TIME = gql`
  query GetRecentActivities($userId: ID!, $limit: Int!) {
    posts(
      orderBy: createdAt
      orderDirection: desc
      where: { user: $userId }
      first: $limit
    ) {
      id
      content
      createdAt
    }
    postCommenteds(
      orderBy: timestamp
      orderDirection: desc
      where: { user: $userId }
      first: $limit
    ) {
      id
      content
      timestamp
    }
    postLikeds(
      orderBy: timestamp
      orderDirection: desc
      where: { user: $userId }
      first: $limit
    ) {
      id
      timestamp
    }
  }
`;
