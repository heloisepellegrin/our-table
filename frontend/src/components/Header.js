import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { GiCupcake } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { RiFridgeFill } from "react-icons/ri";
import { SiCodechef } from "react-icons/si";
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
        <Container>
          <StyledHome
            onClick={() => {
              navigate("/");
            }}
            onMouseOver={() => {
              setText("Home");
              setId(0);
            }}
            onMouseLeave={() => {
              setText("");
              setId(null);
            }}
          />
          {id === 0 && <p>{text}</p>}
        </Container>

        <Container>
          <StyledFridge
            onMouseOver={() => {
              setText("Pick Your Ingredients");
              setId(1);
            }}
            onMouseLeave={() => {
              setText("");
              setId(null);
            }}
          />
          {id === 1 && <p>{text}</p>}
        </Container>

        <Container>
          <StyledPlate
            src={plate}
            onMouseOver={() => {
              setText("Meal Finder");
              setId(2);
            }}
            onMouseLeave={() => {
              setText("");
              setId(null);
            }}
          />
          {id === 2 && <p>{text}</p>}
        </Container>

        <Container>
          <StyledCupcake
            src={plate}
            onMouseOver={() => {
              setText("Dessert Finder");
              setId(3);
            }}
            onMouseLeave={() => {
              setText("");
              setId(null);
            }}
          />
          {id === 3 && <p>{text}</p>}
        </Container>

        <Container>
          <StyledChef
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
            src={plate}
            onMouseOver={() => {
              if (isAuthenticated) {
                setText("Profile");
              }
              if (!isAuthenticated) {
                setText("logIn");
              }
              if (location.pathname === "/profile" && isAuthenticated) {
                setText("log Out");
              }
              setId(4);
            }}
            onMouseLeave={() => {
              setText("");
              setId(null);
            }}
          />
          {id === 4 && <p>{text}</p>}
        </Container>
      </StyledNav>
    </Wrapper>
  );
};

const StyledNav = styled.div`
  padding: 10px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  p {
    position: absolute;
    top: 60%;
    z-index: 10;
    margin-top: 20px;
    padding: 5px 25px;
    border-radius: 50%;
    background-color: white;
  }
`;
const StyledHome = styled(AiFillHome)`
  font-size: 40px;
  color: white;
  cursor: pointer;
`;

const StyledFridge = styled(RiFridgeFill)`
  font-size: 40px;
  color: white;
  cursor: pointer;
`;
const StyledPlate = styled.img`
  width: 50px;
  color: white;
  cursor: pointer;
`;
const StyledCupcake = styled(GiCupcake)`
  font-size: 40px;
  color: white;
  cursor: pointer;
`;
const StyledChef = styled(SiCodechef)`
  font-size: 40px;
  color: white;
  cursor: pointer;
`;
const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;

  flex-direction: column;
  background: var(--color-alabama-crimson);
  height: 10vh;
  padding: 5px;
  padding: var(--padding-page) 18px;
`;

export default Header;
