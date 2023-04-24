import styled from "styled-components";
import { useState, useEffect } from "react";

const Confirmation = ({ reservationData }) => {
  const [reservation, setReservation] = useState(reservationData);

  // GET request to fetch reservation data
  const reservationId = window.localStorage.getItem("reservationId");
  useEffect(() => {
    fetch(`/api/get-reservation/${reservationId}`)
      .then((res) => res.json())
      .then((data) => setReservation(data.data));
  }, []);

  if (!reservation) {
    return <Wrapper>Loading...</Wrapper>;
  }

  return (
    // TODO: Display the POSTed reservation information
    <MainDiv>
      <Wrapper>
        <h2>Your reservation:</h2>
        <p>Flight number: {reservation.flight}</p>
        <p>First name: {reservation.givenName}</p>
        <p>Last name: {reservation.surname}</p>
        <p>Email: {reservation.email}</p>
        <p>Seat number: {reservation.seat}</p>
      </Wrapper>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  width: 50vw;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 40px;

  border: 2px solid var(--color-alabama-crimson);

  p {
    padding: 20px 0px;
  }
`;
const StyledImage = styled.img`
  width: 150px;
`;

export default Confirmation;
