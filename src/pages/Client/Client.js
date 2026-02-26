import React, { useState } from 'react';
import { FiSearch, FiShoppingCart, FiLogOut, FiPlus, FiMinus, FiTrash2, FiX } from 'react-icons/fi';
import { products } from '../../data/products';
import styles from './Client.module.css';

function Client() {
  const [cart, setCart]             = useState([]);
  const [cartOpen, setCartOpen]     = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const flavors = ['Todos', ...new Set(products.map(p => p.flavor))];

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = activeFilter === 'Todos' || p.flavor === activeFilter;
    return matchSearch && matchFilter;
  });

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const changeQty = (id, qty) => {
    if (qty <= 0) setCart(prev => prev.filter(i => i.id !== id));
    else setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  return (
    <div className={styles.container}>

      {/* ── Navbar ── */}
      <header className={styles.navbar}>
        <a href="#/">
          <img src="/a93cb6ff-4b3d-4dbb-88ea-fe8ca6ae5d86.png" alt="AKTIVA" className={styles.navLogo} />
        </a>
        <div className={styles.navActions}>
          <button className={styles.cartIcon} onClick={() => setCartOpen(true)}>
            <FiShoppingCart size={20} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>
          <button className={styles.logoutBtn} onClick={() => { window.location.hash = '#/'; }}>
            <FiLogOut size={16} /> Salir
          </button>
        </div>
      </header>

      {/* ── Banner ── */}
      <div className={styles.banner}>
        <h1>Tienda AKTIVA</h1>
        <p>Barras energéticas con superalimentos andinos 100% naturales</p>
      </div>

      {/* ── Controles ── */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FiSearch size={17} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filters}>
          {flavors.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.results}>
        <span>{filtered.length} producto{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* ── Grid ── */}
      <div className={styles.grid}>
        {filtered.map(product => (
          <div key={product.id} className={styles.card}>
            <div className={styles.cardImg}>
              {product.image
                ? <img src={product.image} alt={product.name} />
                : <span className={styles.emoji}>{product.emoji}</span>}
            </div>
            <div className={styles.cardBody}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              {product.flavor && <span className={styles.flavorBadge}>{product.flavor}</span>}
              <div className={styles.cardFooter}>
                <div className={styles.price}>
                  $ {product.price.toFixed(2)}
                  <span className={styles.priceAlt}>≈ S/ {(product.price * 3.31).toFixed(2)}</span>
                </div>
                <button className={styles.addBtn} onClick={() => addToCart(product)}>
                  <FiShoppingCart size={14} /> Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Drawer carrito ── */}
      {cartOpen && (
        <div className={styles.overlay} onClick={() => setCartOpen(false)}>
          <div className={styles.drawer} onClick={e => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <h2>Mi Carrito</h2>
              <button className={styles.closeDrawer} onClick={() => setCartOpen(false)}><FiX size={20} /></button>
            </div>

            {cart.length === 0 ? (
              <div className={styles.empty}>
                <FiShoppingCart size={40} style={{ opacity: 0.3 }} />
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                <div className={styles.drawerItems}>
                  {cart.map(item => (
                    <div key={item.id} className={styles.drawerItem}>
                      <span className={styles.drawerEmoji}>{item.emoji}</span>
                      <div className={styles.drawerInfo}>
                        <p className={styles.drawerName}>{item.name}</p>
                        <p className={styles.drawerPrice}>$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className={styles.qty}>
                        <button onClick={() => changeQty(item.id, item.quantity - 1)}><FiMinus size={12} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => changeQty(item.id, item.quantity + 1)}><FiPlus size={12} /></button>
                      </div>
                      <button className={styles.removeItem} onClick={() => changeQty(item.id, 0)}><FiTrash2 size={14} /></button>
                    </div>
                  ))}
                </div>
                <div className={styles.drawerFooter}>
                  <div className={styles.drawerTotal}>
                    <span>Total</span>
                    <span className={styles.totalAmt}>$ {cartTotal.toFixed(2)}</span>
                  </div>
                  <button className={styles.checkoutBtn} onClick={() => {
                    localStorage.setItem('aktiva-checkout-cart', JSON.stringify(cart));
                    window.location.hash = '#/pago';
                  }}>
                    Proceder al Pago
                  </button>
                  <button className={styles.continueBtn} onClick={() => setCartOpen(false)}>
                    Continuar comprando
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Client;
