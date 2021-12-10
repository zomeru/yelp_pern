import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useNavigate } from 'react-router-dom';

const UpdateRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const getRestaurant = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPrice(response.data.data.restaurant.price_range);
    };
    getRestaurant();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: price,
    });

    console.log('ipda', updatedRestaurant);

    navigate('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            id='name'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            type='text'
            value={location}
            onChange={e => setLocation(e.target.value)}
            id='location'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price Range</label>
          <input
            type='text'
            value={price}
            onChange={e => setPrice(e.target.value)}
            id='price'
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
