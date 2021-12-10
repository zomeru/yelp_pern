const express = require('express');
const db = require('./db');
const cors = require('cors');
// const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Get All Restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    // const results = await db.query('SELECT * FROM restaurants');
    const restaurantsRatingData = await db.query(
      'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) as reviews_count, TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) AS reviews ON restaurants.id = reviews.restaurant_id;'
    );

    res.status(200).json({
      status: 'success',
      results: restaurantsRatingData.rows.length,
      data: {
        restaurants: restaurantsRatingData.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Get a restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await db.query(
      'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) as reviews_count, TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) AS reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1',
      [req.params.id]
    );

    const reviews = await db.query(
      'SELECT * FROM reviews WHERE restaurant_id = $1',
      [req.params.id]
    );

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const { name, location, price_range } = req.body;

    const results = await db.query(
      'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *',
      [name, location, price_range]
    );

    console.log(results.rows[0]);

    res.status(201).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Update a restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price_range } = req.body;

    const results = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *',
      [name, location, price_range, id]
    );

    console.log(results.rows[0]);

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete a restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query('DELETE FROM restaurants WHERE id = $1', [
      req.params.id,
    ]);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
  try {
    const { name, review, rating } = req.body;
    const { id } = req.params;
    const newReview = await db.query(
      'INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, name, review, rating]
    );

    res.status(201).json({
      status: 'success',
      data: {
        restaurant: newReview.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
