// src/App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SignupAndLogin from './components/SignupAndLogin';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import UserManagement from './components/UserManagement';
import Navigation from './components/Navigation';
import './Style.css';
import { useState } from 'react';

function AppContent({ products, setProducts }) {
  const location = useLocation();

  // Render Navigation only on Dashboard, ProductManagement, and UserManagement pages
  const showNavigation = 
    location.pathname === '/dashboard' || 
    location.pathname === '/products' || 
    location.pathname === '/user-management';

  return (
    <>
      {showNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<SignupAndLogin isLogin={false} />} />
        <Route path="/signup" element={<SignupAndLogin isLogin={false} />} />
        <Route path="/login" element={<SignupAndLogin isLogin={true} />} />
        <Route path="/dashboard" element={<Dashboard products={products} />} />
        <Route path="/products" element={<ProductManagement setProducts={setProducts} />} />
        <Route path="/user-management" element={<UserManagement />} />
      </Routes>
    </>
  );
}

function App() {
  const [products, setProducts] = useState([]); // Lifted product state

  return (
    <Router>
      <AppContent products={products} setProducts={setProducts} />
    </Router>
  );
}

export default App;
