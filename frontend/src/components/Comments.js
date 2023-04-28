import { useContext } from "react";
import styled from "styled-components";
import { TableContext } from "./TableContext";
import { useAuth0 } from "@auth0/auth0-react";

const Comments = ({ id }) => {
  const { comment, setComment } = useContext(TableContext);
  const { user } = useAuth0();
  const submitComment = (e) => {
    e.preventDefault();
    fetch("/api/comments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, comment, recipeId: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setComment("");
        }
      });
  };
  return (
    <>
      <Wrapper>
        <CommentBox>
          <form onSubmit={submitComment}>
            <textarea
              value={comment}
              placeholder="Your comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button>Comment</button>
          </form>
        </CommentBox>
      </Wrapper>
    </>
  );
};

const CommentBox = styled.div`
  position: relative;

  form {
    display: flex;
  }

  textarea {
    padding: 50px 10px;
    background-color: #f1bfab;
    border: none;
    border-radius: 10px;
    resize: none;
    color: white;
  }

  button {
    position: absolute;
    right: 40%;
    bottom: 10%;
    margin-left: 5px;
    background: white;
    color: #805a8b;
    border-radius: 7px;
    border: none;
    cursor: pointer;
    &:hover {
      color: white;
      background: #805a8b;
      transition: 0.3s ease-in-out all;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 0px;
  margin-right: 20px;
`;
export default Comments;
