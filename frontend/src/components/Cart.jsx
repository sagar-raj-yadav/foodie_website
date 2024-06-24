import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveToOrders, removeFromCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar';

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRemoveFromCart = (id, size) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this item?');
    if (confirmDelete) {
      dispatch(removeFromCart({ id, size }));
    }
  };

  const handleCheckout = () => {
    dispatch(moveToOrders()); // Dispatch moveToOrders action
    navigate('/payment');
  };

  const handleIncrementQuantity = (name, size) => {
    dispatch(incrementQuantity({ name, size }));
  };

  const handleDecrementQuantity = (name, size) => {
    dispatch(decrementQuantity({ name, size }));
  };

  // Calculate total items in the cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price before GST
  const totalPriceBeforeGST = items.reduce((total, item) => total + item.quantity * item.price, 0);

  // Calculate GST (18%)
  const gst = totalPriceBeforeGST * 0.18;

  // Calculate total price including GST
  const totalPriceWithGST = totalPriceBeforeGST + gst;

  return (
    <>
    <div style={styles.container}>
      <Navbar />

      <h2>Your Cart</h2>
      <h3 style={{ margin: "30px" }}>Total Items in Cart: {totalItems}</h3>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {items.map((item, index) => (
              <li key={index} style={styles.listItem}>
                <img src={item.imgsrc} alt="..." style={styles.image} />
                <div>
                  <h5>{item.name}</h5>
                  <p>{item.description}</p>
                  <p>Size: {item.size}</p>
                  <p>
                    <button style={styles.quantity} onClick={() => handleDecrementQuantity(item.name, item.size)}>-</button>
                    Quantity: {item.quantity}
                    <button style={styles.quantity} onClick={() => handleIncrementQuantity(item.name, item.size)}>+</button>
                  </p>
                  <p>Price: ${item.price}</p>
                </div>
                <button style={styles.removebutton} onClick={() => handleRemoveFromCart(item.id, item.size)}>Remove</button>
              </li>
            ))}
          </ul>

          <div style={styles.bill}>
          <h3><u>Your Bill</u></h3>
            <p>Total Price (before GST): ${totalPriceBeforeGST.toFixed(2)}</p>
            <p>GST (18%): ${gst.toFixed(2)}</p>
            <p>Total Amount (including GST): ${totalPriceWithGST.toFixed(2)}</p>
          </div>

          <button style={styles.checkoutButton} onClick={handleCheckout}>Pay(${totalPriceWithGST.toFixed(2)})</button>
        </>
      )}
    </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  },
  listItem: {
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    marginRight: "10px",
  },
  removebutton: {
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "80px"
  },
  checkoutButton: {
    backgroundColor: "blue",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
    textAlign: "center",
  },
  bill: {
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "20px",
  },
  quantity:{
    padding:"4px",
    margin:"4px",
    fontSize:"15px",
    borderRadius:"8px",
    cursor:"pointer"
  }
};

export default Cart;
