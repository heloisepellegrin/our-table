import backgroundImage from "../assets/Pictures/backgroundImage.jpg";
import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <StyledImage src={backgroundImage} />
      <StyledLandingInfo>
        <h1>WHAT'S IN YOUR KITCHEN?</h1>
        <div>
          <h3>TRY A RECIPE AND UNLEASH YOUR INNER CHEF!</h3>
        </div>
      </StyledLandingInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  img {
    object-fit: cover;
  }
`;
const StyledImage = styled.img`
  position: absolute;
  left: 0%;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -2;
  object-fit: cover;
`;

const StyledLandingInfo = styled.div`
  width: 100vw;
  margin: 0px auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    padding-top: 15rem;
    padding-left: 4rem;
    position: absolute;
    top: 60%;
    color: white;
    font-family: Bubbly-Soda;
    font-size: 79px;
    color: #805a8b;
    letter-spacing: 4px;
    padding-top: 25vh;
    text-align: center;
  }
  h3 {
    font-family: "A little sunshine";
    color: #805a8b;
    font-size: 25.9px;
    letter-spacing: 6px;
    padding-top: 2vh;
  }
  div {
    position: absolute;
    top: 80%;
    padding-top: 25rem;
    padding-top: 52vh;
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
