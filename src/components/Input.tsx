import React from "react";
import styled, { css } from "styled-components";
import Label from "./Label";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  marginTop?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = "text",
      required = true,
      marginTop = "15px",

      ...props
    },
    ref
  ) => {
    return (
      <Wrapper>
        {label && <Label>{label}</Label>}
        <StyledInput ref={ref} type={type} $marginTop={marginTop} {...props} />
      </Wrapper>
    );
  }
);

export default Input;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const StyledInput = styled.input<{
  type: string;
  $marginTop?: string;
}>`
  background: ${({ theme }) => theme.surface};
  border-radius: 5px;
  padding: 16px;
  caret-color: ${({ theme }) => theme.primary};

  &:focus {
    outline: ${({ theme }) => `1px solid ${theme.primary}`};
  }

  ${({ type, theme, $marginTop }) =>
    type === "submit" &&
    css`
      margin-top: ${$marginTop};
      background: ${theme.primary};
      cursor: pointer;

      &:disabled {
        background: ${theme.disabled};
        cursor: initial;
      }

      &:focus {
        border: none;
        outline: 1px solid ${({ theme }) => theme.white} !important;
      }
    `};
`;
