import styled from "styled-components";
import { NavLink } from "react-router-dom";

const RoomNavBar = () => {
  return (
    <>
      <PageTitle>My Room</PageTitle>
      <Links>
        <SLink end to="">
          리뷰 목록
        </SLink>
      </Links>
    </>
  );
};

export default RoomNavBar;

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
