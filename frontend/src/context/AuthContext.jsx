import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // Import our configured API
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Register Function
  const register = async (name, email, password) => {
    try {
      // Use API instead of axios
      const response = await API.post('/users', {
        name,
        email,
        password,
      });

      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Please login with your credentials.',
          confirmButtonColor: '#4f46e5',
          timer: 3000
        }).then(() => {
            navigate('/login');
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.message || 'Something went wrong',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  // Login Function
  const login = async (email, password) => {
    try {
      // Use API instead of axios
      const response = await API.post('/users/login', {
        email,
        password,
      });

      if (response.data) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        });

        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Invalid email or password',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;