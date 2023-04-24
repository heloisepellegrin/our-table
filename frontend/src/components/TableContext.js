import { createContext, useEffect, useState } from "react";

export const TableContext = createContext(null);

export const TableProvider = ({ children }) => {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [isRandom, setIsRandom] = useState(false);
  const [singleRecipe, setSingleRecipe] = useState({});

  useEffect(() => {
    fetch("/api/get-random")
      .then((res) => res.json())
      .then((data) => {
        setRandomRecipes(data.data.recipes);
      });
  }, []);

  return (
    <TableContext.Provider
      value={{
        randomRecipes,
        setRandomRecipes,
        isRandom,
        setIsRandom,
        singleRecipe,
        setSingleRecipe,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
