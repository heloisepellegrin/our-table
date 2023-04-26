import backgroundImage from "../assets/Pictures/backgroundImage.jpg";
import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <StyledLandingInfo>
        <h1>What's in your kitchen?</h1>
        <div>
          <h3>TRY A RECIPE AND UNLEASH YOUR INNER CHEF</h3>
        </div>
      </StyledLandingInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;
const StyledLandingInfo = styled.div`
  width: 100vw;
  margin: 0px auto;
  position: relative;

  h1 {
    padding-top: 15rem;
    padding-left: 4rem;
    position: absolute;
    top: 60%;
    color: white;
    font-family: "Forum";
    font-size: 96px;
  }
  div {
    position: absolute;
    top: 80%;
    padding-top: 25rem;
    padding-left: 4rem;
    color: white;
    button {
      padding: 10px 20px;
      font-size: 18px;
      border-radius: 15px;
      border: none;
      cursor: pointer;
      &:hover {
        color: white;
        background: black;
        transition: 0.3s ease-in-out all;
      }
    }
  }
`;
export default Home;
