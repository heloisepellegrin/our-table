import { useContext, useEffect } from "react";
import { TableContext } from "./TableContext";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";

const RandomRecipes = () => {
  const {
    randomRecipes,
    setRandomRecipes,
    generatedRecipes,
    isRandom,
    setIsRandom,
  } = useContext(TableContext);

  useEffect(() => {
    fetch("/api/get-random")
      .then((res) => res.json())
      .then((data) => {
        setRandomRecipes(data.data.recipes);
      });
  }, []);
  const location = window.location.pathname;
  return (
    <CardContainer>
      {location === "/recipes"
        ? randomRecipes.map((recipe) => {
            return (
              <RecipeCard
                id={recipe.id}
                image={recipe.image}
                title={recipe.title}
                readyInMinutes={recipe.readyInMinutes}
                ingredients={
                  recipe.extendedIngredients
                    ? recipe.extendedIngredients
                    : recipe.usedIngredients
                }
              />
            );
          })
        : generatedRecipes.map((recipe) => {
            return (
              <RecipeCard
                id={recipe.id}
                image={recipe.image}
                title={recipe.title}
                readyInMinutes={recipe.readyInMinutes}
                ingredients={
                  recipe.extendedIngredients
                    ? recipe.extendedIngredients
                    : recipe.usedIngredients
                }
              />
            );
          })}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  width: 90%;
  padding-left: 200px;
  margin: 0px auto;
  overflow-y: scroll;
  position: absolute;
  top: 15%;
  z-index: 1000;
`;
export default RandomRecipes;
