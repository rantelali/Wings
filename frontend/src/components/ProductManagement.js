// src/components/ProductManagement.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductManagement = ({ setProducts }) => {
  const [products, setLocalProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLocalProducts(data);
      setProducts(data); // Update shared products state
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error fetching products');
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct 
        ? `http://localhost:5000/api/products/${editingProduct.id}` 
        : 'http://localhost:5000/api/products';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      fetchProducts();
      setNewProduct({ name: '', description: '', price: '', quantity: '' });
      setEditingProduct(null);
      setError('');
    } catch (err) {
      console.error('Error adding/updating product:', err);
      setError('Error adding/updating product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleSellProduct = async (id) => {
    const product = products.find((p) => p.id === id);
    if (product && product.quantity > 0) {
      const updatedQuantity = product.quantity - 1;
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...product, quantity: updatedQuantity }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        fetchProducts();
      } catch (err) {
        console.error('Error selling product:', err);
        setError('Error selling product');
      }
    } else {
      setError('Product is out of stock');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Error deleting product');
    }
  };

  // Input field style definition
  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  };

  // Button styles
  const actionButtonStyle = {
    padding: '10px 15px',
    margin: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div 
      className="product-management" 
      style={{
        backgroundImage: 'url(/images/background-image.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <header className="header" style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '600', color: '#333' }}>Product Management</h2>
      </header>

      {error && <p className="error" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form
        onSubmit={handleAddProduct}
        className="product-form"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '600px',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '30px' // Added margin to separate form and product list
        }}
      >
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="quantity"
          value={newProduct.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
          style={inputStyle}
        />
        <button
          type="submit"
          style={{
            ...actionButtonStyle,
            backgroundColor: editingProduct ? '#ffc107' : '#28a745',
          }}
        >
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <h3 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Product List</h3>

      <table 
        style={{
          width: '100%',
          maxWidth: '600px',
          borderCollapse: 'collapse',
          marginBottom: '30px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: '12px', backgroundColor: '#f1f1f1', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Name</th>
            <th style={{ padding: '12px', backgroundColor: '#f1f1f1', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Description</th>
            <th style={{ padding: '12px', backgroundColor: '#f1f1f1', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Price (M)</th> {/* Changed currency to "M" */}
            <th style={{ padding: '12px', backgroundColor: '#f1f1f1', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Quantity</th>
            <th style={{ padding: '12px', backgroundColor: '#f1f1f1', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{product.name}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{product.description}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>M{product.price}</td> {/* Changed currency to "M" */}
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{product.quantity}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                <button
                  onClick={() => handleEditProduct(product)}
                  style={actionButtonStyle}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleSellProduct(product.id)}
                  style={actionButtonStyle}
                >
                  Sell
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  style={{
                    ...actionButtonStyle,
                    backgroundColor: 'red',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;