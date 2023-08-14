import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import heroSlideList from "../data/heroSlideList";
import HeroSlide from "../components/HeroSlide";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

SwiperCore.use([Autoplay, EffectCoverflow, Pagination]);

const Home = () => {
  return (
    <>
      <CustomSwiper
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        allowTouchMove
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        effect="coverflow"
        coverflowEffect={{
          slideShadows: false,
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
        }}
        breakpoints={{
          1100: {
            slidesPerView: 1.7,
            centeredSlides: true,
            coverflowEffect: {
              slideShadows: true,
              rotate: 5,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            },
          },
        }}
      >
        {heroSlideList.map(({ youtubeId, title, desc }) => (
          <SwiperSlide key={youtubeId}>
            <HeroSlide youtubeId={youtubeId} title={title} desc={desc} />
          </SwiperSlide>
        ))}
      </CustomSwiper>
    </>
  );
};

export default Home;

const CustomSwiper = styled(Swiper)`
  padding-top: 10px;

  .swiper-pagination-bullets {
    bottom: 30px;
    .swiper-pagination-bullet {
      background: ${({ theme }) => theme.white};
    }
  }

  @media screen and (max-width: 1100px) {
    padding-top: 0;
    .swiper-pagination-bullets {
      bottom: 10px;
    }
  }
`;
