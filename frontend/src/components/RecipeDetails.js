import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { TableContext } from "./TableContext";
import gradient from "../assets/Pictures/gradient.png";

const RecipeDetails = () => {
  const { singleRecipe, setSingleRecipe, setIsRandom } =
    useContext(TableContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const [liked, setLiked] = useState(false);
  useEffect(() => {
    console.log("fetch");
    fetch(`/api/get-recipe-byId/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleRecipe(data.data);
      });
    // getRecipe();
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
  };

  if (!singleRecipe.title) {
    return <h1>Loading....</h1>;
  }

  return (
    <Container>
      <LeftContainer>
        <Title>{singleRecipe.title}</Title>

        <Section>
          <SectionTitle>Ingredients</SectionTitle>
          <ul>
            {singleRecipe.extendedIngredients.map((item) => (
              <li>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</li>
            ))}
          </ul>
        </Section>

        <LikeButton onClick={handleLike}>
          {liked ? "Liked!" : "Like this recipe"}
        </LikeButton>

        <Section>
          <SectionTitle>Instructions</SectionTitle>
          <Instructions>{singleRecipe.instructions}</Instructions>
        </Section>
        <Section>
          <button
            onClick={() => {
              setIsRandom(true);
              navigate("/");
            }}
          >
            Browse more recipes
          </button>
        </Section>
      </LeftContainer>
      <RightContainer>
        <BackgroundImage src={gradient} />
        <RecipeImage src={singleRecipe.image} />
        <Info>
          <p>Servings: {singleRecipe.servings}</p>
          <p>Ready in {singleRecipe.readyInMinutes} Minutes!</p>
          <p>
            It is {singleRecipe.dairyFree ? "dairy free" : "not dairy free"}
          </p>
        </Info>
      </RightContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 90vh;
  width: 95%;
  padding: 20px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

const LeftContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-right: 50px;
`;

const RightContainer = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  z-index: 12;
`;

const BackgroundImage = styled.img`
  position: absolute;
  z-index: 10;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const RecipeImage = styled.img`
  z-index: 12;
  height: 50%;
  width: 50%;
  position: absolute;
  border: 1px solid gray;
  border-radius: 10px;
  object-fit: contain;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const LikeButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #f7d794;
  border-radius: 5px;
  color: #2d3436;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ffbe76;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Instructions = styled.p`
  font-size: 18px;
`;

const Info = styled.div`
  position: absolute;
  width: 300px;
  height: 150px;
  background: #e29b7e;
  z-index: 20;
  top: 68%;
  left: 40%;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 10px;
  p {
    padding: 0px 10px;
  }
`;
export default RecipeDetails;
