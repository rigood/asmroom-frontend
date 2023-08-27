import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <Wrapper>
      <Spinner icon={faSpinner} size="5x" spin />
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled(FontAwesomeIcon)``;
