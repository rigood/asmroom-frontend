import React from "react";
import styled from "styled-components";
import Label from "./Label";

interface TextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, required = true, ...props }, ref) => {
    return (
      <Wrapper>
        {label && <Label>{label}</Label>}
        <StyledTextarea ref={ref} {...props} />
      </Wrapper>
    );
  }
);

export default Textarea;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const StyledTextarea = styled.textarea`
  resize: none;
  background: ${({ theme }) => theme.surface};
  border-radius: 5px;
  padding: 16px;

  &:focus {
    outline: ${({ theme }) => `1px solid ${theme.primary}`};
  }
`;
