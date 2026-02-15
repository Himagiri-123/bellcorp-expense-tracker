import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{textAlign:'center', marginTop:'50px'}}>
    <h1 style={{fontSize:'3rem', color:'#4f46e5'}}>404</h1>
    <p>Page Not Found</p>
    <Link to="/" style={{color:'#4f46e5', fontWeight:'bold'}}>Go Home</Link>
  </div>
);

export default NotFound;