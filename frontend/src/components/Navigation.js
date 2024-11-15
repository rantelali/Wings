// src/components/Navigation.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css'; // Import CSS for styling, if needed

function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Adjust based on your storage method
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav className="navigation-bar">
      <ul className="nav-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/user-management">User Management</Link>
        </li>
        <li>
          <Link to="/products">Product Management</Link>
        </li>
        <li>
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
}

const logoutButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
  font: 'inherit',
  padding: '0',
  textDecoration: 'underline',
  display: 'inline',
};

export default Navigation;