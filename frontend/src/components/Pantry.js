import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import pantry from "../assets/pantry.png";
import whitesugar from "../assets/pantryingredients/whitesugar.png";
import flour from "../assets/pantryingredients/flour.png";
import yeast from "../assets/pantryingredients/yeast.png";
import bakingsoda from "../assets/pantryingredients/bakingsoda.png";
import brownsugar from "../assets/pantryingredients/brownsugar.png";
import vanillaextract from "../assets/pantryingredients/vanillaextract.png";
import cinnamon from "../assets/pantryingredients/cinnamon.png";
import oreos from "../assets/pantryingredients/oreos.png";
import coconut from "../assets/pantryingredients/coconut.png";
import grahamcrackers from "../assets/pantryingredients/grahamcrackers.png";
import chocolatebar from "../assets/pantryingredients/chocolatebar.png";
import chocolatechips from "../assets/pantryingredients/chocolatechips.png";
import almonds from "../assets/pantryingredients/almonds.png";
import pistachios from "../assets/pantryingredients/pistachios.png";
import icingsugar from "../assets/pantryingredients/icingsugar.png";
import sprinkles from "../assets/pantryingredients/sprinkles.png";
import gelatine from "../assets/pantryingredients/gelatine.png";
import basket1 from "../assets/basket1.png";
import styled from "styled-components";
import { TableContext } from "./TableContext";
import { useNavigate } from "react-router-dom";

const Pantry = () => {
  const { myPantry, setMyPantry, setGeneratedRecipes } =
    useContext(TableContext);
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  console.log("myPantry", myPantry);
  const items = [
    { src: whitesugar, alt: "whitesugar" },
    { src: flour, alt: "flour" },
    { src: yeast, alt: "yeast" },
    { src: bakingsoda, alt: "bakingsoda" },
    { src: brownsugar, alt: "brownsugar" },
    { src: vanillaextract, alt: "vanillaextract" },
    { src: cinnamon, alt: "cinnamon" },
    { src: oreos, alt: "oreos" },
    { src: coconut, alt: "coconut" },
    { src: grahamcrackers, alt: "grahamcrackers" },
    { src: chocolatebar, alt: "chocolatebar" },
    { src: chocolatechips, alt: "chocolatechips" },
    { src: almonds, alt: "almonds" },
    { src: pistachios, alt: "pistachios" },
    { src: icingsugar, alt: "icingsugar" },
    { src: sprinkles, alt: "sprinkles" },
    { src: gelatine, alt: "gelatine" },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    const inputArray = userInput.split(", ");

    setMyPantry(myPantry.concat(inputArray));

    fetch(`/api/get-by-ingredients?ingredients=${myPantry}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          if (!data.data.length) {
            window.alert("Nothing found sorry!");
          } else {
            setGeneratedRecipes(data.data);
            setMyPantry([]);
            navigate("/generated-recipes");
          }
        }
      });
  };
  return (
    <>
      <Wrapper>
        <PantryImage src={pantry} />
        <ItemsWrapper>
          {items.map((item) => {
            return (
              <Draggable
                onStop={(e) => {
                  if (e.screenX < e.screenX / 2) {
                    const updatedPantry = myPantry.filter(
                      (item) => item !== e.target.alt
                    );
                    setMyPantry(updatedPantry);
                  } else if (
                    e.screenX > e.screenX / 2 &&
                    !myPantry.includes(e.target.alt)
                  ) {
                    setMyPantry([...myPantry, e.target.alt]);
                  }
                }}
              >
                <img src={item.src} alt={item.alt} />
              </Draggable>
            );
          })}
        </ItemsWrapper>

        <form onSubmit={submitHandler}>
          <StyledInput
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            placeholder="macadamia, walnuts, pretzels, ..."
          />
          <Button>Generate My Desserts</Button>
        </form>

        <img src={basket1} />
      </Wrapper>
    </>
  );
};

const StyledInput = styled.input`
  height: 35px;
  width: 250px;
  background-color: #f1bfab;
  border-radius: 7px;
  border: none;
  padding: 0 10px;
`;
const Button = styled.button`
  background: #f1bfab;
  color: #805a8b;
  border-radius: 7px;
  font-family: Bubbly-Soda;
  font-size: 15px;
  letter-spacing: 2px;
  padding: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    color: #f1bfab;
    background: #805a8b;
    transition: 0.3s ease-in-out all;
  }
  margin-top: 10px;
`;

const PantryImage = styled.img`
  height: 100%;
`;
const ItemsWrapper = styled.div`
  position: absolute;
  left: 2%;
  height: 90%;
  width: 260px;
  z-index: 30;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  img {
    width: 50px;
    height: 50px;
    margin: 0px 10px;
  }
`;
const Wrapper = styled.div`
  width: 80%;
  margin: 0px auto;
  top: 0%;
  left: 0%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  form {
    display: flex;
    flex-direction: column;
  }
  input::placeholder {
    position: absolute;
    top: 10px;
    left: 10px;
    color: black;
    font-family: "A little sunshine";
    letter-spacing: 2px;
    font-size: 15px;
  }
`;
export default Pantry;
