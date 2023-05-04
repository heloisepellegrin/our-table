import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { TableContext } from "./TableContext";
import Comments from "./Comments";
import recipephoto from "../assets/recipephoto.png";
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
  const [isDeleted, setIsDeleted] = useState(false);

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
        if (Array.isArray(data.data)) setRecipeComments(data.data);
      });
  }, [id, comment, commentId, isDeleted]);

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
  const deleteHandler = (id) => {
    fetch(`/api/comments/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setIsDeleted(!isDeleted);
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
        <Title>{singleRecipe.title.toUpperCase()}</Title>
        <Info>
          <p>{singleRecipe.servings} servings</p>
          <p>{singleRecipe.readyInMinutes} minutes</p>
          <p>{singleRecipe.dairyFree ? "Dairy free" : "Not dairy free"}</p>
        </Info>
      </FirstContainer>
      <SecondContainer>
        <ImageDiv>
          <RecipeImage src={singleRecipe.image} />
        </ImageDiv>
        <IngredientsDiv>
          <SectionTitle>INGREDIENTS</SectionTitle>
          <IngredientsWrapper>
            <ul>
              {singleRecipe.extendedIngredients.slice(0, 10).map((item) => (
                <li>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </li>
              ))}
            </ul>
            <ul>
              {singleRecipe.extendedIngredients.slice(10).map((item) => (
                <li>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </li>
              ))}
            </ul>
          </IngredientsWrapper>
        </IngredientsDiv>
      </SecondContainer>
      <ThirdContainer>
        <CommentSection>
          <h3>We wanna hear from you!</h3>
          {isAuthenticated && <Comments id={id} />}

          <h3>Previous comments</h3>
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
                          <button
                            onClick={() => {
                              deleteHandler(comment._id);
                            }}
                          >
                            Delete
                          </button>
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
            className="browse-recipes-btn"
            onClick={() => {
              navigate("/recipes");
            }}
          >
            Browse more recipes
          </button>
        </CommentSection>
        <InstructionsWrapper>
          <SectionTitle>INSTRUCTIONS</SectionTitle>
          <Instructions
            dangerouslySetInnerHTML={{
              __html: singleRecipe.instructions
                .split("\n")
                .map((item) => `<div>${item.trim()}</div><br/>`)
                .join(""),
            }}
          />
        </InstructionsWrapper>
      </ThirdContainer>
    </Container>
  );
};

const EditSection = styled.div`
  display: flex;
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
  background-color: #f1bfab;
  width: 80%;
  border-radius: 10px;
  margin-bottom: 25px;
`;

const IngredientsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  width: 95%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
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
  width: 80%;
  height: 100%;
  z-index: 12;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageDiv = styled.div`
  width: 50%;
  img {
    width: 80%;
  }
`;

const IngredientsDiv = styled.div`
  width: 50%;
  font-family: "A little sunshine";
  letter-spacing: 2px;
  font-size: 20px;
  padding-top: 10px;
`;

const ThirdContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 12;
  padding-top: 20px;
`;

const InstructionsWrapper = styled.div`
  width: 50%;
`;

const CommentSection = styled.div`
  width: 50%;
  h3 {
    font-family: "A little sunshine";
    letter-spacing: 2px;
  }
  button {
    background: white;
    color: #805a8b;
    border-radius: 7px;
    font-family: Bubbly-Soda;
    font-size: 15px;
    letter-spacing: 2px;
    padding: 10px;
    border: none;
    cursor: pointer;
    &:hover {
      color: white;
      background: #805a8b;
      transition: 0.3s ease-in-out all;
    }
  }
  .browse-recipes-btn {
    background-color: #f1bfab;
    color: #805a8b;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  .browse-recipes-btn:hover {
    background-color: #805a8b;
    color: white;
  }
`;

const RecipeImage = styled.img`
  z-index: -1;
  width: 100px;
  border-radius: 10px;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 3px;
  font-family: Bubbly-Soda;
  letter-spacing: 1px;
  color: #805a8b;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  font-family: Bubbly-Soda;
  letter-spacing: 1.5px;
`;

const Instructions = styled.p`
  font-size: 18px;
  font-family: "A little sunshine";
  letter-spacing: 2px;
  font-size: 20px;
`;

const Info = styled.div`
  width: 500px;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
  p {
    font-family: "A little sunshine";
    letter-spacing: 2px;
    color: #805a8b;
    font-size: 20px;
  }
`;
export default RecipeDetails;
