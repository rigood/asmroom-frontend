import styled from "styled-components";
import { useSearchReviews } from "../hooks/useSearchReviews";
import { TotalCount } from "../pages/Search";
import { Link } from "react-router-dom";

interface ReviewsProps {
  episodeId?: number;
  reviewerId?: number;
}

const Reviews = ({ episodeId, reviewerId }: ReviewsProps) => {
  const { data: reviewData } = useSearchReviews({
    episodeId: episodeId,
    reviewerId: reviewerId,
  });

  const reviewTotalCount = reviewData?.searchReviews.totalCount;
  const reviewInfo = reviewData?.searchReviews.reviews;

  return (
    <Container>
      <TotalCount>
        총 <em>{reviewTotalCount}</em>개의 리뷰
      </TotalCount>
      <ReviewList>
        {reviewInfo?.map((review) => (
          <ReviewItem key={review.id}>
            <div className="col meta">
              <div className="reviewer">{review.reviewer.nickname}</div>
              <div className="createdAt">{review.createdAt.substr(0, 10)}</div>
            </div>
            <div className="col">
              <div className="rating">{"⭐".repeat(review.rating)}</div>
              <div className="text">{review.text}</div>
              {!episodeId && (
                <SLink to={`/episodes/${review.episodeId}`}>
                  에피소드 바로가기 &rarr;
                </SLink>
              )}
            </div>
          </ReviewItem>
        ))}
      </ReviewList>
    </Container>
  );
};

export default Reviews;

const Container = styled.div``;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  margin: 30px 0;
`;

const ReviewItem = styled.li`
  padding: 16px;
  background: ${({ theme }) => theme.surface};
  border-radius: 10px;
  display: grid;
  grid-template-columns: 100px auto;
  column-gap: 16px;

  .col {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  .meta {
    align-items: center;
  }

  .reviewer {
    --max-lines: 1;
    display: -webkit-box;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .createdAt {
    font-size: 12px;
    color: ${({ theme }) => theme.textInvertedColor};
  }

  .text {
    padding: 10px 5px;
  }
`;

const SLink = styled(Link)`
  width: fit-content;
  font-size: 14px;
  color: ${({ theme }) => theme.textInvertedColor};
  align-self: end;
`;
