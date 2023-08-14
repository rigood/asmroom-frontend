import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";

const AppTitle = () => {
  const navigate = useNavigate();
  const moveToHomePage = () => navigate("/");

  return (
    <Wrapper onClick={moveToHomePage}>
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
  user-select: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor};

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
