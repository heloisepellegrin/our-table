import styled from "styled-components";

const Comments = () => {
  return (
    <>
      <Wrapper>
        <CommentBox>
          <from>
            <input placeholder="Your comment" />
            <button>Comment</button>
          </from>
        </CommentBox>
        <RecipeComments>
          <p>Last comments</p>
        </RecipeComments>
      </Wrapper>
    </>
  );
};

const RecipeComments = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CommentBox = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;
export default Comments;
