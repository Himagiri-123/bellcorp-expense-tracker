import axios from 'axios';

const API = axios.create({
  // నీ Render లింక్ చివరన '/api' ఉండాలి
  baseURL: 'https://bellcorp-expense-tracker-ee9i.onrender.com/api', 
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'));
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;