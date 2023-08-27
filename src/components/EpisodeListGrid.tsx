import styled from "styled-components";
import { useEpisodesByChannelId } from "../hooks/useEpisodesByChannelId";
import { useNavigate } from "react-router-dom";
import getYoutubeThumbnail from "../utils/getYoutubeThumbnail";

interface EpisodeListGridProps {
  channelId: number;
}

const EpisodeListGrid = ({ channelId }: EpisodeListGridProps) => {
  const { data } = useEpisodesByChannelId(channelId);
  const episodes = data?.episodes?.episodes;

  const navigate = useNavigate();
  const moveToEpisode = (episodeId: number) =>
    navigate(`/episodes/${episodeId}`);

  return (
    <Wrapper>
      {episodes?.slice(0, 3).map((episode) => (
        <EpisodeItem key={episode.id} onClick={() => moveToEpisode(episode.id)}>
          <Thumbnail>
            <img
              src={getYoutubeThumbnail(episode.youtubeId)}
              alt={episode.title}
            />
          </Thumbnail>
          <Info>
            <div className="title">{episode.title}</div>
            <div className="meta">
              <span className="createdAt">
                {episode.createdAt.substr(0, 10)}
              </span>
            </div>
            <div className="description">{episode.description}</div>
          </Info>
        </EpisodeItem>
      ))}
    </Wrapper>
  );
};

export default EpisodeListGrid;

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 40px;
  margin-top: 30px;
  margin-bottom: 60px;

  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const EpisodeItem = styled.li`
  background: ${({ theme }) => theme.surface};
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const Thumbnail = styled.div`
  width: 100%;

  img {
    width: 100%;
    display: block;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  row-gap: 10px;

  .title {
    font-size: 18px;
    font-family: "pretendard600";
    line-height: 1.2;
    --max-lines: 2;
    display: -webkit-box;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    color: ${({ theme }) => theme.textInvertedColor};
    font-size: 12px;
  }

  .description {
    color: ${({ theme }) => theme.textInvertedColor};
    font-size: 14px;
    line-height: 1.5;
    --max-lines: 2;
    display: -webkit-box;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
