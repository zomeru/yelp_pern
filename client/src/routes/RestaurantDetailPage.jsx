import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantContext } from '../context/RestaurantContext';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);

        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getRestaurant();
  }, []);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <button
            onClick={() => navigate('/')}
            className='btn btn-primary mt-3'
          >
            Go back
          </button>
          <h1 className='text-center display-1'>
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className='text-center'>
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className='text-warning ml-1'>
              ({selectedRestaurant.restaurant.reviews_count ?? 0})
            </span>
          </div>
          <AddReview />
          <div className='mt-3'>
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
