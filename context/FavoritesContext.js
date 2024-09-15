import React, { createContext, useState, useContext } from 'react';

// Create a Favorites Context
const FavoritesContext = createContext();

// Create a custom hook for easy access to the FavoritesContext
export const useFavorites = () => useContext(FavoritesContext);

// Provide the FavoritesContext to the rest of the app
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (meal) => {
    if (!meal || !meal.idCategory) {
      console.error("Invalid meal object passed to addFavorite");
      return;
    }
  
    setFavorites((prevFavorites) => [...prevFavorites, meal]);
  };
  
  const removeFavorite = (mealId) => {
    if (!mealId) {
      console.error("Invalid mealId passed to removeFavorite");
      return;
    }
  
    setFavorites((prevFavorites) => prevFavorites.filter((meal) => meal.idCategory !== mealId));
  };
  

  const isFavorite = (mealId) => {
    return favorites.some((meal) => meal.id === mealId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
