import styled from "styled-components";

import { useNavigate } from "react-router-dom";
const RecipeCard = ({ image, title, ingredients, id }) => {
  const navigate = useNavigate();

  const modifiedIngredients = ingredients
    .map((item, index) => {
      if (index < 10) {
        if (index === 0) {
          return item.name.charAt(0).toUpperCase() + item.name.slice(1);
        }
        return item.name;
      }
    })
    .join(", ");

  const lastIndex = modifiedIngredients.lastIndexOf(",");

  return (
    <>
      <StyledWrapper>
        <button
          onClick={() => {
            navigate(`/recipe/${id}`);
          }}
        >
          {title}
        </button>
        <img src={image} />
        <div>
          <span>
            {modifiedIngredients.split(", ,")[0].replace(/,\s*$/, "")}
          </span>
        </div>
      </StyledWrapper>
    </>
  );
};

// {ingredients
//           .map((item, index) => {
//             if (index === 0) {
//               return item.name.charAt(0).toUpperCase() + item.name.slice(1);
//             }
//             return item.name;
//           })
//           .filter((index) => index < 10)
//           .join(", ")}
const StyledWrapper = styled.div`
  border-radius: 20px;
  box-shadow: 10px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  background: #f1bfab;
  margin: 10px;
  padding-bottom: 10px;
  /* width: 250px; */

  button {
    background: none;
    font-family: Bubbly-Soda;
    text-decoration: underline;
    font-size: 20px;
    letter-spacing: 1px;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    margin: 10px;
    color: black;
    cursor: pointer;
    &:hover {
      background: white;
      color: #e29b7e;
      transition: all 0.3s ease-in-out;
    }
  }

  img {
    width: 200px;

    margin-top: 5px;
    border-radius: 20px;
  }
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-family: "A little sunshine";
    letter-spacing: 2px;
    text-align: center;
    padding: 15px;
  }
  width: 250px;
`;

export default RecipeCard;
