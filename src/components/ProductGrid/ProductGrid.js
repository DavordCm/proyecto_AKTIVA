import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';

function ProductGrid({ products, onAddToCart }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nuestras Barras de Energía</h2>
        <p className={styles.subtitle}>Barras energéticas con ingredientes andinos peruanos 100% naturales</p>

        <div className={styles.grid}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;