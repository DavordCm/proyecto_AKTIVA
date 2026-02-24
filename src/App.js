import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { products } from './data/products';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const currentHash = window.location.hash.slice(1) || '/';

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

  return (
    <div className="App">
      {currentHash !== '/login' && currentHash !== '/register' && (
        <Header cartCount={cartItems.length} products={products} />
      )}
      <main className="main-content">
        {currentHash === '/login' && <Login />}
        {currentHash === '/register' && <Register />}
        {(currentHash === '/' || currentHash === '') && <Home onAddToCart={handleAddToCart} />}
      </main>
      {currentHash !== '/login' && currentHash !== '/register' && (
        <>
          <Footer />
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}

export default App;
