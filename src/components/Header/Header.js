import React, { useState } from 'react';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import styles from './Header.module.css';

function Header({ cartItems = [], onRemoveFromCart, onQuantityChange, products = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term.trim()) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => e.preventDefault();

  const handleProductClick = () => {
    setSearchTerm('');
    setSearchResults([]);
    setSearchOpen(false);
  };

  const handleProductsClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    window.location.hash = '#/productos';
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/76ea0096-92e0-4209-9217-f2af6909b3cd.jpg" alt="AKTIVA Logo" className={styles.logoImg} />
        </div>

        <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <a href="#/" className={styles.navLink}>Inicio</a>
          <button onClick={handleProductsClick} className={styles.navLink} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Productos</button>
          <a href="#/contact" className={styles.navLink}>Contacto</a>
        </nav>

        <div className={styles.icons}>
          {/* Búsqueda */}
          <div className={styles.searchWrapper}>
            <button className={styles.iconBtn} onClick={() => { setSearchOpen(!searchOpen); setCartOpen(false); setUserMenuOpen(false); }} title="Buscar">
              <FiSearch size={20} />
            </button>
            {searchOpen && (
              <div className={styles.searchContainer}>
                <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                  <input type="text" placeholder="Buscar productos..." value={searchTerm} onChange={handleSearch} className={styles.searchInput} autoFocus />
                  <button type="submit" className={styles.searchBtn}>Buscar</button>
                </form>
                {searchResults.length > 0 && (
                  <div className={styles.searchResultsDropdown}>
                    {searchResults.map(product => (
                      <div key={product.id} className={styles.searchResultItem} onClick={() => handleProductClick()}>
                        <div className={styles.resultEmoji}>{product.emoji}</div>
                        <div className={styles.resultInfo}>
                          <div className={styles.resultName}>{product.name}</div>
                          <div className={styles.resultPrice}>$ {product.price.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {searchTerm && searchResults.length === 0 && (
                  <div className={styles.noResults}>No se encontraron productos</div>
                )}
              </div>
            )}
          </div>

          {/* Usuario */}
          <div className={styles.userWrapper}>
            <button className={styles.iconBtn} onClick={() => { setUserMenuOpen(!userMenuOpen); setCartOpen(false); setSearchOpen(false); }} title="Mi cuenta">
              <FiUser size={20} />
            </button>
            {userMenuOpen && (
              <div className={styles.userMenu}>
                <a href="#/login" className={styles.userMenuLink}>Iniciar Sesión</a>
                <a href="#/register" className={styles.userMenuLink}>Registrarse</a>
              </div>
            )}
          </div>

          {/* Carrito */}
          <div className={styles.cartWrapper}>
            <button className={styles.cartBtn} onClick={() => { setCartOpen(!cartOpen); setSearchOpen(false); setUserMenuOpen(false); }} title="Mi carrito">
              <FiShoppingCart size={20} />
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </button>

            {cartOpen && (
              <div className={styles.cartDropdown}>
                <div className={styles.cartHeader}>
                  <h3>Mi Carrito</h3>
                  <button className={styles.closeBtn} onClick={() => setCartOpen(false)}><FiX size={18} /></button>
                </div>

                {cartItems.length === 0 ? (
                  <div className={styles.emptyCart}>
                    <FiShoppingCart size={36} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                    <p>Tu carrito está vacío</p>
                  </div>
                ) : (
                  <>
                    <div className={styles.cartItems}>
                      {cartItems.map(item => (
                        <div key={item.id} className={styles.cartItem}>
                          <div className={styles.itemEmoji}>{item.emoji}</div>
                          <div className={styles.itemInfo}>
                            <span className={styles.itemName}>{item.name}</span>
                            <span className={styles.itemPrice}>$ {item.price.toFixed(2)}</span>
                          </div>
                          <div className={styles.itemControls}>
                            <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}><FiMinus size={12} /></button>
                            <span>{item.quantity}</span>
                            <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}><FiPlus size={12} /></button>
                          </div>
                          <button className={styles.removeBtn} onClick={() => onRemoveFromCart(item.id)}><FiTrash2 size={14} /></button>
                        </div>
                      ))}
                    </div>
                    <div className={styles.cartFooter}>
                      <div className={styles.cartTotal}>
                        <span>Total:</span>
                        <span className={styles.totalPrice}>$ {cartTotal.toFixed(2)}</span>
                      </div>
                      <button className={styles.checkoutBtn}>Proceder al Pago</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;