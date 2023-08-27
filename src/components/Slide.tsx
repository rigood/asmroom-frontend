import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import getYoutubeThumbnail from "../utils/getYoutubeThumbnail";

interface SlideProps {
  youtubeId: string;
  title: string;
  desc: string;
  episodeId: number;
}

const Slide = ({ youtubeId, title, desc, episodeId }: SlideProps) => {
  const navigate = useNavigate();
  const moveToEpisode = () => navigate(`/episodes/${episodeId}`);

  return (
    <Wrapper $url={getYoutubeThumbnail(youtubeId)} onClick={moveToEpisode}>
      <Container>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
      </Container>
    </Wrapper>
  );
};

export default Slide;

const Wrapper = styled.div<{ $url: string }>`
  height: 60vh;
  position: relative;
  background: linear-gradient(rgba(59, 54, 101, 0.5), rgba(0, 0, 0, 1)),
    url(${({ $url }) => $url});
  background-size: cover;
  background-position: top;
  cursor: pointer;

  @media screen and (max-width: ${({ theme }) => theme.maxWidthDesktop}) {
    height: unset;
    aspect-ratio: 16 / 9;
    margin: 0;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidthDesktop};
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: ${({ theme }) => theme.maxWidthDesktop}) {
    padding: 0 5%;
  }
`;

const Title = styled.h2`
  font-family: "Pretendard600";
  font-size: 36px;
  opacity: 0.8;
  margin-bottom: 10px;

  @media screen and (max-width: ${({ theme }) => theme.maxWidthMobile}) {
    font-size: 18px;
    margin-bottom: 5px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  opacity: 0.4;
  line-height: 1.2;

  @media screen and (max-width: ${({ theme }) => theme.maxWidthMobile}) {
    font-size: 12px;
  }
`;
