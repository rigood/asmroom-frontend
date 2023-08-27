import styled from "styled-components";

interface ContainerProps {
  children: React.ReactNode;
  paddingTop?: string;
}

const Container = ({ children, paddingTop = "40px" }: ContainerProps) => {
  return <Wrapper $paddingTop={paddingTop}>{children}</Wrapper>;
};

export default Container;

const Wrapper = styled.div<{ $paddingTop: string }>`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidthDesktop};
  margin: 0 auto;
  padding: 40px 16px;
  padding-top: ${({ $paddingTop }) => $paddingTop};
  display: flex;
  flex-direction: column;
`;
