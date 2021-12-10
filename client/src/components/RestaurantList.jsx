import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';
import { useNavigate } from 'react-router-dom';

const RestaurantList = () => {
  let navigate = useNavigate();
  const { restaurants, setRestaurants } = useContext(RestaurantContext);

  useEffect(() => {
    async function getRestaurants() {
      try {
        const response = await RestaurantFinder.get('/');
        setRestaurants(response.data.data.restaurants);
      } catch (error) {
        console.log(error);
      }
    }
    getRestaurants();
  }, []);

  const handleDelete = async id => {
    try {
      await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = id => {
    navigate(`/restaurants/${id}/update`);
  };

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
                  <button
                    onClick={() => handleUpdate(restaurant.id)}
                    className='btn btn-warning'
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(restaurant.id)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
