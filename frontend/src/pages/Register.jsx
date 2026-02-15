import { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AuthForm from '../components/auth/AuthForm';

const Register = () => {
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleRegister = (formData) => {
    register(formData.name, formData.email, formData.password);
  };

  return (
    <div>
      <AuthForm 
        title="Register" 
        buttonText="Register" 
        onSubmit={handleRegister} 
        isRegister={true}
      />
      <p style={{textAlign:'center', marginTop:'15px'}}>
        Already have an account? <Link to="/login" style={{color:'#4f46e5', fontWeight:'bold'}}>Login</Link>
      </p>
    </div>
  );
};

export default Register;