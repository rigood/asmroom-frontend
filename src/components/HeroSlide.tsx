import styled from "styled-components";
import getYoutubeThumbnail from "../utils/getYoutubeThumbnail";

interface HeroSlideProps {
  youtubeId: string;
  title: string;
  desc: string;
}
const HeroSlide = ({ youtubeId, title, desc }: HeroSlideProps) => {
  return (
    <Wrapper url={getYoutubeThumbnail(youtubeId)}>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
    </Wrapper>
  );
};

export default HeroSlide;

const Wrapper = styled.div<{ url: string }>`
  height: 50vh;
  background: linear-gradient(rgba(59, 54, 101, 0.5), rgba(0, 0, 0, 1)),
    url(${({ url }) => url});
  background-size: cover;
  background-position: top;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 7% 5%;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    height: unset;
    aspect-ratio: 16 / 9;
    margin: 0;
    padding: 12% 5%;
  }
`;

const Title = styled.h2`
  font-family: "Pretendard600";
  font-size: 36px;
  opacity: 0.8;
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 5px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  opacity: 0.4;
  line-height: 1.2;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
