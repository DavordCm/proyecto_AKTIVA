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
import Checkout from './pages/Checkout/Checkout';
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

  const handleClearCart = () => setCartItems([]);

  const hideHeaderFooter = ['/iniciar-sesion', '/registrarse', '/roles', '/cliente', '/empleado', '/pago'].includes(currentHash);

  return (
    <div className="App">
      {!hideHeaderFooter && <AnnouncementBar />}
      {!hideHeaderFooter && (
        <Header products={products} />
      )}
      <main className="main-content">
        {currentHash === '/iniciar-sesion' && <Login />}
        {currentHash === '/registrarse'    && <Register />}
        {currentHash === '/nosotros'       && <AboutUs />}
        {currentHash === '/contacto'       && <Contact />}
        {currentHash === '/roles'          && <RoleSelector />}
        {currentHash === '/cliente'        && <Client onAddToCart={handleAddToCart} />}
        {currentHash === '/empleado'       && <Employee />}
        {currentHash === '/productos'      && <Productos onAddToCart={handleAddToCart} />}
        {currentHash === '/pago'           && <Checkout cartItems={cartItems} onClearCart={handleClearCart} />}
        {(currentHash === '/' || currentHash === '') && <Home onAddToCart={handleAddToCart} />}
        {!['/iniciar-sesion','/registrarse','/nosotros','/contacto','/roles','/cliente','/empleado','/productos','/pago','/','' ].includes(currentHash) && <NotFound />}
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