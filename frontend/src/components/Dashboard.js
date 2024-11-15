import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductBarChart from './ProductBarChart';

// Import images from src/images folder
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';

const Dashboard = ({ products }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : numericPrice.toFixed(2);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Adjust based on your storage method
    navigate('/login'); // Redirect to login after logout
  };

  const handleGoToProductManagement = () => {
    navigate('/products');
  };

  const handleGoToUserManagement = () => {
    navigate('/users');
  };

  // Image array for slideshow
  const images = [image1, image2, image3, image4, image5];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Auto slide every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ padding: '10px', maxWidth: '100vw' }}>
      <header style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h2 style={{ fontSize: '1.5em' }}>Dashboard</h2>
      </header>

      {/* Flex container for the slideshow and bar chart */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        {/* Slideshow Section */}
        <div
          style={{
            flex: '1',
            maxWidth: '300px',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '20px',
            position: 'relative', // Added to allow positioning of buttons
          }}
        >
          <img
            src={images[currentIndex]}
            alt="Slideshow"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
          />
          <button onClick={prevImage} style={buttonStyle('left')}>
            &#10094;
          </button>
          <button onClick={nextImage} style={buttonStyle('right')}>
            &#10095;
          </button>
        </div>

        {/* Bar Chart Section */}
        <div style={{ flex: '1', maxWidth: '500px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.2em' }}>Products Added</h3>
          {products.length === 0 ? (
            <p>No products have been added yet.</p>
          ) : (
            <div style={{ width: '100%', height: '350px', marginBottom: '10px' }}>
              <ProductBarChart products={products} />
            </div>
          )}
        </div>
      </div>

      {/* Product Table */}
      <section style={{ marginTop: '15px' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.2em' }}>Product Details</h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.9em',
              margin: '0 auto',
              backgroundColor: 'rgba(255, 255, 255, 0.9)', // Add opacity to background
            }}
          >
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Price</th>
                <th style={tableHeaderStyle}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={tableCellStyle}>{product.name}</td>
                  <td style={tableCellStyle}>{product.description}</td>
                  <td style={tableCellStyle}>${formatPrice(product.price)}</td>
                  <td style={tableCellStyle}>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const buttonStyle = (direction) => ({
  position: 'absolute',
  top: '50%',
  [direction]: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  fontSize: '20px',
  padding: '8px',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  zIndex: 1,
  transform: 'translateY(-50%)',
});

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '6px',
  background: '#f4f4f4',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '6px',
  textAlign: 'center',
};

export default Dashboard;