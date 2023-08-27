import styled from "styled-components";

interface SubContainerProps {
  children: React.ReactNode;
  paddingBlock?: string;
}
const SubContainer = ({
  children,
  paddingBlock = "40px",
}: SubContainerProps) => {
  return <Wrapper $paddingBlock={paddingBlock}>{children}</Wrapper>;
};

export default SubContainer;

const Wrapper = styled.div<{ $paddingBlock: string }>`
  padding: 40px 0;
  padding-block: ${({ $paddingBlock }) => $paddingBlock};
  width: 100%;
  max-width: 640px;
`;
