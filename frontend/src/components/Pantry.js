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

const Pantry = () => {
  const { myPantry, setMyPantry } = useContext(TableContext);
  console.log("myPantry", myPantry);
  const items = [
    whitesugar,
    flour,
    yeast,
    bakingsoda,
    brownsugar,
    vanillaextract,
    cinnamon,
    oreos,
    coconut,
    grahamcrackers,
    chocolatebar,
    chocolatechips,
    almonds,
    pistachios,
    icingsugar,
    sprinkles,
    gelatine,
  ];

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
                <img src={item} alt={item} />
              </Draggable>
            );
          })}
        </ItemsWrapper>

        <img src={basket1} />
      </Wrapper>
    </>
  );
};

const PantryImage = styled.img`
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
export default Pantry;
