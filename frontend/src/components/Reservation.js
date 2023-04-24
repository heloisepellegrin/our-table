import styled from "styled-components";
import { useState, useEffect } from "react";

const Reservation = () => {
  const [reservationData, setReservationData] = useState(null);

  // GET request to fetch reservation data
  const reservationId = window.localStorage.getItem("reservationId");
  useEffect(() => {
    fetch(`/api/get-reservation/${reservationId}`)
      .then((res) => res.json())
      .then((data) => setReservationData(data.data));
  }, []);

  // TODO: Display the latest reservation information

  return (
    <MainDiv>
      <Wrapper>
        {reservationData ? (
          <div>
            <h2>Reservation Information</h2>
            <p>Reservation ID: {reservationData._id}</p>
            <p>Flight Number: {reservationData.flight}</p>
            <p>Seat Number: {reservationData.seat}</p>
            <p>
              Full Name: {reservationData.givenName} {reservationData.surname}
            </p>
            <p>Email: {reservationData.email}</p>
          </div>
        ) : (
          <p>Loading reservation information...</p>
        )}
      </Wrapper>
    </MainDiv>
  );
};

// STRETCH: add FE components to fetch/update/delete reservations

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
    padding: 10px 0px;
  }
`;
const StyledImage = styled.img`
  width: 150px;
`;

export default Reservation;
