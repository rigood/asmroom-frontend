import { forwardRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IconButtonProps {
  icon: IconProp;
  size?: number;
  title?: string;
  shouldFocus?: boolean;
  onClick?: () => void;
}

const IconButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  IconButtonProps
> = (props, ref) => {
  const { icon, size = 16, title = "", shouldFocus = false, onClick } = props;

  return (
    <Wrapper
      $size={size}
      title={title}
      onClick={onClick}
      ref={ref}
      $shouldFocus={shouldFocus}
    >
      <FontAwesomeIcon icon={icon} />
    </Wrapper>
  );
};

export default forwardRef<HTMLButtonElement, IconButtonProps>(IconButton);

const Wrapper = styled.button.attrs({
  type: "button",
})<{ $size: number; $shouldFocus: boolean }>`
  padding: ${({ $size }) => $size / 2 + "px"};
  border-radius: 50%;
  color: ${({ theme }) => theme.textColor};

  svg {
    font-size: ${({ $size }) => $size + "px"};
  }

  @media screen and (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ theme }) => theme.textColorBeforeHover};
    }

    &:focus {
      background: ${({ $shouldFocus, theme }) =>
        $shouldFocus && theme.textColorBeforeHover};
    }
  }
`;
