import styled from "styled-components";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import RecipeDetails from "./RecipeDetails";

import backgroundImage from "../assets/Pictures/backgroundImage.jpg";
import Profile from "./Profile";

const App = () => {
  const [selectedFlight, setSelectedFlight] = useState("");
  const [reservationData, setReservationData] = useState({});

  const handleChange = (e) => {
    setSelectedFlight(e.target.value);
  };

  return (
    <MainDiv>
      <StyledImage src={backgroundImage} />
      <BrowserRouter>
        {/* <GlobalStyles /> */}
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="" element={<h1>404: Oops!</h1>} />
          </Routes>
          <Footer />
        </Main>
      </BrowserRouter>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  height: 100vh;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const StyledImage = styled.img`
  position: absolute;
  left: 0%;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -2;
  object-fit: cover;
`;

export default App;
