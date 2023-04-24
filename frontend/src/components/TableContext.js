import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const TableContext = createContext(null);

export const TableProvider = ({ children }) => {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [isRandom, setIsRandom] = useState(false);
  const [singleRecipe, setSingleRecipe] = useState({});
  const { user, isAuthenticated } = useAuth0();
  const [myBasket, setMyBasket] = useState([]);

  useEffect(() => {
    fetch("/api/get-random")
      .then((res) => res.json())
      .then((data) => {
        setRandomRecipes(data.data.recipes);
      });
  }, []);

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
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
