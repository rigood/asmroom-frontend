import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Link } from "react-router-dom";
import styled from "styled-components";
import slideList from "../data/slideList";
import Slide from "../components/Slide";
import Container from "../components/Container";
import EpisodeListGrid from "../components/EpisodeListGrid";

SwiperCore.use([Autoplay, Pagination]);

const Home = () => {
  return (
    <>
      <CustomSwiper
        slidesPerView={1}
        allowTouchMove
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {slideList.map((props) => (
          <SwiperSlide key={props.youtubeId}>
            <Slide {...props} />
          </SwiperSlide>
        ))}
      </CustomSwiper>

      <Container paddingTop="60px">
        <ListTitle title="💎 Vito ASMR" channelId={4} />
        <EpisodeListGrid channelId={4} />
        <ListTitle title="✨ Myaling ASMR" channelId={2} />
        <EpisodeListGrid channelId={2} />
        <ListTitle title="🧸 Latte ASMR" channelId={3} />
        <EpisodeListGrid channelId={3} />
      </Container>
    </>
  );
};

export default Home;

const CustomSwiper = styled(Swiper)`
  .swiper-pagination-bullets {
    bottom: 30px;
    .swiper-pagination-bullet {
      background: ${({ theme }) => theme.white};
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.maxWidthDesktop}) {
    .swiper-pagination-bullets {
      bottom: 15px;
    }
  }
`;

interface ListTitleProps {
  title: string;
  channelId: number;
}

const ListTitle = ({ title, channelId }: ListTitleProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <SLink to={`/channels/${channelId}`}>더보기 &rarr;</SLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const Title = styled.h2`
  font-family: "pretendard600";
  font-size: 24px;
`;

const SLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.textInvertedColor};
`;
