import React, { useState, createContext } from 'react';

export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);

  const addRestaurants = restaurant => {
    setRestaurants([...restaurants, restaurant]);
  };

  return (
    <RestaurantContext.Provider
      value={{ restaurants, setRestaurants, addRestaurants }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
