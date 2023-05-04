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
              placeholder="Write here..."
              onChange={(e) => {
                setComment(e.target.value);
              }}
              style={{ textIndent: "10px", padding: "10px" }}
            />
            <button className="submit-btn">Submit!</button>
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
    flex-direction: column;
  }

  textarea {
    padding: 15px;
    background-color: #f1bfab;
    border: none;
    border-radius: 10px;
    resize: none;
    color: white;
    position: relative;
    width: 80%;
    height: 80px;
    margin-bottom: 10px;
  }

  textarea::placeholder {
    position: absolute;
    top: 10px;
    left: 10px;
    color: black;
    font-family: "A little sunshine";
    letter-spacing: 2px;
    font-size: 15px;
  }

  .submit-btn {
    margin-top: 15px;
    margin-bottom: 15px;
    right: 20px;
    background: #f1bfab;
    width: 100px;
    color: #805a8b;
    border-radius: 7px;
    font-family: Bubbly-Soda;
    font-size: 15px;
    letter-spacing: 2px;
    padding: 7px;
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
  padding: 5px 0px;
  margin-right: 20px;
`;
export default Comments;
