import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import RoleSelector from './pages/RoleSelector/RoleSelector';
import Client from './pages/Client/Client';
import Employee from './pages/Employee/Employee';
import Productos from './pages/Productos/Productos';
import NotFound from './pages/NotFound/NotFound';
import { products } from './data/products';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('aktiva-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [currentHash, setCurrentHash] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    localStorage.setItem('aktiva-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const hideHeaderFooter = ['/login', '/register', '/roles', '/client', '/employee'].includes(currentHash);

  return (
    <div className="App">
      {!hideHeaderFooter && <AnnouncementBar />}
      {!hideHeaderFooter && (
        <Header
          cartItems={cartItems}
          products={products}
          onRemoveFromCart={handleRemoveFromCart}
          onQuantityChange={handleQuantityChange}
        />
      )}
      <main className="main-content">
        {currentHash === '/login' && <Login />}
        {currentHash === '/register' && <Register />}
        {currentHash === '/about' && <AboutUs />}
        {currentHash === '/contact' && <Contact />}
        {currentHash === '/roles' && <RoleSelector />}
        {currentHash === '/client' && <Client onAddToCart={handleAddToCart} />}
        {currentHash === '/employee' && <Employee />}
        {currentHash === '/productos' && <Productos onAddToCart={handleAddToCart} />}
        {(currentHash === '/' || currentHash === '') && <Home onAddToCart={handleAddToCart} />}
        {!['/login','/register','/about','/contact','/roles','/client','/employee','/productos','/','' ].includes(currentHash) && <NotFound />}
      </main>
      {!hideHeaderFooter && (
        <>
          <Footer />
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}

export default App;