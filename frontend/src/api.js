import axios from 'axios';

const API = axios.create({
  baseURL: 'https://bellcorp-expense-tracker-ee9i.onrender.com',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'));
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;