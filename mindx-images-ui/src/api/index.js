import axios from 'axios';

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

export default customAxios;