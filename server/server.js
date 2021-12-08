const express = require('express');
const db = require('./db');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(cors());
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
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM restaurants WHERE id = $1', [
      req.params.id,
    ]);

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

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
