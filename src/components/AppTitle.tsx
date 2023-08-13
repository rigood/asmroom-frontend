import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";

interface AppTitleProps {
  onClick?: () => void;
}
const AppTitle = ({ onClick }: AppTitleProps) => {
  return (
    <Wrapper onClick={onClick} $hasPointerCursor={Boolean(onClick)}>
      <FontAwesomeIcon icon={faHeadphones} />
      <strong>ASMR</strong>
      <span>oom</span>
    </Wrapper>
  );
};

export default AppTitle;

const Wrapper = styled.h1<{ $hasPointerCursor: boolean }>`
  display: flex;
  align-items: center;
  font-family: "Unbounded";
  user-select: none;
  cursor: ${({ $hasPointerCursor }) => $hasPointerCursor && "pointer"};

  svg {
    margin-right: 10px;
  }

  strong {
    font-size: 20px;
    letter-spacing: 4px;
  }

  span {
    font-size: 18px;
    opacity: 0.3;
    letter-spacing: 2px;
  }
`;
