import { gql, useQuery } from "@apollo/client";
import {
  SearchReviewsQuery,
  SearchReviewsQueryVariables,
} from "../__generated__/graphql";

export const SEARCH_REVIEWS_QUERY = gql`
  query searchReviews($searchReviewsInput: SearchReviewsInput!) {
    searchReviews(input: $searchReviewsInput) {
      ok
      error
      reviews {
        id
        createdAt
        text
        rating
        episodeId
        reviewer {
          nickname
        }
      }
      totalCount
    }
  }
`;

interface useSearchReviewsArgs {
  episodeId?: number;
  reviewerId?: number;
}

export const useSearchReviews = ({
  episodeId,
  reviewerId,
}: useSearchReviewsArgs) => {
  return useQuery<SearchReviewsQuery, SearchReviewsQueryVariables>(
    SEARCH_REVIEWS_QUERY,
    {
      variables: {
        searchReviewsInput: {
          episodeId,
          reviewerId,
        },
      },
    }
  );
};
