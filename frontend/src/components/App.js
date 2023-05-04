import styled from "styled-components";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import RecipeDetails from "./RecipeDetails";
import Profile from "./Profile";
import Fridge from "./Fridge";
import Pantry from "./Pantry";
import RandomRecipes from "./RandomRecipes";

const App = () => {
  const [selectedFlight, setSelectedFlight] = useState("");
  const [reservationData, setReservationData] = useState({});

  const handleChange = (e) => {
    setSelectedFlight(e.target.value);
  };

  return (
    <MainDiv>
      <BrowserRouter>
        {/* <GlobalStyles /> */}
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RandomRecipes />} />
            <Route path="/generated-recipes" element={<RandomRecipes />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/fridge" element={<Fridge />} />
            <Route path="/pantry" element={<Pantry />} />
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

export default App;
