import React, { useState, createContext } from 'react';

export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);

  return (
    <RestaurantContext.Provider value={{ restaurants, setRestaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};
