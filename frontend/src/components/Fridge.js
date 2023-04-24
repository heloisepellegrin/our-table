import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import fridge from "../assets/fridge.png";
import blueberries from "../assets/blueberries.png";
import basket from "../assets/basket.png";
import styled from "styled-components";
import { TableContext } from "./TableContext";

const Fridge = () => {
  const { myBasket, setMyBasket } = useContext(TableContext);
  console.log("myBasket", myBasket);
  const items = [
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
    blueberries,
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
