import { gql, useQuery } from "@apollo/client";
import { AllEpisodesQuery } from "../__generated__/graphql";

export const ALL_EPISODES_QUERY = gql`
  query allEpisodes {
    allEpisodes {
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

export const useAllEpisodes = () => {
  return useQuery<AllEpisodesQuery>(ALL_EPISODES_QUERY);
};
