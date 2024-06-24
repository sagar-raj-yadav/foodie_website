import {useState,useEffect} from "react";

const images = [
  "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1600490036275-35f5f1656861?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJpcnlhbml8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzsZWFyY2h8MTl8fGJpcnlhbml8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJpcnlhbml8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const Carousel = ({ searchQuery, setSearchQuery }) => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('left');

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setDirection('left');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((current) => (current + 1) % images.length);
      setIsTransitioning(false);
    }, 100);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setDirection('right');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((current) => (current - 1 + images.length) % images.length);
      setIsTransitioning(false);
    }, 100);
  };

  return (
    <div style={styles.carousel}>
      
      <button onClick={prevSlide} style={{ ...styles.button, left: '10px' }}>‹</button>
      <div style={styles.imageContainer}>
        {isTransitioning && (
          <img
            src={images[current]}
            alt="Food"
            style={{
              ...styles.image,
              transform: `translateX(${direction === 'left' ? '-' : ''}100%)`,
            }}
          />
        )}
        <img
          src={images[current]}
          alt="Food"
          style={{
            ...styles.image,
            transition: isTransitioning ? 'transform 0.6s ease' : 'none',
          }}
        />
      </div>
      <button onClick={nextSlide} style={{ ...styles.button, right: '10px' }}>›</button>
      <input 
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for food items..."
        style={styles.searchInput}
      />
    </div>
  );
}

const styles = {
  carousel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '60vh',
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '100%',
  },
  searchInput: {
    width: '90%',
    padding: '10px',
    margin: '20px 0 20px 0',
    fontSize: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  button: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.5)',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    zIndex: 1,
    padding: '0 10px',
    outline: 'none',
  },
  '@media (max-width: 768px)': {
    image: {
      height: '40vh',
    },
    button: {
      fontSize: '1.5rem',
      padding: '0 8px',
    }
  },
  '@media (max-width: 480px)': {
    image: {
      height: '30vh',
    },
    button: {
      fontSize: '1rem',
      padding: '0 6px',
    }
  }
};

export default Carousel;
