import { gql, useQuery } from "@apollo/client";
import {
  Category,
  SearchChannelsQuery,
  SearchChannelsQueryVariables,
} from "../__generated__/graphql";

export const SEARCH_CHANNELS_BY_CATEGORY = gql`
  query searchChannels($searchChannelsInput: SearchChannelsInput!) {
    searchChannels(input: $searchChannelsInput) {
      ok
      error
      channels {
        id
        name
        description
        photo
        category
      }
      totalCount
    }
  }
`;

export const useSearchChannelsByCategory = (category: Category | null) => {
  return useQuery<SearchChannelsQuery, SearchChannelsQueryVariables>(
    SEARCH_CHANNELS_BY_CATEGORY,
    {
      variables: { searchChannelsInput: { category } },
    }
  );
};
