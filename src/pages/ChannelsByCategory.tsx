import styled from "styled-components";
import { useState } from "react";

import Container from "../components/Container";
import { categoryList } from "./artist/MyChannel";
import { useSearchChannelsByCategory } from "../hooks/useSearchChannelsByCategory";
import { Category } from "../__generated__/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import DefaultThumbnailImage from "../assets/images/thumbnail.png";
import { Thumbnail } from "../components/EpisodeListGrid";
import { TotalCount } from "./Search";
import { useNavigate } from "react-router-dom";

const ChannelsByCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const { data } = useSearchChannelsByCategory(selectedCategory);
  const channels = data?.searchChannels.channels;

  const navigate = useNavigate();
  const moveToChannel = (channelId: number) =>
    navigate(`/channels/${channelId}`);

  return (
    <Container>
      <CategoryContainer>
        {categoryList.map((category) => (
          <CategoryItem
            key={category}
            selected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryItem>
        ))}
      </CategoryContainer>
      <Wrapper>
        <TotalCount>
          총 <em>{channels?.length}</em>개의 채널
        </TotalCount>
        {channels?.length === 0 && (
          <NoResult>
            <FontAwesomeIcon icon={faHeadphones} size="5x" color="#845EF7" />
            <div className="message">해당 카테고리 채널이 없습니다.</div>
          </NoResult>
        )}
        <ChannelList>
          {channels?.map((channel) => (
            <ChannelItem
              key={channel.id}
              onClick={() => moveToChannel(channel.id)}
            >
              <Thumbnail>
                <img
                  src={channel.photo || DefaultThumbnailImage}
                  alt={channel.name}
                />
              </Thumbnail>
              <Info>
                <div className="name">{channel.name}</div>
                <div className="description">
                  {channel.description || "소개글이 없습니다."}
                </div>
              </Info>
            </ChannelItem>
          ))}
        </ChannelList>
      </Wrapper>
    </Container>
  );
};

export default ChannelsByCategory;

const CategoryContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
`;

const CategoryItem = styled.li<{ selected: boolean }>`
  padding: 10px 20px;
  background: ${({ selected, theme }) =>
    selected ? theme.primary : theme.surface};
  border-radius: 5px;
  cursor: pointer;

  &:focus-visible {
    border: none;
    outline: 1px solid ${({ theme }) => theme.white};
  }
`;

const NoResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
  margin-top: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0;
`;

const ChannelList = styled.ul`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;

const ChannelItem = styled.li`
  padding: 16px;
  background: ${({ theme }) => theme.surface};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Info = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  .name {
    font-size: 18px;
    font-family: "pretendard600";
  }

  .description {
    font-size: 14px;
    color: ${({ theme }) => theme.textInvertedColor};
    line-height: 1.3;
    --max-lines: 2;
    display: -webkit-box;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
