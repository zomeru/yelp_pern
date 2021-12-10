import axios from 'axios';

const baseURL =
  process.env.NODE === 'development'
    ? 'http://localhost:8000/api/v1/restaurants'
    : 'api/v1/restaurants';

export default axios.create({
  baseURL,
});
