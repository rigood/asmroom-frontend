import { forwardRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IconButtonProps {
  icon: IconProp;
  size?: number;
  title?: string;
  onClick?: () => void;
}

const IconButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  IconButtonProps
> = (props, ref) => {
  const { icon, size = 16, title = "", onClick } = props;

  return (
    <Wrapper size={size} title={title} onClick={onClick} ref={ref}>
      <FontAwesomeIcon icon={icon} />
    </Wrapper>
  );
};

export default forwardRef<HTMLButtonElement, IconButtonProps>(IconButton);

const Wrapper = styled.button.attrs({
  type: "button",
})<{ size: number }>`
  padding: ${({ size }) => size / 2 + "px"};
  border-radius: 50%;

  svg {
    font-size: ${({ size }) => size + "px"};
  }
`;
