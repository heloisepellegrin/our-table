import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import plate from "../assets/plate.png";

const Header = () => {
  const [text, setText] = useState("");
  const [id, setId] = useState(null);
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <StyledNav>
        <Container
          onClick={() => {
            navigate("/");
          }}
        >
          HOME
        </Container>
        <Line />

        <Container
          onClick={() => {
            navigate("/recipes");
          }}
        >
          RECIPES
        </Container>
        <Line />
        <Container
          onClick={() => {
            navigate("/fridge");
          }}
        >
          FRIDGE
        </Container>
        <Line />

        <Container
          onClick={() => {
            navigate("/pantry");
          }}
        >
          PANTRY
        </Container>
        <Line />

        <Container
          onClick={() => {
            if (isAuthenticated) {
              navigate("/profile");
            }
            if (!isAuthenticated) {
              loginWithRedirect();
            }
            if (location.pathname === "/profile" && isAuthenticated) {
              logout({ logoutParams: { returnTo: window.location.origin } });
            }
          }}
        >
          {isAuthenticated && location.pathname === "/profile"
            ? "LOG OUT"
            : isAuthenticated
            ? "PROFILE"
            : "lOG IN"}
        </Container>
      </StyledNav>
    </Wrapper>
  );
};

const StyledNav = styled.div`
  padding: 20px 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #f1bfab;
  border-radius: 30px;
  margin-top: 20px;
  z-index: 99999;
`;

const Line = styled.li`
  width: 1px;
  height: 100%;
  background-color: white;
  border-right: 1px solid white;
  z-index: 100;
  list-style: none;
`;
const Container = styled.li`
  list-style: none;
  text-align: center;
  color: white;
  cursor: pointer;
  font-family: Bubbly-Soda;
  letter-spacing: 1px;
`;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;

  flex-direction: column;
  background: var(--color-alabama-crimson);
  height: 10vh;

  margin: 0px auto;
  width: 90vw;
  padding: 5px;
  padding: var(--padding-page) 18px;
`;

export default Header;
