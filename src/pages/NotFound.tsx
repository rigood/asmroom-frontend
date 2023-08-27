import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
  return (
    <Wrapper>
      <FontAwesomeIcon icon={faFaceSadTear} size="5x" color="#845EF7" />
      <Message>
        404 NOT FOUND <br /> 존재하지 않는 페이지입니다
      </Message>
      <SLink to="/">홈페이지로 이동</SLink>
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.div`
  min-height: ${({ theme }) => `calc(100vh - ${theme.headerHeight}px )`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
`;

const Message = styled.p`
  text-align: center;
  line-height: 1.5;
`;

const SLink = styled(Link)`
  color: ${({ theme }) => theme.textInvertedColor};
  text-decoration: underline;
`;
