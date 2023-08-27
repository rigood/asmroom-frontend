import { gql, useQuery } from "@apollo/client";
import { EpisodeQuery, EpisodeQueryVariables } from "../__generated__/graphql";

export const EPISODE_QUERY = gql`
  query episode($episodeInput: EpisodeInput!) {
    episode(input: $episodeInput) {
      ok
      error
      episode {
        id
        title
        description
        youtubeId
        createdAt
        channel {
          id
          name
          photo
        }
      }
    }
  }
`;

export const useEpisode = (episodeId: number) => {
  return useQuery<EpisodeQuery, EpisodeQueryVariables>(EPISODE_QUERY, {
    skip: !episodeId,
    variables: { episodeInput: { episodeId } },
  });
};
