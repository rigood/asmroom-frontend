import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChannel } from "../hooks/useChannel";
import Container from "../components/Container";
import EpisodeListGrid from "../components/EpisodeListGrid";

const Channel = () => {
  const { channelId } = useParams();

  const { data: channelData } = useChannel(+channelId!);
  const channelInfo = channelData?.channel.channel;

  const naviate = useNavigate();

  useEffect(() => {
    if (!channelId) {
      naviate("/");
    }
  }, [channelId, naviate]);

  return (
    <Container>
      <Title>채널정보</Title>
      <ChannelInfo>
        <>
          {channelInfo?.photo && (
            <img src={channelInfo?.photo} alt="채널 썸네일" />
          )}
          <div className="title">{channelInfo?.name}</div>
          <div className="createdAt">
            개설일: {channelInfo?.createdAt.substr(0, 10)}
          </div>
          <div className="category">
            <span>카테고리: </span>
            <em>{channelInfo?.category}</em>
          </div>
          {channelInfo?.description && (
            <div className="description">{channelInfo?.description}</div>
          )}
        </>
      </ChannelInfo>
      <Title>에피소드</Title>
      <EpisodeListGrid channelId={+channelId!} />
    </Container>
  );
};

export default Channel;

const Title = styled.h2`
  font-family: "pretendard600";
  font-size: 18px;
`;

const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-top: 20px;
  margin-bottom: 60px;
  max-width: 640px;
  padding: 16px;
  background: ${({ theme }) => theme.surface};
  border-radius: 10px;

  .title {
    font-family: "pretendard600";
    font-size: 24px;
    color: ${({ theme }) => theme.primary};
  }

  .createdAt {
    font-size: 14px;
    color: ${({ theme }) => theme.textInvertedColor};
  }

  .category {
    span {
      font-size: 14px;
      color: ${({ theme }) => theme.textInvertedColor};
    }
    em {
      width: fit-content;
      padding: 2px 4px;
      border-radius: 5px;
      background: ${({ theme }) => theme.primary};
      color: white;
      margin-left: 5px;
    }
  }

  .description {
    font-size: 14px;
    line-height: 1.5;
  }
`;
