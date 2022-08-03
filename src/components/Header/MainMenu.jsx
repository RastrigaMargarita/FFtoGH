import React, { useEffect } from "react";
import styled from "styled-components";
import { SideMenu } from "./SideMenu";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import BurgerStore from "../../store/BurgerStore";
import { observer } from "mobx-react";
import { Logo } from "../SVG";

const MenuButton = styled.button`
  display: inline-block;
  transform-origin: 16px 11px;
  margin-right: 0;
  outline: 0;
  border: 0;
  padding: 0;
  background: none;
  float: right;
  height: 32px;
  width: 32px;

  span {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  :hover {
    span:nth-of-type(1) {
      width: 25px;
    }

    span:nth-of-type(2) {
      width: 32px;
    }

    span:nth-of-type(3) {
      width: 22px;
    }
  }

  span:nth-of-type(3) {
    margin: 0;
  }

  &.active {
    span:nth-of-type(1) {
      transform: rotate(45deg) translate(10px, 10px);
      width: 32px;
    }

    span:nth-of-type(2) {
      opacity: 0;
      pointer-events: none;
    }

    span:nth-of-type(3) {
      transform: rotate(-45deg) translate(9px, -8px);
      width: 32px;
    }
  }
`;

const Bar = styled.span`
  display: block;
  width: 32px;
  height: 5px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 30px;
`;

const Navbar = styled.div`
  height: 4rem;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  outline: currentcolor none medium;
  width: 100%;
  margin: 0;
  align-items: center;
  background: #80CFCE;
  color: rgb(248, 248, 248);
  flex-direction: row;
  justify-content: flex-start;
  z-index: 500;
  
  a {
    display: inline-grid;
    align-items: center;
  }
`;

const MainMenu = observer(() => {
  useEffect(() => {
    if (BurgerStore.isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, []);

  return (
    <>
      <Navbar>
        <Container
          maxWidth="sm"
          style={{
            justifyContent: "space-between",
            display: "flex",
            maxWidth: "444px",
          }}
        >
          <Link
            to={`/pets`}
            onClick={() => {
              BurgerStore.toggleMenu(false);
            }}
          >
            <Logo />
          </Link>
          <MenuButton
            className={BurgerStore.isMenuOpen ? "active" : ""}
            aria-label="Открыть главное меню"
            onClick={() => {
              BurgerStore.toggleMenu();
            }}
            style={{ marginRight: "1rem" }}
          >
            <Bar />
            <Bar />
            <Bar />
          </MenuButton>
        </Container>
      </Navbar>
      <Container maxWidth="sm">
        <SideMenu />
      </Container>
    </>
  );
});

export default MainMenu;