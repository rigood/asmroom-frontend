import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";

const AppTitle = () => {
  const navigate = useNavigate();
  const moveToHome = () => navigate("/");

  return (
    <Wrapper onClick={moveToHome}>
      <FontAwesomeIcon icon={faHeadphones} />
      <strong>ASMR</strong>
      <span>oom</span>
    </Wrapper>
  );
};

export default AppTitle;

const Wrapper = styled.h1`
  display: flex;
  align-items: center;
  font-family: "Unbounded";
  color: ${({ theme }) => theme.textColor};
  user-select: none;
  cursor: pointer;

  svg {
    margin-right: 10px;
    font-size: 16px;
  }

  strong {
    font-size: 20px;
    letter-spacing: 4px;
  }

  span {
    font-size: 18px;
    letter-spacing: 2px;
    opacity: 0.3;
  }
`;
