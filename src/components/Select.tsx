import React from "react";
import styled from "styled-components";

interface Option {
  label: React.ReactNode;
  value: number;
}

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
  options: Option[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, ...props }, ref) => {
    return (
      <Wrapper>
        {label && <Label>{label}</Label>}
        <StyledSelect ref={ref} {...props}>
          {options.map(({ label, value }) => (
            <StyledOption key={value} value={value}>
              {label}
            </StyledOption>
          ))}
        </StyledSelect>
      </Wrapper>
    );
  }
);
export default Select;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 10px;
`;

const Label = styled.label``;

const StyledSelect = styled.select``;

const StyledOption = styled.option``;
