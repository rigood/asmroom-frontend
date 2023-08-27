import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </>
  );
};

export default Layout;

const Wrapper = styled.div`
  margin-top: ${(props) => props.theme.headerHeight};
`;
