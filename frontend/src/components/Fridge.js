import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import fridge from "../assets/fridge.png";
import lime from "../assets/fridgeingredients/lime.png";
import lemon from "../assets/fridgeingredients/lemon.png";
import tortilla from "../assets/fridgeingredients/tortilla.png";
import eggs from "../assets/fridgeingredients/eggs.png";
import butter from "../assets/fridgeingredients/butter.png";
import yogurt from "../assets/fridgeingredients/yogurt.png";
import strawberries from "../assets/fridgeingredients/strawberries.png";
import blueberries from "../assets/fridgeingredients/blueberries.png";
import orange from "../assets/fridgeingredients/orange.png";
import olives from "../assets/fridgeingredients/olives.png";
import garlic from "../assets/fridgeingredients/garlic.png";
import yellowonion from "../assets/fridgeingredients/yellowonion.png";
import redonion from "../assets/fridgeingredients/redonion.png";
import greenonion from "../assets/fridgeingredients/greenonion.png";
import broccoli from "../assets/fridgeingredients/broccoli.png";
import carrots from "../assets/fridgeingredients/carrots.png";
import zucchini from "../assets/fridgeingredients/zucchini.png";
import spinach from "../assets/fridgeingredients/spinach.png";
import chicken from "../assets/fridgeingredients/chicken.png";
import bacon from "../assets/fridgeingredients/bacon.png";
import steak from "../assets/fridgeingredients/steak.png";
import shrimps from "../assets/fridgeingredients/shrimps.png";
import tuna from "../assets/fridgeingredients/tuna.png";
import salmon from "../assets/fridgeingredients/salmon.png";
import mozzarella from "../assets/fridgeingredients/mozzarella.png";
import feta from "../assets/fridgeingredients/feta.png";
import creamcheese from "../assets/fridgeingredients/creamcheese.png";
import soysauce from "../assets/fridgeingredients/soysauce.png";
import hotsauce from "../assets/fridgeingredients/hotsauce.png";
import ketchup from "../assets/fridgeingredients/ketchup.png";
import mayonnaise from "../assets/fridgeingredients/mayo.png";
import applejuice from "../assets/fridgeingredients/applejuice.png";
import cream from "../assets/fridgeingredients/cream.png";
import orangejuice from "../assets/fridgeingredients/orangejuice.png";
import basket from "../assets/basket.png";
import styled from "styled-components";
import { TableContext } from "./TableContext";
import { useNavigate } from "react-router-dom";

const Fridge = () => {
  const { myBasket, setMyBasket, setGeneratedRecipes } =
    useContext(TableContext);
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  console.log("myBasket", myBasket);
  const items = [
    { src: lime, alt: "lime" },
    { src: lemon, alt: "lemon" },
    { src: tortilla, alt: "tortilla" },
    { src: eggs, alt: "eggs" },
    { src: butter, alt: "butter" },
    { src: yogurt, alt: "yogurt" },
    { src: strawberries, alt: "strawberries" },
    { src: blueberries, alt: "blueberries" },
    { src: orange, alt: "orange" },
    { src: olives, alt: "olives" },
    { src: garlic, alt: "garlic" },
    { src: yellowonion, alt: "yellowonion" },
    { src: redonion, alt: "redonion" },
    { src: greenonion, alt: "greenonion" },
    { src: broccoli, alt: "broccoli" },
    { src: carrots, alt: "carrots" },
    { src: zucchini, alt: "zucchini" },
    { src: spinach, alt: "spinach" },
    { src: chicken, alt: "chicken" },
    { src: bacon, alt: "bacon" },
    { src: steak, alt: "steak" },
    { src: shrimps, alt: "shrimps" },
    { src: tuna, alt: "tuna" },
    { src: salmon, alt: "salmon" },
    { src: mozzarella, alt: "mozzarella" },
    { src: feta, alt: "feta" },
    { src: creamcheese, alt: "creamcheese" },
    { src: soysauce, alt: "soysauce" },
    { src: hotsauce, alt: "hotsauce" },
    { src: ketchup, alt: "ketchup" },
    { src: mayonnaise, alt: "mayonnaise" },
    { src: applejuice, alt: "applejuice" },
    { src: cream, alt: "cream" },
    { src: orangejuice, alt: "orangejuice" },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    const inputArray = userInput.split(", ");

    setMyBasket(myBasket.concat(inputArray));

    fetch(`/api/get-by-ingredients?ingredients=${myBasket}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          if (!data.data.length) {
            window.alert("Nothing found sorry!");
          } else {
            setGeneratedRecipes(data.data);
            setMyBasket([]);
            navigate("/generated-recipes");
          }
        }
      });
  };
  return (
    <>
      <Wrapper>
        <FridgeImage src={fridge} />
        <ItemsWrapper>
          {items.map((item) => {
            return (
              <Draggable
                onStop={(e) => {
                  if (e.screenX < e.screenX / 2) {
                    const updatedBasket = myBasket.filter(
                      (item) => item !== e.target.alt
                    );
                    setMyBasket(updatedBasket);
                  } else if (
                    e.screenX > e.screenX / 2 &&
                    !myBasket.includes(e.target.alt)
                  ) {
                    setMyBasket([...myBasket, e.target.alt]);
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
            placeholder="jalapenõ, margarine, rice, ..."
          />
          <Button>Generate My Recipes</Button>
        </form>

        <img src={basket} />
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

const FridgeImage = styled.img`
  height: 100%;
`;
const ItemsWrapper = styled.div`
  position: absolute;
  left: 8%;
  height: 90%;
  width: 500px;
  z-index: 30;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  img {
    width: 50px;
    height: 50px;
    margin: 0px 7px;
  }
`;
const Wrapper = styled.div`
  width: 100%;
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
export default Fridge;
