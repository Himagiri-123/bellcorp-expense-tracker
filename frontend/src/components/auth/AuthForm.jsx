import { useState } from 'react';

const AuthForm = ({ title, buttonText, onSubmit, isRegister }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (isRegister && formData.name.trim().length < 3) {
      return "Name must be at least 3 characters long.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="auth-form" style={{maxWidth: '400px', margin: '50px auto', padding: '30px', background: 'white', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}>
      <h2 style={{textAlign: 'center', marginBottom: '20px', color: '#4f46e5'}}>{title}</h2>
      
      {error && <div style={{background: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '0.9rem', textAlign:'center'}}>{error}</div>}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="form-group" style={{marginBottom: '15px'}}>
            <label style={{display:'block', marginBottom:'5px', fontWeight:'500'}}>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" style={{width:'100%', padding:'10px', borderRadius:'8px', border:'1px solid #d1d5db'}} />
          </div>
        )}
        <div className="form-group" style={{marginBottom: '15px'}}>
          <label style={{display:'block', marginBottom:'5px', fontWeight:'500'}}>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" style={{width:'100%', padding:'10px', borderRadius:'8px', border:'1px solid #d1d5db'}} />
        </div>
        <div className="form-group" style={{marginBottom: '20px'}}>
          <label style={{display:'block', marginBottom:'5px', fontWeight:'500'}}>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Min 6 chars" style={{width:'100%', padding:'10px', borderRadius:'8px', border:'1px solid #d1d5db'}} />
        </div>
        <button type="submit" className="btn btn-click-effect" style={{width:'100%', padding:'12px', background:'#4f46e5', color:'white', border:'none', borderRadius:'8px', fontWeight:'600', cursor:'pointer'}}>{buttonText}</button>
      </form>
    </div>
  );
};

export default AuthForm;