import React from "react";
import styled, { css } from "styled-components";
import { Container } from "@mui/material";
// import TEL from '../SVG.js'
import { Link } from "react-router-dom";
import BurgerStore from "../../store/BurgerStore";
import { observer } from "mobx-react";

const Menu = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 293;
  display: block;
  width: 100%;
  max-width: 100%;
  margin-top: 0;
  padding-top: 100px;
  padding-right: 0;
  align-items: stretch;
  background-color: #80cfce;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform: translateY(-1600px)
    ${(props) =>
    props.open &&
    css`
        transform: translateY(0);
      `};
`;

export const MenuLink = styled.div`
  position: relative;
  text-align: center;
  max-width: 100%;
  padding-top: 20px;
  text-decoration: none;
  color: #fff;
  font-size: 24px;
  line-height: 120%;
  font-weight: 400;

  :hover {
    background-position: 90% 50%;
  }
`;

export const Line = styled.div`
  height: 3px;
  margin: 2rem auto;
  background-color: #f48070;
  border-radius: 10px;
`;

export const MenuUpBlock = styled.div`
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 35px;
`;

export const SideMenu = observer(() => {
  return (
    <Menu open={BurgerStore.isMenuOpen}>
      <Container maxWidth="sm">
        <MenuUpBlock>
          <Link to={`/type`}>
            <MenuLink
              style={{ fontWeight: 600, padding: 0 }}
              onClick={() => {
                BurgerStore.toggleMenu();
              }}
            >
              Уточнить предпочтения
            </MenuLink>
          </Link>
          <Link to={`/admin`}>
            <MenuLink
              style={{ fontWeight: 600, padding: 0 }}
              onClick={() => {
                BurgerStore.toggleMenu();
              }}
            >
              Кабинет администратора приюта
            </MenuLink>
          </Link>
        </MenuUpBlock>
        <Line />
        <Link to={`/team`}>
          <MenuLink
            onClick={() => {
              BurgerStore.toggleMenu();
            }}
          >
            Наша команда
          </MenuLink>
        </Link>
        <MenuLink>© Школа IT</MenuLink>
        {/*<MenuLink href="#" onClick={BurgerStore.toggleMenu}>Связаться с нами <img*/}
        {/*    alt="telegram"*/}
        {/*    src={TEL}*/}
        {/*/>*/}
        {/*</MenuLink>*/}
      </Container>
    </Menu>
  );
});
