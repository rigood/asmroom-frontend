import { gql, useQuery } from "@apollo/client";
import {
  SearchEpisodesQuery,
  SearchEpisodesQueryVariables,
} from "../__generated__/graphql";

export const SEARCH_EPISODES_QUERY = gql`
  query searchEpisodes($searchEpisodesInput: SearchEpisodesInput!) {
    searchEpisodes(input: $searchEpisodesInput) {
      ok
      error
      episodes {
        id
        title
        description
        youtubeId
        createdAt
      }
      totalCount
    }
  }
`;

export const useSearchEpisodes = (query: string) => {
  return useQuery<SearchEpisodesQuery, SearchEpisodesQueryVariables>(
    SEARCH_EPISODES_QUERY,
    {
      skip: query === "",
      variables: { searchEpisodesInput: { query } },
    }
  );
};
