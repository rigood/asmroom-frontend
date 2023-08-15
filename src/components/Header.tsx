import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useAnimation,
  useMotionValueEvent,
} from "framer-motion";
import {
  faMagnifyingGlass,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  HEADER_HEIGHT,
  HEADER_INITIAL,
  HEADER_SCROLL,
  LOCALSTORAGE_TOKEN,
} from "../constants";
import { useReactiveVar } from "@apollo/client";
import { authTokenVar, isLoggedInVar } from "../apollo";
import AppTitle from "./AppTitle";
import IconButton from "./IconButton";

const Header = () => {
  const { scrollY } = useScroll();
  const scrollAnimation = useAnimation();
  useMotionValueEvent(scrollY, "change", (latestScrollY) => {
    if (latestScrollY > HEADER_HEIGHT) {
      scrollAnimation.start(HEADER_SCROLL);
    } else {
      scrollAnimation.start(HEADER_INITIAL);
    }
  });

  const [userDropdownMenuOpen, setUserDropdownMenuOpen] = useState(false);
  const toggleUserDropdownMenu = () => setUserDropdownMenuOpen((prev) => !prev);

  const userIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!userIconRef.current?.contains(e.target as Node)) {
        setUserDropdownMenuOpen(false);
      }
    };
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    authTokenVar(null);
    isLoggedInVar(false);
    navigate("/");
  };

  return (
    <Wrapper
      animate={scrollAnimation}
      variants={motionVariants}
      initial={HEADER_INITIAL}
    >
      <Container>
        <MobileMenu>
          <IconButton icon={faBars} title="메뉴" size={20} />
        </MobileMenu>
        <AppTitle />
        <LinkContainer>
          <LinkItem to="/">홈</LinkItem>
          <LinkItem to="/category">카테고리</LinkItem>
          <LinkItem to="/community">커뮤니티</LinkItem>
        </LinkContainer>
        <Menu>
          <IconButton icon={faMagnifyingGlass} title="검색" />
          <MenuItem>
            <IconButton
              icon={faUser}
              title="사용자"
              shouldFocus
              onClick={toggleUserDropdownMenu}
              ref={userIconRef}
            />
            <UserDropdownMenuWrapper
              open={userDropdownMenuOpen}
              className={userDropdownMenuOpen ? "active" : "inactive"}
            >
              <UserDropdownMenu>
                {isLoggedIn ? (
                  <>
                    <UserStyles as={Link} to="/myprofile">
                      내 프로필
                    </UserStyles>
                    <UserStyles as="button" type="button" onClick={logout}>
                      로그아웃
                    </UserStyles>
                  </>
                ) : (
                  <>
                    <UserStyles as={Link} to="/login">
                      로그인
                    </UserStyles>
                    <UserStyles as={Link} to="/create-account">
                      회원가입
                    </UserStyles>
                  </>
                )}
              </UserDropdownMenu>
            </UserDropdownMenuWrapper>
          </MenuItem>
        </Menu>
      </Container>
    </Wrapper>
  );
};

export default Header;

const motionVariants = {
  initial: {
    background: "rgba(0,21,60,0)",
    backdropFilter: "blur(0px)",
  },
  scroll: {
    background: "rgba(0,21,60,0.8)",
    backdropFilter: "blur(3px)",
  },
};

const Wrapper = styled(motion.header)`
  width: 100%;
  height: ${({ theme }) => theme.headerHeight + "px"};
  position: fixed;
  top: 0;
  z-index: 990;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 16px;

  @media screen and (max-width: 1100px) {
    justify-content: space-between;
  }
`;

const MobileMenu = styled.div`
  display: none;
`;

const LinkContainer = styled.div`
  flex: 1;
  margin-left: 40px;
  display: flex;
  column-gap: 20px;
  font-family: "Pretendard400";
  font-size: 16px;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const LinkItem = styled(NavLink)`
  padding: 5px;
  color: ${({ theme }) => theme.textColorBeforeHover};

  &.active {
    color: ${({ theme }) => theme.textColor};
  }

  @media screen and (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.textColor};
    }
  }
`;

const Menu = styled.nav`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const MenuItem = styled.div`
  position: relative;
`;

const UserDropdownMenuWrapper = styled.div<{ open: boolean }>`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  width: 120px;
  z-index: 999;
  background: ${({ theme }) => theme.bgColor};
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 21, 60, 0);

  &.active {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
    transition: all 0.5s ease;
  }

  &.inactive {
    visibility: hidden;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s ease;
  }
`;

const UserDropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 8px;
`;

const UserStyles = styled.div<{ as: string }>`
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 5px;
  text-align: ${({ as }) => as === "button" && "left"};

  @media screen and (hover: hover) and (pointer: fine) {
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.textColor};
      background: ${({ theme }) => theme.textColorBeforeHover};
    }
  }
`;
