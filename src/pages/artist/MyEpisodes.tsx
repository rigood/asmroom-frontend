import { useMe } from "../../hooks/useMe";
import Container from "../../components/Container";
import ChannelNavBar from "../../components/ChannelNavBar";
import Loading from "../../components/Loading";
import EpisodeListGrid from "../../components/EpisodeListGrid";

const MyEpisodes = () => {
  const { data: userData } = useMe(false);
  const channelId = userData?.me.channelId;

  if (!channelId) {
    return <Loading />;
  }

  return (
    <Container>
      <ChannelNavBar />
      <EpisodeListGrid channelId={channelId} />
    </Container>
  );
};

export default MyEpisodes;
