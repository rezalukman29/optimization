/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const ax = axios.create({
  baseURL: 'https://dummyjson.com',
});

ax.interceptors.request.use(
  async (configuration: any) => {
    configuration.headers['Content-Type'] = 'application/json';
    return configuration;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

export default ax;
