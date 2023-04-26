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

const Fridge = () => {
  const { myBasket, setMyBasket } = useContext(TableContext);
  console.log("myBasket", myBasket);
  const items = [
    lime,
    lemon,
    tortilla,
    eggs,
    butter,
    yogurt,
    strawberries,
    blueberries,
    orange,
    olives,
    garlic,
    yellowonion,
    redonion,
    greenonion,
    broccoli,
    carrots,
    zucchini,
    spinach,
    chicken,
    bacon,
    steak,
    shrimps,
    tuna,
    salmon,
    mozzarella,
    feta,
    creamcheese,
    soysauce,
    hotsauce,
    ketchup,
    mayonnaise,
    applejuice,
    cream,
    orangejuice,
  ];

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
                <img src={item} alt={item} />
              </Draggable>
            );
          })}
        </ItemsWrapper>

        <img src={basket} />
      </Wrapper>
    </>
  );
};

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
`;
export default Fridge;
