import React, { useState } from 'react';
import { FiSearch, FiUser, FiMenu, FiX } from 'react-icons/fi';
import styles from './Header.module.css';

function Header({ products = [] }) {
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
          <a href="#/">
            <img src="/a93cb6ff-4b3d-4dbb-88ea-fe8ca6ae5d86.png" alt="AKTIVA Logo" className={styles.logoImg} />
          </a>
        </div>

        <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <a href="#/" className={styles.navLink}>Inicio</a>
          <button onClick={handleProductsClick} className={styles.navLink} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Productos</button>
          <a href="#/contacto" className={styles.navLink}>Contacto</a>
        </nav>

        <div className={styles.icons}>
          {/* Búsqueda */}
          <div className={styles.searchWrapper}>
            <button className={styles.iconBtn} onClick={() => { setSearchOpen(!searchOpen); setUserMenuOpen(false); }} title="Buscar">
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
            <button className={styles.iconBtn} onClick={() => { setUserMenuOpen(!userMenuOpen); setSearchOpen(false); }} title="Mi cuenta">
              <FiUser size={20} />
            </button>
            {userMenuOpen && (
              <div className={styles.userMenu}>
                <a href="#/iniciar-sesion" className={styles.userMenuLink}>Iniciar Sesión</a>
                <a href="#/registrarse" className={styles.userMenuLink}>Registrarse</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
