import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";

const Waiting = () => {
  return (
    <Wrapper>
      <FontAwesomeIcon icon={faHeadphones} size="5x" color="#845EF7" />
      <Message>
        Coming soon <br /> 조금만 기다려주세요!
      </Message>
    </Wrapper>
  );
};

export default Waiting;

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
