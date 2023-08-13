import React from "react";
import styled from "styled-components";

interface Option {
  label: React.ReactNode;
  value: string | number | string[];
}

interface SelectWithLabelProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
  options: Option[];
}

const SelectWithLabel = React.forwardRef<
  HTMLSelectElement,
  SelectWithLabelProps
>(({ label, options, ...props }, ref) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledSelect ref={ref} {...props}>
        {options.map(({ label, value }) => (
          <StyledOption value={value}>{label}</StyledOption>
        ))}
      </StyledSelect>
    </Wrapper>
  );
});
export default SelectWithLabel;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const StyledSelect = styled.select``;
const StyledOption = styled.option``;
