import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface FormErrorMsgProps {
  msg?: string;
}

const FormErrorMsg = ({ msg }: FormErrorMsgProps) => {
  return (
    <Wrapper>
      <FontAwesomeIcon icon={faCircleExclamation} />
      {msg}
    </Wrapper>
  );
};

export default FormErrorMsg;

const Wrapper = styled.div`
  margin-top: -20px;
  margin-bottom: 30px;
  padding: 0 5px;
  color: ${({ theme }) => theme.primary};
  font-size: 14px;

  svg {
    margin-right: 5px;
  }
`;
