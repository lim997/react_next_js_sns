"use client"
import React from 'react';
import Link from 'next/link'
import styled from '@emotion/styled';
import { FiHome, FiSearch, FiPlusSquare, FiBookmark, FiHeart, FiUser } from 'react-icons/fi';
import { BiLogOut } from 'react-icons/bi';

const MenuBarContainer = styled.div` display: flex; flex-direction: column; align-items: center; position: fixed; top: 0; left: 0; background-color: white; height: 100vh; box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1); `;
const MenuIcon = styled.div` font-size: 24px; color: #555; margin: 5px auto; padding: 30px 35px; `;
const LogoutIcon = styled.div` font-size: 24px; color: #555; margin: 5px auto; padding: 30px 35px; position: fixed; bottom: 0; left: 0; `;

const MenuBar = () => {
  return (
    <MenuBarContainer>
      <Link href="/main">
        <MenuIcon>
            <FiHome />
        </MenuIcon>
      </Link>
      <Link href="/search">
        <MenuIcon>
            <FiSearch />
        </MenuIcon>
      </Link>
      {/*<Link href="/interest">
        <MenuIcon>
            <FiBookmark />
        </MenuIcon>
      </Link>*/}
      <Link href="/heart">
        <MenuIcon>
            <FiHeart />
        </MenuIcon>
      </Link>
      <Link href="/plusSquare">
        <MenuIcon>
            <FiPlusSquare />
        </MenuIcon>
      </Link>
      <Link href="/user">
        <MenuIcon>
            <FiUser />
        </MenuIcon>
      </Link>
      <Link href="/" onClick={(e) => {
        const confirmed = confirm("로그아웃 하시겠습니까?");
        if (!confirmed) {
          e.preventDefault();
        } else {
          sessionStorage.removeItem('uId'); // 세션 제거
        }
      }}>
        <LogoutIcon>
          <BiLogOut />
        </LogoutIcon>
      </Link>
    </MenuBarContainer>
  );
};

export default MenuBar;