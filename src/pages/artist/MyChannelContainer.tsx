import { gql, useQuery } from "@apollo/client";
import { MyChannelQuery } from "../../__generated__/graphql";
import Loading from "../../components/Loading";
import MyChannel from "./MyChannel";

export const MY_CHANNEL_QUERY = gql`
  query myChannel {
    myChannel {
      ok
      error
      channel {
        name
        category
        description
        photo
        artistId
        episodes {
          id
          title
          description
          youtubeId
          createdAt
        }
      }
    }
  }
`;

const MyChannelContainer = () => {
  const { data, loading, error, refetch } =
    useQuery<MyChannelQuery>(MY_CHANNEL_QUERY);

  if (!data || loading || error) return <Loading />;

  return <MyChannel {...data.myChannel.channel!} refetch={refetch} />;
};

export default MyChannelContainer;
