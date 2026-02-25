import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import styles from './Productos.module.css';

function Productos({ onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const flavors = ['Todos', ...new Set(products.map(p => p.flavor))];

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = activeFilter === 'Todos' || p.flavor === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1>Nuestros Productos</h1>
        <p>Barras energéticas con ingredientes andinos peruanos 100% naturales</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FiSearch size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          {flavors.map(flavor => (
            <button
              key={flavor}
              className={`${styles.filterBtn} ${activeFilter === flavor ? styles.active : ''}`}
              onClick={() => setActiveFilter(flavor)}
            >
              {flavor}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.results}>
        <span>{filtered.length} producto{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className={styles.grid}>
        {filtered.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <p>No se encontraron productos con ese criterio.</p>
        </div>
      )}
    </div>
  );
}

export default Productos;