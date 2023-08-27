import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { authTokenVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";
import { useMe } from "../hooks/useMe";
import { UserRole } from "../__generated__/graphql";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import AppTitle from "./AppTitle";
import IconButton from "./IconButton";

const Header = () => {
  // 드롭다운 메뉴 상태관리
  const [userDropdownMenuOpen, setUserDropdownMenuOpen] = useState(false);
  const toggleUserDropdownMenu = () => {
    if (userDropdownMenuOpen) return;
    setUserDropdownMenuOpen((prev) => !prev);
  };

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

  // 검색 페이지 이동
  const navigate = useNavigate();
  const moveToSearch = () => navigate("/search");

  // 로그인 정보, 로그아웃
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data: userData } = useMe(!isLoggedIn);

  const logout = () => {
    setUserDropdownMenuOpen(false);

    setTimeout(() => {
      localStorage.removeItem(LOCALSTORAGE_TOKEN);
      authTokenVar(null);
      isLoggedInVar(false);
      navigate("/");
    }, 300);
  };

  return (
    <Wrapper>
      <Container>
        <AppTitle />
        <NavLinkContainer>
          <SNavLink to="/">홈</SNavLink>
          <SNavLink to="/category">카테고리</SNavLink>
          <SNavLink to="/reviews">리뷰</SNavLink>
          {isLoggedIn && userData?.me.role === UserRole.Artist && (
            <SNavLink to="/channel/episodes">My Channel</SNavLink>
          )}
          {isLoggedIn && userData?.me.role === UserRole.Listener && (
            <SNavLink to={`/users/${userData?.me.id}/reviews`}>
              My Room
            </SNavLink>
          )}
        </NavLinkContainer>
        <IconButtonContainer>
          <IconButton
            icon={faMagnifyingGlass}
            title="검색"
            onClick={moveToSearch}
          />
          <IconButtonWrapper>
            <IconButton
              icon={faUser}
              title="사용자"
              onClick={toggleUserDropdownMenu}
              shouldFocus
              ref={userIconRef}
            />
            <UserDropdownMenuWrapper
              className={userDropdownMenuOpen ? "active" : "inactive"}
            >
              <UserDropdownMenu>
                {isLoggedIn ? (
                  <>
                    <UserMenu as={Link} to="/profile">
                      내 정보
                    </UserMenu>
                    <UserMenu as="button" type="button" onClick={logout}>
                      로그아웃
                    </UserMenu>
                  </>
                ) : (
                  <>
                    <UserMenu as={Link} to="/login">
                      로그인
                    </UserMenu>
                    <UserMenu as={Link} to="/create-account">
                      회원가입
                    </UserMenu>
                  </>
                )}
              </UserDropdownMenu>
            </UserDropdownMenuWrapper>
          </IconButtonWrapper>
        </IconButtonContainer>
      </Container>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  width: 100%;
  height: ${({ theme }) => theme.headerHeight};
  position: fixed;
  top: 0;
  z-index: 99;
  background: ${({ theme }) => theme.background};
  box-shadow: inset 0 -1px hsla(0, 0%, 100%, 0.1);
`;

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidthDesktop};
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 16px;

  @media screen and (max-width: ${({ theme }) => theme.maxWidthDesktop}) {
    justify-content: space-between;
  }
`;

const NavLinkContainer = styled.div`
  flex: 1;
  margin-left: 40px;
  display: flex;
  column-gap: 20px;

  @media screen and (max-width: ${({ theme }) => theme.maxWidthTablet}) {
    display: none;
  }
`;

const SNavLink = styled(NavLink)`
  padding: 5px;
  color: ${({ theme }) => theme.textInvertedColor};

  &.active {
    color: ${({ theme }) => theme.textColor};
  }

  @media screen and (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.textColor};
    }
  }
`;

const IconButtonContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const IconButtonWrapper = styled.div`
  position: relative;
`;

const UserDropdownMenuWrapper = styled.div`
  width: 120px;
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  z-index: 999;
  background: ${({ theme }) => theme.background};
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

const UserMenu = styled.div<{ as: string }>`
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  text-align: ${({ as }) => as === "button" && "left"};

  @media screen and (hover: hover) and (pointer: fine) {
    &:hover,
    &:focus {
      background: ${({ theme }) => theme.textInvertedColor};
      color: ${({ theme }) => theme.textColor};
    }
  }
`;
