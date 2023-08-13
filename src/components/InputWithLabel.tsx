import React from "react";
import styled, { css } from "styled-components";

interface InputWithLabelProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, type = "text", required = true, ...props }, ref) => {
    return (
      <Wrapper>
        {label && <Label>{label}</Label>}
        <StyledInput ref={ref} type={type} {...props} />
      </Wrapper>
    );
  }
);

export default InputWithLabel;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const StyledInput = styled.input<{ type: string }>`
  padding: 16px;
  font-size: 16px;
  border: none;
  background: ${({ theme }) => theme.inputBgColor};
  border-radius: 5px;

  &:focus {
    outline: ${({ theme }) => `1px solid ${theme.primary}`};
  }

  ${({ type, theme }) =>
    type === "submit" &&
    css`
      background: ${theme.primary};
      margin-top: 15px;
      cursor: pointer;
      &:focus {
        border: none;
        outline: 1px solid ${({ theme }) => theme.white} !important;
      }
      &:disabled {
        background: ${theme.disabled};
      }
    `};
`;
