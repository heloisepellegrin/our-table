import backgroundImage from "../assets/Pictures/backgroundImage.jpg";
import styled from "styled-components";
import { useContext, useState } from "react";
import { TableContext } from "./TableContext";
import RecipeCard from "./RecipeCard";

const Home = () => {
  const { randomRecipes, setRandomRecipes, isRandom, setIsRandom } =
    useContext(TableContext);

  console.log("randomRecipes", randomRecipes);
  return (
    <Wrapper>
      <StyledLandingInfo>
        {!isRandom && (
          <>
            <h1>What's in your fridge?</h1>
            <div>
              <h3>TRY A RECIPE AND UNLEASH YOUR INNER CHEF</h3>
              <button
                onClick={() => {
                  setIsRandom(true);
                }}
              >
                Find Recipes
              </button>
            </div>
          </>
        )}
      </StyledLandingInfo>
      <CardContainer>
        {isRandom &&
          randomRecipes.map((recipe) => {
            return (
              <RecipeCard
                id={recipe.id}
                image={recipe.image}
                title={recipe.title}
                readyInMinutes={recipe.readyInMinutes}
                ingredients={recipe.extendedIngredients}
              />
            );
          })}
      </CardContainer>
    </Wrapper>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  overflow-y: scroll;
  position: absolute;
  top: 10%;
  z-index: 1000;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;
const StyledLandingInfo = styled.div`
  width: 100vw;
  margin: 0px auto;
  position: relative;

  h1 {
    padding-top: 15rem;
    padding-left: 4rem;
    position: absolute;
    top: 60%;
    color: white;
    font-family: "Forum";
    font-size: 96px;
  }
  div {
    position: absolute;
    top: 80%;
    padding-top: 25rem;
    padding-left: 4rem;
    color: white;
    button {
      padding: 10px 20px;
      font-size: 18px;
      border-radius: 15px;
      border: none;
      cursor: pointer;
      &:hover {
        color: white;
        background: black;
        transition: 0.3s ease-in-out all;
      }
    }
  }
`;
export default Home;
