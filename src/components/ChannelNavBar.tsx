import styled from "styled-components";
import { NavLink } from "react-router-dom";

const ChannelNavBar = () => {
  return (
    <>
      <PageTitle>My Channel</PageTitle>
      <Links>
        <SLink end to="/channel/episodes">
          에피소드 목록
        </SLink>
        <SLink to="/channel/upload">에피소드 등록</SLink>
        <SLink end to="/channel/edit">
          채널 관리
        </SLink>
      </Links>
    </>
  );
};

export default ChannelNavBar;

const PageTitle = styled.h2`
  font-family: "Pretendard600";
  font-size: 24px;
  margin-bottom: 30px;
`;

const Links = styled.div`
  display: flex;
  column-gap: 20px;
`;

const SLink = styled(NavLink)`
  padding-bottom: 10px;
  color: ${({ theme }) => theme.textInvertedColor};
  cursor: pointer;

  &.active {
    color: ${({ theme }) => theme.textColor};
    border-bottom: 2px solid lightgray;
  }
`;
