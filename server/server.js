const express = require('express');
const db = require('./db');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(express.json());

// Get All Restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM restaurants');

    console.log('resulst', results);

    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Get a restaurant
app.get('/api/v1/restaurants/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      restaurant: 'Restaurant 1',
    },
  });
});

// Create a restaurant
app.post('/api/v1/restaurants', (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      restaurant: 'Restaurant 1',
    },
  });
});

// Update a restaurant
app.put('/api/v1/restaurants/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      restaurant: 'Restaurant 1',
    },
  });
});

// Delete a restaurant
app.delete('/api/v1/restaurants/:id', (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
