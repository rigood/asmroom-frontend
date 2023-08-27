import { gql, useQuery } from "@apollo/client";
import { ChannelQuery, ChannelQueryVariables } from "../__generated__/graphql";

export const CHANNEL_QUERY = gql`
  query channel($channelInput: ChannelInput!) {
    channel(input: $channelInput) {
      ok
      error
      channel {
        id
        createdAt
        name
        category
        description
        photo
        artistId
      }
    }
  }
`;

export const useChannel = (channelId: number) => {
  return useQuery<ChannelQuery, ChannelQueryVariables>(CHANNEL_QUERY, {
    skip: !channelId,
    variables: { channelInput: { channelId } },
  });
};
