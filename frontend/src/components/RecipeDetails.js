import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { TableContext } from "./TableContext";
import Comments from "./Comments";
import recipeframe from "../assets/recipeframe.png";
import { useAuth0 } from "@auth0/auth0-react";
const RecipeDetails = () => {
  const { singleRecipe, setSingleRecipe, comment } = useContext(TableContext);
  const [recipeComments, setRecipeComments] = useState([]);
  const [commentId, setCommentId] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");
  const { isAuthenticated, user } = useAuth0();
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

    fetch(`/api/comments?recipeId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipeComments(data.data);
      });
  }, [id, comment, commentId]);

  const handleUpdate = (id) => {
    fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: updatedComment }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setUpdatedComment("");
          setCommentId("");
        }
      });
  };
  const handleLike = () => {
    setLiked(!liked);
  };

  if (!singleRecipe.title) {
    return <h1>Loading....</h1>;
  }

  return (
    <Container>
      <FirstContainer>
        <Title>{singleRecipe.title}</Title>
        <Info>
          <p>{singleRecipe.servings} servings</p>
          <p>{singleRecipe.readyInMinutes} minutes</p>
          <p>{singleRecipe.dairyFree ? "dairy free" : "not dairy free"}</p>
        </Info>
      </FirstContainer>
      <SecondContainer>
        <ImageDiv>
          <Frame src={recipeframe} />
          <RecipeImage src={singleRecipe.image} />
        </ImageDiv>
        <IngredientsDiv>
          <SectionTitle>Ingredients</SectionTitle>
          <ul>
            {singleRecipe.extendedIngredients.map((item) => (
              <li>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</li>
            ))}
          </ul>
        </IngredientsDiv>
      </SecondContainer>
      <ThirdContainer>
        <CommentSection>
          <h3>We wanna hear from you!</h3>
          {isAuthenticated && <Comments id={id} />}

          <PastComments>
            {recipeComments.map((comment) => {
              console.log("here comment", comment);
              return (
                <EditSection>
                  {isAuthenticated &&
                    commentId !== comment._id &&
                    user.email === comment.email && (
                      <>
                        <p>{comment.comment}</p>
                        <div>
                          <button
                            onClick={(e) => {
                              setCommentId(comment._id);
                              setUpdatedComment(comment.comment);
                            }}
                          >
                            Edit
                          </button>
                          <button>Delete</button>
                        </div>
                      </>
                    )}
                  {isAuthenticated &&
                    commentId === comment._id &&
                    user.email === comment.email && (
                      <div>
                        <input
                          value={updatedComment}
                          onChange={(e) => {
                            setUpdatedComment(e.target.value);
                          }}
                        />
                        <button
                          onClick={() => {
                            handleUpdate(comment._id);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    )}
                </EditSection>
              );
            })}
          </PastComments>
          <button
            onClick={() => {
              navigate("/recipes");
            }}
          >
            Browse more recipes
          </button>
        </CommentSection>
        <InstructionsWrapper>
          <SectionTitle>Instructions</SectionTitle>
          <Instructions
            dangerouslySetInnerHTML={{ __html: singleRecipe.instructions }}
          />
        </InstructionsWrapper>
      </ThirdContainer>
    </Container>
  );
};

const EditSection = styled.div`
  display: flex;
  /* justify-content: center;
  align-items: center; */
  justify-content: space-between;
  padding: 0px 20px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      margin-left: 5px;
      padding: 5px 10px;
    }
  }
`;
const PastComments = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100px;
  border: 1px solid red;
`;
const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  /* position: absolute;
  top: 0%;
  bottom: 0%; */
  width: 95%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0px 100px;
`;

const FirstContainer = styled.div`
  width: 50%;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SecondContainer = styled.div`
  width: 50%;
  height: 100%;
  z-index: 12;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageDiv = styled.div`
  position: relative;
  width: 50%;
  img {
    width: 200px;
  }
`;

const IngredientsDiv = styled.div`
  width: 50%;
`;
const ThirdContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 12;
`;
const InstructionsWrapper = styled.div`
  width: 50%;
`;
const CommentSection = styled.div`
  width: 50%;
`;

const RecipeImage = styled.img`
  z-index: -1;

  width: 100px;
  position: absolute;

  border-radius: 10px;
  object-fit: contain;
  top: 15%;
  left: 7%;
`;
const Frame = styled.img`
  z-index: 20;
  height: 50%;
  width: 300px;
  border-radius: 10px;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  font-family: Bubbly-Soda;
  letter-spacing: 1px;
  color: #805a8b;
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
  width: 500px;

  z-index: 20;
  display: flex;
  justify-content: space-around;

  border-radius: 10px;
  p {
    padding: 0px 10px;
  }
`;
export default RecipeDetails;
