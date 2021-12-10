import React, { useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useParams } from 'react-router-dom';

const AddReview = () => {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('Rating');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await RestaurantFinder.post(`${id}/addReview`, {
        name,
        review,
        rating,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mb-2'>
      <form onSubmit={handleSubmit}>
        <div className='form-row'>
          <div className='form-group col-8'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              id='name'
              placeholder='name'
              className='form-control'
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor='rating'>Rating</label>
            <select
              value={rating}
              onChange={e => setRating(e.target.value)}
              id='rating'
              className='custom-select'
            >
              <option disabled>Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='review'>Review</label>
          <textarea
            value={review}
            onChange={e => setReview(e.target.value)}
            id='review'
            className='form-control'
          ></textarea>
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
