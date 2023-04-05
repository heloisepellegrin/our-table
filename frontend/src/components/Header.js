import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

import slingairLogo from "../assets/logo_text.png";

const Header = ({ handleChange }) => {
  const [flightNumbers, setFlightNumbers] = useState([]);
  const reservationId = window.localStorage.getItem("reservationId");

  useEffect(() => {
    // TODO: GET all flight numbers
    fetch("/api/get-flights")
      .then((response) => response.json())
      .then((data) => setFlightNumbers(data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Wrapper>
      <Container></Container>
    </Wrapper>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  background: var(--color-alabama-crimson);
  height: 8%;
  padding: var(--padding-page) 18px;
`;

export default Header;
