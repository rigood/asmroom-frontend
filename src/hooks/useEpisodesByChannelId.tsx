import { gql, useQuery } from "@apollo/client";
import {
  EpisodesQuery,
  EpisodesQueryVariables,
} from "../__generated__/graphql";

export const EPISODES_QUERY = gql`
  query episodes($episodesInput: EpisodesInput!) {
    episodes(input: $episodesInput) {
      ok
      error
      episodes {
        id
        title
        description
        youtubeId
        createdAt
      }
    }
  }
`;

export const useEpisodesByChannelId = (channelId: number) => {
  return useQuery<EpisodesQuery, EpisodesQueryVariables>(EPISODES_QUERY, {
    variables: { episodesInput: { channelId } },
  });
};
