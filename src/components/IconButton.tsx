import { forwardRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IconButtonProps {
  icon: IconProp;
  title?: string;
  shouldFocus?: boolean;
  size?: number;
  type?: "button" | "submit";
  onClick?: () => void;
}

const IconButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  IconButtonProps
> = (props, ref) => {
  const {
    icon,
    title = "",
    shouldFocus = false,
    size = 16,
    type = "button",
    onClick,
  } = props;

  return (
    <Wrapper
      title={title}
      $shouldFocus={shouldFocus}
      $size={size}
      type={type}
      onClick={onClick}
      ref={ref}
    >
      <FontAwesomeIcon icon={icon} />
    </Wrapper>
  );
};

export default forwardRef<HTMLButtonElement, IconButtonProps>(IconButton);

const Wrapper = styled.button<{ $size: number; $shouldFocus: boolean }>`
  padding: ${({ $size }) => $size / 2 + "px"};
  border-radius: 50%;
  color: ${({ theme }) => theme.textColor};

  svg {
    font-size: ${({ $size }) => $size + "px"};
  }

  @media screen and (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ theme }) => theme.textInvertedColor};
    }

    &:focus {
      background: ${({ $shouldFocus, theme }) =>
        $shouldFocus && theme.textInvertedColor};
    }
  }
`;
