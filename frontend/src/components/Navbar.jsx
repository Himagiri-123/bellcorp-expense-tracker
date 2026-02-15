import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaSignOutAlt, FaChartPie, FaList } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will need to login again to access your data.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/login');
        Swal.fire({
          icon: 'success',
          title: 'Logged Out!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  const getLinkStyle = (path) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#4f46e5' : '#374151',
    fontWeight: location.pathname === path ? 'bold' : '500',
    padding: '8px 12px',
    borderRadius: '6px',
    backgroundColor: location.pathname === path ? '#e0e7ff' : 'transparent',
    transition: 'all 0.2s'
  });

  return (
    <nav className="navbar" style={{padding: '15px 30px', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <div className="logo" style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'1.2rem', fontWeight:'bold', color:'#111827'}}>
         <FaChartPie size={24} color="#4f46e5"/> Bellcorp Tracker
      </div>
      
      <div className="nav-links" style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
        {user && (
          <>
            <div style={{display:'flex', gap:'15px'}}>
                <Link to="/" style={getLinkStyle('/')}>Dashboard</Link>
                <Link to="/transactions" style={{...getLinkStyle('/transactions'), display:'flex', alignItems:'center', gap:'5px'}}>
                   <FaList size={14}/> Explorer
                </Link>
            </div>
            
            <div style={{width: '1px', height: '25px', background: '#d1d5db'}}></div>
            
            <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                <span style={{fontWeight: '600', color: '#4f46e5', fontSize:'1rem'}}>
                    {user?.name || "User"}
                </span>
                
                <button 
                    onClick={handleLogout} 
                    className="btn-click-effect"
                    style={{
                        background: '#ef4444', 
                        color:'white', 
                        border:'none', 
                        display:'flex', 
                        alignItems:'center', 
                        gap:'6px', 
                        padding: '8px 16px', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}
                >
                   <FaSignOutAlt /> Logout
                </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;