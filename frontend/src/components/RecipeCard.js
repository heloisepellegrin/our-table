import styled from "styled-components";

import { useNavigate } from "react-router-dom";
const RecipeCard = ({ image, title, readyInMinutes, ingredients, id }) => {
  const navigate = useNavigate();
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
          {ingredients.map((item) => {
            return <span>{item.name}</span>;
          })}
        </div>
      </StyledWrapper>
    </>
  );
};

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
  }
  width: 250px;
`;

export default RecipeCard;
