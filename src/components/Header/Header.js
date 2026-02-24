import React, { useState } from 'react';
import styles from './Header.module.css';

function Header({ cartCount, products = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Búsqueda:', searchTerm, 'Resultados:', searchResults);
  };

  const handleProductClick = (productId) => {
    console.log('Producto seleccionado:', productId);
    setSearchTerm('');
    setSearchResults([]);
    setSearchOpen(false);
  };

  const handleProductsClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    const currentHash = window.location.hash.slice(1) || '/';

    // Si no estamos en Home, navega primero
    if (currentHash !== '/' && currentHash !== '') {
      window.location.hash = '#/';
      // Usar setTimeout para que React renderice Home antes de hacer scroll
      setTimeout(() => {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      // Si ya estamos en Home, haz scroll inmediatamente
      const productsSection = document.getElementById('products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img
            src="/76ea0096-92e0-4209-9217-f2af6909b3cd.jpg"
            alt="AKTIVA Logo"
            className={styles.logoImg}
          />
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <a href="#/" className={styles.navLink}>Inicio</a>
          <a href="#" onClick={handleProductsClick} className={styles.navLink}>Productos</a>
          <a href="#/about" className={styles.navLink}>Sobre Nosotros</a>
          <a href="#/contact" className={styles.navLink}>Contacto</a>
        </nav>

        <div className={styles.icons}>
          <div className={styles.searchWrapper}>
            <button
              className={styles.iconBtn}
              onClick={() => setSearchOpen(!searchOpen)}
              title="Buscar"
            >
              🔍
            </button>
            {searchOpen && (
              <div className={styles.searchContainer}>
                <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                    autoFocus
                  />
                  <button type="submit" className={styles.searchBtn}>
                    Buscar
                  </button>
                </form>
                {searchResults.length > 0 && (
                  <div className={styles.searchResultsDropdown}>
                    {searchResults.map(product => (
                      <div
                        key={product.id}
                        className={styles.searchResultItem}
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className={styles.resultEmoji}>{product.emoji}</div>
                        <div className={styles.resultInfo}>
                          <div className={styles.resultName}>{product.name}</div>
                          <div className={styles.resultPrice}>S/ {product.price.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {searchTerm && searchResults.length === 0 && (
                  <div className={styles.noResults}>
                    No se encontraron productos
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.userWrapper}>
            <button
              className={styles.iconBtn}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              title="Mi cuenta"
            >
              👤
            </button>
            {userMenuOpen && (
              <div className={styles.userMenu}>
                <a href="#/login" className={styles.userMenuLink}>Iniciar Sesión</a>
                <a href="#/register" className={styles.userMenuLink}>Registrarse</a>
              </div>
            )}
          </div>

          <div className={styles.cartIcon}>
            <span className={styles.cartBadge}>{cartCount}</span>
            🛒
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;