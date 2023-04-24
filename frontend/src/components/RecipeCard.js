import styled from "styled-components";

import { useNavigate } from "react-router-dom";
const RecipeCard = ({ image, title, readyInMinutes, ingredients, id }) => {
  const navigate = useNavigate();
  return (
    <>
      <StyledWrapper>
        <img src={image} />

        <p>Is ready in {readyInMinutes} min</p>
        <div>
          {ingredients.map((item) => {
            return <span>{item.name}</span>;
          })}
        </div>
        <button
          onClick={() => {
            navigate(`/recipe/${id}`);
          }}
        >
          {title}
        </button>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  border: 1px solid gray;
  border-radius: 20px;
  box-shadow: 10px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: white;
  margin: 10px;

  p {
    margin: 5px 0px;
    color: #e29b7e;
  }

  button {
    background: #e29b7e;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    margin: 10px;
    color: white;
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
  }
  width: 250px;
`;

export default RecipeCard;
