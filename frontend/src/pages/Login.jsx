import { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AuthForm from '../components/auth/AuthForm';

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleLogin = (formData) => {
    login(formData.email, formData.password);
  };

  return (
    <div>
      <AuthForm 
        title="Login" 
        buttonText="Login" 
        onSubmit={handleLogin} 
        isRegister={false}
      />
      <p style={{textAlign:'center', marginTop:'15px'}}>
        Don't have an account? <Link to="/register" style={{color:'#4f46e5', fontWeight:'bold'}}>Register</Link>
      </p>
    </div>
  );
};

export default Login;