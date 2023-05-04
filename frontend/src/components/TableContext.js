import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
export const TableContext = createContext(null);

export const TableProvider = ({ children }) => {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [generatedRecipes, setGeneratedRecipes] = useState([]);
  const [isRandom, setIsRandom] = useState(false);
  const [singleRecipe, setSingleRecipe] = useState({});
  const { user, isAuthenticated } = useAuth0();
  const [myBasket, setMyBasket] = useState([]);
  const [myPantry, setMyPantry] = useState([]);
  const [comment, setComment] = useState("");
  const location = useLocation;
  console.log("location", window.location.pathname);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/add-user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    }
  }, [isAuthenticated]);

  return (
    <TableContext.Provider
      value={{
        randomRecipes,
        setRandomRecipes,
        isRandom,
        setIsRandom,
        singleRecipe,
        setSingleRecipe,
        myBasket,
        setMyBasket,
        comment,
        setComment,
        myPantry,
        setMyPantry,
        generatedRecipes,
        setGeneratedRecipes,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
