import styled from "styled-components";
import Container from "../components/Container";
import Reviews from "../components/Reviews";

const ReviewsContainer = () => {
  return (
    <Container>
      <PageTitle>모든 리뷰</PageTitle>
      <Reviews />
    </Container>
  );
};

export default ReviewsContainer;

const PageTitle = styled.h2`
  margin-bottom: 30px;
  font-family: "pretendard600";
  font-size: 24px;
`;
