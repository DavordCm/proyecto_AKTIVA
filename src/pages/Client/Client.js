import React, { useState } from 'react';
import styles from './Client.module.css';
import { products } from '../../data/products';

function Client({ onAddToCart }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={styles.clientContainer}>
      <div className={styles.header}>
        <h1>🛍️ Tienda AKTIVA</h1>
        <p>Descubre nuestras barras de energía nutritivas</p>
        <button
          className={styles.cartBtn}
          onClick={() => setShowCart(!showCart)}
        >
          🛒 Mi Carrito ({cart.length})
        </button>
      </div>

      <div className={styles.mainContent}>
        {showCart ? (
          <div className={styles.cartSection}>
            <h2>Mi Carrito de Compras</h2>
            {cart.length === 0 ? (
              <div className={styles.emptyCart}>
                <p>Tu carrito está vacío</p>
                <button
                  className={styles.continueBtn}
                  onClick={() => setShowCart(false)}
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <>
                <div className={styles.cartItems}>
                  {cart.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                      <div className={styles.itemInfo}>
                        <h4>{item.name}</h4>
                        <p>S/ {item.price.toFixed(2)}</p>
                      </div>
                      <div className={styles.itemControls}>
                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          min="1"
                        />
                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <div className={styles.itemTotal}>
                        S/ {(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className={styles.cartSummary}>
                  <div className={styles.totalRow}>
                    <span>Total:</span>
                    <span className={styles.totalPrice}>S/ {total.toFixed(2)}</span>
                  </div>
                  <button className={styles.checkoutBtn}>Proceder al Pago</button>
                  <button
                    className={styles.continueBtn}
                    onClick={() => setShowCart(false)}
                  >
                    Continuar Comprando
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={styles.productsSection}>
            <h2>Nuestros Productos</h2>
            <div className={styles.productGrid}>
              {products.map(product => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productEmoji}>{product.emoji}</div>
                  <h3>{product.name}</h3>
                  <p className={styles.description}>{product.description}</p>
                  <div className={styles.flavor}>Sabor: {product.flavor}</div>
                  <div className={styles.priceSection}>
                    <span className={styles.price}>S/ {product.price.toFixed(2)}</span>
                    <button
                      className={styles.addBtn}
                      onClick={() => handleAddToCart(product)}
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Client;
