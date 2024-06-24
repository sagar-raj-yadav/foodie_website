import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const navigate = useNavigate(); 
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav style={styles.navbar}>
        <Link style={styles.logo} to="/">Foodie Junction</Link>
      <div style={styles.navLinks}>
        {isAuthenticated ? (
          <>
          <Link style={styles.link} to="/">Home</Link>
            <Link style={styles.link} to="/my-orders">My Orders</Link>
            <Link style={styles.link} to="/cart">My Cart <span  style={{color:"orange"}}>({totalItems})</span></Link>
            <button style={styles.logoutButton} onClick={() => {
              localStorage.removeItem('authToken');
              navigate("/"); 
              window.location.reload();
            }}>Logout</button>
          </>
        ) : (
          <div style={styles.authButtons}>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};


const styles = {
  navbar:{
    borderBottom:"3px solid black",
  },
  logo:{
    textDecoration: "none",
    fontSize:"40px"
  },

  navLinks:{
    display:"flex",
    justifyContent:"end",
    gap:"40px",
    marginBottom:"30px"

  },
  link:{
    textDecoration: "none",
    backgroundColor: 'green',
    color: '#fff',
    padding: '10px 10px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize:"18px",
    marginRight:"15px"
  },
  logoutButton:{
    padding:"10px",
    borderRadius:"8px",
    backgroundColor:"red",
    color:"white",
    fontSize:"16px",
    fontWeight:"bold",
    cursor:"pointer"
  }

};

export default Navbar;
