import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const Card = ({ id, name, description, imgsrc, options }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(Object.keys(options)[0]);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const item = {
      id,
      name,
      description,
      imgsrc,
      quantity: Number(quantity),
      size,
      price: options[size],
    };
    dispatch(addToCart(item));
    // Reset quantity and size after adding to cart
    setQuantity(1);
    setSize(Object.keys(options)[0]);
  };

  let priceoptions = Object.keys(options);

  return (
    <div>
      <div style={styles.card}>
        <img src={imgsrc} style={styles.cardImg} alt="..." />
        <div>
          <h4 style={{fontSize:"20px"}}><u>{name}</u></h4>
          <p>{description}</p>
          <div>
            <select style={styles.select} onChange={(e) => setQuantity(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>

            <select style={styles.select} onChange={(e) => setSize(e.target.value)}>
              {
                priceoptions.map((data) => {
                  return (
                    <option key={data} value={data}>{data}</option>
                  )
                })
              }
            </select>

            <div style={styles.totalPrice}>
              Total price: {options[size] * quantity}
              <hr />
              <button style={styles.addButton} onClick={handleAddToCart}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const styles = {
  card: {
    width: '18rem',
    maxHeight: '440px',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1.8rem',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  cardImg: {
    height: '180px',
    width: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  select: {
    margin: '0.5rem',
    height: '40px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '0.25rem',
    backgroundColor: '#f8f9fa',
    fontSize:"20px"
  },
  totalPrice: {
    display: 'inline',
    fontSize: '20px',
    color: 'green',
    marginRight: '1rem',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    marginTop:"10px",
    padding: '0.7rem 1.2rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize:"20px"
  },
};


export default Card;
