import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);

  useEffect(() => {
    async function getRestaurants() {
      try {
        const response = await RestaurantFinder.get('/');
        setRestaurants(response.data.data.restaurants);
        console.log(response);
        console.log('restaurants', restaurants);
      } catch (error) {
        console.log(error);
      }
    }
    getRestaurants();
  }, []);

  return (
    <div className='list-group'>
      <table className='table table-hover table-dark'>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Ratings</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant, i) => (
              <tr key={restaurant.name + i}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{'$'.repeat(restaurant.price_range)}</td>
                <td>Rating</td>
                <td>
                  <button className='btn btn-warning'>Update</button>
                </td>
                <td>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
